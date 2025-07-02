import { cn } from "@/lib/utils";
import {
  codeBlockPlugin,
  diffSourcePlugin,
  headingsPlugin,
  imagePlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  MDXEditorProps,
  quotePlugin,
  tablePlugin,
  thematicBreakPlugin,
} from "@mdxeditor/editor";
import { memo } from "react";

interface MarkdownEditorProps extends MDXEditorProps {
  markdown: string;
  onChange: (markdown: string) => void;
  className?: string;
}

const MarkdownEditor = memo(
  ({ markdown, onChange, className }: MarkdownEditorProps) => {
    return (
      <MDXEditor
        markdown={markdown}
        onChange={(markdown) => onChange(markdown)}
        plugins={[
          headingsPlugin(),
          listsPlugin(),
          linkPlugin(),
          quotePlugin(),
          tablePlugin(),
          imagePlugin(),
          codeBlockPlugin(),
          thematicBreakPlugin(),
          diffSourcePlugin({
            viewMode: "rich-text",
            diffMarkdown: "", // Empty string works better
            readOnlyDiff: false,
          }),
          markdownShortcutPlugin(),
        ]}
        contentEditableClassName={cn(
          "outline-none max-w-none min-h-[80px] text-lg",
          "prose prose-p:my-3 prose-p:leading-relaxed prose-headings:my-4 prose-blockquote:my-4 prose-ul:my-2 prose-li:my-0 prose-code:px-1 prose-code:before:content-[''] prose-code:after:content-['']",
          "empty:before:content-[attr(placeholder)] empty:before:text-muted-foreground empty:before:absolute empty:before:cursor-text",
        )}
        className={cn("relative", className)}
      />
    );
  },
  (prevProps, nextProps) => {
    return prevProps.markdown === nextProps.markdown;
  },
);

export default MarkdownEditor;
