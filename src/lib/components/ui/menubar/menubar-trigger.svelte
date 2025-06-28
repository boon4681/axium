<script lang="ts">
	import { Menubar as MenubarPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: MenubarPrimitive.TriggerProps = $props();
</script>

<MenubarPrimitive.Trigger
	bind:ref
	data-slot="menubar-trigger"
	class={cn(
		"h-full  hover:bg-black/10 focus:text-accent-foreground data-[state=open]:bg-black/10 data-[state=open]:text-accent-foreground outline-hidden flex select-none items-center px-2 py-1 text-xs font-medium",
		className
	)}
	{...restProps}
/>
