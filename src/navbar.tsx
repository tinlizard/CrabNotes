import { invoke } from "@tauri-apps/api/core";
import './navbar.css'
import { useEffect, useState } from "react";

interface Input {
    input: string,
};

export default function Navbar({input}: Input) {
    const [fileNames,setFileNames] = useState<any | string>("")
    const [fileNamesArr,setFileNamesArr] = useState([])

    async function getFiles() {
        const files = await invoke('get_all_files')
        setFileNames(files)
    }

    useEffect(()=>{
        getFiles()
        //const fileArr = fileNames.split("")
        //setFileNamesArr([...fileNamesArr,fileArr])

        console.log(`type of fileNames is ${typeof(fileNames)}`)
        console.log(`fileNames is: ${fileNames}`)
    },[])

    const filesNamesArrLI = fileNamesArr.map((file,index)=>{
        <li key={index}>{file}</li>
    })

    return(
        <div className="navbar">
            <ul>
                <li><button onClick={()=>invoke('create_file', {fileName: input})}>Create file</button></li>
                <li>{fileNames}</li>
            </ul>
        </div>
    )
}