<script lang="ts">
    import { onDestroy, onMount } from "svelte";

    let { width = $bindable(), height = $bindable() } = $props();
    let ref: HTMLDivElement;

    const resizeObserver = new ResizeObserver(() => {
        const rect = ref.getBoundingClientRect();
        width = rect.width;
        height = rect.height;
    });
    onMount(() => {
        resizeObserver.observe(ref);
    });
    onDestroy(() => {
        resizeObserver.disconnect();
    });
</script>

<div bind:this={ref} class="size-full absolute pointer-events-none top-0 left-0"></div>
