import { Link } from "react-router-dom";

export default function Error404() {
	return (
	<div className="h-screen w-full flex flex-col justify-center items-center">
		<h1 className="text-9xl font-extrabold text-white tracking-widest">404</h1>
		<div className="bg-[#FF6A3D] px-2 text-2xl rounded rotate-12 absolute">
			Page Not Found
		</div>

		<button className="mt-12">
			<div className="relative block px-4 py-3 bg-none border-8 border-[#CD9ECC] rounded-2xl text-white text-lg md:text-xl lg:text-2xl font-bold">
				<Link to={"/"}>Back To Homepage</Link>
			</div>
		</button>
	</div>
	);
}