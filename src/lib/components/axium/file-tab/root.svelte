<script lang="ts">
    import ScrollArea from "$lib/components/ui/scroll-area/scroll-area.svelte";
    import { writable } from "svelte/store";
    import { FILE_TAB_CURRENTLY_OPENED, FILE_TAB_LIST } from "./context";
    import Tab from "./tab.svelte";

    let props = $props();
    let currently_open = writable("workflow1.axm");
    let list = writable<{ path: string; name: string }[]>([
        {
            path: "/workflow1.axm",
            name: "workflow1.axm",
        },
        {
            path: "/workflow2.axm",
            name: "workflow2.axm",
        },
    ]);
    FILE_TAB_CURRENTLY_OPENED.set(currently_open);
    FILE_TAB_LIST.set(list);
</script>

<ScrollArea orientation="horizontal" class="h-[40px] w-full shadow-xs">
    <div class="flex w-full h-[40px] shrink-0">
        {#each $list as item}
            <Tab name={item.name} path={item.path}></Tab>
        {/each}
        <div class="w-full border-b h-full"></div>
    </div>
</ScrollArea>
