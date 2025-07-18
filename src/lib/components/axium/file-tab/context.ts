import { Context } from "runed";
import type { Writable } from "svelte/store";

export const FILE_TAB_CURRENTLY_OPENED = new Context<Writable<string>>("file-tab.currently_opened")
export const FILE_TAB_LIST = new Context<Writable<{ path: string; name: string }[]>>("file-tab.list")