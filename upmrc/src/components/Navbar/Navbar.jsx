import { FaUsers, FaGoogle, FaSignInAlt, FaSignOutAlt, FaUserCircle, FaClipboardList } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
	const { user, logoutUser } = useAuth();

	return (
		<header className="w-full h-[58px] bg-white shadow-md border-b border-gray-100">
			<div className="relative mx-auto flex h-full items-center justify-between px-8">
				{/* Left Logo */}
				<div className="w-[220px] flex items-center">
					<img
						src="/upmrc-logo.png"
						alt="UPMRC Logo"
						className="h-[48px] w-auto object-contain"
					/>
				</div>

				{/* Center Title */}
				<div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-3">
					<FaUsers className="text-[#8C1D18] text-[20px]" />

					<h1 className="text-[18px] md:text-[20px] font-bold text-[#3f3f3f]">
						UPMRC Employee Portal
					</h1>
				</div>

				{/* Right Section */}
				<div className="flex items-center gap-5">
					{/* Divider */}
					<div className="h-9 w-px bg-[#d8b4b4]" />

					{/* Email */}
					<div className="flex items-center gap-2 whitespace-nowrap">
						<FaGoogle className="text-[#EA4335] text-2xl" />

						
					</div>

					{/* Login Button / User Profile */}
					{user ? (
						<>
							<div className="flex items-center gap-2 mr-2">
								<FaUserCircle className="text-gray-600 text-xl" />
								<span className="font-medium text-gray-800">{user.name || 'User'}</span>
							</div>
							<Link
								to="/employees"
								className="flex items-center gap-2 rounded bg-blue-50 px-3 py-2 text-blue-700 transition hover:bg-blue-100"
							>
								<FaClipboardList className="text-sm" />
								<span className="font-medium">Employees</span>
							</Link>
							<button
								onClick={logoutUser}
								className="flex items-center gap-2 rounded bg-red-50 px-3 py-2 text-red-700 transition hover:bg-red-100"
							>
								<FaSignOutAlt className="text-sm" />
								<span className="font-medium">Logout</span>
							</button>
						</>
					) : (
						<Link
							to="/login"
							className="flex items-center gap-2 rounded bg-[#1f2328] px-4 py-2 text-white transition hover:bg-black"
						>
							<FaSignInAlt className="text-sm" />
							<span className="font-medium">Login</span>
						</Link>
					)}
				</div>
			</div>
		</header>
	);
};

export default Navbar;
