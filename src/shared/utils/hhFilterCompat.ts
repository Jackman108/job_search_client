/** Map legacy HH SERP / DB filter values onto Magritte IDs. */

const WORK_FORMAT: Record<string, string> = {
    remote: 'REMOTE',
    fullDay: 'ON_SITE',
    flexible: 'HYBRID',
    shift: 'ON_SITE',
    flyInFlyOut: 'FIELD_WORK',
    ON_SITE: 'ON_SITE',
    REMOTE: 'REMOTE',
    HYBRID: 'HYBRID',
    FIELD_WORK: 'FIELD_WORK',
};

const EMPLOYMENT_FORM: Record<string, string> = {
    full: 'FULL',
    part: 'PART',
    project: 'PROJECT',
    volunteer: 'PROJECT',
    probation: 'internship',
    FULL: 'FULL',
    PART: 'PART',
    PROJECT: 'PROJECT',
    FLY_IN_FLY_OUT: 'FLY_IN_FLY_OUT',
    internship: 'internship',
};

export function normalizeWorkFormat(raw: string | undefined | null): string {
    if (!raw) return '';
    return WORK_FORMAT[raw] ?? WORK_FORMAT[raw.trim()] ?? '';
}

export function normalizeEmploymentForm(raw: string | undefined | null): string {
    if (!raw) return '';
    return EMPLOYMENT_FORM[raw] ?? EMPLOYMENT_FORM[raw.trim()] ?? '';
}

/**
 * Resolve employment form for the SearchForm from a stored vacancy URL.
 * Prefers Magritte `employment_form` / `label=internship`, falls back to legacy `employment`.
 */
export function readEmploymentFormFromUrl(vacancyUrl: string | undefined): string {
    if (!vacancyUrl) return '';
    try {
        const params = new URL(vacancyUrl).searchParams;
        if (params.get('label') === 'internship' || params.get('internship') === 'internship') {
            return 'internship';
        }
        const modern = params.get('employment_form');
        if (modern) return normalizeEmploymentForm(modern) || modern;
        return normalizeEmploymentForm(params.get('employment'));
    } catch {
        return '';
    }
}

/** Resolve work_format from URL or legacy DB `schedule` column. */
export function resolveWorkFormat(vacancyUrl: string | undefined, dbSchedule?: string | null): string {
    if (vacancyUrl) {
        try {
            const fromUrl = new URL(vacancyUrl).searchParams.get('work_format');
            if (fromUrl) return normalizeWorkFormat(fromUrl) || fromUrl;
            const legacySchedule = new URL(vacancyUrl).searchParams.get('schedule');
            if (legacySchedule) return normalizeWorkFormat(legacySchedule);
        } catch {
            // fall through
        }
    }
    return normalizeWorkFormat(dbSchedule) || '';
}
