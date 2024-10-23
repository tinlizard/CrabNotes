import Navbar from "./navbar";
import "./App.css";
import { useState, useEffect } from "react";
import { Menu,MenuItem,MenuItemOptions,SubmenuOptions,Submenu } from "@tauri-apps/api/menu";
import { getCurrentWindow } from "@tauri-apps/api/window";

function App() {
  const [input,setInput] = useState<string>("")

  const createMenu = async () => {
    const menuItemsOptions: MenuItemOptions[] =  [{
      id: "item1",
      text: "Save",
      enabled: true,
      accelerator: 'CmdorCtrlO',
      action: (id: string) => {
        console.log(`menuItem activated with id ${id}`)
      }
    },
    {
      id: "item2",
      text: "Quit",
      enabled: true,
      accelerator: 'CmdorCtrlE',
      action: (id: string) => {
        console.log(`menuItem activated with id ${id}`)
      }
    },
  ]

    const menuItem: MenuItem[] = [await MenuItem.new(menuItemsOptions[0]), await MenuItem.new(menuItemsOptions[1])]

    const submenuOptions: SubmenuOptions[] = [{
      id: "subitem1",
      text: "File",
      enabled: true,
    },
    {
      id: "subitem2",
      text: "Edit",
      enabled: true,
    },
  ];
  

    const submenus: Submenu[] = [await Submenu.new(submenuOptions[0]), await Submenu.new(submenuOptions[1])]
    submenus[0].append(menuItem)

    const menu = await Menu.new({
      id: "menuItem1",
      items: submenus,
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
