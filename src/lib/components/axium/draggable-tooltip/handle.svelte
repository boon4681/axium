<script lang="ts">
    import GripVertical from "@lucide/svelte/icons/grip-vertical";
    import GripHorizontal from "@lucide/svelte/icons/grip-horizontal";
    import { EventDraggableTooltipDragHandle } from "./constants";
    import { DRAGGABLE_TOOLTIP_IS_DRAGGING_CONTEXT } from "./context";

    let { direction = "vertical" }: { direction?: "vertical" | "horizontal" } = $props();
    let ref: HTMLDivElement;
    let dragging = DRAGGABLE_TOOLTIP_IS_DRAGGING_CONTEXT.get();
    let start: { x: number; y: number } = $state({ x: 0, y: 0 });
    function dragstart(evt: any) {
        $dragging = true;
        const clientX = evt.type === "touchstart" ? evt.touches[0].clientX : evt.clientX;
        const clientY = evt.type === "touchstart" ? evt.touches[0].clientY : evt.clientY;

        const rect = ref.getBoundingClientRect();
        start = {
            x: clientX - rect.x,
            y: clientY - rect.y,
        };
    }

    function drag(evt: any) {
        if (!$dragging) return;
        const clientX = evt.type === "touchmove" ? evt.touches[0].clientX : evt.clientX;
        const clientY = evt.type === "touchmove" ? evt.touches[0].clientY : evt.clientY;
        const rect = ref.getBoundingClientRect();

        ref.dispatchEvent(
            new CustomEvent(EventDraggableTooltipDragHandle, {
                detail: {
                    x: clientX - start.x - ref.offsetLeft,
                    y: clientY - start.y - ref.offsetTop,
                },
                bubbles: true,
                cancelable: true,
            }),
        );
    }

    function dragend() {
        $dragging = false;
    }
</script>

<svelte:window onmouseup={dragend} onmousemove={drag as any} />
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div bind:this={ref} class="size-fit cursor-grab" onmousedown={dragstart} onmousemove={drag} onmouseup={dragend}>
    {#if direction == "vertical"}
        <GripVertical></GripVertical>
    {:else}
        <GripHorizontal></GripHorizontal>
    {/if}
</div>
