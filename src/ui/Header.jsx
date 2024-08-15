import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder.jsx";
import Username from "../features/user/Username.jsx";

function Header() {
  return (
    <header
      className={
        "flex items-center justify-between border-b-2 border-stone-200 bg-yellow-400 p-4 uppercase sm:px-6"
      }
    >
      <Link to={"/"} className={"tracking-widest"}>
        Fast React Pizza Co.
      </Link>
      <SearchOrder />
      <Username />
    </header>
  );
}

export default Header;
