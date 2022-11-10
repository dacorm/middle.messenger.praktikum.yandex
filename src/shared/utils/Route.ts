import Block from "../../core/Block";
import {RouteProps} from "../interfaces/RouteProps";
import {ComponentProps} from "../interfaces";
import {renderInDom} from "./renderInDom";

export class Route {
    private _pathname: string;
    private _blockClass: Block;
    private _block: Block;
    private _props: RouteProps;
    private _componentProps: ComponentProps;
    private _params: {};
    private _needAuth: boolean;
    private _onNonauthorized: any;

    constructor(
        pathname: string,
        view: Block,
        props: RouteProps,
        componentProps: ComponentProps,
        needAuth: boolean,
        onNonauthorized: boolean,
    ) {
        this._pathname = pathname;
        this._blockClass = view;
        this._props = props;
        this._needAuth = needAuth;
        this._onNonauthorized = onNonauthorized;
        this._componentProps = componentProps;
        this._params = this.getParams();
    }

    getParams(): {} {
        return Object.fromEntries((new URLSearchParams(document.location.search)).entries());
    }


    navigate(pathname: string) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this._params = this.getParams();
            this.render();
        }
    }

    leave() {
        this._block?.leave();
    }

    match(pathname: string) {
        if (this._props.exact) {
            return isEqual(pathname, this._pathname);
        } else {
            return ~pathname.indexOf(this._pathname);
        }

    }

    checkAuth() {
        if (this._needAuth) {
            if (typeof this._onNonauthorized === 'function') {
                return this._onNonauthorized(this._pathname);
            }
        }
        return true;
    }

    render() {
        if (this.checkAuth()) {
            if (!this._block) {
                // @ts-ignore
                this._block = new this._blockClass({...this._componentProps, router: {params: this.getParams()}});
                renderInDom(this._props.rootQuery, this._block);
            } else {
                this._block.setProps({...this._componentProps, router: {params: this._params}});
                renderInDom(this._props.rootQuery, this._block);
            }
        }
    }
}

function isEqual(lhs: string, rhs: string) {
    return lhs === rhs;
}