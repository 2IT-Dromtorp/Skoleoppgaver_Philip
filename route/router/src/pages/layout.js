import { Outlet, Link } from "react-router-dom";

const Layout = () => {
    return (
        <>
            <div className="navbar">
            <Link to="./">Home</Link>
                <Link to="./About">About</Link>
                    <Link to="./Testing">Testing</Link>
                        <Link to="./Oppg1">Oppgave 1</Link>
            </div>
            <div className="outlet">
            <Outlet />
            </div>
            <div className="footer">
                
            </div>
        </>
    )
}

export default Layout;