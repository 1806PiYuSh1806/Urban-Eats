import axios from "axios";

export const createOrder = async (order) => {
  try {
    const { data } = await axios.post("/api/orders/create", order);
    return data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

export const getNewOrderForCurrentUser = async () => {
  try {
    const { data } = await axios.get("/api/orders/newOrderForCurrentUser");
    return data;
  } catch (error) {
    console.error("Error fetching new order for current user:", error);
    throw error;
  }
};

export const pay = async (paymentId) => {
  try {
    const { data } = await axios.put("/api/orders/pay", { paymentId });
    return data;
  } catch (error) {
    console.error("Error processing payment:", error);
    throw error;
  }
};
