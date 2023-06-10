import mongoose from "mongoose";
const Schema = mongoose.Schema;

export interface ICake {
  name: string;
  ingredients: [];
  allergens: [];
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
