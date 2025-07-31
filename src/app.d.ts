import { type SocketClient } from "$lib/components/axium/io/io";
declare global {
    declare interface Window {
        sio: SocketClient;
    }
}