<script lang="ts">
    import { onMount, type Snippet } from "svelte";
    import { AXIUM_NODES, load_nodes } from "./context";
    import { writable } from "svelte/store";

    let loaded = $state(false);
    let { children }: { children: Snippet } = $props();
    let nodes = writable<any[]>();
    AXIUM_NODES.set(nodes);
    onMount(async () => {
        await load_nodes();
        loaded = true;
    });
</script>

{#if loaded}
    {@render children?.()}
{/if}
