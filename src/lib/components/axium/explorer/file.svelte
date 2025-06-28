<script lang="ts">
    import { getIconForFile } from "vscode-icons-js";
    import { EventExplorerItemDraggedOver, EventExplorerItemFocus } from "./constants";
    import { ITEM_FOCUSED_ID_CONTEXT } from "./context";
    import type { FileNode, FileNodeExt } from "./types";
    export let id: string;
    export let name: string;
    export let depth: number = 0;
    export let type: any;
    export let parent: FileNodeExt | undefined = undefined;
    let focused = ITEM_FOCUSED_ID_CONTEXT.get();
    let THIS = {
        id,
        name,
        type,
        parent,
    };

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

<button
    draggable="true"
    class="w-full flex items-center gap-1 font-mono p-1 pr-8 data-[focused=true]:bg-blue-300/20 rounded"
    data-focused={$focused?.id == id}
    on:click={focus}
    on:dragover={dragOver}
>
    {#if depth > 0}
        <div style="margin-left: calc({depth} * var(--p-file));"></div>
    {/if}
    <img class="size-4" src="/icons/{getIconForFile(id)}" alt="" />
    <div class="text-sm">{name}</div>
</button>

<style></style>
