import { WatchEffect } from "../Reactivity/Effect";
import { VNode, Child } from "../VNode";

export class VDOM {
    mount(vnode: VNode, container: HTMLElement): HTMLElement {
        const el = document.createElement(vnode.tag);

        for (const key in vnode.props) {
            const value = vnode.props[key];
            if (key.startsWith("on") && typeof value === "function") {
                const eventName = key.slice(2).toLowerCase();
                el.addEventListener(eventName, value as EventListener);
            } else if (value) {
                el.setAttribute(key, value as string);
            }
        }

        vnode.children.forEach((child: Child) => {
            if (typeof child === "string") {
                el.appendChild(document.createTextNode(child));
            } else if (child instanceof VNode) {
                el.appendChild(this.mount(child, el));
            } else if (typeof child === "function") {
                const textNode = document.createTextNode("");
                el.appendChild(textNode);
                WatchEffect(() => {
                    textNode.nodeValue = child();
                });
            }
        });

        vnode.$el = el;

        if (vnode.props.onMount) vnode.props.onMount(el);

        container.appendChild(el);
        return el;
    }

    update(oldVNode: VNode, newVNode: VNode): void {
        if (oldVNode.tag !== newVNode.tag) {
            this.mount(newVNode, oldVNode.$el!.parentNode as HTMLElement);
            this.unmount(oldVNode);
            return;
        }

        const el = oldVNode.$el!;
        newVNode.$el = el;

        for (const key in oldVNode.props) {
            if (!newVNode.props[key]) {
                el.removeAttribute(key);
            }
        }
        for (const key in newVNode.props) {
            const value = newVNode.props[key];
            if (key.startsWith("on") && typeof value === "function") {
                const eventName = key.slice(2).toLowerCase();
                el.addEventListener(eventName, value as EventListener);
            } else if (value) {
                el.setAttribute(key, String(value));
            }
        }

        const oldChildren = oldVNode.children;
        const newChildren = newVNode.children;

        const commonLength = Math.min(oldChildren.length, newChildren.length);

        for (let i = 0; i < commonLength; i++) {
            const oldChild = oldChildren[i];
            const newChild = newChildren[i];

            if (typeof oldChild === "string" && typeof newChild === "string") {
                if (oldChild !== newChild) {
                    el.childNodes[i].nodeValue = newChild;
                }
            } else if (typeof oldChild === "function" && typeof newChild === "function") {
                const textNode = el.childNodes[i] as Text;
                WatchEffect(() => {
                    textNode.nodeValue = newChild();
                });
            } else if (oldChild instanceof VNode && newChild instanceof VNode) {
                this.update(oldChild, newChild);
            } else {
                el.replaceChild(
                    typeof newChild === "string" ? document.createTextNode(newChild) : this.mount(newChild as VNode, el),
                    el.childNodes[i]
                );
            }
        }

        oldChildren.slice(newChildren.length).forEach(() => {
            el.removeChild(el.lastChild!);
        });

        newChildren.slice(oldChildren.length).forEach((child) => {
            if (typeof child === "string") {
                el.appendChild(document.createTextNode(child));
            } else if (child instanceof VNode) {
                el.appendChild(this.mount(child, el));
            }
        });

        if (newVNode.props.onUpdate) newVNode.props.onUpdate(el);
    }

    unmount(vnode: VNode): void {
        if (vnode.$el && vnode.$el.parentNode) {
            if (vnode.props.onUnmount) vnode.props.onUnmount(vnode.$el);
            vnode.$el.parentNode.removeChild(vnode.$el);
        }
    }
}
