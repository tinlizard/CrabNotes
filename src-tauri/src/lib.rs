use std::fs::File;
use std::path::Path;
use dirs::desktop_dir;

#[tauri::command]
fn greet() {
    println!("Hello there, I am from rust!");
}

#[tauri::command]
fn create_file(file_name: &str) -> Result<String, String> {
    match desktop_dir() {
        Some(desktop_path) => {
            let string_path = desktop_path.into_os_string().into_string().map_err(|err| err.into_string());
            let file_string = format!("{}{}{}", string_path.unwrap(), "/", file_name);
            println!("String path is {}",file_string);

            if Path::new(file_string.as_str()).exists() {
                return Err("File already exists!".to_string());
            } else {
                File::create(file_string).map_err(|err| err.to_string())?;
            }
        },
        None => return Err("Could not determine the home directory.".to_string()),
    };
    Ok("File created successfully.".to_string())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![greet,create_file])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}