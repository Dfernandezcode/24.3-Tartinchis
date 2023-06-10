/**
 * @swagger
 * components:
 *  schemas:
 *    Category:
 *      type: object
 *      required:
 *        - name
 *     properties:
      name:
        type: string
        minLength: 3
        maxLength: 50
        example: Muerte por chocolate
      ingredients:
        type: array
        items:
          type: string
        example: ["Harina", "Huevo", "Chocolate blanco", "Chocolate negro", "Leche"]
      allergens:
        type: array
        items:
          type: string
        example: ["Gluten", "Leche"]
      description:
        type: string
        maxLength: 500
        example: Tarta con tres tipos de chocolate
      price:
        type: number
        example: 25
    required:
      - name
      - ingredients
      - allergens
      - description
      - price
 */

import mongoose from "mongoose";
const Schema = mongoose.Schema;

export interface ICake {
  name: string;
  ingredients: string [];
  allergens: string [];
  description: string;
  price: number;
}

const cakeSchema = new Schema<ICake>({
  name: {
    type: String,
    required: true,
    minLength: [3, "The name must contain minium 3 characters"],
    maxLength: [50, "The name must contain maximun 50 characters"],
    trim: true,
  },
  ingredients: {
    type: [],
    required: true,
    trim: true
  },
  allergens: {
    type: [],
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    maxLength: [500, "The name must contain maximun 200 characters"],
    trim: true
  },
  price: {
    type: Number,
    required: true,
    trim: true
  }
});

export const Cake = mongoose.model<ICake>("Cake", cakeSchema, "cakes")
