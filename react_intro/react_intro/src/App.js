import './App.css';
/*import Login from './login';*/
/*import AdminPanel from './admin';*/


function App() {
  let isLoggedIn;
  let content;
  isLoggedIn = false;

  if (isLoggedIn) {
    content = <AdminPanel />;
  } else {
    content = <Login />;
  }

  return (
    <div className="App">
      <header className="App-header">
       
        <h1>react intro</h1>
          <input></input>
          <input></input>
          <button onClick={Login}>Login</button>
          {content}

      </header>
    </div>
  );
}

export default App;
