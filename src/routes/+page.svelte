<script lang="ts">
    import { open } from "@tauri-apps/plugin-dialog";
    import Logo from "$lib/components/axium/logo.svelte";
    import Button from "$lib/components/ui/button/button.svelte";

    import Plus from "@lucide/svelte/icons/plus";
    import FolderOpen from "@lucide/svelte/icons/folder-open";
    import Folder from "@lucide/svelte/icons/folder";
    import About from "$lib/components/axium/about.svelte";
    import * as Dialog from "$lib/components/ui/alert-dialog/index.js";
    import { ScrollArea } from "$lib/components/ui/scroll-area";
    import { Input } from "$lib/components/ui/input";
    import { NavMenu } from "$lib/components/axium/nav-menu";
    import { goto } from "$app/navigation";
    let active_tab = $state<"projects" | "about">("projects");

    let new_project = $state(false);
    let new_project_name = $state<string>();
    let new_project_path = $state<string>("E:\\_python\\axium-test");

    let open_new_project = () => {
        new_project = true;
        new_project_name = "";
    };

    let close_new_project = () => {
        new_project = false;
    };

    let directory_selection = async () => {
        const file = await open({
            multiple: false,
            directory: true,
        });
        new_project_path = file!;
    };

    let directory_open = async () => {
        goto("/workspace");
        return;
        const file = await open({
            multiple: false,
            directory: true,
        });
        console.log(file);
    };
</script>

<main class="h-screen w-full overflow-hidden flex flex-col">
    <NavMenu.Root>
        {#snippet header()}
            <div class="text-sm">Welcome to axium</div>
        {/snippet}
    </NavMenu.Root>
    <div class="flex w-full h-full">
        <div class="w-[240px] bg-slate-50 h-full shrink-0">
            <div class="flex px-4 py-2 mt-6">
                <Logo class="size-10 rounded"></Logo>
                <div class="ml-2">
                    <div>Axium</div>
                    <div class="text-xs text-neutral-400">version 0.1</div>
                </div>
            </div>
            <div class="px-4 mt-6 space-y-2">
                <Button
                    data-active={active_tab == "projects"}
                    size="sm"
                    variant="axium"
                    onclick={() => (active_tab = "projects")}
                >
                    Projects
                </Button>
                <Button
                    data-active={active_tab == "about"}
                    size="sm"
                    variant="axium"
                    onclick={() => (active_tab = "about")}
                >
                    About
                </Button>
            </div>
        </div>
        <div class="flex flex-col w-full px-4">
            {#if active_tab == "projects"}
                <div class="h-16 px-4 border-b w-full flex gap-2 items-center">
                    <Button size="sm" variant="outline" onclick={open_new_project}>New Project</Button>
                    <Button size="sm" variant="outline">Open</Button>
                </div>
                <!-- {#if }
                
                {/if} -->
                <div class="max-w-[400px] mt-20 w-full mx-auto">
                    <div class="text-center">
                        <div class="text-4xl font-semibold">Welcome to Axium</div>
                        <div class="text-sm text-muted-foreground">Create a new project to start.</div>
                        <div class="text-sm text-muted-foreground">Open existing project from disk.</div>
                    </div>
                    <div class="flex mt-16 gap-4 justify-center">
                        <button class="flex flex-col items-center" onclick={open_new_project}>
                            <div class="square-button-welcome">
                                <Plus class="size-7"></Plus>
                            </div>
                            <div class="text-sm mt-2">New Project</div>
                        </button>
                        <button class="flex flex-col items-center" onclick={directory_open}>
                            <div class="square-button-welcome">
                                <FolderOpen class="size-6"></FolderOpen>
                            </div>
                            <div class="text-sm mt-2">Open</div>
                        </button>
                    </div>
                </div>
            {/if}
            {#if active_tab == "about"}
                <About></About>
            {/if}
            <!-- <div class="flex flex-col gap-2">
            </div> -->
        </div>
    </div>
</main>

<Dialog.Root open={new_project}>
    <Dialog.Content class="max-w-xl h-[calc(100%-120px)] max-h-[500px] flex gap-0 flex-col py-0 bg-white px-0 rounded">
        <Dialog.Header class="border-b pt-4 pb-3 px-4 text-sm">
            <Dialog.Title>New Project</Dialog.Title>
        </Dialog.Header>
        <div class="px-4 mt-6">
            <div class="grid grid-cols-2 items-center gap-2">
                <div class="text-sm">Name</div>
                <Input bind:value={new_project_name} placeholder="Project name"></Input>
                <div class="text-sm">Directory</div>
                <button
                    class="border flex overflow-hidden items-center w-full h-8 rounded shadow-xs text-left pl-3 pr-1 text-sm text-muted-foreground"
                    onclick={directory_selection}
                >
                    <div class="w-full whitespace-nowrap text-ellipsis overflow-hidden">
                        {new_project_path}
                    </div>
                    <div class="size-6 shrink-0 rounded flex items-center justify-center">
                        <Folder class="size-4"></Folder>
                    </div>
                </button>
            </div>
        </div>
        <Dialog.Footer class="mt-auto border-t p-2">
            <Button>Create</Button>
            <Button variant="ghost" onclick={close_new_project}>Cancel</Button>
        </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>

<style>
    @reference "$app.css";

    .square-button-welcome {
        @apply border-2 bg-slate-100 border-slate-100 size-16 flex items-center justify-center rounded-md transition cursor-pointer hover:border-blue-500 text-blue-600;
    }
</style>
