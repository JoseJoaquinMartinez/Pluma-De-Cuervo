import { extractContentFromTextArea } from "../../../../src/server/books/utils/extractContentFromTextArea";
import { expect, jest, describe, it, beforeEach } from "@jest/globals";

describe("extractContentFromTextArea function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should return the text area input split in paragraphs", async () => {
    const input = "Paragraph 1\nParagraph 2";

    const response = await extractContentFromTextArea(input);
    expect(response).toEqual([
      {
        type: "paragraph",
        value: "Paragraph 1",
      },
      {
        type: "paragraph",
        value: "Paragraph 2",
      },
    ]);
  });
});
