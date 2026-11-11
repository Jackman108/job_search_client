/** True when every listed field has a non-empty trimmed value. */
export const hasFilledRequiredFields = (values: object, keys: readonly string[]): boolean => {
    const record = values as Record<string, unknown>;
    return keys.every((key) => Boolean(String(record[key] ?? '').trim()));
};
