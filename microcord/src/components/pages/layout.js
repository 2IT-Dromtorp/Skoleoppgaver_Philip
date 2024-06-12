import React, { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import './styles/layout.css'

function Layout() {
    const [servers, setServers] = useState([]);

    useEffect(() => {
        const serversFetch = async () => {
            try {
                const response = await fetch("http://localhost:8080/microcord/api/servers");
                const data = await response.json();
                setServers(data);
                console.log(data);
            } catch (error) {
                console.error("Error fetching servers:", error);
            }
        };
        serversFetch();
    }, []);

    return (
        <div id='app-mount'>
            <aside className='app-sidebar'>
                <div className='app-chats'>
                    <Link className='app-chat' to="/c"></Link>
                </div>
                <div className='sidebar-divider' />
                <ul className='app-servers'>
                    {servers.map((server) => (
                        <li key={server.id} className='app-server'>
                            <Link draggable="false" to={`/channels/${server.id}`}><img className='server-icon' draggable="false" src={server.url}/></Link>
                        </li>
                    ))}
                </ul>
                <div className='app-create-server'>
                    <Link draggable="false">
                    
                    </Link>
                </div>
            </aside>
            <div className='app-content'>
                <Outlet />
            </div>
        </div>
    )
}

export default Layout