import { useState } from "react";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { ClickableLinkPlugin } from "@lexical/react/LexicalClickableLinkPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import {
  CHECK_LIST,
  ELEMENT_TRANSFORMERS,
  MULTILINE_ELEMENT_TRANSFORMERS,
  TEXT_FORMAT_TRANSFORMERS,
  TEXT_MATCH_TRANSFORMERS,
  TRANSFORMERS,
} from "@lexical/markdown";

import { FloatingLinkEditorPlugin } from "@/components/Editor/plugins/floating-link-editor-plugin";
import { AutoLinkPlugin } from "@/components/Editor/editor-ui/auto-link-plugin";

import { ContentEditable } from "@/components/Editor/editor-ui/content-editable";
import { ToolbarPlugin } from "@/components/Editor/plugins/toolbar/toolbar-plugin";
import { FontFormatToolbarPlugin } from "@/components/Editor/plugins/toolbar/font-format-toolbar-plugin";
import { BlockFormatDropDown } from "@/components/Editor/plugins/toolbar/block-format-toolbar-plugin";
import { FormatParagraph } from "@/components/Editor/plugins/toolbar/block-format/format-paragraph";
import { FormatHeading } from "@/components/Editor/plugins/toolbar/block-format/format-heading";
import { FormatNumberedList } from "@/components/Editor/plugins/toolbar/block-format/format-numbered-list";
import { FormatBulletedList } from "@/components/Editor/plugins/toolbar/block-format/format-bulleted-list";
import { FormatQuote } from "@/components/Editor/plugins/toolbar/block-format/format-quote";
import { LinkToolbarPlugin } from "@/components/Editor/plugins/toolbar/link-toolbar-plugin";
import { HR } from "@/components/Editor/transformers/markdown-hr-transformer";
import { IMAGE } from "@/components/Editor/transformers/markdown-image-transformer";

import { ImagesPlugin } from "@/components/Editor/plugins/images-plugin";
import { InsertImage } from "@/components/Editor/plugins/insert-image";
import { MarkdownTogglePlugin } from "@/components/Editor/plugins/actions/markdown-toggle-plugin";
import { ConverToMarkdownChangePlugin } from "@/components/Editor/plugins/converto-to-markdown-change";
import { HistoryToolbarPlugin } from "@/components/Editor/plugins/toolbar/history-toolbar-plugin";

export function Plugins({ onChange }: { onChange?: (state: any) => void }) {
  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null);

  const [isLinkEditMode, setIsLinkEditMode] = useState<boolean>(false);

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  return (
    <>
      <ToolbarPlugin>
        {({ blockType }) => (
          <div className="flex items-center gap-0.5 overflow-auto px-1 top-0 z-5 bg-gray-1 rounded-t-md p-0.5 border-b border-gray-a6 justify-between">
            <div>
              <HistoryToolbarPlugin />
            </div>

            <div className=" items-center gap-0.5 flex">
              <BlockFormatDropDown>
                <FormatParagraph />
                <FormatHeading levels={["h1", "h2", "h3"]} />
                <FormatNumberedList />
                <FormatBulletedList />
                <FormatQuote />
              </BlockFormatDropDown>
              <FontFormatToolbarPlugin format="bold" />
              <FontFormatToolbarPlugin format="italic" />
              <FontFormatToolbarPlugin format="underline" />
              <FontFormatToolbarPlugin format="strikethrough" />
              <LinkToolbarPlugin setIsLinkEditMode={setIsLinkEditMode} />
              <InsertImage />
            </div>
            <div>
              <MarkdownTogglePlugin
                transformers={[
                  HR,
                  IMAGE,
                  CHECK_LIST,
                  ...ELEMENT_TRANSFORMERS,
                  ...MULTILINE_ELEMENT_TRANSFORMERS,
                  ...TEXT_FORMAT_TRANSFORMERS,
                  ...TEXT_MATCH_TRANSFORMERS,
                ]}
                shouldPreserveNewLinesInMarkdown={true}
              />
            </div>
          </div>
        )}
      </ToolbarPlugin>
      <RichTextPlugin
        contentEditable={
          <div className="">
            <div className="relative" ref={onRef}>
              <ContentEditable placeholder="Comienza a escribir algo ..." />
            </div>
          </div>
        }
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
      <ListPlugin />
      {/* <CheckListPlugin /> */}
      <ClickableLinkPlugin />
      <AutoLinkPlugin />
      <LinkPlugin />
      <FloatingLinkEditorPlugin
        anchorElem={floatingAnchorElem}
        isLinkEditMode={isLinkEditMode}
        setIsLinkEditMode={setIsLinkEditMode}
      />
      <ImagesPlugin />
      <MarkdownShortcutPlugin
        transformers={[
          HR,
          IMAGE,
          CHECK_LIST,
          ...ELEMENT_TRANSFORMERS,
          ...MULTILINE_ELEMENT_TRANSFORMERS,
          ...TEXT_FORMAT_TRANSFORMERS,
          ...TEXT_MATCH_TRANSFORMERS,
          ...TRANSFORMERS,
        ]}
      />

      {/* actions plugins */}
      {onChange && <ConverToMarkdownChangePlugin onChange={onChange} />}
    </>
  );
}
