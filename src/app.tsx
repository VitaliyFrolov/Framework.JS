import { VNode } from "./core/VNode";
import { useState } from "./hooks/useState";

const App = () => {
    const [ count, setCount ] = useState(0);

    return new VNode("div", { class: "counter-app" }, [
        new VNode("h1", {}, [() => `Counter: ${count()}`]),
        new VNode("div", { class: "buttons" }, [
            new VNode(
                "button",
                { class: 'btn', onclick: () => setCount(count() + 1) },
                ["Increment"]
            ),
            new VNode(
                "button",
                { class: 'btn', onclick: () => setCount(count() - 1) },
                ["Decrement"]
            ),
        ]),
    ]);
};

export { App };