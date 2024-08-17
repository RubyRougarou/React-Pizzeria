import { formatCurrency } from "../../utils/helpers.js";
import Button from "../../ui/Button.jsx";
import DeleteItem from "./DeleteItem.jsx";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li className={"py-2 sm:flex sm:items-center sm:justify-between"}>
      <p className={"mb-1 sm:mb-0"}>
        {quantity}&times; {name}
      </p>
      <div className={"flex items-center sm:gap-6"}>
        <p className={"text-sm font-bold"}>{formatCurrency(totalPrice)}</p>
        <DeleteItem pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
