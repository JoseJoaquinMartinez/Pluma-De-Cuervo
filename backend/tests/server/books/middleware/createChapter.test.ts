import { expect, jest, describe, it, beforeEach } from "@jest/globals";
import { prismaMock } from "../../../../singleton";
import app from "../../../../src/app";
import request from "supertest";

jest.mock("@prisma/client", () => ({
  PrismaClient: jest.fn(() => prismaMock),
}));
jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(),
}));

const ENDPOINT = "/book/upload-chapter";

const MOCKTITLE = "random funny title";
const MOCKCHAPTERNUMBER = 1;
const MOCKBOOKID = 1;

const MOCKCREATECHAPTER = prismaMock.chapter.create as jest.Mock;

const MOCKCHAPTER = {
  id: 1,
  title: MOCKTITLE,
  chapterNumber: MOCKCHAPTERNUMBER,
  image: null as unknown as string,
  bookId: MOCKBOOKID,
};
const OPTIONS = {
  title: MOCKTITLE,
  chapterNumber: MOCKCHAPTERNUMBER,
  image: null as unknown as string,
  bookId: MOCKBOOKID,
};

describe("Middleware createChapter", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should create a new chapter", async () => {
    MOCKCREATECHAPTER.mockReturnValue(MOCKCHAPTER);

    const response = await request(app).post(ENDPOINT).send(OPTIONS);

    expect(response.status).toBe(200);
    expect(MOCKCREATECHAPTER).toHaveBeenCalledWith({
      data: {
        title: MOCKTITLE,
        chapterNumber: MOCKCHAPTERNUMBER,
        image: null,
        bookId: MOCKBOOKID,
      },
    });
  });
  it("Should return status 500 if chapter creating fails", async () => {
    prismaMock.chapter.create.mockRejectedValue(new Error("Unexpected Error"));

    const response = await request(app).post(ENDPOINT).send(OPTIONS);
    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      error: `Error creando el capítulo Error: Unexpected Error`,
    });
  });
});
