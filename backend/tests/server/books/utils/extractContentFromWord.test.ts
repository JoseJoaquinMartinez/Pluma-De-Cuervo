import { extractContentFromWord } from "../../../../src/server/books/utils/extractContentFromWord";
import mammoth from "mammoth";
import { describe, jest, it, expect, beforeEach } from "@jest/globals";

jest.mock("mammoth");

const MOCKWORDFILE = {
  value: "<p>Test paragraph 1</p><p>Test paragraph 2</p>",
};
const MOCKHTML = {
  value: `
<p>Paragraph 1</p>
<table>
    <tr><td>Row 1, Cell 1</td><td>Row 1, Cell 2</td></tr>
    <tr><td>Row 2, Cell 2</td><td>Row 2, Cell 2</td></tr>
</table>
<p>Paragraph 2</p>`,
};

describe("extractContentFromWord util tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should return the content split on paragraphs when the document has no tables", async () => {
    (mammoth.convertToHtml as jest.Mock).mockReturnValue(MOCKWORDFILE);

    const repsonse = await extractContentFromWord("test.docx");
    expect(repsonse).toEqual([
      { type: "paragraph", value: "<p>Test paragraph 1</p>" },
      { type: "paragraph", value: "<p>Test paragraph 2</p>" },
    ]);
  });

  it("Should return the array with tables", async () => {
    (mammoth.convertToHtml as jest.Mock).mockReturnValue(MOCKHTML);
    const response = await extractContentFromWord("test.docx");

    expect(response).toEqual([
      { type: "paragraph", value: "<p>Paragraph 1</p>" },
      {
        type: "table",
        value: `<table>
    <tr><td>Row 1, Cell 1</td><td>Row 1, Cell 2</td></tr>
    <tr><td>Row 2, Cell 2</td><td>Row 2, Cell 2</td></tr>
</table>`,
      },
      { type: "paragraph", value: "<p>Paragraph 2</p>" },
    ]);
  });
});
