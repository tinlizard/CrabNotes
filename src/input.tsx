import { invoke } from "@tauri-apps/api/core";
import { useState } from "react";


export default function Input() {
    const [input,setInput] = useState<string>("")

    return(
        <div className="navbar">
            <input type="text" onChange={(e)=>setInput(e.target.value)}></input>
            <button onClick={()=>invoke('create_file', {fileName: input})}>Create file</button>
        </div>
    )
}