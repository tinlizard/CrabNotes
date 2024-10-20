use std::fs::File;
use std::path::Path;
use dirs::desktop_dir;

#[derive(Debug, thiserror::Error)]
enum Error {
  #[error(transparent)]
  Io(#[from] std::io::Error)
}

//implementing serde::Serialize for easier error handling
impl serde::Serialize for Error {
  fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
  where
    S: serde::ser::Serializer,
  {
    serializer.serialize_str(self.to_string().as_ref())
  }
}

#[tauri::command]
fn create_file(file_name: &str) -> Result<String, Error> {
    match desktop_dir() {
        Some(desktop_path) => {
            let string_path = desktop_path.into_os_string().into_string();
            let file_string = format!("{}{}{}", string_path.unwrap(), "/", file_name);
            println!("String path is {}",file_string);

            if Path::new(file_string.as_str()).exists() {
                println!("Error! File already exists!");
            } else {
                File::create(file_string)?;
            }
        },
        None => println!("Error! Directory does not exist"),
    };
    Ok("File created successfully.".to_string())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![create_file])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}