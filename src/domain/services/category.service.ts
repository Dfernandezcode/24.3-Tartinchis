import { type NextFunction, type Request, type Response } from "express";
import { categoryOdm } from "../odm/category.odm";

const getAllCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const page = req.query.page as any;
    const limit = req.query.limit as any;

    const category = await categoryOdm.getAllCategory(page, limit);

    const totalElements = await categoryOdm.getCategoryCount();

    const response = {
      pagination: {
        totalItems: totalElements,
        totalPages: Math.ceil(totalElements / limit),
        currentPage: page,
      },
      data: category,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const getCategoryByName = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const name = req.params.name;

  try {
    const category = await categoryOdm.getCategoryByName(name);
    if (category?.length) {
      res.json(category);
    } else {
      res.status(404).json([]);
    }
  } catch (error) {
    next(error);
  }
};

const getCategoryById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.params.id;
    const category = await categoryOdm.getCategoryById(id);
    console.log(category, id)
    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ error: "Category not found" });
    }
  } catch (error) {
    next(error);
  }
};

const createCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const createdCategory = await categoryOdm.createCategory(req.body);
    res.status(201).json(createdCategory);
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.params.id;
    const categoryDeleted = await categoryOdm.deleteCategory(id);
    if (categoryDeleted) {
      res.json(categoryDeleted);
    } else {
      res.status(404).json({ error: "Category was not found" });
    }
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.params.id;
    const categoryUpdated = await categoryOdm.updateCategory(id, req.body);
    if (categoryUpdated) {
      res.json(categoryUpdated);
    } else {
      res.status(404).json({ error: "Category was not found" });
    }
  } catch (error) {
    next(error);
  }
};

export const categoryService = {
  getAllCategory,
  getCategoryByName,
  getCategoryById,
  createCategory,
  deleteCategory,
  updateCategory,
};
