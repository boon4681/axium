<script lang="ts">
    import File from "./file.svelte";
    import { slide } from "svelte/transition";
    import FolderOpen from "@lucide/svelte/icons/folder-open";
    import Folder from "@lucide/svelte/icons/folder";
    import ChevronRight from "@lucide/svelte/icons/chevron-right";
    import { cn } from "$lib/utils";
    import { ITEM_DRAGGED_OVER, ITEM_FOCUSED_ID_CONTEXT } from "./context";
    import type { FileNode } from "./types";
    import { EventExplorerItemDraggedOver, EventExplorerItemFocus } from "./constants";

    export let expanded = false;
    export let id: string;
    export let name: string;
    export let files: FileNode[];
    export let depth = 0;
    export let type: any;
    export let parent: FileNode | undefined = undefined;
    let focused = ITEM_FOCUSED_ID_CONTEXT.get();
    let dragged_over = ITEM_DRAGGED_OVER.get();
    let THIS = {
        id,
        name,
        files,
        type,
        parent,
    };

    function toggle(evt: MouseEvent) {
        expanded = !expanded;
    }
    function focus(evt: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) {
        evt.currentTarget!.dispatchEvent(
            new CustomEvent(EventExplorerItemFocus, {
                detail: THIS,
                cancelable: true,
                bubbles: true,
            }),
        );
    }
    function dragOver(evt: DragEvent & { currentTarget: EventTarget & HTMLButtonElement }) {
        evt.currentTarget!.dispatchEvent(
            new CustomEvent(EventExplorerItemDraggedOver, {
                detail: THIS,
                cancelable: true,
                bubbles: true,
            }),
        );
    }
</script>

<div class="w-full data-[drag-over=true]:bg-blue-300/20" data-drag-over={$dragged_over?.id == id}>
    <button
        draggable="true"
        data-focused={$focused?.id == id}
        on:click={focus}
        on:dblclick={toggle}
        on:dragover={dragOver}
        class="w-full flex gap-1 items-center p-1 pr-8 cursor-pointer font-mono data-[focused=true]:bg-blue-300/20 rounded"
    >
        {#if depth > 0}
            <div style="margin-left: calc({depth} * var(--p-folder));"></div>
        {/if}
        <ChevronRight onclick={toggle} class={cn("size-[14px]", expanded && "rotate-90")}></ChevronRight>
        {#if expanded}
            <FolderOpen class="size-[16px]"></FolderOpen>
        {:else}
            <Folder class="size-[16px]"></Folder>
        {/if}
        <div class="text-sm">{name}</div>
    </button>
    {#if expanded}
        <div class="w-full">
            {#each files as node}
                {#if node.type === "folder"}
                    <svelte:self {...node} depth={depth + 1} parent={THIS} bind:expanded={node.expanded} />
                {:else}
                    <File {...node} depth={depth + 2} parent={THIS} />
                {/if}
            {/each}
        </div>
    {/if}
</div>

<style>
</style>
