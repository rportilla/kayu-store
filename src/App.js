import './App.css';
import Navbar from './components/NavBar';
import ItemListContainer from './components/ItemListContainer';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <ItemListContainer greeting={"TU PASIÓN, TU DEPORTE"}/>
    </div>
  );
}

export default App;
