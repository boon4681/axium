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

    let props: HTMLAttributes<HTMLDivElement> & { tree: FileNode[] } = $props();
    let ref: HTMLDivElement;
    let dnd_ref: HTMLDivElement;
    let focused = writable<FileNodeExt | undefined>();
    let dragged_over = writable<FileNodeExt | undefined>();
    ITEM_FOCUSED_ID_CONTEXT.set(focused);
    ITEM_DRAGGED_OVER.set(dragged_over);
    let tree: FileNode[] = $state(props.tree);
    const onItemFocused = ({ detail }: CustomEvent) => {
        $focused = detail;
    };
    const onItemDragOver = ({ detail }: CustomEvent) => {
        $dragged_over = detail;
        console.log(detail);
    };

    onMount(() => {
        dnd_ref.addEventListener("dragstart", () => console.log("DRAG-START"));
        dnd_ref.addEventListener("dragend", (e) => {
            console.log("DRAG-END", $dragged_over);
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
