<script lang="ts">
    import { mount, onDestroy, onMount } from "svelte";
    import { Kuflow } from "kuflow";
    import { NodeBasic, NodePort } from "kuflow/renderable";
    import "kuflow/css";
    import Test from "./test.svelte";
    import SelectField from "./select-field.svelte";

    let props: { onMount?: (kuflow: Kuflow) => void } = $props();
    let ref: HTMLDivElement;
    let kuflow: Kuflow;
    onMount(() => {
        kuflow = new Kuflow({
            parent: ref,
        });
        props.onMount?.(kuflow);

        kuflow.add(
            new NodeBasic("1", {
                title: "Load CSV",
                ports: {
                    input: [],
                    output: [new NodePort("n1-o-1", "result", ["AXIUM.INT"])],
                },
                position: {
                    x: 0,
                    y: 0,
                },
                onMount(body) {
                    mount(Test, {
                        target: body,
                    });
                },
            }),
        );

        kuflow.add(
            new NodeBasic("2", {
                title: "Fill Empty",
                ports: {
                    input: [new NodePort("n2-i-1", "data", ["AXIUM.INT"])],
                    output: [new NodePort("n2-o-1", "result", ["AXIUM.INT"])],
                },
                position: {
                    x: 270,
                    y: -100,
                },
                onMount(body) {
                    mount(SelectField, {
                        target: body,
                    });
                },
            }),
        );
        kuflow.connect("n1-o-1", "n2-i-1");
    });
    onDestroy(() => {
        ref.remove();
        kuflow.destroy();
    });
</script>

<div class="w-full h-full overflow-hidden" bind:this={ref}></div>
