import mammoth from "mammoth";
import * as cheerio from "cheerio";

interface ContentItem {
  type: "paragraph" | "table" | "unordered-list" | "ordered-list";
  value: string;
}

export async function extractContentFromWord(
  filePath: string
): Promise<ContentItem[]> {
  const convertedTextToHTML = await mammoth.convertToHtml({ path: filePath });
  const html: string = convertedTextToHTML.value;
  const content: ContentItem[] = [];

  const $ = cheerio.load(html);

  $("table, ul, ol, p:not(table p)").each((i, elem) => {
    const tagName = elem.tagName ? elem.tagName.toLowerCase() : "";
    let type: ContentItem["type"] = "paragraph";

    if (tagName === "table") {
      type = "table";
    } else if (tagName === "ul") {
      type = "unordered-list";
    } else if (tagName === "ol") {
      type = "ordered-list";
    } else if (tagName === "p") {
      type = "paragraph";
    }

    let value = "";
    if (tagName === "ul" || tagName === "ol") {
      value = $(elem).html() || "";
    } else {
      value = $.html(elem);
    }

    content.push({ type, value });
  });

  return content;
}
