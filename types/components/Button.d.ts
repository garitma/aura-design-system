import * as React from 'react';

export interface ButtonProps {
    disabled?: boolean;
}

declare const Button: React.FC<ButtonProps>;

export default Button;