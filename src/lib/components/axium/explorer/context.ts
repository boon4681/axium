import { Context } from "runed";
import type { Writable } from "svelte/store";
import type { FileNodeExt } from "./types";


export const ITEM_FOCUSED_ID_CONTEXT = new Context<Writable<FileNodeExt | undefined>>("explorer.focused.item.id")
export const ITEM_DRAGGED_OVER = new Context<Writable<FileNodeExt | undefined>>("explorer.dragged.item.over")