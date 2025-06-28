<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import File from "./file.svelte";
    import Folder from "./folder.svelte";
    import type { FileNode, FileNodeExt } from "./types";
    import { EventExplorerItemDraggedOver, EventExplorerItemFocus } from "./constants";
    import { ITEM_DRAGGED_OVER, ITEM_FOCUSED_ID_CONTEXT } from "./context";
    import { writable } from "svelte/store";
    import ScrollArea from "$lib/components/ui/scroll-area/scroll-area.svelte";
    import type { HTMLAttributes } from "svelte/elements";
    import { cn } from "$lib/utils";

    let props: HTMLAttributes<HTMLDivElement> = $props();
    let ref: HTMLDivElement;
    let dnd_ref: HTMLDivElement;
    let focused = writable<FileNodeExt | undefined>();
    let dragged_over = writable<FileNodeExt | undefined>();
    ITEM_FOCUSED_ID_CONTEXT.set(focused);
    ITEM_DRAGGED_OVER.set(dragged_over);
    let tree: FileNode[] = $state([
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
    ]);
    const onItemFocused = ({ detail }: CustomEvent) => {
        $focused = detail;
    };
    const onItemDragOver = ({ detail }: CustomEvent) => {
        $dragged_over = detail;
        console.log(detail);
    };

    onMount(() => {
        dnd_ref.addEventListener("dragstart", () => console.log("DRAG-START"));
        dnd_ref.addEventListener("dragend", () => {
            console.log("DRAG-END");
            $dragged_over = undefined;
        });
        dnd_ref.addEventListener("drop", () => console.log("DROP"));
        ref.addEventListener(EventExplorerItemFocus, onItemFocused as any);
        ref.addEventListener(EventExplorerItemDraggedOver, onItemDragOver as any);
    });
    onDestroy(() => {
        dnd_ref.remove();
        ref.removeEventListener(EventExplorerItemFocus, onItemFocused as any);
        ref.removeEventListener(EventExplorerItemDraggedOver, onItemDragOver as any);
    });
</script>

<div
    bind:this={ref}
    style="--p-file: 16px;--p-folder: 12px;"
    class={cn("min-h-64 z-50 font-mono font-[400]", props.class)}
>
    <ScrollArea type="always" orientation="both" class="size-full pb-8">
        <div bind:this={dnd_ref}>
            {#each tree as node}
                {#if node.type == "folder"}
                    <Folder {...node} bind:expanded={node.expanded} />
                {:else}
                    <File {...node}></File>
                {/if}
            {/each}
        </div>
    </ScrollArea>
</div>
