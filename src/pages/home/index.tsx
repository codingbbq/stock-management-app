import AllProducts from "@/components/Products";

const Home: React.FC = () => {
	return (
		<>
			<section className='container mx-auto p-8 max-w-screen-2xl'>
                <AllProducts />
            </section>
		</>
	);
};

export default Home;
