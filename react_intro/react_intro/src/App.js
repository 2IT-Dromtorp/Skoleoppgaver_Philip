import './App.css'
import MyButton from './MyButton';
import Login from './LoginForm';

export default function MyApp() {

  let content;
  let isLoggedIn;
  isLoggedIn = true;

  if (isLoggedIn) {
    content = <Login />
  } else {
    content = <MyButton />
  }

  return (
    <div>
      <h1>Welcome to my app</h1>
      {content}
    </div>
  );
}