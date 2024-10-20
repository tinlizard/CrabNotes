import Navbar from "./navbar";
import "./App.css";
import { useState, useEffect } from "react";
import { Menu,MenuItem,MenuItemOptions } from "@tauri-apps/api/menu";
import { getCurrentWindow } from "@tauri-apps/api/window";

function App() {
  const [input,setInput] = useState<string>("")

  const createMenu = async () => {
    const menuItemsOptions: MenuItemOptions[] =  [{
      id: "item1",
      text: "File",
      enabled: true,
      accelerator: 'CmdorCtrlO',
      action: (id: string) => {
        console.log(`menuItem activated with id ${id}`)
      }
    },
    {
      id: "item2",
      text: "Edit",
      enabled: true,
      accelerator: 'CmdorCtrlE',
      action: (id: string) => {
        console.log(`menuItem activated with id ${id}`)
      }
    },
  ]

    const menuItem: MenuItem[] = [await MenuItem.new(menuItemsOptions[0]), await MenuItem.new(menuItemsOptions[1])]

    const menu = await Menu.new({
      id: "menuItem1",
      items: menuItem
    })

    menu.setAsWindowMenu(getCurrentWindow())
  }

  useEffect(()=>{
    createMenu().catch(console.error)
  },[])

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
