import { resumeConfig } from '../config/resumeConfig';
import { getResumeSectionEndpoint, getResumeSectionFields, listResumeSections } from './resumeConfig.utils';

describe('resumeConfig.utils', () => {
    it('lists the four resume stack sections', () => {
        expect(listResumeSections()).toEqual(['resume', 'contacts', 'skills', 'workExperience']);
    });

    it('returns api endpoints from resumeConfig', () => {
        expect(getResumeSectionEndpoint('resume')).toBe('/resume');
        expect(getResumeSectionEndpoint('contacts')).toBe('/contacts');
        expect(getResumeSectionEndpoint('skills')).toBe('/skills');
        expect(getResumeSectionEndpoint('workExperience')).toBe('/work_experience');
    });

    it('exposes field labels for each section', () => {
        for (const key of listResumeSections()) {
            const fields = getResumeSectionFields(key);
            expect(Object.keys(fields).length).toBeGreaterThan(0);
            expect(fields).toEqual(resumeConfig[key].fields);
        }
    });
});
