import './App.css';
import { Route, Routes } from 'react-router-dom';
import Register from './Components/register';
import Login from './Components/login';
import Home from './Components/Home';
import Menu from './Components/Menu';
import Footer from './Components/Footer';
function App() {
  return (
    <div className="App">
     <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
