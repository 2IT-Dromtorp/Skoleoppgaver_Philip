import './App.css';

function App() {

  const login = () => {
    const username = document.querySelector('input[type="username"]').value
    const password = document.querySelector('input[type="password"]').value
    if (username === 'mongo' && password === 'db') {
      window.location.href = '/andreas'
    } else if (username === 'mattis' && password === 'password') {
      window.location.href = '/mattis'
    } else {
      alert('Wrong username or password')
    }
  }

  return (
    <div id='main'>
      <div id='loginform'>
        <input type='username' placeholder='username'></input>
        <input type='password' placeholder='password'></input>
        <a onClick={login}>Logg Inn</a>
      </div>
    </div>
  )
}

export default App;
