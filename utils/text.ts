export const stripHtml = (html: string | undefined | null): string => {
  if (!html) return '';
  // Basic HTML tag stripping
  return html.replace(/<[^>]*>?/gm, '');
};
