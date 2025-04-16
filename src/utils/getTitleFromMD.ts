/**
 * Extracts the first Markdown title (starting with #) from a given string.
 * Uses a regular expression to identify the title and returns the text following the # symbol.
 * If no title is found, it returns a default string "Sin título" (No title).
 *
 * @param {string} title - The input text containing Markdown, from which to extract the title.
 * @returns {string} The extracted title text, trimmed of extra spaces, or "Sin título" if no title is found.
 * @example
 * getTitleFromMD("# My Title\nSome content");
 * Returns: "My Title"
 * @example
 * getTitleFromMD("No title here");
 *  Returns: "Sin título"
 */
export const getTitleFromMD = (title: string) => {
  // We use a regular expression to find the first title (# Title)
  const match = title.match(/^#\s(.+)/m);
  // If a title is found, we return the text; if not, we return an empty string
  return match ? match[1].trim() : "Sin título";
};