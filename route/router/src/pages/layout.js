import { Outlet, Link } from "react-router-dom";

const Layout = () => {
    return (
        <>
            <div className="navbar">
            <Link to="./">Home</Link>
                <Link to="./About">About</Link>
                    <Link to="./Testing">Testing</Link>
                        <Link to="./Klassekart">Klassekart</Link>
                            <Link to="./Oppg1">Oppgave 1</Link>
                                <Link to="./Oppg2">Oppgave 2</Link>
                                    <Link to="./Oppg3">Oppgave 3</Link>
                                    </div>
            <div className="outlet">
            <Outlet />
            </div>
            <div className="footer">
                <div className="footerbox">
                    <p>Gob</p>
                </div>
            </div>
        </>
    )
}

export default Layout;