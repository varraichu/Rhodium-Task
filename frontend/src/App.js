import logo from './logo.svg';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import Login from './pages/Login';
import Car_Form from './pages/Car_Form';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/carform" element={<Car_Form/>} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
