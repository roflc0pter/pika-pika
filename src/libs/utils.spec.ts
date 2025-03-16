import { capitalizeFirstLetter, filterByLanguage } from "./utils";

describe("capitalizeFirstLetter", () => {
  it("should capitalize the first letter of a word", () => {
    expect(capitalizeFirstLetter("hello")).toBe("Hello");
  });

  it("should return an empty string if an empty string is provided", () => {
    expect(capitalizeFirstLetter("")).toBe("");
  });

  it("should return undefined if no input is given", () => {
    expect(capitalizeFirstLetter()).toBeUndefined();
  });

  it("should return the same string if it starts with a non-letter character", () => {
    expect(capitalizeFirstLetter("123abc")).toBe("123abc");
  });

  it("should handle single character input", () => {
    expect(capitalizeFirstLetter("a")).toBe("A");
  });
});

describe("filterByLanguage", () => {
  const items = [
    { language: { name: "en" }, value: "English" },
    { language: { name: "de" }, value: "Deutsch" },
  ];

  it("should return the item with the matching language", () => {
    expect(filterByLanguage(items, "en")).toEqual({
      language: { name: "en" },
      value: "English",
    });
  });

  it("should return undefined if no items are provided", () => {
    expect(filterByLanguage(undefined, "en")).toBeUndefined();
  });

  it("should return undefined if no matching language is found", () => {
    expect(filterByLanguage(items, "fr")).toBeUndefined();
  });

  it("should default to 'en' if no language is specified", () => {
    expect(filterByLanguage(items)).toEqual({
      language: { name: "en" },
      value: "English",
    });
  });

  it("should return undefined if the items array is empty", () => {
    expect(filterByLanguage([], "en")).toBeUndefined();
  });
});
