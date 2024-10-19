import Navbar from "./navbar";
import "./App.css";
import { useState } from "react";

function App() {
  const [input,setInput] = useState<string>("")

  return (
    <div className="container">
      <Navbar input={input}/>
      <div className="input">
        <input type="text" onChange={(e)=>setInput(e.target.value)}></input>
      </div>
    </div>
  );
}

export default App;
