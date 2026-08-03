import { MdKeyboardArrowRight } from "react-icons/md";
import SectionHeader from "./SectionHeader";
import { quickLinks } from "./mockData";

const QuickLinks = () => {
	return (
		<div className=" bg-white border rounded-md shadow-sm overflow-hidden">
			<SectionHeader title="Quick Links" />

			<div>
				{quickLinks.map((item) => (
					<a
						href={item.url}
						key={item.id}
						className="flex items-center gap-1 px-1 py-1 border-b last:border-none hover:bg-gray-50 transition"
					>
						<MdKeyboardArrowRight className="text-2xl" />

						<span className="text-[#3D50E0] font-semibold text-sm">{item.title}</span>
					</a>
				))}
			</div>
		</div>
	);
};

export default QuickLinks;
