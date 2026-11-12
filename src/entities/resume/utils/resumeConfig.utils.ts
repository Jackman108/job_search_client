import type { ConfigItem } from '@type';
import { resumeConfig } from '../config/resumeConfig';

export type ResumeSectionKey = keyof typeof resumeConfig;

/** Stable section keys for resume / contacts / skills / workExperience. */
export function listResumeSections(): ResumeSectionKey[] {
    return Object.keys(resumeConfig) as ResumeSectionKey[];
}

/** API path for a resume stack section. */
export function getResumeSectionEndpoint(section: ResumeSectionKey): string {
    return resumeConfig[section].apiEndpoint;
}

/** Field label map for a section (empty object if unknown). */
export function getResumeSectionFields(section: ResumeSectionKey): ConfigItem['fields'] {
    return resumeConfig[section].fields;
}
