import { Route, Routes } from 'react-router-dom';
import Home from '@/pages/home/home';
import Login from '@/pages/authentication/login';
import AuthRoute from '@/components/auth-route';
import Products from '@/pages/products/products';
import Items from '@/pages/items/items';
import '@/App.css'

function App() {
  return (
    <div
      className="flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <Routes>
        <Route element={<AuthRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/items" element={<Items />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App
