import React, { useContext } from "react";

import LoginPage from "../../components/pages/LoginPage";
import { MeContext } from "../../searchContext";

const Login = () => {
  const [, setMe] = useContext(MeContext);

  return <LoginPage setMe={setMe} />;
};

export default Login;
