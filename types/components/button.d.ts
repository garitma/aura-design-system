import * as React from 'react';
import { SharedBasic } from './utils';

export interface ButtonProps extends SharedBasic {
    isFluid?: boolean;
    isWaiting: boolean;
    isDisabled: boolean;
    label?: string;
    mode: "fill" | "pill" | "menu" | "link"
    node?: React.ReactNode;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

declare const Button: React.FC<ButtonProps>;

export default Button;