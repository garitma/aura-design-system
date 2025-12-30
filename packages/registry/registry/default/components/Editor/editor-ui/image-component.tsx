import * as React from "react"
import { JSX, Suspense, useCallback, useEffect, useRef, useState } from "react"
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin"
import { useCollaborationContext } from "@lexical/react/LexicalCollaborationContext"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary"
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin"
import { LexicalNestedComposer } from "@lexical/react/LexicalNestedComposer"
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin"
import { useLexicalEditable } from "@lexical/react/useLexicalEditable"
import { useLexicalNodeSelection } from "@lexical/react/useLexicalNodeSelection"
import { mergeRegister } from "@lexical/utils"
import type {
  BaseSelection,
  LexicalCommand,
  LexicalEditor,
  NodeKey,
} from "lexical"
import {
  $getNodeByKey,
  $getSelection,
  $isNodeSelection,
  $isRangeSelection,
  $setSelection,
  CLICK_COMMAND,
  COMMAND_PRIORITY_LOW,
  createCommand,
  DRAGSTART_COMMAND,
  KEY_BACKSPACE_COMMAND,
  KEY_DELETE_COMMAND,
  KEY_ENTER_COMMAND,
  KEY_ESCAPE_COMMAND,
  ParagraphNode,
  RootNode,
  SELECTION_CHANGE_COMMAND,
  TextNode,
} from "lexical"

// import brokenImage from '@/registry/new-york-v4/editor/images/image-broken.svg';
import { ContentEditable } from "@/components/Editor/editor-ui/content-editable"
import { ImageResizer } from "@/components/Editor/editor-ui/image-resizer"
import { $isImageNode } from "@/components/Editor/nodes/image-node"

const imageCache = new Set()

export const RIGHT_CLICK_IMAGE_COMMAND: LexicalCommand<MouseEvent> =
  createCommand("RIGHT_CLICK_IMAGE_COMMAND")

function useSuspenseImage(src: string) {
  if (!imageCache.has(src)) {
    throw new Promise((resolve) => {
      const img = new Image()
      img.src = src
      img.onload = () => {
        imageCache.add(src)
        resolve(null)
      }
      img.onerror = () => {
        imageCache.add(src)
      }
    })
  }
}

function LazyImage({
  altText,
  className,
  imageRef,
  src,
  width,
  height,
  maxWidth,
  onError,
}: {
  altText: string
  className: string | null
  height: "inherit" | number
  imageRef: { current: null | HTMLImageElement }
  maxWidth: number
  src: string
  width: "inherit" | number
  onError: () => void
}): JSX.Element {
  useSuspenseImage(src)
  return (
    <img
      className={className || undefined}
      src={src}
      alt={altText}
      ref={imageRef}
      style={{
        height,
        maxWidth,
        width,
      }}
      onError={onError}
      draggable="false"
    />
  )
}

function BrokenImage(): JSX.Element {
  return (
    <img
      src={""}
      style={{
        height: 200,
        opacity: 0.2,
        width: 200,
      }}
      draggable="false"
    />
  )
}

export default function ImageComponent({
  src,
  altText,
  nodeKey,
  width,
  height,
  maxWidth,
  resizable,
  showCaption,
  caption,
  captionsEnabled,
}: {
  altText: string
  caption: LexicalEditor
  height: "inherit" | number
  maxWidth: number
  nodeKey: NodeKey
  resizable: boolean
  showCaption: boolean
  src: string
  width: "inherit" | number
  captionsEnabled: boolean
}): JSX.Element {
  const imageRef = useRef<null | HTMLImageElement>(null)
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const [isSelected, setSelected, clearSelection] =
    useLexicalNodeSelection(nodeKey)
  const [isResizing, setIsResizing] = useState<boolean>(false)
  const [editor] = useLexicalComposerContext()
  
  // Hook personalizado para manejar el contexto de colaboración de manera segura
  const useSafeCollaborationContext = () => {
    try {
      return useCollaborationContext()
    } catch (error) {
      return { isCollabActive: false }
    }
  }
  
  const { isCollabActive } = useSafeCollaborationContext()
  const [selection, setSelection] = useState<BaseSelection | null>(null)
  const activeEditorRef = useRef<LexicalEditor | null>(null)
  const [isLoadError, setIsLoadError] = useState<boolean>(false)
  const isEditable = useLexicalEditable()

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

  // Función para eliminar imagen de S3
  const deleteImageFromS3 = async (imageSrc: string) => {
    try {
      const { s3Folder, fileName } = getS3InfoFromUrl(imageSrc)
      
      const response = await fetch(`/api/images/delete?fileName=${encodeURIComponent(fileName)}&s3Folder=${encodeURIComponent(s3Folder)}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        console.error('Error al eliminar la imagen de S3:', await response.text())
      }
    } catch (error) {
      console.error('Error al eliminar la imagen de S3:', error)
    }
  }

  const $onDelete = useCallback(
    (payload: KeyboardEvent) => {
      const deleteSelection = $getSelection()
      if (isSelected && $isNodeSelection(deleteSelection)) {
        const event: KeyboardEvent = payload
        event.preventDefault()
        
        // Recopilar las URLs de las imágenes antes de eliminarlas
        const imageUrls: string[] = []
        deleteSelection.getNodes().forEach((node) => {
          if ($isImageNode(node)) {
            imageUrls.push(node.getSrc())
          }
        })
        
        editor.update(() => {
          deleteSelection.getNodes().forEach((node) => {
            if ($isImageNode(node)) {
              node.remove()
            }
          })
        })
        
        // Eliminar las imágenes de S3 después de remover los nodos
        imageUrls.forEach(url => {
          deleteImageFromS3(url)
        })
      }
      return false
    },
    [editor, isSelected]
  )

  const $onEnter = useCallback(
    (event: KeyboardEvent) => {
      const latestSelection = $getSelection()
      const buttonElem = buttonRef.current
      if (
        isSelected &&
        $isNodeSelection(latestSelection) &&
        latestSelection.getNodes().length === 1
      ) {
        if (showCaption) {
          // Move focus into nested editor
          $setSelection(null)
          event.preventDefault()
          caption.focus()
          return true
        } else if (
          buttonElem !== null &&
          buttonElem !== document.activeElement
        ) {
          event.preventDefault()
          buttonElem.focus()
          return true
        }
      }
      return false
    },
    [caption, isSelected, showCaption]
  )

  const $onEscape = useCallback(
    (event: KeyboardEvent) => {
      if (
        activeEditorRef.current === caption ||
        buttonRef.current === event.target
      ) {
        $setSelection(null)
        editor.update(() => {
          setSelected(true)
          const parentRootElement = editor.getRootElement()
          if (parentRootElement !== null) {
            parentRootElement.focus()
          }
        })
        return true
      }
      return false
    },
    [caption, editor, setSelected]
  )

  const onClick = useCallback(
    (payload: MouseEvent) => {
      const event = payload

      if (isResizing) {
        return true
      }
      if (event.target === imageRef.current) {
        if (event.shiftKey) {
          setSelected(!isSelected)
        } else {
          clearSelection()
          setSelected(true)
        }
        return true
      }

      return false
    },
    [isResizing, isSelected, setSelected, clearSelection]
  )

  const onRightClick = useCallback(
    (event: MouseEvent): void => {
      editor.getEditorState().read(() => {
        const latestSelection = $getSelection()
        const domElement = event.target as HTMLElement
        if (
          domElement.tagName === "IMG" &&
          $isRangeSelection(latestSelection) &&
          latestSelection.getNodes().length === 1
        ) {
          editor.dispatchCommand(RIGHT_CLICK_IMAGE_COMMAND, event as MouseEvent)
        }
      })
    },
    [editor]
  )

  useEffect(() => {
    let isMounted = true
    const rootElement = editor.getRootElement()
    const unregister = mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        if (isMounted) {
          setSelection(editorState.read(() => $getSelection()))
        }
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_, activeEditor) => {
          activeEditorRef.current = activeEditor
          return false
        },
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand<MouseEvent>(
        CLICK_COMMAND,
        onClick,
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand<MouseEvent>(
        RIGHT_CLICK_IMAGE_COMMAND,
        onClick,
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(
        DRAGSTART_COMMAND,
        (event) => {
          if (event.target === imageRef.current) {
            // TODO This is just a temporary workaround for FF to behave like other browsers.
            // Ideally, this handles drag & drop too (and all browsers).
            event.preventDefault()
            return true
          }
          return false
        },
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(
        KEY_DELETE_COMMAND,
        $onDelete,
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(
        KEY_BACKSPACE_COMMAND,
        $onDelete,
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(KEY_ENTER_COMMAND, $onEnter, COMMAND_PRIORITY_LOW),
      editor.registerCommand(
        KEY_ESCAPE_COMMAND,
        $onEscape,
        COMMAND_PRIORITY_LOW
      )
    )

    rootElement?.addEventListener("contextmenu", onRightClick)

    return () => {
      isMounted = false
      unregister()
      rootElement?.removeEventListener("contextmenu", onRightClick)
    }
  }, [
    clearSelection,
    editor,
    isResizing,
    isSelected,
    nodeKey,
    $onDelete,
    $onEnter,
    $onEscape,
    onClick,
    onRightClick,
    setSelected,
  ])

  const setShowCaption = () => {
    editor.update(() => {
      const node = $getNodeByKey(nodeKey)
      if ($isImageNode(node)) {
        node.setShowCaption(true)
      }
    })
  }

  const onResizeEnd = (
    nextWidth: "inherit" | number,
    nextHeight: "inherit" | number
  ) => {
    // Delay hiding the resize bars for click case
    setTimeout(() => {
      setIsResizing(false)
    }, 200)

    editor.update(() => {
      const node = $getNodeByKey(nodeKey)
      if ($isImageNode(node)) {
        node.setWidthAndHeight(nextWidth, nextHeight)
      }
    })
  }

  const onResizeStart = () => {
    setIsResizing(true)
  }

  const draggable = isSelected && $isNodeSelection(selection) && !isResizing
  const isFocused = (isSelected || isResizing) && isEditable
  return (
    <Suspense fallback={null}>
      <>
        <div draggable={draggable}>
          {isLoadError ? (
            <BrokenImage />
          ) : (
            <LazyImage
              className={`max-w-full cursor-default ${
                isFocused
                  ? `${$isNodeSelection(selection) ? "draggable cursor-grab active:cursor-grabbing" : ""} focused ring-primary ring-2 ring-offset-2`
                  : null
              }`}
              src={src}
              altText={altText}
              imageRef={imageRef}
              width={width}
              height={height}
              maxWidth={maxWidth}
              onError={() => setIsLoadError(true)}
            />
          )}
        </div>

        {showCaption && (
          <div className="image-caption-container absolute right-0 bottom-1 left-0 m-0 block min-w-[100px] overflow-hidden border-t bg-gray-1/90 p-0">
            <LexicalNestedComposer
              initialEditor={caption}
              initialNodes={[RootNode, TextNode, ParagraphNode]}
            >
              <AutoFocusPlugin />
              <HistoryPlugin />
              <RichTextPlugin
                contentEditable={
                  <ContentEditable
                    className="ImageNode__contentEditable user-select-text word-break-break-word caret-primary relative block min-h-5 w-[calc(100%-20px)] cursor-text resize-none border-0 p-2.5 text-sm whitespace-pre-wrap outline-none"
                    placeholderClassName="ImageNode__placeholder text-sm text-muted-foreground overflow-hidden absolute top-2.5 left-2.5 pointer-events-none text-ellipsis user-select-none whitespace-nowrap inline-block"
                    placeholder="Enter a caption..."
                  />
                }
                ErrorBoundary={LexicalErrorBoundary}
              />
            </LexicalNestedComposer>
          </div>
        )}
        {resizable && $isNodeSelection(selection) && isFocused && (
          <ImageResizer
            showCaption={showCaption}
            setShowCaption={setShowCaption}
            editor={editor}
            buttonRef={buttonRef}
            imageRef={imageRef}
            maxWidth={maxWidth}
            onResizeStart={onResizeStart}
            onResizeEnd={onResizeEnd}
            captionsEnabled={!isLoadError && captionsEnabled}
            src={src}
            nodeKey={nodeKey}
          />
        )}
      </>
    </Suspense>
  )
}
