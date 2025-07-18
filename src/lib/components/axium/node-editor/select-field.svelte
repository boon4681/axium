<script lang="ts">
    import Input from "$lib/components/ui/input/input.svelte";
    import { Label } from "$lib/components/ui/label";
    import * as Select from "$lib/components/ui/select/index.js";

    const fruits = [
        { value: "apple", label: "petal_count" },
        { value: "banana", label: "Banana" },
    ];

    let value = $state("");

    const triggerContent = $derived(fruits.find((f) => f.value === value)?.label ?? "Select a column");
</script>

<div class="space-y-4">
    <Select.Root type="single" name="favoriteFruit" bind:value>
        <Select.Trigger class="w-[180px]">
            {triggerContent}
        </Select.Trigger>
        <Select.Content>
            <Select.Group>
                <Select.Label>Fruits</Select.Label>
                {#each fruits as fruit (fruit.value)}
                    <Select.Item value={fruit.value} label={fruit.label} disabled={fruit.value === "grapes"}>
                        {fruit.label}
                    </Select.Item>
                {/each}
            </Select.Group>
        </Select.Content>
    </Select.Root>
    <div class="grid grid-cols-2 gap-2">
        <Label>Fill with</Label>
        <Input value="0"></Input>
    </div>
</div>
