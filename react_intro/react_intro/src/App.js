import './App.css'
import MyButton from './MyButton';
import Login from './Login';

export default function MyApp() {

  let content;
  let isLoggedIn;
  isLoggedIn = false;

  if (isLoggedIn) {
    content = <MyButton />
  } else {
    content = <Login />
  }

  return (
    <div>
      <h1>Welcome to my app</h1>
      {content}
    </div>
  );
}