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
import { getBlogsResponse } from "../../../../src/types";

jest.mock("@prisma/client", () => ({
  PrismaClient: jest.fn(() => prismaMock),
}));

const ENDPOINT = "/blog/get-all-blog-posts";
const MOCKTITLE = "New Blog Catchy Title";
const MOCKIMAGE = "FancyIamge.jpg";
const MOCKBLOGPOST = {
  title: MOCKTITLE,
  imagen: MOCKIMAGE,
  createdAt: "2024-10-03T17:58:03.172Z",
};
const MOCKRESPONSE = [MOCKBLOGPOST, MOCKBLOGPOST];

const MOCKEMPTYRESPONSE: getBlogsResponse[] = [];

describe("GET getAllBlogPosts", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    prismaMock.$disconnect();
  });
  it("Should return an array with all the existing blogs", async () => {
    (prismaMock.blog.findMany as jest.Mock).mockReturnValue(MOCKRESPONSE);
    const response = await request(app).get(ENDPOINT);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      allExistingBlogs: MOCKRESPONSE,
      message: "Blogs encontrados",
    });

    expect(prismaMock.blog.findMany).toHaveBeenCalled();
  });
  it("Should return an empty array when there are no blog posts yet", async () => {
    (prismaMock.blog.findMany as jest.Mock).mockReturnValue(MOCKEMPTYRESPONSE);
    const response = await request(app).get(ENDPOINT);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      allExistingBlogs: MOCKEMPTYRESPONSE,
      message: "Blogs encontrados",
    });
  });
  it("Should return status 500 when an unexpected error happens", async () => {
    prismaMock.blog.findMany.mockRejectedValue(new Error("Unexpected error"));
    const response = await request(app).get(ENDPOINT);
    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      error: `Error inesperado recopilando los blogs Unexpected error`,
    });
    expect(prismaMock.blog.findMany).toHaveBeenCalled();
  });
  it("Should call prisma.$disconnect after processing", async () => {
    const response = await request(app).get(ENDPOINT);
    expect(prismaMock.$disconnect).toHaveBeenCalled();
  });
});
