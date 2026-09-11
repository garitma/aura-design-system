import * as React from "react";

import { Button } from "../registry/default/components/ui/Button";
import {
  Presentation,
  PresentationContent,
  PresentationError,
  PresentationLoading,
  PresentationSelection,
  PresentationSlide,
  PresentationThumbnailList,
  PresentationViewport,
} from "../registry/default/components/ui/Presentation";

const SAMPLE_PPTX = "/fixtures/sample.pptx";

export const Default = () => {
  const [file, setFile] = React.useState<ArrayBuffer | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [picked, setPicked] = React.useState<File | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    let cancelled = false;
    fetch(SAMPLE_PPTX)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load sample pptx");
        }
        return response.arrayBuffer();
      })
      .then((buffer) => {
        if (!cancelled) setFile(buffer);
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load sample");
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const source = picked ?? file;

  return (
    <div className="flex w-full flex-col gap-0.5">
      <div className="flex flex-wrap items-center gap-0.5">
        <input
          ref={inputRef}
          type="file"
          accept=".pptx,application/vnd.openxmlformats-officedocument.presentationml.presentation"
          className="sr-only"
          onChange={(event) => {
            const next = event.target.files?.[0] ?? null;
            setPicked(next);
          }}
        />
        <Button
          type="button"
          variant="pill"
          size="sm"
          onClick={() => inputRef.current?.click()}
        >
          Open .pptx
        </Button>
        {error ? (
          <span className="text-xs text-danger-contrast">{error}</span>
        ) : null}
      </div>

      <Presentation
        file={source ?? undefined}
        readOnly
        className="h-32 w-full overflow-hidden rounded-md border border-gray-6 bg-gray-1"
      >
        <PresentationThumbnailList />
        <PresentationContent>
          <PresentationLoading />
          <PresentationError />
          <PresentationViewport>
            <PresentationSlide />
          </PresentationViewport>
        </PresentationContent>
      </Presentation>
    </div>
  );
};

export const Editing = () => {
  const [file, setFile] = React.useState<ArrayBuffer | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [picked, setPicked] = React.useState<File | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    let cancelled = false;
    fetch(SAMPLE_PPTX)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load sample pptx");
        }
        return response.arrayBuffer();
      })
      .then((buffer) => {
        if (!cancelled) setFile(buffer);
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load sample");
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const source = picked ?? file;

  return (
    <div className="flex w-full flex-col gap-0.5">
      <div className="flex flex-wrap items-center gap-0.5">
        <input
          ref={inputRef}
          type="file"
          accept=".pptx,application/vnd.openxmlformats-officedocument.presentationml.presentation"
          className="sr-only"
          onChange={(event) => {
            const next = event.target.files?.[0] ?? null;
            setPicked(next);
          }}
        />
        <Button
          type="button"
          variant="pill"
          size="sm"
          onClick={() => inputRef.current?.click()}
        >
          Open .pptx
        </Button>
        {error ? (
          <span className="text-xs text-danger-contrast">{error}</span>
        ) : null}
      </div>

      <Presentation
        file={source ?? undefined}
        readOnly={false}
        className="h-32 w-full overflow-hidden rounded-md border border-gray-6 bg-gray-1"
      >
        <PresentationThumbnailList />
        <PresentationContent>
          <PresentationLoading />
          <PresentationError />
          <PresentationViewport>
            <PresentationSlide>
              <PresentationSelection undoRedoShortcuts />
            </PresentationSlide>
          </PresentationViewport>
        </PresentationContent>
      </Presentation>
    </div>
  );
};
