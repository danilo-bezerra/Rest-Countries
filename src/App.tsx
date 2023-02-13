import { useState } from "react";
import Routes from "./routes/Routes";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
