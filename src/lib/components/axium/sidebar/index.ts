import type { SvelteComponentTyped } from "svelte";

export interface PathLink {
    name: string;
    match: string[] | string;
    to: string;
    active?: boolean;
    aka?: string;
    icon?: typeof SvelteComponentTyped<any, any, any>;
}

export type Path = PathLink;
export type Paths = Record<string, Path[]>