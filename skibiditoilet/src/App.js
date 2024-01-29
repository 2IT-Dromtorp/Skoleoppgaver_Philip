import './App.css';

function App() {
  const skibidi = () => {
    setTimeout(() => {
      window.location.href="https://en.wikipedia.org/wiki/Skibidi_Toilet";
    }, 3000)
  }
  return (
  <div id='main' onClick={skibidi}>
    <img src="https://i.ibb.co/bJzftqR/eb7e2e66b8df91e98dff3fd83dbb156b-900x900x1.jpg" width="100%" />
  </div>
  )
}

export default App;
