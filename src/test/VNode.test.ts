import { VNode, Props, Child } from "../core/VNode";

describe('VNode', () => {
    test('Create VNode', () => {
        const props: Props = { id: 'test', className: 'example' };
        const children: Child[] = ['Hello', 'World'];
        const vnode = new VNode('div', props, children);

        expect(vnode.tag).toBe('div');
        expect(vnode.props).toEqual(props);
        expect(vnode.children).toEqual(children);
        expect(vnode.$el).toBeNull();
    });

    test('Update VNode props', () => {
        const vnode = new VNode('span');
        vnode.props.id = 'newId';
        expect(vnode.props.id).toBe('newId');
    });

    test('Add child to VNode', () => {
        const vnode = new VNode('ul', {}, []);
        vnode.children.push(new VNode('li', {}, ['Item 1']));
        expect(vnode.children.length).toBe(1);
    });
});
