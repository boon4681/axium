<script lang="ts">
    import * as Menubar from "$lib/components/ui/menubar/index.js";
    import { DraggableTooltip } from "$lib/components/axium/draggable-tooltip";
    import { Explorer } from "$lib/components/axium/explorer";
    import Folder from "$lib/components/axium/explorer/folder.svelte";
    import { NavMenu } from "$lib/components/axium/nav-menu";
    import { NodeEditor } from "$lib/components/axium/node-editor";
    import Button from "$lib/components/ui/button/button.svelte";
    import * as Resizable from "$lib/components/ui/resizable/index.js";
    import Folders from "@lucide/svelte/icons/folders";
    import BookText from "@lucide/svelte/icons/book-text";
    import Play from "@lucide/svelte/icons/play";
    import { invoke } from "@tauri-apps/api/core";
    import { TEST_TREE } from "../test";
    import { onMount } from "svelte";
    import { AXIUM_NODES } from "$lib/components/axium/context/context";
    import type { FileNode, Folder as ExplorerFolder } from "$lib/components/axium/explorer/types";
    import { FileTab } from "$lib/components/axium/file-tab";
    let explorerPane: typeof Resizable.Pane;
    let innerWidth = $state(0);
    let panelMin = $derived(Math.ceil((180 / innerWidth) * 100));
    let active_tab = $state<"explorer" | "nodes">("nodes");

    const nodes_context = AXIUM_NODES.get();
    let nodes_tree = $state<FileNode[]>([]);
    onMount(() => {
        const table = new Map<any, FileNode[]>();
        $nodes_context.map((n) => {
            if (!table.has(n.category)) {
                table.set(n.category, []);
            }
            let v = table.get(n.category)!;
            v.push({
                type: "file",
                id: n.id,
                name: n.name,
            });
            table.set(n.category, v);
        });
        // console.log(Array.from(table.entries()))
        for (const [cate, list] of table.entries()) {
            if (cate == null) {
                nodes_tree.push(...list);
            } else {
                nodes_tree.push({
                    type: "folder",
                    name: cate,
                    id: cate,
                    files: list,
                });
            }
        }
        console.log(nodes_tree);
    });
</script>

<svelte:window bind:innerWidth />
<main class="h-screen w-full overflow-hidden flex flex-col">
    <NavMenu.Root>
        <Menubar.Root>
            <Menubar.Menu>
                <Menubar.Trigger>File</Menubar.Trigger>
                <Menubar.Content>
                    <Menubar.Item>
                        New Tab
                        <Menubar.Shortcut>⌘T</Menubar.Shortcut>
                    </Menubar.Item>
                    <Menubar.Item>New Window</Menubar.Item>
                    <Menubar.Separator />
                    <Menubar.Item>Share</Menubar.Item>
                    <Menubar.Separator />
                    <Menubar.Item>Print</Menubar.Item>
                </Menubar.Content>
            </Menubar.Menu>
            <Menubar.Menu>
                <Menubar.Trigger>Help</Menubar.Trigger>
                <Menubar.Content>
                    <Menubar.Item>About</Menubar.Item>
                </Menubar.Content>
            </Menubar.Menu>
        </Menubar.Root>
    </NavMenu.Root>
    <div class="flex h-full overflow-hidden">
        <div class="h-full w-14 border-r flex flex-col items-center py-2 gap-2">
            <Button
                size="icon"
                data-active={active_tab == "explorer"}
                variant={"ghost"}
                onclick={() => (active_tab = "explorer")}
            >
                <Folders></Folders>
            </Button>
            <Button
                size="icon"
                data-active={active_tab == "nodes"}
                variant={"ghost"}
                onclick={() => (active_tab = "nodes")}
            >
                <BookText></BookText>
            </Button>
        </div>
        <Resizable.PaneGroup autoSaveId="axium.app.resizable-pane" class="h-full" direction="horizontal">
            <Resizable.Pane
                bind:this={explorerPane as any}
                minSize={panelMin}
                defaultSize={16}
                collapsedSize={0}
                collapsible={true}
                class="h-full flex flex-col"
            >
                {#if active_tab == "explorer"}
                    <div class="h-[40px] border-b shrink-0 flex px-3 items-center text-sm">Explorer</div>
                    <Explorer.Root tree={TEST_TREE} class="h-full pl-2 pr-0.5 pt-0.5"></Explorer.Root>
                {/if}
                {#if active_tab == "nodes"}
                    <div class="h-[40px] border-b shrink-0 flex px-3 items-center text-sm">Nodes</div>
                    <Explorer.Root tree={nodes_tree} class="h-full pl-2 pr-0.5 pt-0.5"></Explorer.Root>
                {/if}
            </Resizable.Pane>
            <Resizable.Handle
                class="transition-all data-[active]:shadow-resizer data-[active]:bg-blue-500 shrink-0 w-[2px]"
            />
            <Resizable.Pane class="flex flex-col h-full">
                <FileTab.Root></FileTab.Root>
                <div class="w-full h-full overflow-hidden relative">
                    <NodeEditor.Root></NodeEditor.Root>
                    <DraggableTooltip.Root>
                        <DraggableTooltip.Content class="flex items-center rounded p-1">
                            <DraggableTooltip.Handle></DraggableTooltip.Handle>
                            <Button variant="green" size="sm" class="px-4">
                                <Play fill="white"></Play>
                            </Button>
                        </DraggableTooltip.Content>
                    </DraggableTooltip.Root>
                </div>
            </Resizable.Pane>
        </Resizable.PaneGroup>
    </div>
</main>
