use std::fs::File;
use std::path::Path;
use dirs::desktop_dir;
use std::fs::read_dir;

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

#[tauri::command]
fn get_all_files() -> Vec<String> {
  let mut all_files = vec!["".to_string()];

  match desktop_dir() {
    Some(desktop_path) => {
      let string_path = desktop_path.into_os_string().into_string();
      let file_string = format!("{}{}", string_path.unwrap(), "/");

      match read_dir(file_string) {
        Ok(files) =>{
          for file in files {
            match file {
              Ok(file) => {
                all_files.push(file.path().into_os_string().into_string().expect("Error in expect"));
                for file in &mut all_files {
                  file.push('\n');
                }
              },
              Err(e) => eprintln!("Error checking files in directory: {}",e)
            }
          }
        },
        Err(e) => eprintln!("Error: {}",e)
      } 
    },
    None => println!("Couldnt find directory")
  }
  all_files
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![create_file,get_all_files])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}