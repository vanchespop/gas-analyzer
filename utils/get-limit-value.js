export const getLimitValue = ({title, value}) => {
    const storedLimitValue = typeof window !== 'undefined' && !Number.isNaN(+localStorage.getItem(title))
        ? +localStorage.getItem(title) : undefined;
    return storedLimitValue ? storedLimitValue : value;
}
