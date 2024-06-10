import { connect, set } from "mongoose";
import { UserModel } from "../models/user.model.js";
import { foodModel } from "../models/food.model.js";
import { sample_foods } from "../data.js";
import { sample_users } from "../data.js";
import bcrypt from "bcryptjs";
const PASSWORD_HASH_SALT_ROUNDS = 10;
set("strictQuery", true);

export const dbconnect = async () => {
  try {
    connect(process.env.MONGO_URI);
    await seedUsers();
    await seedFoods();
    console.log("connect to Mongo DB");
  } catch (error) {
    console.log("error");
  }
};

async function seedUsers() {
  const usersCount = await UserModel.countDocuments();
  if (usersCount > 0) {
    console.log("Users seed is already done!");
    return;
  }

  for (let user of sample_users) {
    user.password = await bcrypt.hash(user.password, PASSWORD_HASH_SALT_ROUNDS);
    await UserModel.create(user);
  }
  console.log("User seed is done!");
}

async function seedFoods() {
  const foods = await foodModel.countDocuments();
  if (foods > 0) {
    console.log("Foods seed is already done!");
    return;
  }

  for (const food of sample_foods) {
    food.imageUrl = `/foods/${food.imageUrl}`;
    await foodModel.create(food);
  }

  console.log("Food seed is done!");
}
