<script lang="ts">
    import Logo from "../logo.svelte";
    import Gradient_1 from "./gradient-1.svelte";
    import * as Menubar from "$lib/components/ui/menubar/index.js";
</script>

<header class="relative h-[40px] w-full flex bg-[#F7F8FA]">
    <div class="relative h-full w-full overflow-hidden">
        <Gradient_1></Gradient_1>
    </div>
    <div class="absolute h-full w-full px-4 flex gap-2">
        <div class="py-2">
            <Logo class="size-6 rounded"></Logo>
        </div>
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
    </div>
</header>
