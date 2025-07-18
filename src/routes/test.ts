import type { FileNode } from "$lib/components/axium/explorer/types";

export const TEST_TREE = [
    {
        type: "folder",
        id: "lib",
        name: "lib",
        files: [
            {
                type: "file",
                id: "lib/index.ts",
                name: "index.ts",
            },
        ],
        expanded: true,
    },
    {
        id: "routes",
        type: "folder",
        name: "routes",
        files: [
            {
                type: "folder",
                id: "routes/magic",
                name: "magic",
                files: [
                    {
                        type: "file",
                        id: "routes/magic/+page.svelte",
                        name: "+page.svelte",
                    },
                    {
                        type: "file",
                        id: "routes/magic/code.png",
                        name: "code.png",
                    },
                ],
            },
            {
                type: "folder",
                id: "routes/luxe",
                name: "luxe",
                files: [
                    {
                        type: "file",
                        id: "routes/luxe/+page.svelte",
                        name: "+page.svelte",
                    },
                    {
                        type: "file",
                        id: "routes/luxe/+layout.svelte",
                        name: "+layout.svelte",
                    },
                ],
            },
            {
                type: "file",
                id: "routes/+page.svelte",
                name: "+page.svelte",
            },
            {
                type: "file",
                id: "routes/+layout.svelte",
                name: "+layout.svelte",
            },
            {
                type: "file",
                id: "routes/dataset.csv",
                name: "dataset.csv",
            },
            {
                type: "file",
                id: "routes/dataset.xml",
                name: "dataset.xml",
            },
        ],
    },
] as FileNode[]