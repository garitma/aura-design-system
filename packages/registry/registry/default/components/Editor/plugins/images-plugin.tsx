"use client"

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { JSX, useEffect, useRef, useState } from "react"
import * as React from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $wrapNodeInElement, mergeRegister } from "@lexical/utils"
import {
  $createParagraphNode,
  $createRangeSelection,
  $getSelection,
  $insertNodes,
  $isNodeSelection,
  $isRootOrShadowRoot,
  $setSelection,
  CLICK_COMMAND,
  COMMAND_PRIORITY_EDITOR,
  COMMAND_PRIORITY_HIGH,
  COMMAND_PRIORITY_LOW,
  createCommand,
  DRAGOVER_COMMAND,
  DRAGSTART_COMMAND,
  DROP_COMMAND,
  LexicalCommand,
  LexicalEditor,
} from "lexical"

import {
  $createImageNode,
  $isImageNode,
  ImageNode,
  ImagePayload,
} from "@/components/Editor/nodes/image-node"
import { CAN_USE_DOM } from "@/components/Editor/shared/can-use-dom"
import Button from "@/components/ui/Button"
import { DialogFooter } from "@/components/ui/Dialog"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/Tabs"
import { CrossCircledIcon, TrashIcon } from "@radix-ui/react-icons"

export type InsertImagePayload = Readonly<ImagePayload>

const getDOMSelection = (targetWindow: Window | null): Selection | null =>
  CAN_USE_DOM ? (targetWindow || window).getSelection() : null

export const INSERT_IMAGE_COMMAND: LexicalCommand<InsertImagePayload> =
  createCommand("INSERT_IMAGE_COMMAND")

export function InsertImageUriDialogBody({
  onClick,
}: {
  onClick: (payload: InsertImagePayload) => void
}) {
  const [src, setSrc] = useState("")
  const [altText, setAltText] = useState("")

  const isDisabled = src === ""

  return (
    <div className="grid gap-4 py-4">
      <div className="grid gap-2">
        <Label htmlFor="image-url">Image URL</Label>
        <Input
          id="image-url"
          placeholder="i.e. https://source.unsplash.com/random"
          onChange={(e) => setSrc(e.target.value)}
          value={src}
          data-test-id="image-modal-url-input"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="alt-text">Alt Text</Label>
        <Input
          id="alt-text"
          placeholder="Random unsplash image"
          onChange={(e) => setAltText(e.target.value)}
          value={altText}
          data-test-id="image-modal-alt-text-input"
        />
      </div>
      <DialogFooter>
        <Button
          type="submit"
          isDisabled={isDisabled}
          onClick={() => onClick({ altText, src })}
          data-test-id="image-modal-confirm-btn"
        >
          Confirm
        </Button>
      </DialogFooter>
    </div>
  )
}

export function InsertImageUploadedDialogBody({
  onClick,
}: {
  onClick: (payload: InsertImagePayload) => void
}) {
  const [src, setSrc] = useState("")
  const [altText, setAltText] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedFileName, setUploadedFileName] = useState("")

  const isDisabled = src === "" || isUploading

  const handleImageUpload = async (file: File) => {
    try {
      setIsUploading(true)
      console.log("Iniciando carga de imagen:", file.name)

      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/images/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      console.log("Respuesta del servidor:", result)

      if (result.success && result.imageUrl) {
        console.log("Imagen subida exitosamente:", result.imageUrl)
        setSrc(result.imageUrl)
        setUploadedFileName(result.fileName)
        setAltText(file.name) // Usar el nombre del archivo como alt text por defecto
      } else {
        console.error("Error en la respuesta del servidor:", result.error)
        alert("Error al subir la imagen: " + (result.error || "Error desconocido"))
      }
    } catch (error) {
      console.error("Error uploading image:", error)
      const errorMessage = error instanceof Error ? error.message : "Error desconocido"
      alert("Error al subir la imagen: " + errorMessage)
    } finally {
      setIsUploading(false)
    }
  }

  const loadImage = (files: FileList | null) => {
    if (files !== null && files[0]) {
      handleImageUpload(files[0])
    }
  }

  const handleImageDelete = async () => {
    if (!src || !uploadedFileName) return

    try {
      // Extraer fileName y s3Folder de la URL
      const urlParts = src.split('/')
      const fileName = urlParts[urlParts.length - 1]
      const s3Folder = urlParts[urlParts.length - 2]

      const response = await fetch(
        `/api/images/delete?fileName=${fileName}&s3Folder=${s3Folder}`,
        {
          method: "DELETE",
        }
      )

      const result = await response.json()

      if (result.success) {
        console.log("Imagen eliminada exitosamente")
        setSrc("")
        setUploadedFileName("")
        setAltText("")
      } else {
        console.error("Error deleting image:", result.error)
      }
    } catch (error) {
      console.error("Error deleting image:", error)
    }
  }

  return (
    <div className="grid gap-4 py-4">
      {/* Input de archivo - solo visible cuando no hay imagen cargada */}
      {!src && (
        <div className="grid gap-2">
          <Label htmlFor="image-upload">Cargar Imagen</Label>
          <Input
            id="image-upload"
            type="file"
            onChange={(e) => loadImage(e.target.files)}
            accept="image/*"
            disabled={isUploading}
            data-test-id="image-modal-file-upload"
          />
        </div>
      )}

      {/* Estado de carga - solo visible durante la carga */}
      {isUploading && (
        <div className="flex items-center justify-center gap-2 text-sm text-gray-11 py-8">
          <div className="w-6 h-6 border-2 border-gray-7 border-t-accent-9 rounded-full animate-spin"></div>
          <span>Subiendo imagen...</span>
        </div>
      )}
      
      {/* Previsualización de imagen - solo visible cuando hay imagen cargada */}
      {src && !isUploading && (
        <div className="grid gap-2">
          <div className="inline-block relative m-auto">
            <img
              src={src}
              alt="Vista previa"
              className="max-w-full h-auto max-h-32 rounded-lg border"
            />
            <Button
              mode="link"
              onClick={handleImageDelete}
              className="absolute top-1 right-0  text-primary hover:text-red-600 rounded-full flex items-center justify-center text-xs"
            >
              <TrashIcon className="h-2 w-2" />
            </Button>
          </div>
        </div>
      )}

      {/* Campo de texto alternativo - solo visible cuando hay imagen cargada */}
      {src && !isUploading && (
        <div className="grid gap-2">
          <Label htmlFor="alt-text">Texto Alternativo</Label>
          <Input
            id="alt-text"
            placeholder="Texto alternativo"
            onChange={(e) => setAltText(e.target.value)}
            value={altText}
            data-test-id="image-modal-alt-text-input"
          />
        </div>
      )}
      
      {/* Botón de confirmar - solo visible cuando hay imagen cargada */}
      {src && !isUploading && (
        <Button
          type="submit"
          isDisabled={isDisabled}
          onClick={() => onClick({ altText, src })}
          data-test-id="image-modal-file-upload-btn"
        >
          Confirmar
        </Button>
      )}
    </div>
  )
}

export function InsertImageDialog({
  activeEditor,
  onClose,
}: {
  activeEditor: LexicalEditor
  onClose: () => void
}): JSX.Element {
  const hasModifier = useRef(false)

  useEffect(() => {
    hasModifier.current = false
    const handler = (e: KeyboardEvent) => {
      hasModifier.current = e.altKey
    }
    document.addEventListener("keydown", handler)
    return () => {
      document.removeEventListener("keydown", handler)
    }
  }, [activeEditor])

  const onClick = (payload: InsertImagePayload) => {
    activeEditor.dispatchCommand(INSERT_IMAGE_COMMAND, payload)
    onClose()
  }

  return (
    <InsertImageUploadedDialogBody onClick={onClick} />
  )
}

export function ImagesPlugin({
  captionsEnabled,
}: {
  captionsEnabled?: boolean
}): JSX.Element | null {
  const [editor] = useLexicalComposerContext()
  const [previousImageUrls, setPreviousImageUrls] = useState<Set<string>>(new Set())
  const [isInitialized, setIsInitialized] = useState(false)

  // Función para obtener todas las URLs de imágenes del editor
  const getCurrentImageUrls = (editorState: any): Set<string> => {
    const currentImageUrls = new Set<string>()
    const root = editorState._nodeMap
    
    root.forEach((node: any) => {
      if ($isImageNode(node)) {
        const src = node.getSrc()
        if (src && isS3ImageUrl(src)) {
          currentImageUrls.add(src)
        }
      }
    })
    
    return currentImageUrls
  }

  useEffect(() => {
    if (!editor.hasNodes([ImageNode])) {
      throw new Error("ImagesPlugin: ImageNode not registered on editor")
    }

    return mergeRegister(
      editor.registerCommand<InsertImagePayload>(
        INSERT_IMAGE_COMMAND,
        (payload) => {
          const imageNode = $createImageNode(payload)
          $insertNodes([imageNode])
          if ($isRootOrShadowRoot(imageNode.getParentOrThrow())) {
            $wrapNodeInElement(imageNode, $createParagraphNode).selectEnd()
          }

          return true
        },
        COMMAND_PRIORITY_EDITOR
      ),
      editor.registerCommand<DragEvent>(
        DRAGSTART_COMMAND,
        (event) => {
          return $onDragStart(event)
        },
        COMMAND_PRIORITY_HIGH
      ),
      editor.registerCommand<DragEvent>(
        DRAGOVER_COMMAND,
        (event) => {
          return $onDragover(event)
        },
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand<DragEvent>(
        DROP_COMMAND,
        (event) => {
          return $onDrop(event, editor)
        },
        COMMAND_PRIORITY_HIGH
      ),
      // Listener para detectar eliminación de imágenes y limpiar S3
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          const currentImageUrls = getCurrentImageUrls(editorState)

          // Solo procesar eliminaciones después de la inicialización
          if (isInitialized) {
            // Comparar con las URLs anteriores para detectar eliminaciones
            const deletedUrls = new Set<string>()
            previousImageUrls.forEach((url) => {
              if (!currentImageUrls.has(url)) {
                deletedUrls.add(url)
              }
            })

            // Eliminar imágenes huérfanas de S3
            deletedUrls.forEach((url) => {
              console.log("Imagen eliminada del editor, limpiando de S3:", url)
              handleImageDeleteFromS3(url)
            })
          } else {
            // Primera vez: solo inicializar el estado
            setIsInitialized(true)
          }

          // Actualizar el estado de URLs anteriores
          setPreviousImageUrls(currentImageUrls)
        })
      })
    )
  }, [captionsEnabled, editor, previousImageUrls, isInitialized])

  return null
}

// Función para verificar si una URL es de S3
const isS3ImageUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url)
    // Verificar si es una URL de S3 (contiene s3.amazonaws.com o el bucket name)
    return urlObj.hostname.includes('s3.amazonaws.com') || 
           urlObj.hostname.includes('amazonaws.com') ||
           urlObj.pathname.includes('diagnosis-images')
  } catch {
    return false
  }
}

// Función para eliminar imagen de S3
const handleImageDeleteFromS3 = async (imageUrl: string) => {
  try {
    // Extraer fileName y s3Folder de la URL
    const urlParts = imageUrl.split('/')
    const fileName = urlParts[urlParts.length - 1]
    const s3Folder = urlParts[urlParts.length - 2]

    const response = await fetch(
      `/api/images/delete?fileName=${fileName}&s3Folder=${s3Folder}`,
      {
        method: "DELETE",
      }
    )

    const result = await response.json()

    if (!result.success) {
      console.error("Error deleting image:", result.error)
    } else {
      console.log("Imagen eliminada exitosamente de S3")
    }
  } catch (error) {
    console.error("Error deleting image:", error)
  }
}

function $onDragStart(event: DragEvent): boolean {
  const node = $getImageNodeInSelection()
  if (!node) {
    return false
  }
  const dataTransfer = event.dataTransfer
  if (!dataTransfer) {
    return false
  }
  const TRANSPARENT_IMAGE =
    "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
  const img = document.createElement("img")
  img.src = TRANSPARENT_IMAGE
  dataTransfer.setData("text/plain", "_")
  dataTransfer.setDragImage(img, 0, 0)
  dataTransfer.setData(
    "application/x-lexical-drag",
    JSON.stringify({
      data: {
        altText: node.__altText,
        caption: node.__caption,
        height: node.__height,
        key: node.getKey(),
        maxWidth: node.__maxWidth,
        showCaption: node.__showCaption,
        src: node.__src,
        width: node.__width,
      },
      type: "image",
    })
  )

  return true
}

function $onDragover(event: DragEvent): boolean {
  const node = $getImageNodeInSelection()
  if (!node) {
    return false
  }
  if (!canDropImage(event)) {
    event.preventDefault()
  }
  return true
}

function $onDrop(event: DragEvent, editor: LexicalEditor): boolean {
  const node = $getImageNodeInSelection()
  if (!node) {
    return false
  }
  const data = getDragImageData(event)
  if (!data) {
    return false
  }
  event.preventDefault()
  if (canDropImage(event)) {
    const range = getDragSelection(event)
    node.remove()
    const rangeSelection = $createRangeSelection()
    if (range !== null && range !== undefined) {
      rangeSelection.applyDOMRange(range)
    }
    $setSelection(rangeSelection)
    editor.dispatchCommand(INSERT_IMAGE_COMMAND, data)
  }
  return true
}

function $getImageNodeInSelection(): ImageNode | null {
  const selection = $getSelection()
  if (!$isNodeSelection(selection)) {
    return null
  }
  const nodes = selection.getNodes()
  const node = nodes[0]
  return $isImageNode(node) ? node : null
}

function getDragImageData(event: DragEvent): null | InsertImagePayload {
  const dragData = event.dataTransfer?.getData("application/x-lexical-drag")
  if (!dragData) {
    return null
  }
  const { type, data } = JSON.parse(dragData)
  if (type !== "image") {
    return null
  }

  return data
}

declare global {
  interface DragEvent {
    rangeOffset?: number
    rangeParent?: Node
  }
}

function canDropImage(event: DragEvent): boolean {
  const target = event.target
  return !!(
    target &&
    target instanceof HTMLElement &&
    !target.closest("code, span.editor-image") &&
    target.parentElement &&
    target.parentElement.closest("div.ContentEditable__root")
  )
}

function getDragSelection(event: DragEvent): Range | null | undefined {
  let range
  const target = event.target as null | Element | Document
  const targetWindow =
    target == null
      ? null
      : target.nodeType === 9
        ? (target as Document).defaultView
        : (target as Element).ownerDocument.defaultView
  const domSelection = getDOMSelection(targetWindow)
  if (document.caretRangeFromPoint) {
    range = document.caretRangeFromPoint(event.clientX, event.clientY)
  } else if (event.rangeParent && domSelection !== null) {
    domSelection.collapse(event.rangeParent, event.rangeOffset || 0)
    range = domSelection.getRangeAt(0)
  } else {
    throw Error(`Cannot get the selection when dragging`)
  }

  return range
}
