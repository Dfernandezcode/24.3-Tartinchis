import { Order, IOrder } from "../entities/order-entity";
import { Document } from "mongoose";

const getAllOrders = async (page: number, limit: number): Promise<Document<IOrder>[]> => {
  return await Order.find()
    .limit(limit)
    .skip((page - 1) * limit)
    .populate(["cake"]);
};

const getOrdersCount = async (): Promise<number> => {
  return await Order.countDocuments();
};

const getOrderById = async (id: string): Promise<Document<IOrder> | null> => {
  return await Order.findById(id)
    .populate(["cake"]);
};

const createOrder = async (orderData: any): Promise<Document<IOrder>> => {
  const order = new Order(orderData);
  const document: Document<IOrder> = (await order.save()) as any;

  return document;
};

const deleteOrder = async (id: string): Promise<Document<IOrder> | null> => {
  return await Order.findByIdAndDelete(id);
};

const updateOrder = async (id: string, orderData: any): Promise<Document<IOrder> | null> => {
  return await Order.findByIdAndUpdate(id, orderData, { new: true, runValidators: true });
};

export const carOdm = {
  getAllOrders,
  getOrdersCount,
  getOrderById,
  createOrder,
  deleteOrder,
  updateOrder
};
