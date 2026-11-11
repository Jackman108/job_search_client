import { useEffect, useState } from 'react';
import { useAuth } from '@app/providers/auth/useAuthContext';
import { API_URL } from '@config';

/**
 * Load worker-captured CAPTCHA PNG with Bearer auth (img src cannot send JWT).
 * Falls back to HH captchaSrc when the local image is not ready.
 */
const useCaptchaImageUrl = (
    jobId: string | undefined,
    awaitingCaptcha: boolean,
    hasCaptchaImage: boolean | undefined,
    captchaSrc: string | undefined,
    revision: string | undefined,
): string | undefined => {
    const { token } = useAuth();
    const [blobUrl, setBlobUrl] = useState<string | undefined>();

    useEffect(() => {
        let revoked: string | undefined;
        let cancelled = false;

        const run = async () => {
            if (!awaitingCaptcha || !jobId || !token || !hasCaptchaImage) {
                setBlobUrl(undefined);
                return;
            }
            try {
                const res = await fetch(
                    `${API_URL}/jobs/${jobId}/captcha-image?t=${encodeURIComponent(revision || '')}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                        cache: 'no-store',
                    },
                );
                if (!res.ok) {
                    if (!cancelled) setBlobUrl(undefined);
                    return;
                }
                const blob = await res.blob();
                if (cancelled) return;
                const url = URL.createObjectURL(blob);
                revoked = url;
                setBlobUrl(url);
            } catch {
                if (!cancelled) setBlobUrl(undefined);
            }
        };

        void run();
        return () => {
            cancelled = true;
            if (revoked) URL.revokeObjectURL(revoked);
        };
    }, [awaitingCaptcha, jobId, token, hasCaptchaImage, revision]);

    if (blobUrl) return blobUrl;
    if (captchaSrc && /captcha\/picture/i.test(captchaSrc)) return captchaSrc;
    return undefined;
};

export default useCaptchaImageUrl;
