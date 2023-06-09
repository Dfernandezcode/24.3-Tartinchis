import { Category, ICategory } from "../entities/category";
import { Document } from "mongoose";

const getAllCategory = async (page: number, limit: number): Promise<Document<ICategory>[]> => {
  return await Category.find()
    .limit(limit)
    .skip((page - 1) * limit)
    .populate(["cake"]);
};

const getCategoryCount = async (): Promise<number> => {
  return await Category.countDocuments();
};

const getCategoryById = async (id: string): Promise<Document<ICategory> | null> => {
  return await Category.findById(id).populate(["cake"]);
};

const createCategory = async (categoryData: any): Promise<Document<ICategory>> => {
  const category = new Category(categoryData);
  const document: Document<ICategory> = (await category.save()) as any;

  return document;
};

const deleteCategory = async (id: string): Promise<Document<ICategory> | null> => {
  return await Category.findByIdAndDelete(id);
};

const updateCategory = async (id: string, categoryData: any): Promise<Document<ICategory> | null> => {
  return await Category.findByIdAndUpdate(id, categoryData, { new: true, runValidators: true });
};

export const categoryOdm = {
  getAllCategory,
  getCategoryCount,
  getCategoryById,
  createCategory,
  deleteCategory,
  updateCategory
};