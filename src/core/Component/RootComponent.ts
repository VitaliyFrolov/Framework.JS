import { VNode } from "../VNode";
import { WatchEffect } from "../Reactivity/Effect";
import { VDOM } from "../VDOM";

export let currentComponent: Function | null = null;

export function RootComponent(treeFn: () => VNode[], container: HTMLElement): void {
    const vdom = new VDOM();
    let vnode: VNode | undefined;

    WatchEffect(() => {
        currentComponent = treeFn;
        const tree = treeFn();
        const newVNode = new VNode('div', { id: 'app' }, tree);

        if (vnode) {
            vdom.update(vnode, newVNode);
        } else {
            vdom.mount(newVNode, container);
        }
        vnode = newVNode;
        currentComponent = null;
    });
};
