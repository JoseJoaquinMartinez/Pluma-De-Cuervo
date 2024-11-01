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

jest.mock("@prisma/client", () => ({
  PrismaClient: jest.fn(() => prismaMock),
}));

const blogId = 1;
const ENDPOINT = `/blog/put-existing-blog/${blogId}`;
const MOCKTITLE = "FANCY TEST TITLE";
const MOCKimagen = "FANCY TEST imagen";
const MOCKBLOGTEXT = "FANCY TEST BLOGTEXT";

const MOCKDATATOUPDATE = {
  title: MOCKTITLE,
  imagenn: MOCKimagen,
  blogText: MOCKBLOGTEXT,
  createdAt: expect.any(Date),
};
const MOCKDATATOSEND = {
  title: MOCKTITLE,
  imagen: MOCKimagen,
  blogText: MOCKBLOGTEXT,
};
const MOCKUPDATEDBLOG = {
  id: blogId,
  title: MOCKTITLE,
  imagenn: MOCKimagen,
  blogText: MOCKBLOGTEXT,
  createdAt: "2024-10-03T18:31:58.251Z",
};

describe("PUT PutExistingBlogPost", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    prismaMock.$disconnect();
  });
  it("Shoudl update the information of the blog", async () => {
    (prismaMock.blog.update as jest.Mock).mockReturnValue(MOCKUPDATEDBLOG);
    const response = await request(app).put(ENDPOINT).send(MOCKDATATOSEND);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      updatedBlog: MOCKUPDATEDBLOG,
      message: "Entrada de blog actualizada",
    });
    expect(prismaMock.blog.update).toHaveBeenCalledWith({
      where: { id: blogId },
      data: expect.objectContaining(MOCKDATATOUPDATE),
    });
  });
  it("Should return status 404 when the blog post is not found", async () => {
    (prismaMock.blog.update as jest.Mock).mockReturnValue(null);
    const response = await request(app).put(ENDPOINT).send(MOCKDATATOSEND);
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "Entrada de blog no encontrada" });

    expect(prismaMock.blog.update).toHaveBeenCalledWith({
      where: { id: blogId },
      data: expect.objectContaining(MOCKDATATOUPDATE),
    });
  });
  it("Should return status 500 when an unexpected error happens during blog update", async () => {
    prismaMock.blog.update.mockRejectedValue(new Error("Unexpected error"));
    const response = await request(app).put(ENDPOINT).send(MOCKDATATOSEND);
    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      error: `Error inesperado actualizando el blog Unexpected error`,
    });
    expect(prismaMock.blog.update).toHaveBeenCalledWith({
      where: { id: blogId },
      data: expect.objectContaining(MOCKDATATOUPDATE),
    });
  });
  it("Should call prisma.$disconnect after processing", async () => {
    (prismaMock.blog.update as jest.Mock).mockReturnValue(MOCKUPDATEDBLOG);
    const response = await request(app).put(ENDPOINT).send(MOCKDATATOSEND);
    expect(prismaMock.$disconnect).toHaveBeenCalled();
  });
});
