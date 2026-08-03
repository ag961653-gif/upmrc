import { HiDocumentText } from "react-icons/hi2";
import { FiExternalLink } from "react-icons/fi";
import { circulars } from "./circularData";

const Circulars = () => {
	return (
		<div className="max-h-[320px] bg-white rounded-xl shadow-md overflow-hidden">
			{/* Header */}
			<div className="flex items-center gap-3 bg-[#1565C0] text-white px-5 py-2">
				<HiDocumentText className="text-3xl" />

				<h2 className="text-xl font-semibold">Office Circulars</h2>
			</div>

			{/* List */}

			<div className="max-h-[230px] overflow-y-auto">
				{circulars.map((item) => (
					<a
						key={item.id}
						href={item.pdf}
						className="block border-b hover:bg-blue-50 transition"
					>
						<div className="p-4">
							{/* Top Row */}

							<div className="flex justify-between items-center">
								<span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
									{item.number}
								</span>

								<span className="text-xs text-gray-500">
									Published :
									<span className="font-semibold ml-1">
										{item.publishedDate}
									</span>
								</span>
							</div>

							{/* Title */}

							<div className="mt-3 flex items-start gap-2">
								<FiExternalLink className="text-blue-600 mt-1 flex-shrink-0" />

								<p className="text-gray-700 leading-6">{item.title}</p>
							</div>
						</div>
					</a>
				))}
			</div>

			{/* Footer */}

			<div className="bg-gray-50 p-3 text-center">
				<button className="text-blue-600 hover:text-blue-800 font-medium">
					View All →
				</button>
			</div>
		</div>
	);
};

export default Circulars;
