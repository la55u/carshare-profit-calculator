import "./App.css";
import illustration from "./components/Hero/drawkit-transport-scene-10.svg";
import { CarMap } from "./components/Map/Map";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={illustration} alt="" />
        <h1>Car-sharing reward calculator</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur
          itaque quas repellendus sint provident! Quaerat, eaque cumque velit ab
          corporis, beatae, nulla nostrum harum voluptatem soluta vitae quod
          fugit a?
        </p>
      </header>
      <main>
        <h2>List of all cars</h2>
        <ul>
          <li>asd</li>
        </ul>
        <CarMap />
      </main>
    </div>
  );
}

export default App;
