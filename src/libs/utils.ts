export const capitalizeFirstLetter = (word?: string): string | undefined => {
  if (!word) {
    return word;
  }
  return word.charAt(0).toUpperCase() + word.slice(1);
};

export const filterByLanguage = <T extends { language: { name: string } }>(
  items: T[] | undefined,
  language: string = "en",
) => {
  return items?.find((item) => item.language.name === language);
};
