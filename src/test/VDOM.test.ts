import { VDOM } from "../core/VDOM";
import { VNode } from "../core/VNode";

describe('VDOM', () => {
    let container: HTMLElement;

    beforeEach(() => {
        container = document.createElement('div');
    });

    test('Mount', () => {
        const vnode = new VNode('div', { id: 'app', class: 'class' });
        const vdom = new VDOM();

        const element = vdom.mount(vnode, container);

        expect(element).toBeInstanceOf(HTMLElement);
        expect(element.tagName).toBe('DIV');
        expect(element.id).toBe('app');
        expect(element.className).toBe('class');
        expect(container.contains(element)).toBe(true);
    });

    test('Update', () => {
        const vdom = new VDOM();
        const oldNode = new VNode('div', { id: 'app' }, ['Old Node']);
        const newNode = new VNode('div', { id: 'app' }, ['New Node']);

        const element = vdom.mount(oldNode, container) as HTMLElement;

        expect(element.textContent).toBe('Old Node');

        vdom.update(oldNode, newNode);

        expect(element.textContent).toBe('New Node');
    });

    test('Unmount', () => {
        const vdom = new VDOM();
        const vnode = new VNode('div', { id: 'app' });
        const element = vdom.mount(vnode, container);
        
        expect(container.contains(element)).toBe(true);

        vdom.unmount(vnode);

        expect(container.contains(element)).toBe(false);
    });
});