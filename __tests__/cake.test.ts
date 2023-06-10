import { mongoConnect } from "../src/domain/repositories/mongo-repository";
import mongoose from "mongoose";
import { appInstance } from "../src/index";
import request from "supertest";
import { ICake } from "../src/domain/entities/cake-entity";
import { app } from "../src/server";

describe("Cake Controller", () => {
  const cakeMock: ICake = {
    name: "Tarta de Frutas",
    ingredients: ["Harina", "Huevo", "Frutas variadas", "Azúcar"],
    allergens: ["Gluten"],
    description: "Una deliciosa tarta de frutas frescas con una base de masa crujiente. Ideal para los amantes de las frutas y los postres ligeros.",
    price: 15.99,
  };

  let cakeId: string;

  beforeAll(async () => {
    await mongoConnect();
  });
  afterAll(async () => {
    await mongoose.connection.close();
    appInstance.close();
  });

  it("Simple test to check jest in working", () => {
    expect(true).toBeTruthy();
  });

  it("Simple test to check jest in working", () => {
    const miTexto = "Hola chicos";
    expect(miTexto.length).toBe(11);
  });

  it("POST /cake - this should create a cake", async () => {
    const response = await request(app).post("/cake").send(cakeMock).expect(201);

    expect(response.body).toHaveProperty("_id");
    expect(response.body.name).toBe(cakeMock.name);

    cakeId = response.body._id;
  });
  it("GET /cake - returns a list with the users", async () => {
    const response = await request(app).get("/cake")

    expect(response.body.data).toBeDefined();
    expect(response.body.data.length).toBe(5);
    expect(response.body.data[0].name).toBe(cakeMock.name);
    expect(response.body.totalItems).toBe(5);
    expect(response.body.totalPages).toBe(1);
    expect(response.body.currentPage).toBe(1);
  });
  it("PUT /user/id - Modify user when token is sent", async () => {
    const updatedData = {
      name: "Tarta de varias frutas",
    };

    const response = await request(app).put(`/cake/${cakeId}`)

    expect(response.body.name).toBe(updatedData.name);
    expect(response.body.name).toBe(cakeMock.name);
    expect(response.body._id).toBe(cakeId);
  });
  it("DELETE /user/id -  Deletes user when token is OK", async () => {
    const response = await request(app).delete(`/cake/${cakeId}`)

    expect(response.body._id).toBe(cakeId);
  });
});
