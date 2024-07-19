import './App.css';
import Navbar from './components/Navbar';
import AppRouter from './router/AppRouter';

function App() {
  return (
    <div className="App">
      <Navbar />
      <AppRouter />
    </div>
  );
}

export default App;
