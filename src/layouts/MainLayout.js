import { Outlet } from "react-router-dom";
import { AppHeader } from "../components/AppHeader";
import { Footer } from "../components/Footer";

export default function MainLayout() {
  return (
    <>
      <AppHeader />
      <main>
        <Outlet />
      </main>
      <Footer/>
    </>
  );
}