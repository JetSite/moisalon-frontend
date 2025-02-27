import React from "react";
import { useRouter } from "next/router";

const StarIcon = ({ fill = "#000" }) => {
  const router = useRouter();
  if (router.pathname == "/favorites") {
    fill = "red";
  }
  return (
    <svg
      width="22"
      height="23"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.4988 2.14269L13.7793 6.22652C13.9902 6.90192 14.5927 7.37313 15.2857 7.37313H19.4131C20.9496 7.37313 21.5823 9.41504 20.3471 10.3575L17.0029 12.8863C16.4456 13.3104 16.2196 14.0486 16.4305 14.7397L17.7109 18.8236C18.1779 20.3471 16.5209 21.6037 15.2706 20.677L11.9264 18.1482C11.3691 17.7241 10.6159 17.7241 10.0585 18.1482L6.71434 20.677C5.47911 21.6194 3.80703 20.3471 4.27401 18.8236L5.55443 14.7397C5.76532 14.0643 5.53937 13.3104 4.98201 12.8863L1.6529 10.3575C0.41767 9.41504 1.05035 7.37313 2.58686 7.37313H6.71434C7.40728 7.37313 8.00983 6.91763 8.22073 6.22652L9.50115 2.14269C9.95306 0.619104 12.0168 0.619104 12.4988 2.14269Z"
        stroke={fill}
        strokeWidth="2"
      />
    </svg>
  );
};

export default StarIcon;
