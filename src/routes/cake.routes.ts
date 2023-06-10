import express from "express";
import { cakeService } from "../domain/services/cake.service";

export const cakeRouter = express.Router()

cakeRouter.get("/", cakeService.getAllCakes)

cakeRouter.get("/:id", cakeService.getCakebyId)

cakeRouter.get("/name/:name", cakeService.getCakebyName)

cakeRouter.post("/", cakeService.createCake)

cakeRouter.delete("/:id", cakeService.deleteCake)

cakeRouter.put("/:id", cakeService.updateCake)
