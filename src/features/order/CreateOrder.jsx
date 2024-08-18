import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { createOrder } from "../../services/apiRestaurant.js";
import Button from "../../ui/Button.jsx";
import { clearCart, getCart } from "../cart/cartSlice.js";
import EmptyCart from "../cart/EmptyCart.jsx";
import store from "../../store.js";
import { fetchAddress } from "../user/userSlice.js";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const {
    username,
    status: addressStatus,
    position,
    address,
  } = useSelector((state) => state.user);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const formErrors = useActionData();
  // const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(getCart);
  const isSubmitting = navigation.state === "submitting";
  const isLoadingAddress = addressStatus === "loading"; // last code

  if (!cart.length) return <EmptyCart />;
  return (
    <div className={"px-4 py-6"}>
      <h2 className={"mb-8 text-xl font-semibold"}>
        Ready to order? Let&apos;s go!
      </h2>

      {/*<Form method={"POST"} action={"/order/new"}>  POST , PATCH , DELETE */}
      <Form method={"POST"}>
        <div className={"mb-5 flex flex-col gap-2 sm:flex-row sm:items-center"}>
          <label className={"sm:basis-40"}>First Name</label>
          <input
            className={"text-input flex-grow"}
            type="text"
            name="customer"
            required
            defaultValue={username}
          />
        </div>

        <div className={"mb-5 flex flex-col gap-2 sm:flex-row sm:items-center"}>
          <label className={"sm:basis-40"}>Phone number</label>
          <div className={"flex-grow"}>
            <input
              className={"text-input w-full"}
              type="tel"
              name="phone"
              required
            />
            {formErrors?.phone && (
              <p
                className={
                  "mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700"
                }
              >
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div
          className={
            "sm: relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center"
          }
        >
          <label className={"sm:basis-40"}>Address</label>
          <div className={"flex-grow"}>
            <input
              type="text"
              name="address"
              required
              className={"text-input w-full"}
            />
          </div>
          <span className={"absolute right-[3px] z-50"}>
            <Button
              type={"small"}
              onClick={(e) => {
                e.preventDefault();
                dispatch(fetchAddress());
              }}
            >
              Get Location
            </Button>
          </span>
        </div>

        <div className={"mb-12 mt-10 flex items-center gap-5"}>
          <input
            className={
              "h-4 w-4 accent-yellow-400 transition-all duration-300 focus:outline-none"
            }
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className={"font-medium"} htmlFor="priority">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type={"hidden"} name={"cart"} value={JSON.stringify(cart)} />
          <Button disabled={isSubmitting} type={"primary"}>
            {isSubmitting ? "placing order..." : "Order now"}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "on",
  };

  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      "Please enter a valid phone number! We may need to contact you";

  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);
  {
    /*If everything is ok, create new order and redirect*/
  }

  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
