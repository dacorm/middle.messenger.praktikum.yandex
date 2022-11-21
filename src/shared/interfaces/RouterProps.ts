import Block from '../../core/Block';
import { RouteProps } from './RouteProps';

export interface RouterProps {
    pathname: string;
    block: typeof Block;
    props?: RouteProps;
    exact?: boolean;
    needAuth?: boolean;
    onNonauthorized?: any;
    isAuth?: boolean;
}
