/**
 * @swagger
 * tags:
 *   name: Cake
 *   description: The cake Api
 */

import express from "express";
import { cakeService } from "../domain/services/cake.service";

export const cakeRouter = express.Router()

/**
 * @swagger
  /cakes:
    get:
      summary: Get all cakes
      produces:
        - application/json
      responses:
        200:
          description: Successful operation
      tags:
        - Cakes
 */

cakeRouter.get("/", cakeService.getAllCakes)

/**
 * @swagger
  /cakes/{id}:
    get:
      summary: Get a cake by ID
      produces:
        - application/json
      parameters:
        - name: id
          in: path
          description: ID of the cake
          required: true
          type: string
      responses:
        200:
          description: Successful operation
        404:
          description: Cake not found
      tags:
        - Cakes
 */

cakeRouter.get("/:id", cakeService.getCakebyId)

/**
 * @swagger
  /cakes/name/{name}:
    get:
      summary: Get a cake by name
      produces:
        - application/json
      parameters:
        - name: name
          in: path
          description: Name of the cake
          required: true
          type: string
      responses:
        200:
          description: Successful operation
        404:
          description: Cake not found
      tags:
        - Cakes
 */

cakeRouter.get("/name/:name", cakeService.getCakebyName)

/**
 * @swagger
  /cakes:
    post:
      summary: Create a new cake
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - in: body
          name: cake
          description: Cake object
          required: true
          schema:
            $ref: "#/definitions/CakeInput"
      responses:
        200:
          description: Successful operation
        400:
          description: Invalid input
      tags:
        - Cakes
 */

cakeRouter.post("/", cakeService.createCake)

/**
 * @swagger
  /cakes/{id}:
    delete:
      summary: Delete a cake by ID
      parameters:
        - name: id
          in: path
          description: ID of the cake
          required: true
          type: string
      responses:
        200:
          description: Successful operation
        404:
          description: Cake not found
      tags:
        - Cakes
 */

cakeRouter.delete("/:id", cakeService.deleteCake)

/**
 * @swagger
  /cakes/{id}:
    put:
      summary: Update a cake by ID
      consumes:
        - application/json
      parameters:
        - name: id
          in: path
          description: ID of the cake
          required: true
          type: string
        - in: body
          name: cake
          description: Cake object
          required: true
          schema:
            $ref: "#/definitions/CakeInput"
      responses:
        200:
          description: Successful operation
        400:
          description: Invalid input
        404:
          description: Cake not found
      tags:
        - Cakes
 */

cakeRouter.put("/:id", cakeService.updateCake)
