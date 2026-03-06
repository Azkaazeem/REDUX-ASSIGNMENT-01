import React, { useState } from "react";
import LoginPage from "./Pages/Login";
import SignUpPage from "./Pages/Signup";

function App() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      {isLogin ? (
        <LoginPage onSwitch={() => setIsLogin(false)} />
      ) : (
        <SignUpPage onSwitch={() => setIsLogin(true)} />
      )}
    </>
  );
}

export default App;