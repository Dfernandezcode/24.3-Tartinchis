import { type Request, type Response, type NextFunction } from "express";
import { orderOdm } from "../odm/order.odm";

export const getAllOrders = async (req: any, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (req.user.email !== "admin@gmail.com") {
      res.status(401).json({ error: "No tienes autorización para realizar esta operación" });
      return;
    }

    // Ternario que se queda con el parametro si llega
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

    const users = await orderOdm.getAllOrders(page, limit);

    // Num total de elementos
    const totalElements = await orderOdm.getOrdersCount();

    const response = {
      totalItems: totalElements,
      totalPages: Math.ceil(totalElements / limit),
      currentPage: page,
      data: users,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const getOrderById = async (req: any, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.params.id;
    const order = await orderOdm.getOrderById(id);

    if (order) {
      const temporalOrder = order.toObject();
      if (temporalOrder.user === req.user.id) {
        res.json(temporalOrder);
      } else {
        res.status(400).json({ error: "No tienes permisos para ver este pedido." })
      }
    } else {
      res.status(404).json({});
    }
  } catch (error) {
    next(error);
  }
};

export const getOrdersByStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const status = req.params.status;

  try {
    const orders = await orderOdm.getOrdersByStatus(status);
    if (orders?.length) {
      res.json(orders);
    } else {
      res.status(404).json([]);
    }
  } catch (error) {
    next(error);
  }
};

export const createOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const createdOrder = await orderOdm.createOrder(req.body);
    res.status(201).json(createdOrder);
  } catch (error) {
    next(error);
  }
};

export const deleteOrder = async (req: any, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.params.id;

    if (req.user.id !== id && req.user.email !== "admin@gmail.com") {
      res.status(401).json({ error: "No tienes autorización para realizar esta operación" });
      return;
    }

    const orderDeleted = await orderOdm.deleteOrder(id);
    if (orderDeleted) {
      res.json(orderDeleted);
    } else {
      res.status(404).json({});
    }
  } catch (error) {
    next(error);
  }
};

export const updateOrder = async (req: any, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.params.id;

    if (req.user.id !== id && req.user.email !== "admin@gmail.com") {
      res.status(401).json({ error: "No tienes autorización para realizar esta operación" });
      return;
    }

    const orderToUpdate = await orderOdm.getOrderById(id);
    if (orderToUpdate) {
      Object.assign(orderToUpdate, req.body);
      await orderToUpdate.save();
      // Quitamos pass de la respuesta
      const orderToSend: any = orderToUpdate.toObject();
      delete orderToSend.password;
      res.json(orderToSend);
    } else {
      res.status(404).json({});
    }
  } catch (error) {
    next(error);
  }
};

export const orderService = {
  getAllOrders,
  getOrderById,
  getOrdersByStatus,
  createOrder,
  deleteOrder,
  updateOrder,
};
