import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/Login";
import "./App.css";
import { AppHeader } from "./components/AppHeader";

function App() {
  return (
    <><Routes>
          <Route path="/" element={<MainLayout />}>
              <Route path="login" element={<Login />} />
          </Route>
      </Routes><>
              <AppHeader />
              <main className="container py-4">
                  <h1 className="h4">App</h1>
              </main>
          </></>
  );
}


export default App;
