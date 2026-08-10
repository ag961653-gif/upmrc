import Navbar from "../Navbar/Navbar";

// Shared shell used by every authenticated page (Home, Employees, Admin, Birthdays)
// so the app reads as one consistent portal instead of separate mini-apps.
export default function PortalLayout({ children }) {
	return (
		<div className="min-h-screen bg-slate-50">
			<Navbar />
			{children}
		</div>
	);
}
