<script lang="ts">
    import { getCurrentWindow, Window } from "@tauri-apps/api/window";
    import { isTauri } from "@tauri-apps/api/core";
    import { onMount, type Snippet } from "svelte";
    import Logo from "../logo.svelte";
    import Gradient_1 from "./gradient-1.svelte";
    import X from "@lucide/svelte/icons/x";
    import Square from "@lucide/svelte/icons/copy";
    import Minus from "@lucide/svelte/icons/minus";

    let appWindow: Window;
    onMount(() => {
        if (isTauri()) {
            appWindow = getCurrentWindow();
        }
    });
    let { children, header }: { children?: Snippet; header?: Snippet } = $props();
</script>

<header class="titlebar relative h-[40px] w-full flex bg-[#F7F8FA] shrink-0">
    <div data-tauri-drag-region></div>
    <div class="absolute h-full w-full overflow-hidden pointer-events-none">
        <Gradient_1></Gradient_1>
    </div>
    <div class="controls absolute h-full w-full pl-4 flex gap-2 items-center pointer-events-none">
        <div class="py-2">
            {#if header}
                {@render header?.()}
            {:else}
                <Logo class="size-6 rounded"></Logo>
            {/if}
        </div>
        <div class="flex gap-2 pointer-events-auto h-full">
            {@render children?.()}
        </div>
        <div class="mr-auto"></div>
        <div class="pointer-events-auto h-full flex">
            <button
                onclick={() => appWindow.minimize()}
                class="h-full hover:bg-neutral-300 w-10 flex items-center justify-center"
            >
                <Minus class="size-4" strokeWidth={1.5}></Minus>
            </button>
            <button
                onclick={() => appWindow.toggleMaximize()}
                class="h-full hover:bg-neutral-300 w-10 flex items-center justify-center"
            >
                <Square class="-scale-x-100 size-3" strokeWidth={1.7}></Square>
            </button>
            <button
                onclick={() => appWindow.close()}
                class="h-full hover:bg-red-500 w-10 flex items-center justify-center"
            >
                <X class="size-4" strokeWidth={1.5}></X>
            </button>
        </div>
    </div>
</header>
