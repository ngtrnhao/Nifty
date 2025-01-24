import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import {Provider} from 'react-redux';
import { store } from "./store/slices"; 
import Login from "./components/auth/Login";

function App() {
  return(
    <Provider store ={store}>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </Router>
    </Provider>
  )
 
}

export default App;
