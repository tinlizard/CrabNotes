import { invoke } from "@tauri-apps/api/core";
import './navbar.css'

interface Input {
    input: string,
};

export default function Navbar({input}: Input) {
    return(
        <div className="navbar">
            <ul>
                <li><button onClick={()=>invoke('create_file', {fileName: input})}>Create file</button></li>
            </ul>
        </div>
    )
}