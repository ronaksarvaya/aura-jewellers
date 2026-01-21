import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Landing from './pages/Landing';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Account from './pages/Account';
import GiftHamper from './pages/GiftHamper';
import Support from './pages/Support';
import Admin from './pages/Admin';
import { AuthProvider } from './context/AuthContext';
import RequireAuth from './components/common/RequireAuth';

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/admin" element={<Admin />} />

        {/* Protected Routes (Everything else) */}
        <Route element={
          <RequireAuth>
            <Layout>
              <React.Fragment>
                {/* Nested Routes that render inside Layout */}
                <Routes>
                  <Route path="/home" element={<Home />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/shop/*" element={<Shop />} /> {/* Handle sub-routes if any */}
                  <Route path="/product/:id" element={<ProductDetails />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/account" element={<Account />} />
                  <Route path="/gift-hamper" element={<GiftHamper />} />
                  <Route path="/support" element={<Support />} />
                </Routes>
              </React.Fragment>
            </Layout>
          </RequireAuth>
        } path="/*" />
      </Routes>
    </AuthProvider>
  );
}

export default App;
