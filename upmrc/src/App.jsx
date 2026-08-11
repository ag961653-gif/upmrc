import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Employees from "./pages/Employees";
import Admin from "./pages/Admin";
import Birthdays from "./pages/Birthdays";
import { isAuthenticated, getCurrentUser } from "./services/authService";

// Protected Route wrapper - redirects to login if not authenticated
function ProtectedRoute({ children }) {
	return isAuthenticated() ? children : <Navigate to="/login" replace />;
}

// Admin Route wrapper - redirects non-admins away
function AdminRoute({ children }) {
	if (!isAuthenticated()) return <Navigate to="/login" replace />;
	const user = getCurrentUser();
	return user?.role === "admin" ? children : <Navigate to="/home" replace />;
}

function App() {
	return (
		<AuthProvider>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
				<Route
					path="/home"
					element={
						<ProtectedRoute>
							<div className="max-h-screen">
								<Home />
							</div>
						</ProtectedRoute>
					}
				/>
				<Route
					path="/employees"
					element={
						<AdminRoute>
							<Employees />
						</AdminRoute>
					}
				/>
				<Route
					path="/birthdays"
					element={
						<ProtectedRoute>
							<Birthdays />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/admin"
					element={
						<AdminRoute>
							<Admin />
						</AdminRoute>
					}
				/>
				<Route path="*" element={<Navigate to="/login" replace />} />
			</Routes>
		</AuthProvider>
	);
}

export default App;
