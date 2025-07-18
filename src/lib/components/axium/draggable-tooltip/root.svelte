<script lang="ts">
    import { onDestroy, onMount, type Snippet } from "svelte";
    import SizeObserver from "../size-observer/size-observer.svelte";
    import {
        DRAGGABLE_TOOLTIP_CONTAINER_RECT_CONTEXT,
        DRAGGABLE_TOOLTIP_IS_DRAGGING_CONTEXT,
        DRAGGABLE_TOOLTIP_POSITION_CONTEXT,
    } from "./context";
    import { writable } from "svelte/store";
    import { EventDraggableTooltipDragHandle } from "./constants";
    import { watch } from "runed";
    import { cn } from "$lib/utils";

    let ref: HTMLDivElement;
    let { children }: { children?: Snippet } = $props();
    let position = writable({ x: 0, y: 0 });
    let dragging = writable(false);
    let container_rect = writable<{ width: number; height: number }>();
    DRAGGABLE_TOOLTIP_POSITION_CONTEXT.set(position);
    DRAGGABLE_TOOLTIP_IS_DRAGGING_CONTEXT.set(dragging);
    DRAGGABLE_TOOLTIP_CONTAINER_RECT_CONTEXT.set(container_rect);

    let container_w = $state(0);
    let container_h = $state(0);

    function onDrag(evt: CustomEvent) {
        const rect = ref.getBoundingClientRect();
        $position.x = evt.detail.x - rect.x;
        $position.y = evt.detail.y - rect.y;
        // console.log($position);
    }

    watch(
        () => [container_h, container_w],
        () => {
            $container_rect = {
                width: container_w,
                height: container_h,
            };
        },
    );

    onMount(() => {
        ref.addEventListener(EventDraggableTooltipDragHandle, onDrag as any);
    });
    onDestroy(() => {
        ref.removeEventListener(EventDraggableTooltipDragHandle, onDrag as any);
    });
</script>

<SizeObserver bind:width={container_w} bind:height={container_h}></SizeObserver>
<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<!-- svelte-ignore a11y_positive_tabindex -->
<div
    bind:this={ref}
    tabindex="1"
    class={cn("w-full h-full overflow-hidden transform absolute top-0 left-0", $dragging ? "" : "pointer-events-none")}
>
    {@render children?.()}
</div>
