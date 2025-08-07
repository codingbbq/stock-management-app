import { Outlet } from "react-router-dom"
import Navigation from "../Navigation/Navigation"
import Loader from "../Loader";
import { useLoader } from "@/lib/LoaderContext";

const Layout: React.FC = () => {
    const { message } = useLoader();
    return (
        <>
            <Navigation />
            <main>
                <Outlet />
            </main>
            <Loader message={message} />
        </>
    )
}

export default Layout;