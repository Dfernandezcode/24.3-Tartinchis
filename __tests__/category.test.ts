import { mongoConnect } from "../src/domain/repositories/mongo-repository";
import mongoose from "mongoose";
import { appInstance } from "../src/index";
import request from "supertest";
import { ICategory, Category } from "../src/domain/entities/category-entity";
import { app } from "../src/server";

describe("Category controller", () => {
  const categoryMock: ICategory = {
    name: "Tartas de Juan",
    cakes: [],
    description: "Estas son las tartas de juan, sabrosas y golosas",
  };

  let categoryId: string;

  beforeAll(async () => {
    await mongoConnect();
    await Category.collection.drop();
    console.log("Eliminados todos las categorias");
  });

  afterAll(async () => {
    await mongoose.connection.close();
    appInstance.close();
  });

  it("POST /category - this should create a category", async () => {
    const response = await request(app).post("/category").send(categoryMock).expect(201);

    expect(response.body).toHaveProperty("_id");
    expect(response.body.name).toBe(categoryMock.name);

    categoryId = response.body._id;
  });

  it("GET /category - returns a list with the categories", async () => {
    const response = await request(app).get("/category?page=1&limit=10").expect(200);

    expect(response.body.data).toBeDefined();
    expect(response.body.data.length).toBe(1);
    expect(response.body.data[0].name).toBe(categoryMock.name);
    expect(response.body.pagination.totalItems).toBe(1);
    expect(response.body.pagination.totalPages).toBe(1);
    expect(response.body.pagination.currentPage).toBe("1");
  });

  it("PUT /category/id - Modify category", async () => {
    const updatedData = {
      name: "tartas locas",
    };

    const response = await request(app).put(`/category/${categoryId}`).send(updatedData).expect(200);

    expect(response.body.name).toBe(updatedData.name);
    expect(response.body._id).toBe(categoryId);
  });

  it("DELETE /category/id -  Deletes category", async () => {
    const response = await request(app).delete(`/category/${categoryId}`).expect(200);

    expect(response.body._id).toBe(categoryId);
  });
});
