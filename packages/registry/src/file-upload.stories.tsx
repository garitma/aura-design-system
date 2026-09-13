"use client";

import * as React from "react";
import { Cross2Icon, UploadIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";

import { Button } from "../registry/default/components/ui/Button";
import {
  FileUpload,
  FileUploadClear,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadItemProgress,
  FileUploadList,
  type FileUploadProps,
  FileUploadTrigger,
} from "../registry/default/components/ui/FileUpload";

export const Default = () => {
  const [files, setFiles] = React.useState<File[]>([]);

  return (
    <FileUpload
      maxFiles={2}
      maxSize={5 * 1024 * 1024}
      className="w-full max-w-md"
      value={files}
      onValueChange={setFiles}
      onFileReject={(file, message) => {
        toast(message, {
          description: `"${file.name.length > 20 ? `${file.name.slice(0, 20)}...` : file.name}" has been rejected`,
        });
      }}
      multiple
    >
      <FileUploadDropzone>
        <div className="flex flex-col items-center gap-1 text-center">
          <div className="flex size-4 items-center justify-center rounded-full border border-gray-6 bg-gray-2 text-gray-11">
            <UploadIcon className="icon h4" aria-hidden />
          </div>
          <p className="text-sm font-medium text-gray-12">
            Drag & drop files here
          </p>
          <p className="text-xs text-gray-11">
            Or click to browse (max 2 files, up to 5MB each)
          </p>
        </div>
        <FileUploadTrigger asChild>
          <Button type="button" variant="pill" size="sm" className="mt-1 w-fit">
            Browse files
          </Button>
        </FileUploadTrigger>
      </FileUploadDropzone>
      <FileUploadList>
        {files.map((file) => (
          <FileUploadItem key={file.name} value={file}>
            <FileUploadItemPreview />
            <FileUploadItemMetadata />
            <FileUploadItemDelete asChild>
              <Button
                type="button"
                variant="pill"
                size="icon"
                aria-label={`Remove ${file.name}`}
              >
                <Cross2Icon className="icon" />
              </Button>
            </FileUploadItemDelete>
          </FileUploadItem>
        ))}
      </FileUploadList>
    </FileUpload>
  );
};

export const WithValidation = () => {
  const [files, setFiles] = React.useState<File[]>([]);

  const onFileValidate = React.useCallback(
    (file: File): string | null => {
      if (files.length >= 2) {
        return "You can only upload up to 2 files";
      }
      if (!file.type.startsWith("image/")) {
        return "Only image files are allowed";
      }
      const maxSize = 2 * 1024 * 1024;
      if (file.size > maxSize) {
        return "File size must be less than 2MB";
      }
      return null;
    },
    [files],
  );

  return (
    <FileUpload
      value={files}
      onValueChange={setFiles}
      onFileValidate={onFileValidate}
      onFileReject={(file, message) => {
        toast(message, {
          description: `"${file.name.length > 20 ? `${file.name.slice(0, 20)}...` : file.name}" has been rejected`,
        });
      }}
      accept="image/*"
      maxFiles={2}
      className="w-full max-w-md"
      multiple
    >
      <FileUploadDropzone>
        <div className="flex flex-col items-center gap-1 text-center">
          <div className="flex size-4 items-center justify-center rounded-full border border-gray-6 bg-gray-2 text-gray-11">
            <UploadIcon className="icon h4" aria-hidden />
          </div>
          <p className="text-sm font-medium text-gray-12">
            Drag & drop files here
          </p>
          <p className="text-xs text-gray-11">
            Images only — max 2 files, 2MB each
          </p>
        </div>
        <FileUploadTrigger asChild>
          <Button type="button" variant="pill" size="sm" className="mt-1 w-fit">
            Browse files
          </Button>
        </FileUploadTrigger>
      </FileUploadDropzone>
      <FileUploadList>
        {files.map((file) => (
          <FileUploadItem key={file.name} value={file}>
            <FileUploadItemPreview />
            <FileUploadItemMetadata />
            <FileUploadItemDelete asChild>
              <Button
                type="button"
                variant="pill"
                size="icon"
                aria-label={`Remove ${file.name}`}
              >
                <Cross2Icon className="icon" />
              </Button>
            </FileUploadItemDelete>
          </FileUploadItem>
        ))}
      </FileUploadList>
    </FileUpload>
  );
};

export const DirectUpload = () => {
  const [files, setFiles] = React.useState<File[]>([]);

  const onUpload: NonNullable<FileUploadProps["onUpload"]> = React.useCallback(
    async (nextFiles, { onProgress, onSuccess, onError }) => {
      await Promise.all(
        nextFiles.map(async (file) => {
          try {
            const totalChunks = 10;
            for (let i = 0; i < totalChunks; i++) {
              await new Promise((resolve) =>
                setTimeout(resolve, Math.random() * 200 + 100),
              );
              onProgress(file, ((i + 1) / totalChunks) * 100);
            }
            await new Promise((resolve) => setTimeout(resolve, 250));
            onSuccess(file);
          } catch (error) {
            onError(
              file,
              error instanceof Error ? error : new Error("Upload failed"),
            );
          }
        }),
      );
    },
    [],
  );

  return (
    <FileUpload
      value={files}
      onValueChange={setFiles}
      onUpload={onUpload}
      onFileReject={(file, message) => {
        toast(message, {
          description: `"${file.name.length > 20 ? `${file.name.slice(0, 20)}...` : file.name}" has been rejected`,
        });
      }}
      maxFiles={2}
      className="w-full max-w-md"
      multiple
    >
      <FileUploadDropzone>
        <div className="flex flex-col items-center gap-1 text-center">
          <div className="flex size-4 items-center justify-center rounded-full border border-gray-6 bg-gray-2 text-gray-11">
            <UploadIcon className="icon h4" aria-hidden />
          </div>
          <p className="text-sm font-medium text-gray-12">
            Drag & drop files here
          </p>
          <p className="text-xs text-gray-11">
            Or click to browse (max 2 files)
          </p>
        </div>
        <FileUploadTrigger asChild>
          <Button type="button" variant="pill" size="sm" className="mt-1 w-fit">
            Browse files
          </Button>
        </FileUploadTrigger>
      </FileUploadDropzone>
      <FileUploadList>
        {files.map((file) => (
          <FileUploadItem key={file.name} value={file} className="flex-col">
            <div className="flex w-full items-center gap-1">
              <FileUploadItemPreview />
              <FileUploadItemMetadata />
              <FileUploadItemDelete asChild>
                <Button
                  type="button"
                  variant="pill"
                  size="icon"
                  aria-label={`Remove ${file.name}`}
                >
                  <Cross2Icon className="icon" />
                </Button>
              </FileUploadItemDelete>
            </div>
            <FileUploadItemProgress />
          </FileUploadItem>
        ))}
      </FileUploadList>
      <FileUploadClear asChild>
        <Button type="button" variant="pill" size="sm" className="w-fit">
          Clear all
        </Button>
      </FileUploadClear>
    </FileUpload>
  );
};

export const CircularProgress = () => {
  const [files, setFiles] = React.useState<File[]>([]);

  const onUpload: NonNullable<FileUploadProps["onUpload"]> = React.useCallback(
    async (nextFiles, { onProgress, onSuccess, onError }) => {
      await Promise.all(
        nextFiles.map(async (file) => {
          try {
            const totalChunks = 10;
            for (let i = 0; i < totalChunks; i++) {
              await new Promise((resolve) =>
                setTimeout(resolve, Math.random() * 200 + 100),
              );
              onProgress(file, ((i + 1) / totalChunks) * 100);
            }
            await new Promise((resolve) => setTimeout(resolve, 250));
            onSuccess(file);
          } catch (error) {
            onError(
              file,
              error instanceof Error ? error : new Error("Upload failed"),
            );
          }
        }),
      );
    },
    [],
  );

  return (
    <FileUpload
      value={files}
      onValueChange={setFiles}
      maxFiles={10}
      maxSize={5 * 1024 * 1024}
      className="w-full max-w-md"
      onUpload={onUpload}
      onFileReject={(file, message) => {
        toast(message, {
          description: `"${file.name.length > 20 ? `${file.name.slice(0, 20)}...` : file.name}" has been rejected`,
        });
      }}
      multiple
    >
      <FileUploadDropzone>
        <div className="flex flex-col items-center gap-1 text-center">
          <div className="flex size-4 items-center justify-center rounded-full border border-gray-6 bg-gray-2 text-gray-11">
            <UploadIcon className="icon h4" aria-hidden />
          </div>
          <p className="text-sm font-medium text-gray-12">
            Drag & drop files here
          </p>
          <p className="text-xs text-gray-11">
            Or click to browse (max 10 files, up to 5MB each)
          </p>
        </div>
        <FileUploadTrigger asChild>
          <Button type="button" variant="pill" size="sm" className="mt-1 w-fit">
            Browse files
          </Button>
        </FileUploadTrigger>
      </FileUploadDropzone>
      <FileUploadList orientation="horizontal">
        {files.map((file) => (
          <FileUploadItem key={file.name} value={file} className="p-0">
            <FileUploadItemPreview className="size-5">
              <FileUploadItemProgress variant="circular" size={40} />
            </FileUploadItemPreview>
            <FileUploadItemMetadata className="sr-only" />
            <FileUploadItemDelete asChild>
              <Button
                type="button"
                variant="pill"
                size="icon"
                className="absolute -top-0.5 -right-0.5 size-2"
                aria-label={`Remove ${file.name}`}
              >
                <Cross2Icon className="icon" />
              </Button>
            </FileUploadItemDelete>
          </FileUploadItem>
        ))}
      </FileUploadList>
    </FileUpload>
  );
};

export const FillProgress = () => {
  const [files, setFiles] = React.useState<File[]>([]);

  const onUpload: NonNullable<FileUploadProps["onUpload"]> = React.useCallback(
    async (nextFiles, { onProgress, onSuccess, onError }) => {
      await Promise.all(
        nextFiles.map(async (file) => {
          try {
            const totalChunks = 10;
            for (let i = 0; i < totalChunks; i++) {
              await new Promise((resolve) =>
                setTimeout(resolve, Math.random() * 200 + 100),
              );
              onProgress(file, ((i + 1) / totalChunks) * 100);
            }
            await new Promise((resolve) => setTimeout(resolve, 250));
            onSuccess(file);
          } catch (error) {
            onError(
              file,
              error instanceof Error ? error : new Error("Upload failed"),
            );
          }
        }),
      );
    },
    [],
  );

  return (
    <FileUpload
      value={files}
      onValueChange={setFiles}
      maxFiles={10}
      maxSize={5 * 1024 * 1024}
      className="w-full max-w-md"
      onUpload={onUpload}
      onFileReject={(file, message) => {
        toast(message, {
          description: `"${file.name.length > 20 ? `${file.name.slice(0, 20)}...` : file.name}" has been rejected`,
        });
      }}
      multiple
    >
      <FileUploadDropzone>
        <div className="flex flex-col items-center gap-1 text-center">
          <div className="flex size-4 items-center justify-center rounded-full border border-gray-6 bg-gray-2 text-gray-11">
            <UploadIcon className="icon h4" aria-hidden />
          </div>
          <p className="text-sm font-medium text-gray-12">
            Drag & drop files here
          </p>
          <p className="text-xs text-gray-11">
            Or click to browse (max 10 files, up to 5MB each)
          </p>
        </div>
        <FileUploadTrigger asChild>
          <Button type="button" variant="pill" size="sm" className="mt-1 w-fit">
            Browse files
          </Button>
        </FileUploadTrigger>
      </FileUploadDropzone>
      <FileUploadList orientation="horizontal">
        {files.map((file) => (
          <FileUploadItem key={file.name} value={file} className="p-0">
            <FileUploadItemPreview className="size-5">
              <FileUploadItemProgress variant="fill" />
            </FileUploadItemPreview>
            <FileUploadItemMetadata className="sr-only" />
            <FileUploadItemDelete asChild>
              <Button
                type="button"
                variant="pill"
                size="icon"
                className="absolute -top-0.5 -right-0.5 size-2"
                aria-label={`Remove ${file.name}`}
              >
                <Cross2Icon className="icon" />
              </Button>
            </FileUploadItemDelete>
          </FileUploadItem>
        ))}
      </FileUploadList>
    </FileUpload>
  );
};
