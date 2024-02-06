import { useSelector } from "react-redux";
import ItemList from "./ItemList";
import ItemList from "./ItemList";
import { useDispatch } from "react-redux";
import { clearCart } from "../utils/cartSlice";
const cart = () => {
  const CartItems = useSelector((store) => store.cart.items);

  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className=" text-center m-4 p-4">
      <h1 className="text-2xl font-bold">Your Orders...</h1>;
      <div cLassName="w-6/12 m-auto">
        <button
          className="p-2 m-2 bg-black text-white rounded-lg "
          onClick={handleClearCart}
        >
          Clear Cart{" "}
        </button>
        {CartItems.length == 0 && (
          <h1>
            your card is empty please order something and Have a good
            day!!!!!!!😍😍😍
          </h1>
        )}

        <ItemList items={CartItems} />
      </div>
    </div>
  );
};

export default cart;
