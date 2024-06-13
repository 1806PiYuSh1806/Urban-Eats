import React, { useEffect, useState } from "react";
import classes from "./FoodPage.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { getById } from "../../services/foodService";
import StarRating from "../../components/StarRating/StarRating";
import Tags from "../../components/Tags/Tags";
import Price from "../../components/Price/Price";
import { useCart } from "../../Hooks/useCart";
import NotFound from "../../components/NotFound/NotFound";

const FoodPage = () => {
  const [food, setFood] = useState(null);
  const { id } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    getById(id).then((data) => {
      console.log(id)
      console.log(data);
      if (data) {
        setFood(data);
      } else {
        setFood(null);
      }
    });
  }, [id]);

  const handleAddToCart = () => {
    addToCart(food);
    navigate("/cart");
  };

  if (food === null) {
    return <NotFound message="Food Not Found" linkText="Back To Home Page" />;
  }

  return (
    <div className={classes.container}>
      {console.log(food)}
      <img
        className={classes.image}
        src={food.imageUrl}
        alt={food.name}
      />
      <div className={classes.details}>
        <div className={classes.header}>
          <span className={classes.name}>{food.name}</span>
          <span
            className={`${classes.favourite} ${
              food.favourite ? "" : classes.not
            }`}
          >
            ❤
          </span>
        </div>
        <div className={classes.rating}>
          <StarRating stars={food.stars} size={25} />
        </div>
        <div className={classes.origins}>
          {food.origins?.map((origin) => (
            <span key={origin}>{origin}</span>
          ))}
        </div>

        <div className={classes.tags}>
          {food.tags && (
            <Tags
              tags={food.tags.map((tag) => ({ name: tag }))}
              forFoodPage={true}
            />
          )}
        </div>

        <div className={classes.cook_time}>
          <span>
            Time to cook about <strong>{food.cookTime}</strong> minutes
          </span>
        </div>

        <div className={classes.price}>
          <Price price={food.price} />
        </div>

        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
};

export default FoodPage;
