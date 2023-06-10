import { Cake, ICake } from "../entities/cake-entity";
import { Document } from "mongoose";

const getAllCakes = async (page: number, limit: number): Promise<any> => {
  return await Cake.find()
    .limit(limit)
    .skip((page - 1) * limit);
};

const getCakeCount = async (): Promise<number> => {
  return await Cake.countDocuments();
};

const getCakebyId = async (id: string): Promise<Document<ICake> | null> => {
  return await Cake.findById(id);
};

const getCakebyName = async (name: string): Promise<Document<ICake>[]> => {
  return await Cake.find({ name: new RegExp("^" + name.toLowerCase(), "i") });
};

const createCake = async (cakeData: any): Promise<Document<ICake>> => {
  const cake = new Cake(cakeData);
  const document: Document<ICake> = (await cake.save()) as any;

  return document;
};

const deleteCake = async (id: string): Promise<Document<ICake> | null> => {
  return await Cake.findByIdAndDelete(id);
};

const updateCake = async (id: string, cakeData: any): Promise<Document<ICake> | null> => {
  return await Cake.findByIdAndUpdate(id, cakeData);
};

export const cakeOdm = {
  getAllCakes,
  getCakeCount,
  getCakebyId,
  getCakebyName,
  createCake,
  deleteCake,
  updateCake,
};
