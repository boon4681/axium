<script lang="ts">
	// Supports weights 100-900
	import "@fontsource-variable/jetbrains-mono";
	import "@fontsource-variable/inter";
	import "../app.css";
	import { AxiumContext } from "$lib/components/axium/context";
	let { children } = $props();
</script>

<AxiumContext>
	{@render children()}
</AxiumContext>
