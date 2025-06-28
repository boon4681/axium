<script lang="ts">
    import { Explorer } from "$lib/components/axium/explorer";
    import { NavMenu } from "$lib/components/axium/nav-menu";
    import { NodeEditor } from "$lib/components/axium/node-editor";
    import * as Resizable from "$lib/components/ui/resizable/index.js";
    import { invoke } from "@tauri-apps/api/core";
    let explorerPane: typeof Resizable.Pane;
    let innerWidth = $state(0);
    let panelMin = $derived(Math.ceil((180 / innerWidth) * 100));
</script>

<svelte:window bind:innerWidth />
<main class="h-screen w-full overflow-hidden">
    <NavMenu.Root></NavMenu.Root>
    <div class="flex h-full">
        <div class="h-full w-14 border-r"></div>
        <Resizable.PaneGroup autoSaveId="axium.app.resizable-pane" class="h-full" direction="horizontal">
            <Resizable.Pane
                bind:this={explorerPane as any}
                minSize={panelMin}
                defaultSize={16}
                collapsedSize={0}
                collapsible={true}
            >
                <div class="h-[40px] border-b"></div>
                <Explorer.Root class="h-full pl-2 pr-0.5 pt-0.5"></Explorer.Root>
            </Resizable.Pane>
            <Resizable.Handle class="transition-all data-[active]:shadow-resizer data-[active]:bg-blue-500" />
            <Resizable.Pane>
                <div class="h-[40px] border-b"></div>
                <NodeEditor.Root></NodeEditor.Root>
            </Resizable.Pane>
        </Resizable.PaneGroup>
    </div>
</main>
