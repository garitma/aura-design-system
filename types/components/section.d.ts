import * as React from 'react';
import { SharedBasic } from './utils';

export interface SectionProps extends SharedBasic {
    space: "p0" | "pad" | "inside-pad" | "aura" | "wall-pad",
    container: "smash" | "smesh" | "smish" | "smosh" | "smush" | ""
    subClassName: string
    passDiv: boolean
    node?: React.ReactNode;
}

declare const Section: React.FC<SectionProps>;

export default Section;