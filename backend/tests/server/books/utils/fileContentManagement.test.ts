import { fileContentManagement } from "../../../../src/server/books/utils/fileContentManagement";
import { extractContentFromPDF } from "../../../../src/server/books/utils/extractContentFromPDF";
import { extractContentFromWord } from "../../../../src/server/books/utils/extractContentFromWord";
import { expect, jest, describe, it, beforeEach } from "@jest/globals";

jest.mock("../../../../src/server/books/utils/extractContentFromPDF");
jest.mock("../../../../src/server/books/utils/extractContentFromWord");
describe("fileContentManagement tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  /* it("Should call extractContentFromPDF when a pdf file is sent", async () => {
    (extractContentFromPDF as jest.Mock).mockReturnValue([
      { type: "paragraph", value: "Test paragraph" },
    ]);
    const response = await fileContentManagement("test.pdf", "application/pdf");
    expect(response).toEqual([{ type: "paragraph", value: "Test paragraph" }]);

    expect(extractContentFromPDF).toHaveBeenCalledWith("test.pdf");
  }); */

  it("Should call extractContentFromWord when a .docx is sent", async () => {
    (extractContentFromWord as jest.Mock).mockReturnValue([
      { type: "paragraph", value: "Test paragraph" },
    ]);

    const response = await fileContentManagement(
      "test.docx",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );
    expect(extractContentFromWord).toHaveBeenCalledWith("test.docx");
  });

  it("Should return an error when the format is not supported", async () => {
    await expect(
      fileContentManagement("test.txt", "text/plain")
    ).rejects.toThrow("formato de archivo no soportado");
  });
});
