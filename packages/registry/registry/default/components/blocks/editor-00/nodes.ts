import { HeadingNode, QuoteNode } from "@lexical/rich-text"
import {
  Klass,
  LexicalNode,
  LexicalNodeReplacement,
  ParagraphNode,
  TextNode,
} from "lexical"
import { LinkNode, AutoLinkNode } from "@lexical/link"
import { ListNode, ListItemNode } from "@lexical/list"
import { ImageNode } from "@/components/Editor/nodes/image-node"
import { HorizontalRuleNode } from "@lexical/react/LexicalHorizontalRuleNode"
import { CodeHighlightNode, CodeNode } from "@lexical/code"

export const nodes: ReadonlyArray<Klass<LexicalNode> | LexicalNodeReplacement> =
  [HeadingNode, ParagraphNode, TextNode, QuoteNode, LinkNode, AutoLinkNode, ImageNode, HorizontalRuleNode, ListNode, ListItemNode, CodeHighlightNode, CodeNode]
