import { useState } from "react";
import { FaTwitter, FaFacebookF, FaHeart, FaRetweet } from "react-icons/fa";
import { twitterPosts, facebookPosts } from "./socialData";

export default function SocialFeed() {
	const [activeTab, setActiveTab] = useState("twitter");

	const posts = activeTab === "twitter" ? twitterPosts : facebookPosts;

	return (
		<div className="max-h-[320px] bg-white rounded-xl shadow-md overflow-hidden">
			{/* Header */}
			<div className="flex">
				<button
					onClick={() => setActiveTab("twitter")}
					className={`flex-1 py-2 flex justify-center items-center gap-2 font-semibold transition ${
						activeTab === "twitter" ? "bg-[#1DA1F2] text-white" : "bg-gray-100"
					}`}
				>
					<FaTwitter />
					Twitter
				</button>

				<button
					onClick={() => setActiveTab("facebook")}
					className={`flex-1 py-2 flex justify-center items-center gap-2 font-semibold transition ${
						activeTab === "facebook" ? "bg-[#1877F2] text-white" : "bg-gray-100"
					}`}
				>
					<FaFacebookF />
					Facebook
				</button>
			</div>

			{/* Feed */}

			<div className="max-h-[380px] overflow-y-auto">
				{posts.map((post) => (
					<div key={post.id} className="p-5 border-b hover:bg-gray-50 transition">
						<div className="flex justify-between">
							<div>
								<h3 className="font-semibold text-gray-800">
									{activeTab === "twitter" ? post.user : post.page}
								</h3>

								<p className="text-sm text-gray-500">
									{activeTab === "twitter" ? post.username : ""}
								</p>
							</div>

							<span className="text-sm text-gray-400">{post.date}</span>
						</div>

						<p className="mt-4 text-gray-700 leading-7">{post.content}</p>

						{activeTab === "twitter" && (
							<div className="flex gap-6 mt-5 text-gray-500">
								<div className="flex items-center gap-2">
									<FaHeart />

									{post.likes}
								</div>

								<div className="flex items-center gap-2">
									<FaRetweet />

									{post.retweets}
								</div>
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
}
