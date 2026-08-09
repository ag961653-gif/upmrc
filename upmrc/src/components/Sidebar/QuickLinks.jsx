import { useState, useEffect } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import SectionHeader from "./SectionHeader";
import { getQuickLinks } from "../../services/quickLinkService";

// Shown until an admin adds/edits links from /admin — never leaves the widget empty.
const DEFAULT_QUICK_LINKS = [
	{ _id: "default-1", title: "Official Website", url: "https://upmetrorail.com" },
	{ _id: "default-2", title: "Employee HRMS Portal", url: "https://unif.upmrc-hrms.com/" },
	{ _id: "default-3", title: "Careers / Recruitment", url: "https://upmetrorail.com/careers/new-recruitments" },
	{ _id: "default-4", title: "Lucknow Metro Info", url: "https://lucknow.upmetrorail.com" },
];

const QuickLinks = () => {
	const [quickLinks, setQuickLinks] = useState(DEFAULT_QUICK_LINKS);

	useEffect(() => {
		getQuickLinks()
			.then((data) => setQuickLinks(data.length > 0 ? data : DEFAULT_QUICK_LINKS))
			.catch(() => setQuickLinks(DEFAULT_QUICK_LINKS));
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
