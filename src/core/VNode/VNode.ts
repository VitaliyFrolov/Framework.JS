export type AttrProps = {
    [key: string]: string | ((event: Event) => void) | undefined;
};

type EventProps = {
    onMount?: (el: HTMLElement) => void;
    onUpdate?: (el: HTMLElement) => void;
    onUnmount?: (el: HTMLElement) => void;
};

export type Props = AttrProps & EventProps;
export type Child = VNode | string | (() => string);

export class VNode {
    tag: string;
    props: Props;
    children: Child[];
    $el: HTMLElement | null;

    constructor(tag: string, props: Props = {}, children: Child[] = []) {
        this.tag = tag;
        this.props = props;
        this.children = Array.isArray(children) ? children : [];
        this.$el = null;
    }
}
