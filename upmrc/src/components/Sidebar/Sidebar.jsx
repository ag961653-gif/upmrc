import QuickLinks from "./QuickLinks";
import BirthdayCarousel from "./BirthdayCarousel";
import { Link } from "react-router-dom";
import { FaClipboardList } from "react-icons/fa";

const Sidebar = () => {
	return (
		<aside className="space-y-1 flex flex-col">
			<Link
				to="/employees"
				className="flex items-center justify-between p-4 mb-2 rounded shadow bg-gradient-to-r from-blue-600 to-indigo-600 text-white transition transform hover:scale-[1.02]"
			>
				<div className="flex items-center gap-3">
					<FaClipboardList className="text-xl" />
					<span className="font-semibold text-sm">Employee Management</span>
				</div>
				<span>→</span>
			</Link>
			<QuickLinks />
			<BirthdayCarousel />
		</aside>
	);
};

export default Sidebar;
