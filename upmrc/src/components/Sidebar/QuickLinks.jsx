import { useState, useEffect } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import SectionHeader from "./SectionHeader";
import { getQuickLinks } from "../../services/quickLinkService";

const QuickLinks = () => {
	const [quickLinks, setQuickLinks] = useState([]);

	useEffect(() => {
		getQuickLinks()
			.then(setQuickLinks)
			.catch(() => setQuickLinks([]));
	}, []);

	return (
		<div className=" bg-white border rounded-md shadow-sm overflow-hidden">
			<SectionHeader title="Quick Links" />

			<div>
				{quickLinks.map((item) => (
					<a
						href={item.url}
						key={item._id}
						target="_blank"
						rel="noopener noreferrer"
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
