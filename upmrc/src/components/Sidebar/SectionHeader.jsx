import { RiServerLine } from "react-icons/ri";

const SectionHeader = ({ title }) => {
	return (
		<div className="bg-[#980E52] rounded-md h-9 flex items-center px-1 text-white">
			<RiServerLine className="text-2xl mr-3" />

			<h2 className="text-[20px] font-bold tracking-wide" style={{ fontFamily: "Georgia" }}>
				{title}
			</h2>
		</div>
	);
};

export default SectionHeader;
