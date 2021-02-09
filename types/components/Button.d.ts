import * as React from 'react';
import { SharedBasic } from './utils';

export interface ButtonProps extends SharedBasic {
    disabled?: boolean;
    label?: string;
    link?: boolean;
    fluid?: boolean;
    node?: React.ReactNode;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

declare const Button: React.FC<ButtonProps>;

export default Button;