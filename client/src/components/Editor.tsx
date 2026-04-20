import {useEditor, EditorContent, EditorContext} from "@tiptap/react"
import { BubbleMenu} from '@tiptap/react/menus'
import StarterKit from '@tiptap/starter-kit'
import { useMemo } from 'react'
import {slashCommand} from "../tiptap/Extentions.tsx";
import PlaceHolder from "@tiptap/extension-placeholder"
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import { bubbleCommands } from '../tiptap/commands.ts'
import { useEffect } from 'react'

const Tiptap = ({
  onChange,
  content,
}: {
  onChange?: (content: string) => void
  content: string
}) => {

  const editor = useEditor({
    extensions: [
      StarterKit,
      slashCommand,
      TaskList,
      TaskItem.configure({ nested: true }),
      HorizontalRule,
      PlaceHolder.configure({
        placeholder: 'Type "/" to see commands',
      }),
    ],
    content: content,
    onUpdate({ editor }) {
      onChange?.(editor.getHTML())
    },
  })

  useEffect(() => {
      if (!editor) return;

      const current = editor.getHTML();

      if (current !== content) {
        editor.commands.setContent(content)
      }
  }, [content, editor])

  const providerValue = useMemo(() => ({ editor }), [editor])

  return (
    <EditorContext.Provider value={providerValue}>
      <EditorContent
        editor={editor}
        className="prose min-h-50 w-full proseMirror "
      />
      <BubbleMenu
        editor={editor}
        className="bg-white border shadow-md rounded-lg flex gap-2 p-2"
      >
        {bubbleCommands.map((cmd: any, index: any) => (
          <button
            key={index}
            onClick={() => cmd.action(editor)}
            className={`px-2 py-1 rounded  ${
              cmd.isActive?.(editor)
                ? 'bg-gray-200'
                : 'hover:bg-gray-100 hover:cursor-pointer'
            }`}
          >
            {cmd.label}
          </button>
        ))}
      </BubbleMenu>
    </EditorContext.Provider>
  )
}

export default Tiptap