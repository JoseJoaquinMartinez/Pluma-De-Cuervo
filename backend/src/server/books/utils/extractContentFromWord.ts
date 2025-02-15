import mammoth from "mammoth";

export async function extractContentFromWord(filePath: string) {
  const convertedTextToHTML = await mammoth.convertToHtml({ path: filePath });
  const content: { type: string; value: string }[] = [];

  const regex = /<table[\s\S]*?<\/table>|<p[\s\S]*?<\/p>/gi;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(convertedTextToHTML.value)) !== null) {
    if (match[0].startsWith("<table")) {
      content.push({ type: "table", value: match[0] });
    } else if (match[0].startsWith("<p")) {
      content.push({ type: "paragraph", value: match[0] });
    }
  }

  return content;
}
