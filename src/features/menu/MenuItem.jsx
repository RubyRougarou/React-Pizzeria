import { formatCurrency } from "../../utils/helpers.js";
import Button from "../../ui/Button.jsx";
import { useDispatch } from "react-redux";
import { addItem } from "../cart/cartSlice.js";

function MenuItem({ pizza }) {
  const dispatch = useDispatch();

  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  function handleAddToCart() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItem(newItem));
  }

  return (
    <li className={"flex gap-4 py-2"}>
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className={"flex flex-grow flex-col pt-0.5"}>
        <p className={"font-medium"}>{name}</p>
        <p className={"text-sm capitalize text-stone-500"}>
          {ingredients.join(", ")}
        </p>
        <div className={"mt-auto flex items-center justify-between text-sm"}>
          {!soldOut ? (
            <p>{formatCurrency(unitPrice)}</p>
          ) : (
            <p className={"font-medium uppercase text-stone-400"}>Sold out</p>
          )}

          {!soldOut && (
            <Button onClick={handleAddToCart} type={"small"}>
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
