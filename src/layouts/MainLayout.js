import { Outlet } from "react-router-dom";
import { AppHeader } from "../components/AppHeader";

export default function MainLayout() {
  return (
    <>
      <AppHeader />
      <main>
        <Outlet />
      </main>
    </>
  );
}