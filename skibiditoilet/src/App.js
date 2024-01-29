import './App.css';

function App() {
  const skibidi = () => {
    alert("Skibidi dop dop dop dop yes yes yes skibidi dip skibido dop skibidi yes yes yes.")
    window.location.href="https://www.youtube.com/playlist?list=PL-ZXraMeHBPJHXBhrNowJaQslyqtUg-tZ";
  }
  return (
  <div id='main' onClick={skibidi}>
    <img src="https://i.ibb.co/bJzftqR/eb7e2e66b8df91e98dff3fd83dbb156b-900x900x1.jpg" width="100%" />
  </div>
  )
}

export default App;
