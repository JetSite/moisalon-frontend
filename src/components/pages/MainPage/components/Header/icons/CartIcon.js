import { useRouter } from "next/router";

const CartIcon = ({ fill = "#000" }) => {
  const router = useRouter();
  if (
    router.pathname == "/cart" ||
    router.pathname == "/cartB2c" ||
    router.pathname == "/cartB2b"
  ) {
    fill = "red";
  }
  return (
    <svg
      width="23"
      height="23"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.02051 9.02626V5.01461C7.02051 2.79895 9.04113 1.00281 11.5337 1.00281C14.0263 1.00281 16.0469 2.79895 16.0469 5.01461V9.02626"
        stroke={fill}
        strokeWidth="2"
      />
      <rect
        x="1"
        y="6.01477"
        width="21.0674"
        height="16.0528"
        stroke={fill}
        strokeWidth="2"
      />
    </svg>
  );
};

export default CartIcon;
