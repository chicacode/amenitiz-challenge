export const getCountryCode = (url: string | undefined): string | null => {
    if (!url) return null;
    const segments = url.split('/');
    return segments[segments.length - 1]?.toUpperCase() || null;
};

export const getFlagEmoji = (countryCode: string | null) => {
    if (!countryCode || countryCode.length !== 2) return '';
    return countryCode
        .toUpperCase()
        .replace(/./g, char => String.fromCodePoint(127397 + char.charCodeAt(0)));
};