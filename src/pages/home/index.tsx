import AllProducts from "@/components/Products";
import { useState } from "react";
const Home: React.FC = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false); // Replace with actual authentication logic

	return (
		<>
			<section className='container mx-auto p-8 max-w-screen-2xl'>
                <AllProducts isLoggedIn={isLoggedIn} />
            </section>
		</>
	);
};

export default Home;
