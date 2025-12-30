import * as React from "react"
import { JSX, useRef } from "react"
import { calculateZoomLevel } from "@lexical/utils"
import type { LexicalEditor } from "lexical"
import { $getNodeByKey } from "lexical"

import Button from "@/components/ui/Button"
import { Trash2 } from "lucide-react"
import { $isImageNode } from "@/components/Editor/nodes/image-node"

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

const Direction = {
  east: 1 << 0,
  north: 1 << 3,
  south: 1 << 1,
  west: 1 << 2,
}

export function ImageResizer({
  onResizeStart,
  onResizeEnd,
  buttonRef,
  imageRef,
  maxWidth,
  editor,
  showCaption,
  setShowCaption,
  captionsEnabled,
  src,
  nodeKey,
}: {
  editor: LexicalEditor
  buttonRef: { current: null | HTMLButtonElement }
  imageRef: { current: null | HTMLElement }
  maxWidth?: number
  onResizeEnd: (width: "inherit" | number, height: "inherit" | number) => void
  onResizeStart: () => void
  setShowCaption: (show: boolean) => void
  showCaption: boolean
  captionsEnabled: boolean
  src: string
  nodeKey: string
}): JSX.Element {
  const controlWrapperRef = useRef<HTMLDivElement>(null)
  const userSelect = useRef({
    priority: "",
    value: "default",
  })
  const positioningRef = useRef<{
    currentHeight: "inherit" | number
    currentWidth: "inherit" | number
    direction: number
    isResizing: boolean
    ratio: number
    startHeight: number
    startWidth: number
    startX: number
    startY: number
  }>({
    currentHeight: 0,
    currentWidth: 0,
    direction: 0,
    isResizing: false,
    ratio: 0,
    startHeight: 0,
    startWidth: 0,
    startX: 0,
    startY: 0,
  })
  const editorRootElement = editor.getRootElement()
  // Find max width, accounting for editor padding.
  const maxWidthContainer = maxWidth
    ? maxWidth
    : editorRootElement !== null
      ? editorRootElement.getBoundingClientRect().width - 20
      : 100
  const maxHeightContainer =
    editorRootElement !== null
      ? editorRootElement.getBoundingClientRect().height - 20
      : 100

  const minWidth = 100
  const minHeight = 100

  // Función para extraer el s3Folder y fileName de la URL
  const getS3InfoFromUrl = (url: string): { s3Folder: string; fileName: string } => {
    try {
      const urlObj = new URL(url)
      const pathname = urlObj.pathname

      // Remover el primer slash y dividir por '/'
      const pathParts = pathname.substring(1).split('/')

      if (pathParts.length >= 2) {
        const s3Folder = pathParts[0]
        const fileName = pathParts[pathParts.length - 1] // Último elemento es el fileName
        return { s3Folder, fileName }
      }

      // Fallback si no tiene el formato esperado
      return { s3Folder: 'images', fileName: pathParts[pathParts.length - 1] || '' }
    } catch {
      // Si no es una URL válida, intentar extraer de otra manera
      const parts = url.split('/')
      const fileName = parts[parts.length - 1] || ''
      return { s3Folder: 'images', fileName }
    }
  }

  // Función para eliminar la imagen
  const handleDeleteImage = async () => {
    try {
      const { s3Folder, fileName } = getS3InfoFromUrl(src)

      // Llamar a la API para eliminar la imagen
      const response = await fetch(`/api/images/delete?fileName=${encodeURIComponent(fileName)}&s3Folder=${encodeURIComponent(s3Folder)}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        // Si la eliminación fue exitosa, remover el nodo de imagen del editor
        editor.update(() => {
          const node = $getNodeByKey(nodeKey)
          if ($isImageNode(node)) {
            node.remove()
          }
        })
      } else {
        console.error('Error al eliminar la imagen:', await response.text())
      }
    } catch (error) {
      console.error('Error al eliminar la imagen:', error)
    }
  }

  const setStartCursor = (direction: number) => {
    const ew = direction === Direction.east || direction === Direction.west
    const ns = direction === Direction.north || direction === Direction.south
    const nwse =
      (direction & Direction.north && direction & Direction.west) ||
      (direction & Direction.south && direction & Direction.east)

    const cursorDir = ew ? "ew" : ns ? "ns" : nwse ? "nwse" : "nesw"

    if (editorRootElement !== null) {
      editorRootElement.style.setProperty(
        "cursor",
        `${cursorDir}-resize`,
        "important"
      )
    }
    if (document.body !== null) {
      document.body.style.setProperty(
        "cursor",
        `${cursorDir}-resize`,
        "important"
      )
      userSelect.current.value = document.body.style.getPropertyValue(
        "-webkit-user-select"
      )
      userSelect.current.priority = document.body.style.getPropertyPriority(
        "-webkit-user-select"
      )
      document.body.style.setProperty(
        "-webkit-user-select",
        `none`,
        "important"
      )
    }
  }

  const setEndCursor = () => {
    if (editorRootElement !== null) {
      editorRootElement.style.setProperty("cursor", "text")
    }
    if (document.body !== null) {
      document.body.style.setProperty("cursor", "default")
      document.body.style.setProperty(
        "-webkit-user-select",
        userSelect.current.value,
        userSelect.current.priority
      )
    }
  }

  const handlePointerDown = (
    event: React.PointerEvent<HTMLDivElement>,
    direction: number
  ) => {
    if (!editor.isEditable()) {
      return
    }

    const image = imageRef.current
    const controlWrapper = controlWrapperRef.current

    if (image !== null && controlWrapper !== null) {
      event.preventDefault()
      const { width, height } = image.getBoundingClientRect()
      const zoom = calculateZoomLevel(image)
      const positioning = positioningRef.current
      positioning.startWidth = width
      positioning.startHeight = height
      positioning.ratio = width / height
      positioning.currentWidth = width
      positioning.currentHeight = height
      positioning.startX = event.clientX / zoom
      positioning.startY = event.clientY / zoom
      positioning.isResizing = true
      positioning.direction = direction

      setStartCursor(direction)
      onResizeStart()

      controlWrapper.classList.add("touch-action-none")
      image.style.height = `${height}px`
      image.style.width = `${width}px`

      document.addEventListener("pointermove", handlePointerMove)
      document.addEventListener("pointerup", handlePointerUp)
    }
  }
  const handlePointerMove = (event: PointerEvent) => {
    const image = imageRef.current
    const positioning = positioningRef.current

    const isHorizontal =
      positioning.direction & (Direction.east | Direction.west)
    const isVertical =
      positioning.direction & (Direction.south | Direction.north)

    if (image !== null && positioning.isResizing) {
      const zoom = calculateZoomLevel(image)
      // Corner cursor
      if (isHorizontal && isVertical) {
        let diff = Math.floor(positioning.startX - event.clientX / zoom)
        diff = positioning.direction & Direction.east ? -diff : diff

        const width = clamp(
          positioning.startWidth + diff,
          minWidth,
          maxWidthContainer
        )

        const height = width / positioning.ratio
        image.style.width = `${width}px`
        image.style.height = `${height}px`
        positioning.currentHeight = height
        positioning.currentWidth = width
      } else if (isVertical) {
        let diff = Math.floor(positioning.startY - event.clientY / zoom)
        diff = positioning.direction & Direction.south ? -diff : diff

        const height = clamp(
          positioning.startHeight + diff,
          minHeight,
          maxHeightContainer
        )

        image.style.height = `${height}px`
        positioning.currentHeight = height
      } else {
        let diff = Math.floor(positioning.startX - event.clientX / zoom)
        diff = positioning.direction & Direction.east ? -diff : diff

        const width = clamp(
          positioning.startWidth + diff,
          minWidth,
          maxWidthContainer
        )

        image.style.width = `${width}px`
        positioning.currentWidth = width
      }
    }
  }
  const handlePointerUp = () => {
    const image = imageRef.current
    const positioning = positioningRef.current
    const controlWrapper = controlWrapperRef.current
    if (image !== null && controlWrapper !== null && positioning.isResizing) {
      const width = positioning.currentWidth
      const height = positioning.currentHeight
      positioning.startWidth = 0
      positioning.startHeight = 0
      positioning.ratio = 0
      positioning.startX = 0
      positioning.startY = 0
      positioning.currentWidth = 0
      positioning.currentHeight = 0
      positioning.isResizing = false

      controlWrapper.classList.remove("touch-action-none")

      setEndCursor()
      onResizeEnd(width, height)

      document.removeEventListener("pointermove", handlePointerMove)
      document.removeEventListener("pointerup", handlePointerUp)
    }
  }
  return (
    <div ref={controlWrapperRef}>
      <Button
        className="image-caption-button absolute top-1 right-1"
        ref={buttonRef}
        mode="fill"
        size="small"
        onClick={handleDeleteImage}
      >
        <Trash2 className="h-1.5 w-1.5" />
      </Button>
      <div
        className="image-resizer image-resizer-n bg-primary absolute -top-2.5 left-1/2 h-2 w-2 -translate-x-1/2 cursor-ns-resize"
        onPointerDown={(event) => {
          handlePointerDown(event, Direction.north)
        }}
      />
      <div
        className="image-resizer image-resizer-ne bg-primary absolute -top-2.5 -right-2.5 h-2 w-2 cursor-nesw-resize"
        onPointerDown={(event) => {
          handlePointerDown(event, Direction.north | Direction.east)
        }}
      />
      <div
        className="image-resizer image-resizer-e bg-primary absolute top-1/2 -right-2.5 h-2 w-2 -translate-y-1/2 cursor-ew-resize"
        onPointerDown={(event) => {
          handlePointerDown(event, Direction.east)
        }}
      />
      <div
        className="image-resizer image-resizer-se bg-primary absolute -right-2.5 -bottom-2.5 h-2 w-2 cursor-nwse-resize"
        onPointerDown={(event) => {
          handlePointerDown(event, Direction.south | Direction.east)
        }}
      />
      <div
        className="image-resizer image-resizer-s bg-primary absolute -bottom-2.5 left-1/2 h-2 w-2 -translate-x-1/2 cursor-ns-resize"
        onPointerDown={(event) => {
          handlePointerDown(event, Direction.south)
        }}
      />
      <div
        className="image-resizer image-resizer-sw bg-primary absolute -bottom-2.5 -left-2.5 h-2 w-2 cursor-nesw-resize"
        onPointerDown={(event) => {
          handlePointerDown(event, Direction.south | Direction.west)
        }}
      />
      <div
        className="image-resizer image-resizer-w bg-primary absolute top-1/2 -left-2.5 h-2 w-2 -translate-y-1/2 cursor-ew-resize"
        onPointerDown={(event) => {
          handlePointerDown(event, Direction.west)
        }}
      />
      <div
        className="image-resizer image-resizer-nw bg-primary absolute -top-2.5 -left-2.5 h-2 w-2 cursor-nwse-resize"
        onPointerDown={(event) => {
          handlePointerDown(event, Direction.north | Direction.west)
        }}
      />
    </div>
  )
}
