import Button from "../../ui/Button.jsx";
import { useDispatch } from "react-redux";
import { decreaseItemQty, increaseItemQty } from "./cartSlice.js";

function UpdateItemQuantity({ pizzaId, currentQuantity }) {
  const dispatch = useDispatch();

  return (
    <div className={"flex items-center gap-2 md:gap-3"}>
      <Button
        type={"rounded"}
        onClick={() => dispatch(increaseItemQty(pizzaId))}
      >
        +
      </Button>
      <span className={"font text-sm font-medium"}>{currentQuantity}</span>
      <Button
        type={"rounded"}
        onClick={() => dispatch(decreaseItemQty(pizzaId))}
      >
        -
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
