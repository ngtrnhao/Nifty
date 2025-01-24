import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import {Provider} from 'react-redux';
import { store } from "./store/slices"; 
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import {ToastContainer} from 'react-toastify';
function App() {
  return(
    <Provider store ={store}>
    <Router>
      <ToastContainer position="top-right" autoClose={3000}/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </Router>
    </Provider>
  )
 
}

export default App;
