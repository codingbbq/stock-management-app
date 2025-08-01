import { Outlet } from "react-router-dom"
import Navigation from "../Navigation/Navigation"

const Layout: React.FC = () => {
    return (
        <>
            <Navigation />
            <main>
                <Outlet />
            </main>
        </>
    )
}

export default Layout;