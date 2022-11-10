import Block from "../../core/Block";
import {RouteProps} from "./RouteProps";

export interface RouterProps {
    pathname: string;
    block: Block;
    props: RouteProps;
    exact: boolean;
    needAuth: boolean;
    onNonauthorized: any;
}
