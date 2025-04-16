/**
 * Escapes special Markdown characters in a given text string.
 * Specifically, it escapes triple backticks (```) and single backticks (`) by adding backslashes.
 *
 * @param {string} text - The input text that may contain Markdown characters to be escaped.
 * @returns {string} The text with Markdown characters escaped.
 * @example
 * escapeMarkdown("This is a ```code block``` and `inline code`");
 *  Returns: "This is a \\`\\`\\`code block\\`\\`\\` and \\`inline code\\`"
 */
export const escapeMarkdown = (text: string) => {
  return text.replace(/```/g, "\\`\\`\\`").replace(/`/g, "\\`");
};