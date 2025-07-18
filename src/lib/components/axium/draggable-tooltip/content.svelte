<script lang="ts">
    import type { Snippet } from "svelte";
    import {
        DRAGGABLE_TOOLTIP_CONTAINER_RECT_CONTEXT,
        DRAGGABLE_TOOLTIP_IS_DRAGGING_CONTEXT,
        DRAGGABLE_TOOLTIP_POSITION_CONTEXT,
    } from "./context";
    import { cn } from "$lib/utils";
    import { watch } from "runed";

    let position = DRAGGABLE_TOOLTIP_POSITION_CONTEXT.get();
    let dragging = DRAGGABLE_TOOLTIP_IS_DRAGGING_CONTEXT.get();
    let container_rect = DRAGGABLE_TOOLTIP_CONTAINER_RECT_CONTEXT.get();
    let { children, class: className }: { children?: Snippet; class?: string } = $props();
    let ref = $state<HTMLDivElement>();
    let p = $state<{ x: number; y: number }>({ x: 50, y: 92 });
    watch(
        () => [$position, ref],
        () => {
            if (!ref || !$container_rect) return;
            const rect = ref!.getBoundingClientRect();
            const maxX = $container_rect.width - rect.width;
            const maxY = $container_rect.height - rect.height;
            let new_x = $position.x;
            let new_y = $position.y;

            new_x = (Math.max(0, Math.min(new_x, maxX)) * 100) / $container_rect.width;
            new_y = (Math.max(0, Math.min(new_y, maxY)) * 100) / $container_rect.height;
            p = {
                x: new_x,
                y: new_y,
            };
        },
    );
</script>

<div
    bind:this={ref}
    data-dragging={$dragging}
    class={cn(
        "data-[dragging=true]:ring-1 ring-green-500",
        className,
        "border shadow-lg bg-background pointer-events-auto data-[dragging=true]:pointer-events-none",
    )}
    style="position: absolute; left: {p.x}%; top: {p.y}%"
>
    {@render children?.()}
</div>
