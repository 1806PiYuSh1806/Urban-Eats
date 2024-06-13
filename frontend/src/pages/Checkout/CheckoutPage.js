import React, { useState, useEffect } from "react";
import classes from "./CheckoutPage.module.css";
import { useCart } from "../../Hooks/useCart";
import { useAuth } from "../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { createOrder } from "../../services/orderService";
import Title from "../../components/Title/Title";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import OrderItemList from "../../components/OrderItemsList/OrderItemList";

const CheckoutPage = () => {
  const { cart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (cart && cart.items) {
      setOrder({ ...cart });
    }
  }, [cart]);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const submit = async (data) => {
    if (!order.addressLatLng) {
      toast.warning("Please select your location on the map");
      return;
    }

    await createOrder({ ...order, name: data.name, address: data.address });
    navigate("/payment");
  };

  return (
    <form onSubmit={handleSubmit(submit)} className={classes.container}>
      <div className={classes.content}>
        <Title title="Order Form" fontSize="1.6rem" />
        <div className={classes.inputs}>
          <Input
            defaultValue={user.name}
            label="Name"
            {...register("name", { required: "Name is required" })}
            error={errors.name}
          />
          <Input
            defaultValue={user.address}
            label="Address"
            {...register("address", { required: "Address is required" })}
            error={errors.address}
          />
        </div>
        {order && <OrderItemList order={order} />}
      </div>

      <div>
        <Title title="Choose Your Location" fontSize="1.6rem" />
      </div>

      <div className={classes.buttons_container}>
        <div className={classes.buttons}>
          <Button
            type="submit"
            text="Go To Payment"
            width="100%"
            height="3rem"
          />
        </div>
      </div>
    </form>
  );
};

export default CheckoutPage;
