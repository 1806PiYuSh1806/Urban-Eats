import { Router } from "express";
import handler from "express-async-handler";
import auth from "../middleware/auth.mid.js";
import { OrderModel } from "../models/order.model.js";
import { OrderStatus } from "../constants/orderStatus.js";

const router = Router();
router.use(auth);

router.post(
  "/create",
  handler(async (req, res) => {
    const order = req.body;
    if (!order.items || order.items.length <= 0) {  // Ensure to check if the order has items
      return res.status(400).send("Cart Is Empty");
    }

    await OrderModel.deleteOne({
      user: req.user.id,
      status: OrderStatus.NEW,
    });

    const newOrder = new OrderModel({ ...order, user: req.user.id });
    await newOrder.save();
    res.send(newOrder);
  })
);

router.put(
  "/pay",
  handler(async (req, res) => {
    const { paymentId } = req.body;
    const order = await getNewOrderForCurrentUser(req);
    if (!order) {
      res.status(400).send("Order Not Found");
      return;
    }

    order.paymentId = paymentId;
    order.status = OrderStatus.PAID;
    await order.save();

    res.send(order._id);
  })
);

router.get(
  "/newOrderForCurrentUser",
  handler(async (req, res) => {
    const order = await getNewOrderForCurrentUser(req);
    if (order) {
      res.send(order);
    } else {
      res.status(400).send("No new order found for the current user");
    }
  })
);

const getNewOrderForCurrentUser = async (req) => {
  return await OrderModel.findOne({
    user: req.user.id,
    status: OrderStatus.NEW,
  });
};

export default router;
