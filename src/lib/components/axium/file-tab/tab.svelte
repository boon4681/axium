<script lang="ts">
    import { getIconForFile } from "vscode-icons-js";
    import X from "@lucide/svelte/icons/x";
    import { FILE_TAB_CURRENTLY_OPENED, FILE_TAB_LIST } from "./context";

    const file_tab_currently_open_context = FILE_TAB_CURRENTLY_OPENED.get();
    const file_tab_list_context = FILE_TAB_LIST.get();
    let props: { path: string; name: string } = $props();
    const open = () => {
        $file_tab_currently_open_context = props.path;
    };
    const close = (e: MouseEvent) => {
        e.stopPropagation();
        const i = $file_tab_list_context.findIndex((a) => a.path == props.path);
        if (i > 0) {
            $file_tab_currently_open_context = $file_tab_list_context[i - 1].path + "";
        }
        $file_tab_list_context = $file_tab_list_context.filter((a) => {
            return a.path != props.path;
        });
    };
</script>

<button
    class:border-b-transparent={$file_tab_currently_open_context == props.path}
    class:border-t-transparent={$file_tab_currently_open_context != props.path}
    class:border-t-orange-400={$file_tab_currently_open_context == props.path}
    class="h-full border-t-2 border-r border-b select-none flex items-center w-full max-w-[140px] px-3 pr-6 relative"
    onclick={open}
>
    <div class="text-xs flex gap-0.5">
        {#if props.name.endsWith(".axm")}
            <img class="size-4" src="/icons/file_type_axm.svg" alt="" />
        {:else}
            <img class="size-4" src="/icons/{getIconForFile(props.name)}" alt="" />
        {/if}
        <div class="text-ellipsis w-full overflow-hidden">
            {props.name}
        </div>
    </div>
    <X class="shrink-0 size-4 absolute right-2 hover:bg-muted rounded" onclick={close} />
</button>
