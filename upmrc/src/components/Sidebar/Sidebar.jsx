import QuickLinks from "./QuickLinks";
import BirthdayCarousel from "./BirthdayCarousel";

const Sidebar = () => {
	return (
		<aside className="space-y-1 flex flex-col">
			<QuickLinks />
			<BirthdayCarousel />
		</aside>
	);
};

export default Sidebar;
