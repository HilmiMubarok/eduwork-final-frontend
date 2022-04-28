import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { listen } from './app/listener';
import { useSelector } from 'react-redux';

// import Navbar from './components/Navbar'
// import Product from './components/Product'

import Home from './pages/Home'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Logout from './pages/Auth/Logout'
// import Dashboard from './pages/Dashboard'
// import Transaction from './pages/Dashboard/Transaction'
// import Address from './pages/Dashboard/Address'
import Account from './pages/Account'
// import Checkout from './pages/Checkout'
// import Invoices from './pages/Invoices'

export default function App() {
	const auth = useSelector(state => state.auth);

	useEffect(() => {
		listen();
	}, [])
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/account" element={<Account />} />
				<Route path="/auth/login" element={auth.user ? <Navigate to="/" replace /> : <Login />} />
				<Route path="/auth/logout" element={<Logout />} />
				<Route path="/auth/register" element={<Register />} />
			</Routes>
		</Router>

	);
}
