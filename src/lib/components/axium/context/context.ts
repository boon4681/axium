import { Context } from "runed";
import type { Writable } from "svelte/store";


export const AXIUM_NODES = new Context<Writable<any[]>>("axium.nodes")

export const load_nodes = async () => {
    const nodes = AXIUM_NODES.get()
    nodes.set(await fetch("/api/v1/node").then((a) => a.json()));
}