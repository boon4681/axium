import { Context } from "runed";
import type { Writable } from "svelte/store";

export const DRAGGABLE_TOOLTIP_POSITION_CONTEXT = new Context<Writable<{
    x: number,
    y: number
}>>('draggable-tooltip.position.context')
export const DRAGGABLE_TOOLTIP_CONTAINER_RECT_CONTEXT = new Context<Writable<{
    width: number,
    height: number
}>>('draggable-tooltip.container.rect.context')
export const DRAGGABLE_TOOLTIP_IS_DRAGGING_CONTEXT = new Context<Writable<boolean>>('draggable-tooltip.dragging.context')