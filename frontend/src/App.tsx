import { Route, Routes } from "react-router";
import UserLayout from "./routes/user-layout";
import LoginPage from "./pages/auth/login";
import RegisterPage from "./pages/auth/register";
import Dashboard from "./pages/u";

function App() {
  return (
    <Routes>
      <Route path="/" element={<div>Hello "/"!</div>} />
      <Route path="/auth/register" element={<RegisterPage />} />
      <Route path="/auth/Login" element={<LoginPage />} />

      <Route element={<UserLayout />}>
        <Route path="/u" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
