import { ComponentProps } from "./ComponentProps";

export interface ButtonProps extends ComponentProps {
    primary?: boolean;
    link?: boolean;
}