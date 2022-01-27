import "./App.css";
import Register from "./components/registration";
import Login from "./components/Login";
import Home1 from "./components/homepage";
import Mypdf from "./components/mypdf";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GenInvo from "./components/geninvo";
import Settings from "./components/settings";

function App() {
  return (
    <div className="App" id="login1">
      <Router>
        <Routes>
          <Route path="/" exact element={<Home1 />} />
          <Route path="/pdf" exact element={<Mypdf />} />
          <Route path="/Reg" exact element={<Register />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/gen" exact element={<GenInvo />} />
          <Route path="/settings" exact element={<Settings />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
