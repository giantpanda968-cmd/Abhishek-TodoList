import { Routes, Route } from "react-router-dom";
import Feed from "./pages/feed";
import Login from "./pages/login";
import Sign from "./pages/sign";

const App = () =>{
  return (
    <Routes>
      <Route path="/" element={<Sign/>}/>
      <Route path="/Login" element={<Login/>}/>
      <Route path="/feed" element={<Feed/>}/>
    </Routes>
  );
};

export default App;
