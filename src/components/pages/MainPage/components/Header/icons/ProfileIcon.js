import { useRouter } from "next/router";

const ProfileIcon = ({ fill = "#000" }) => {
  const router = useRouter();
  if (router.pathname == "/login") {
    fill = "red";
  }
  return (
    <svg
      width="22"
      height="23"
      viewBox="0 0 22 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="11.0324"
        cy="8.02345"
        r="7.02345"
        stroke={fill}
        strokeWidth="2"
      />
      <path
        d="M21 23C21 20.2386 16.5228 18 11 18C5.47715 18 1 20.2386 1 23"
        stroke={fill}
        strokeWidth="2"
      />
    </svg>
  );
};

export default ProfileIcon;
