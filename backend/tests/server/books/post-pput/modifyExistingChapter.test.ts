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
    fs.writeFileSync(filePath, "Test content");

    (fileContentManagement as jest.Mock).mockReturnValue(DOCXRESOLVEDVALUE);
    (prismaMock.chapter.update as jest.Mock).mockReturnValue(true);
    const response = await request(app)
      .put(ENDPOINT)
      .field("title", newTitle)
      .attach("file", filePath);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Capítulo creado");

    expect(fileContentManagement).toHaveBeenCalledWith(filePath);
  });
});
