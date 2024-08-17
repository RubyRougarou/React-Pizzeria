import LinkButton from "../../ui/LinkButton.jsx";
import Button from "../../ui/Button.jsx";
import CartItem from "./CartItem.jsx";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart } from "./cartSlice.js";
import EmptyCart from "./EmptyCart.jsx";

function Cart() {
  const username = useSelector((state) => state.user.username);
  const cart = useSelector(getCart);
  const dispatch = useDispatch();

  if (!cart.length) return <EmptyCart />;

  return (
    <div className={"px-4 py-3"}>
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className={"mt-7 text-xl font-semibold"}>Your cart, {username}</h2>

      <ul className={"mt-8 divide-y divide-stone-200 border-b"}>
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>

      <div className={"mt-8 space-x-2"}>
        <Button type={"primary"} to="/order/new">
          Order pizzas
        </Button>
        <Button onClick={() => dispatch(clearCart())} type={"secondary"}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
