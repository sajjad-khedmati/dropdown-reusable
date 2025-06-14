import './styles/App.scss';
import Dropdown from './components/ui/dropdown';
import { OPTIONS } from './constants/dropdown-options';

function App() {
  return (
    <main className="box">
      <header className="info">
        <h1>Hello LOBOX</h1>
        <p className="">This is the technical task for me!</p>
        <p className="">Reusable dropdown component - Sajjad khedmati</p>
      </header>

      <section className="dropdown-container">
        <h2>Dropdown Component</h2>
        <p>Click on the dropdown to see the options.</p>
        <Dropdown placeholder="Science" initOptions={OPTIONS} />
      </section>
    </main>
  );
}

export default App;
