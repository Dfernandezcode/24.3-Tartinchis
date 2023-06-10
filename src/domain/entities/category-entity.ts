/**
 * @swagger
 * components:
 *  schemas:
 *    Category:
 *      type: object
 *      required:
 *        - name
 *      properties:
 *        name:
 *          type: string
 *          description: Name of the category (sample Favoritas de Fran)
 *        cakes:
 *          type: string
 *          description: types of cakes for this category
 *        description:
 *          type: string
 *          description: description of this category (sample Reinventamos la clasíca tarta de mousse de chocolatecon galleta)
 */

import mongoose, { type ObjectId } from "mongoose";
import { Cake } from "./cake-entity";
const Schema = mongoose.Schema;

export interface ICategory {
  name: string;
  cakes: Array<ObjectId>;
  description: string;
}

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      minLength: [3, "Hijo mío... dame algo más de detalle, al menos 3 letras para el nombre"],
      maxLength: 20,
      trim: true,
    },
    cakes: {
      type: [mongoose.Schema.Types.ObjectId],
      required: true,
      ref: Cake,
    },
    description: {
      type: String,
      required: true,
      minLength: [10, "Hijo mío... dame algo más de detalle, al menos 10 letras para la descripción"],
      maxLength: 250,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Category = mongoose.model<ICategory>("Category", categorySchema);
