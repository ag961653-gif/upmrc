import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import HeroSlider from "../components/Slider/HeroSlider";
import CalendarWidget from "../components/Calendar/CalendarWidget";
import Circulars from "../components/Circulars/Circulars";
import SocialFeed from "../components/SocialFeed/SocialFeed";
import NewsClipping from "../components/News/NewsClipping";
import Footer from "../components/Footer/Footer";

export default function Home() {
	return (
		<div className="min-h-screen bg-[#eef3fb]">
			<Navbar />

			<div className="max-w-[1600px] mx-auto p-5">
				<div className="grid grid-cols-12 gap-5">
					{/* Left */}
					<div className="col-span-3">
						<Sidebar />
					</div>

					{/* Center */}
					<div className="col-span-6 space-y-5">
						<HeroSlider />

						<div className="grid grid-cols-2 gap-5">
							<Circulars />

							<SocialFeed />
						</div>
					</div>

					{/* Right */}
					<div className="col-span-3 space-y-5">
						<CalendarWidget />

						<NewsClipping />
					</div>
				</div>
				<Footer />
			</div>
		</div>
	);
}
