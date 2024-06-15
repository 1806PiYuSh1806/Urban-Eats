import React, { useEffect, useState } from "react";
import classes from "./PaymentPage.module.css";
import { getNewOrderForCurrentUser } from "../../services/orderService";
import Title from "../../components/Title/Title";
import OrderItemList from "../../components/OrderItemsList/OrderItemList";
import Map from "../../components/Map/Map";
import PaypalButtons from "../../components/PaypalButtons/PaypalButtons";

const PaymentPage = () => {
  const [order, setOrder] = useState();

  useEffect(() => {
    getNewOrderForCurrentUser()
      .then((data) => setOrder(data))
      .catch((error) => {
        console.error("Failed to fetch order:", error);
        // Optionally handle error state here
      });
  }, []);

  if (!order) return <div>No order found.</div>;

  return (
    <>
      <div className={classes.container}>
        <div className={classes.content}>
          <Title title="Order Form" fontSize="1.6rem" />

          <div className={classes.summary}>
            <div>
              <h3>Name:</h3>
              <span>{order.name}</span>
            </div>
            <div>
              <h3>Address:</h3>
              <span>{order.address}</span>
            </div>
          </div>

          <OrderItemList order={order} />
        </div>

        <div className={classes.map}>
          <Title title="Your Location" fontSize="1.6rem" />
          <Map readonly={true} location={order.addressLatLng} />
        </div>

        <div className={classes.buttons_container}>
          <div className={classes.buttons}>
            <PaypalButtons order={order} />
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
