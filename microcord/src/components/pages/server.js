import React, { useEffect, useState } from 'react';
import './styles/server.css';
import { useParams, Outlet, Link } from 'react-router-dom';

function Server() {
  const [server, setServer] = useState({});
  const [channels, setChannels] = useState([]);
  const { serverid } = useParams();
  const [channelName, setChannelName] = useState('');

  useEffect(() => {
    const serverFetch = async () => {
      try {
        const body = { serverid: serverid };
        const response = await fetch('http://localhost:8080/microcord/api/server', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });
        const data = await response.json();
        setServer(data.server);
        setChannels(data.channels);
        document.title = (data.server.name + ' - Microcord');
        console.log(data);
      } catch (error) {
        console.error('Error fetching server:', error);
      }
    };
    serverFetch();
  }, [serverid]);

  const handleChannelName = (event) => {
    setChannelName(event.target.value);
  };

  const createChannel = async () => {
    const body = { serverid: serverid, name: channelName };
    fetch('http://localhost:8080/microcord/api/channel/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then(() => {
      const serverFetch = async () => {
        try {
          const body = { serverid: serverid };
          const response = await fetch('http://localhost:8080/microcord/api/server', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
          });
          const data = await response.json();
          setServer(data.server);
          setChannels(data.channels);
          console.log(data);
        } catch (error) {
          console.error('Error fetching server:', error);
        }
      };
      serverFetch();
    });
  };

  return (
    <div id='server-root'>
      <aside className='server-sidebar'>
        <div className='server-header'>
          <span className='server-title'>{server.name}</span>
        </div>
        <div className='channel-create'>
          <input value={channelName} onChange={handleChannelName} />
          <button onClick={createChannel}>Create</button>
        </div>
        <ul className='server-channels'>
          {channels.map((channel) => (
            <li className='container-channel' key={channel._id}>
              <div className='channel-content'>
                <div className='channel-icon'>
                  <svg class="icon__67ab4" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="oklab(0.612849 -0.000356704 -0.0157219)" fill-rule="evenodd" d="M10.99 3.16A1 1 0 1 0 9 2.84L8.15 8H4a1 1 0 0 0 0 2h3.82l-.67 4H3a1 1 0 1 0 0 2h3.82l-.8 4.84a1 1 0 0 0 1.97.32L8.85 16h4.97l-.8 4.84a1 1 0 0 0 1.97.32l.86-5.16H20a1 1 0 1 0 0-2h-3.82l.67-4H21a1 1 0 1 0 0-2h-3.82l.8-4.84a1 1 0 1 0-1.97-.32L15.15 8h-4.97l.8-4.84ZM14.15 14l.67-4H9.85l-.67 4h4.97Z" clip-rule="evenodd" class=""></path></svg>
                </div>
                <Link className='server-channel-link' to={`${channel._id}`} draggable='false'>
                  {channel.name}
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </aside>
      <div className='server-chat'>
        <Outlet />
      </div>
    </div>
  );
}

export default Server;
