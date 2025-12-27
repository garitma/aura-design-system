"use client";

import React, {
  type MouseEvent,
  type TouchEvent,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import { cva, type VariantProps } from "class-variance-authority";
import { SymbolIcon, CheckIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/class-names";

const signaturePadVariants = cva("touch-none cursor-pencil", {
  variants: {
    variant: {
      default: "border border-gray-6 bg-gray-a2",
      ghost: "border-none bg-gray-a2",
      outline: "border border-gray-a6 bg-gray-1",
    },
    size: {
      default: "w-full h-[195px]",
      sm: "w-full h-[149.5px]",
      md: "w-full h-[247px]",
      lg: "w-full h-[299px]",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface SignaturePadProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof signaturePadVariants> {
  /** @public (optional) - Tailwind color utility class for the pen color (e.g. "text-black", "text-primary-500") */
  penColor?: string;
  /** @public (optional) - Line width in pixels */
  lineWidth?: number;
  /** @public (optional) - Whether to show the buttons */
  showButtons?: boolean;
  /** @public (optional) - The icon to display for the save button */
  saveButtonIcon?: React.ReactNode;
  /** @public (optional) - The icon to display for the clear button */
  clearButtonIcon?: React.ReactNode;
  /** @public (optional) - Callback function to be called when the signature is saved */
  onSave?: (signature: Base64URLString) => void;
  /** @public (optional) - Callback function to be called when the signature is changed */
  onChange?: (signature: Base64URLString | null) => void;
}

interface SignaturePadRef {
  clear: () => void;
  save: () => void;
  toDataURL: () => Base64URLString | null;
  isEmpty: () => boolean;
  getCanvas: () => HTMLCanvasElement | null;
}

const SignaturePad = React.forwardRef<SignaturePadRef, SignaturePadProps>(
  (
    {
      penColor = "var(--accent-9)",
      lineWidth = 4,
      showButtons = true,
      saveButtonIcon,
      clearButtonIcon,
      variant,
      size,
      className,
      onSave,
      onChange,
      ...props
    },
    ref
  ) => {
    const [isDrawing, setIsDrawing] = useState(false);
    const [isEmpty, setIsEmpty] = useState(true);

    const pointsRef = useRef<{ x: number; y: number }[]>([]);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

    // Helper function to resolve CSS variables to actual color values
    const resolveColor = (color: string): string => {
      if (!color.startsWith("var(")) {
        return color;
      }

      // Extract the variable name from var(--variable-name)
      const match = color.match(/var\((--[^)]+)\)/);
      if (!match) return color;

      const variableName = match[1];
      const canvas = canvasRef.current;
      if (!canvas) return color;

      // Get the computed style from the canvas element
      const computedStyle = getComputedStyle(canvas);
      const resolvedColor = computedStyle.getPropertyValue(variableName).trim();

      // If the variable is not found or empty, return the original
      return resolvedColor || color;
    };

    // Expose the clear, save, toDataURL, isEmpty, and getCanvas methods to the parent component
    useImperativeHandle(ref, () => ({
      clear: handleClear,
      save: handleSave,
      toDataURL: () => {
        const canvas = canvasRef.current;
        if (!canvas) return null;
        return canvas.toDataURL("image/png") as Base64URLString;
      },
      isEmpty: () => isEmpty,
      getCanvas: () => canvasRef.current,
    }));

    // Update the canvas size for High DPI displays
    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const updateCanvasSize = () => {
        const rect = canvas.getBoundingClientRect();
        const ratio = window.devicePixelRatio || 1;

        canvas.width = rect.width * ratio;
        canvas.height = rect.height * ratio;
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;

        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.scale(ratio, ratio);
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.strokeStyle = resolveColor(penColor);
          ctx.lineWidth = lineWidth;

          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = "high";
          ctx.globalCompositeOperation = "source-over";

          ctxRef.current = ctx;
        }
      };

      updateCanvasSize();
      window.addEventListener("resize", updateCanvasSize);
      return () => {
        window.removeEventListener("resize", updateCanvasSize);
      };
    }, [penColor, lineWidth]);

    // Get the pointer position on the canvas
    const getPointerPosition = (e: MouseEvent | TouchEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return null;

      const rect = canvas.getBoundingClientRect();

      if ("touches" in e) {
        return {
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top,
        };
      }

      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    // Start drawing on the canvas
    const startDrawing = (e: MouseEvent | TouchEvent) => {
      e.preventDefault();

      const pointerPosition = getPointerPosition(e);

      if (!pointerPosition) return;

      setIsDrawing(true);
      pointsRef.current = [pointerPosition];
      setIsEmpty(false);
    };

    const draw = (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      if (!isDrawing) return;

      const canvas = canvasRef.current;
      let ctx = ctxRef.current;

      if (!ctx) ctx = canvas?.getContext("2d") as CanvasRenderingContext2D;

      // Ensure strokeStyle is set with resolved color
      if (ctx) {
        ctx.strokeStyle = resolveColor(penColor);
      }

      const newPoint = getPointerPosition(e);

      if (ctx && newPoint) {
        const updated = [...pointsRef.current, newPoint];

        if (updated.length < 2) {
          pointsRef.current = updated;
          return;
        }

        if (updated.length === 2) {
          ctx.beginPath();
          ctx.moveTo(updated[0].x, updated[0].y);
          ctx.lineTo(updated[1].x, updated[1].y);
          ctx.stroke();

          pointsRef.current = updated;
          return;
        }

        const previous = updated[updated.length - 3];
        const current = updated[updated.length - 2];
        const next = updated[updated.length - 1];

        const cp1x = (previous.x + current.x) / 2;
        const cp1y = (previous.y + current.y) / 2;

        const cp2x = (current.x + next.x) / 2;
        const cp2y = (current.y + next.y) / 2;

        ctx.beginPath();
        ctx.moveTo(cp1x, cp1y);
        ctx.quadraticCurveTo(current.x, current.y, cp2x, cp2y);
        ctx.stroke();

        pointsRef.current = updated.slice(-3);
        return;
      }
    };

    const stopDrawing = () => {
      setIsDrawing(false);
      pointsRef.current = [];
      if (isDrawing) {
        onChange?.(
          canvasRef.current?.toDataURL("image/png") as Base64URLString
        );
      }
    };

    const handleClear = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setIsEmpty(true);
      onChange?.(null);
    };

    const handleSave = () => {
      const canvas = canvasRef.current;
      if (!canvas && isEmpty) return;

      const dataURL = canvas?.toDataURL("image/png");
      onSave?.(dataURL as Base64URLString);
    };

    return (
      <div className={cn("w-full relative", className)} {...props}>
        <canvas
          ref={canvasRef}
          className={cn(
            "rounded-lg cursor-pencil",
            signaturePadVariants({ variant, size })
          )}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />

        {showButtons && (
          <div className="absolute bottom-1 right-1 flex gap-0.5">
            <Button
              variant="pill"
              size="sm"
              onClick={handleClear}
              className="rounded-full"
              type="button"
            >
              {clearButtonIcon || <SymbolIcon />}
            </Button>
            <Button
              variant="pill"
              size="sm"
              onClick={handleSave}
              className="rounded-full"
              type="button"
            >
              {saveButtonIcon || <CheckIcon />}
            </Button>
          </div>
        )}
      </div>
    );
  }
);

export default SignaturePad;
