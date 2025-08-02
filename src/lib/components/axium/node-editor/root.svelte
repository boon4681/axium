<script lang="ts">
    import { mount, onDestroy, onMount } from "svelte";
    import { Kuflow, type KuflowConfig } from "kuflow";
    import { NodeBasic, NodePort } from "kuflow/renderable";
    import "kuflow/css";
    import "./elements/index";
    import Test from "./test.svelte";
    import SelectField from "./select-field.svelte";
    import Knn from "./knn.svelte";
    import Split from "./split.svelte";
    import Textbox from "./textbox.svelte";
    import { EventExplorerItemDraggedOver, EventExplorerItemDrop } from "../explorer/constants";
    import type { HTMLAttributes } from "svelte/elements";

    let {
        model,
        onMount: _onMount,
        ...restProps
    }: { onMount?: (kuflow: Kuflow) => void; model: KuflowConfig["model"] } & HTMLAttributes<HTMLDivElement> = $props();
    let ref: HTMLDivElement;
    let test: HTMLDivElement;
    let kuflow: Kuflow;

    const onPlaceNode = (e: CustomEvent) => {
        console.log(kuflow.x, kuflow.y);
        console.log(e.detail);
        kuflow.add(
            new NodeBasic("" + Math.random(), {
                title: "Load CSV",
                ports: {
                    input: [],
                    output: [],
                },
                position: {
                    x: kuflow.divK(e.detail.x - kuflow.zoom.x - kuflow.x),
                    y: kuflow.divK(e.detail.y - kuflow.zoom.y - kuflow.y),
                },
                onMount(body) {},
            }),
        );
    };
    onMount(() => {
        kuflow = new Kuflow({
            parent: ref,
            model: model,
        });
        _onMount?.(kuflow);
        const unsub = kuflow.addEventListener("node.focus", () => {});
        // const a1 = window.$define("node-1", "a1", "");
        // const a2 = window.$define("node-1", "a2", [{ value: "iris.csv", label: "iris.csv" }]);
        // kuflow.add(
        //     new NodeBasic("1", {
        //         title: "Load CSV",
        //         ports: {
        //             input: [],
        //             output: [new NodePort("n1-o-1", "result", ["AXIUM.INT"])],
        //         },
        //         position: {
        //             x: 0,
        //             y: 0,
        //         },
        //         onMount(body) {
        //             body.innerHTML = `
        //             <div>
        //                 <node-input-text id="a1" node-id="node-1" label="text" name="HI"></node-input-text>
        //                 <node-input-select id="a2" node-id="node-1" label="text" name="HI" placeholder="Select a file"></node-input-select>
        //             </div>
        //             `;
        //             // mount(Test, {
        //             //     target: body,
        //             // });
        //         },
        //     }),
        // );

        // kuflow.add(
        //     new NodeBasic("2", {
        //         title: "Fill Empty",
        //         ports: {
        //             input: [new NodePort("n2-i-1", "data", ["AXIUM.INT"])],
        //             output: [new NodePort("n2-o-1", "result", ["AXIUM.INT"])],
        //         },
        //         position: {
        //             x: 270,
        //             y: -100,
        //         },
        //         onMount(body) {
        //             mount(SelectField, {
        //                 target: body,
        //             });
        //         },
        //     }),
        // );
        // kuflow.add(
        //     new NodeBasic("3", {
        //         title: "Get column",
        //         ports: {
        //             input: [new NodePort("n3-i-1", "data", ["AXIUM.INT"])],
        //             output: [new NodePort("n3-o-1", "result", ["AXIUM.INT"])],
        //         },
        //         position: {
        //             x: 290,
        //             y: 130,
        //         },
        //         onMount(body) {
        //             mount(Test, {
        //                 target: body,
        //             });
        //         },
        //     }),
        // );
        // kuflow.add(
        //     new NodeBasic("5", {
        //         title: "Split training set",
        //         ports: {
        //             input: [
        //                 new NodePort("n5-i-1", "train data", ["AXIUM.INT"]),
        //                 new NodePort("n5-i-2", "train target", ["AXIUM.INT"]),
        //             ],
        //             output: [
        //                 new NodePort("n5-o-1", "train input", ["AXIUM.TRAIN"]),
        //                 new NodePort("n5-o-3", "train target", ["AXIUM.TRAIN"]),
        //                 new NodePort("n5-o-2", "test input", ["AXIUM.TEST"]),
        //                 new NodePort("n5-o-4", "test target", ["AXIUM.TEST"]),
        //             ],
        //         },
        //         position: {
        //             x: 566.4310969742736,
        //             y: -95.08163446416097,
        //         },
        //         onMount(body) {
        //             mount(Split, {
        //                 target: body,
        //             });
        //         },
        //     }),
        // );
        // const knn = new NodeBasic("4", {
        //     title: "KNeighborsClassifier",
        //     ports: {
        //         input: [
        //             new NodePort("n4-i-1", "train data", ["AXIUM.TRAIN"]),
        //             new NodePort("n4-i-2", "train target", ["AXIUM.TRAIN"]),
        //         ],
        //         output: [new NodePort("n4-o-1", "model", ["AXIUM.MODEL"])],
        //     },
        //     position: {
        //         x: 826.1597331643388,
        //         y: -40.267685540154176,
        //         // y: 30,
        //     },
        //     onMount(body) {
        //         mount(Knn, {
        //             target: body,
        //         });
        //     },
        // });
        // kuflow.add(knn);
        // kuflow.add(
        //     new NodeBasic("6", {
        //         title: "Joblib Save Model",
        //         ports: {
        //             input: [new NodePort("n6-i-1", "model", ["AXIUM.MODEL"])],
        //             output: [],
        //         },
        //         position: {
        //             x: 1069.0433403239574,
        //             y: -31.562179907192935,
        //         },
        //         onMount(body) {
        //             mount(Textbox, {
        //                 target: body,
        //             });
        //         },
        //     }),
        // );
        // kuflow.connect("n1-o-1", "n2-i-1");
        // kuflow.connect("n2-o-1", "n3-i-1");
        // kuflow.connect("n3-o-1", "n5-i-2");

        // kuflow.addEventListener("zoom-pan", (e) => {
        //     console.log(e);
        // });
        setTimeout(() => {
            // a1.set("HHEE")
            console.log(kuflow.export());
        }, 1000);
        // kuflow.connect("n2-o-1", "n5-i-1");
        // kuflow.connect("n5-o-1", "n4-i-1");
        // kuflow.connect("n5-o-3", "n4-i-2");

        // kuflow.connect("n4-o-1", "n6-i-1");
        ref.addEventListener(EventExplorerItemDrop, onPlaceNode as any);
        return () => {
            unsub();
        };
    });
    onDestroy(() => {
        ref.removeEventListener(EventExplorerItemDrop, onPlaceNode as any);
        ref.remove();
        window.$clean("node-1");
        kuflow.destroy();
    });
</script>

<div class="w-full h-full overflow-hidden" {...restProps} bind:this={ref}></div>
