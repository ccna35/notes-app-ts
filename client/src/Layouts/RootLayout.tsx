import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function RootLayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <footer>This is a footer. This is a footer. This is a footer.</footer>
    </div>
  );
}
