import {
  jest,
  describe,
  it,
  beforeEach,
  afterAll,
  expect,
} from "@jest/globals";
import request from "supertest";
import { prismaMock } from "../../../../singleton";
import app from "../../../../src/app";
import fs from "fs";
import path from "path";

import { fileContentManagement } from "../../../../src/server/books/utils/fileContentManagement";
import { extractContentFromTextArea } from "../../../../src/server/books/utils/extractContentFromTextArea";

jest.mock("@prisma/client", () => ({
  PrismaClient: jest.fn(() => prismaMock),
}));

jest.mock("../../../../src/server/books/utils/fileContentManagement");

const ENDPOINT = "/book/modify-chapter/1";
const DOCXRESOLVEDVALUE = [
  { type: "paragraph", value: "<p>Test Paragraph 1</p>" },
  { type: "paragraph", value: "<p>Test Paragraph 2</p>" },
];

const filePath = path.join(__dirname, "test.docx");

describe("PUT modifyExistingChapter", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    if (filePath) {
      fs.unlinkSync(filePath);
    }
    prismaMock.$disconnect();
  });

  it("Should update the chapter and the paragraph when the file is provided", async () => {
    const newTitle = "SuperMegaDuperTitle";
    const MOCKCHAPTER = {
      id: 1,
      title: newTitle,
      image: "NULL",
      chapterNumber: 1,
      bookId: 1,
    };
    fs.writeFileSync(filePath, "Test content");

    (fileContentManagement as jest.Mock).mockReturnValue(DOCXRESOLVEDVALUE);
    (prismaMock.chapter.update as jest.Mock).mockReturnValue(MOCKCHAPTER);
    const response = await request(app)
      .put(ENDPOINT)
      .field("title", newTitle)
      .attach("file", filePath);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Capítulo actualizado");

    expect(fileContentManagement).toHaveBeenCalled();
  });
  it("Should return status 400 if no changes were made", async () => {
    const response = await request(app).put(ENDPOINT);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: "No se realizaron cambios" });
  });
  it("Should return status 500 if an unexpected error happens", async () => {
    prismaMock.chapter.findUnique.mockRejectedValue(
      new Error("Unexpected Error")
    );
    const response = await request(app).put(ENDPOINT).attach("file", filePath);
    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      error: `Error inesperado Unexpected Error`,
    });
  });
  it("Should call prisma.$disconnect after processing", async () => {
    const response = await request(app).put(ENDPOINT);
    expect(prismaMock.$disconnect).toHaveBeenCalled();
  });
});
