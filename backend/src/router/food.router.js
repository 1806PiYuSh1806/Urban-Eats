import { Router } from "express";
import { foodModel } from "../models/food.model.js";
import handler from "express-async-handler";
import mongoose from 'mongoose';

const { ObjectId } = mongoose.Types;

const router = Router();

router.get(
  "/",
  handler(async (req, res) => {
    const foods = await foodModel.find({});
    res.send(foods);
  })
);

router.get(
  "/tags",
  handler(async (req, res) => {
    const tags = await foodModel
      .aggregate([
        {
          $unwind: "$tags",
        },
        {
          $group: {
            _id: "$tags",
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            name: "$_id",
            count: "$count",
          },
        },
      ])
      .sort({ count: -1 });

    const all = {
      name: "All",
      count: await foodModel.countDocuments(),
    };

    tags.unshift(all);

    res.send(tags);
  })
);

router.get(
  "/search/:searchTerm",
  handler(async (req, res) => {
    const { searchTerm } = req.params;
    const searchRegex = new RegExp(searchTerm, "i");

    const foods = await foodModel.find({ name: { $regex: searchRegex } });
    res.send(foods);
  })
);

router.get(
  "/tag/:tag",
  handler(async (req, res) => {
    const { tag } = req.params;
    const foods = await foodModel.find({ tags: tag });
    res.send(foods);
  })
);

router.get(
  "/:foodId",
  handler(async (req, res) => {
    const { foodId } = req.params;
    try {
      const food = await foodModel.findById(foodId);
      if (!food) {
        return res.status(404).send({ message: "Food not found" });
      }
      res.send(food);
    } catch (error) {
      console.error("Error fetching food:", error);
      res.status(500).send({ message: "Internal server error" });
    }
  })
);

export default router;
