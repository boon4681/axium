use std::fs::{create_dir_all, File};
use std::io::{copy, BufReader};
use std::path::Path;
use tauri::{path::BaseDirectory, Manager};
use tauri::{webview::WebviewWindowBuilder, WebviewUrl};
use zip::ZipArchive;

mod ws;

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn install_axium(handle: tauri::AppHandle, folder: String) {}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(ws::init())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet])
        .invoke_handler(tauri::generate_handler![install_axium])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
