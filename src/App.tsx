import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Reports from "./pages/Reports";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          element={<ProtectedRoute />}
        >
          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/products"
            element={<Products />}
          />

          <Route
            path="/orders"
            element={<Orders />}
          />

          <Route
            path="/reports"
            element={<Reports />}
          />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;