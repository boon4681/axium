<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import { Kuflow } from "kuflow";
    import "kuflow/css"
    let ref: HTMLDivElement;
    let kuflow: Kuflow;
    onMount(() => {
        kuflow = new Kuflow({
            parent: ref,
        });
    });
    onDestroy(() => {
        ref.remove();
        kuflow.destroy();
    });
</script>

<div class="w-full h-full overflow-hidden" bind:this={ref}></div>
