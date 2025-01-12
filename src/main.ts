import { App } from "./App";
import { RootComponent } from "./core/Component";

const root = document.getElementById("app");
if (root) {
    RootComponent(() => [App()], root);
}