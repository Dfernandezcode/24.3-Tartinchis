/**
 * @swagger
 * components:
 *  schemas:
 *    Order:
 *      type: object
 *      required:
 *        - status
 *        - user
 *        - date
 *        - cake
 *      properties:
 *        id:
 *          type: string
 *          description: Order auto-generated id
 *        user:
 *          type: string
 *          description: User making the order
 *        status:
 *          type: string
 *          description: Status of the order
 *        date:
 *          type: date
 *          description: When the order was done
 *        cake:
 *          type: string
 *          description: Cakes in the cart or already ordered
 *        address:
 *          type: string
 *          description: Address of the user that made the order
 */

import mongoose, { type ObjectId } from "mongoose";
const Schema = mongoose.Schema;

const statusValues = ["PENDING", "PAID", "SENT", "DELIVERED"];

export interface IOrder {
  status: string;
  user: ObjectId;
  date: Date;
  cake: ObjectId;
  address?: string;
}

// Creacion de esquema de Order
const orderSchema = new Schema<IOrder>(
  {
    status: {
      type: String,
      enum: statusValues,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    cake: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cake",
      required: true,
    },
    address: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Order = mongoose.model<IOrder>("Order", orderSchema);
