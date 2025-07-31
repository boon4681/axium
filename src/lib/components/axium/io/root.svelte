<script lang="ts">
    import { onMount } from "svelte";
    import LoaderCircle from "@lucide/svelte/icons/loader-circle";
    import { NavMenu } from "../nav-menu";
    import { io } from "./io";
    import { FILES, METADATA, ROOT } from "./context";
    import { writable } from "svelte/store";
    import type { FileNode } from "../explorer/types";
    import type { ProjectMeta } from "$lib/types";
    import { watch } from "runed";

    let ready = $state(false);
    let files_tree = writable<FileNode[]>([]);
    let metadata = writable<ProjectMeta>();
    let root = writable<string>("E:\\_python\\axium-test-project");
    ROOT.set(root);
    FILES.set(files_tree);
    METADATA.set(metadata);
    onMount(() => {
        //@ts-ignore
        window.sio = null;
        const socket = io("ws://localhost:5113", {
            path: "/sio",
            reconnectionDelayMax: 5000,
            meta: {
                project: $root,
            },
        });
        window.sio = socket;

        socket.on("connect", () => {
            console.log("HI");
        });
        socket.on("logs", (data) => {
            console.log(data.map((a: any) => a.m).join(""));
        });
        socket.on("res.list-files", (data) => {
            $files_tree = data;
        });
        socket.on("ready", (data: ProjectMeta) => {
            ready = true;
            $metadata = data;
        });

        return async () => {
            await socket.disconnect();
            //@ts-ignore
            window.sio = null;
            ready = false;
        };
    });
    watch(
        () => $metadata,
        () => {
            if (window.sio) {
                window.sio.emit("callable", {
                    command: "save-project-meta",
                    data: $metadata,
                });
            }
        },
    );

    let { children } = $props();
</script>

{#if ready}
    {@render children?.()}
{:else}
    <NavMenu.Root></NavMenu.Root>
    <div class="w-full h-screen flex items-center justify-center gap-4">
        <LoaderCircle class="size-12 animate-spin"></LoaderCircle>
        <div>Loading Project</div>
    </div>
{/if}
