import { FormEvent, useCallback, useState } from 'react';
import { useAuth } from '@app/providers/auth/useAuthContext';
import { useHhJobContext } from '@app/providers/hhJob/useHhJobContext';
import { useSubmitRequest } from '@hooks';
import useVacancySubmit from './useVacancySubmit';
import useSharedSearchProfile, { PROFILE_REQUIRED_KEYS } from '@shared/hooks/forms/useSharedSearchProfile';
import { getScriptControlState } from '@shared/utils/scriptControlState.utils';
import { readLastApplySnapshot } from '@shared/utils/lastApplySnapshot.utils';

const useSearchFormLogic = () => {
    const { token } = useAuth();
    const { isJobActive, activeJob, liveSummary, lastEvent, awaitingCaptcha, status } = useHhJobContext();
    const { vacancySubmit, vacancyStop } = useVacancySubmit();
    const { handleSubmitRequest, handleStopRequest } = useSubmitRequest();
    const profile = useSharedSearchProfile(PROFILE_REQUIRED_KEYS);
    const [applyCap, setApplyCap] = useState<number | ''>('');

    const applyActive = isJobActive && activeJob?.kind === 'sendFeedback';
    const refreshActive = isJobActive && activeJob?.kind === 'getFeedback';
    const anyJobBusy = applyActive || refreshActive || profile.isLoading;

    const { canStart, canStop } = getScriptControlState({
        isLoading: applyActive || (profile.isLoading && !refreshActive),
        isEditing: profile.isEditing,
        canCommit: profile.canCommit,
    });

    const buildStartArgs = useCallback(
        () => ({
            ...profile.formValues,
            token,
            applyCap: typeof applyCap === 'number' && applyCap > 0 ? applyCap : undefined,
            setErrors: profile.setErrors,
            setIsLoading: profile.setIsLoading,
        }),
        [profile, token, applyCap],
    );

    const onSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if (applyActive || !canStart) return;
        await vacancySubmit(buildStartArgs());
    };

    const onApplyToggle = useCallback(async () => {
        if (applyActive || canStop) {
            // Never cancel a running refresh when stopping applies.
            await vacancyStop(['sendFeedback']);
            profile.setIsLoading(false);
            return;
        }
        if (!canStart) return;
        await vacancySubmit(buildStartArgs());
    }, [applyActive, canStop, canStart, vacancyStop, vacancySubmit, profile, buildStartArgs]);

    const onRefreshToggle = useCallback(async () => {
        if (refreshActive) {
            await handleStopRequest(['getFeedback']);
            profile.setIsLoading(false);
            return;
        }
        if (anyJobBusy || profile.isEditing) return;
        if (!profile.formValues.email || !profile.formValues.password) return;
        try {
            await handleSubmitRequest({
                ...profile.formValues,
                endpoint: '/refresh',
                setErrors: profile.setErrors,
                setIsLoading: profile.setIsLoading,
            });
        } catch {
            // Errors already surfaced via setErrors in useSubmitRequest.
        }
    }, [refreshActive, anyJobBusy, profile, handleStopRequest, handleSubmitRequest]);

    const onRepeatLast = useCallback(async () => {
        if (anyJobBusy || profile.isEditing) return;
        const snap = readLastApplySnapshot();
        if (!snap) return;
        await vacancySubmit({
            ...snap,
            token,
            applyCap: typeof applyCap === 'number' && applyCap > 0 ? applyCap : undefined,
            setErrors: profile.setErrors,
            setIsLoading: profile.setIsLoading,
        });
    }, [anyJobBusy, profile, vacancySubmit, token, applyCap]);

    return {
        token,
        ...profile,
        applyCap,
        setApplyCap,
        applyActive,
        refreshActive,
        canStart,
        canStop,
        canRefresh:
            !anyJobBusy && !profile.isEditing && Boolean(profile.formValues.email && profile.formValues.password),
        onSubmit,
        onApplyToggle,
        onRefreshToggle,
        onRepeatLast,
        liveSummary,
        lastEvent,
        awaitingCaptcha,
        jobStatus: status,
    };
};

export default useSearchFormLogic;
