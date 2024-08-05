import { SharedBasic } from "@aura-design/shate-types/global";
export interface AlertProps extends SharedBasic {
    state?: {
        info?: {
            message?: string | null;
            isError?: boolean;
        };
    };
    isPushBottom?: boolean;
    isPushTop?: boolean;
    message?: string | null;
}
declare const Alert: ({ message, state, isPushBottom, isPushTop, className, }: AlertProps) => JSX.Element;
export default Alert;
//# sourceMappingURL=alert.d.ts.map