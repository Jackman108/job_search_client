import { useCallback, useEffect, useState } from 'react';
import { useDataApi } from '@api';
import { useAuth } from '@app/providers/auth/useAuthContext';
import type { AppNotification } from '@entities/notification';

const useNotifications = () => {
    const { request } = useDataApi();
    const { token } = useAuth();
    const [items, setItems] = useState<AppNotification[]>([]);
    const [unread, setUnread] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const load = useCallback(async () => {
        if (!token) return;
        setLoading(true);
        setError(null);
        try {
            const [list, countRes] = await Promise.all([
                request('get', '/notifications') as Promise<AppNotification[]>,
                request('get', '/notifications/unread-count') as Promise<{ count: number }>,
            ]);
            setItems(Array.isArray(list) ? list : []);
            setUnread(Number(countRes?.count) || 0);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Не удалось загрузить уведомления');
        } finally {
            setLoading(false);
        }
    }, [request, token]);

    useEffect(() => {
        void load();
    }, [load]);

    const markRead = useCallback(
        async (id: string) => {
            await request('post', `/notifications/${id}/read`, {});
            setItems((prev) =>
                prev.map((n) => (n.id === id ? { ...n, read_at: n.read_at || new Date().toISOString() } : n)),
            );
            setUnread((c) => Math.max(0, c - 1));
        },
        [request],
    );

    return { items, unread, loading, error, reload: load, markRead };
};

export default useNotifications;
