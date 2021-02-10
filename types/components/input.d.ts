import * as React from 'react';
import { SharedBasic, AuraIcons } from './utils';

export interface InputProps extends SharedBasic {
    isLabelable?: boolean;
    isHelping: boolean;
    isDisabled: boolean;
    helpText?: string;
    placeholder?: string;
    leftIcon: AuraIcons;
    name?: string
    node?: React.ReactNode;
}

declare const Input: React.FC<InputProps>;

export default Input;