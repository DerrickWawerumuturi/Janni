import type { BubbleCommandType, slashCommandType } from '../types.ts'

export const slashCommands: slashCommandType[] = [
  {
    title: 'Text',
    description: 'Just start writing with plain text',
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).run()
      editor.chain().focus().setParagraph().run()
    },
  },

  {
    title: 'Heading 1',
    description: 'Big section heading',
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).run()
      editor.chain().focus().clearNodes().toggleHeading({ level: 1 }).run()
    },
  },
  {
    title: 'Heading 2',
    description: 'Medium section heading',
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).run()
      editor.chain().focus().clearNodes().toggleHeading({ level: 2 }).run()
    },
  },

  {
    title: 'Bullet List',
    description: 'Create a simple bullet list',
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).run()
      editor.chain().focus().clearNodes().toggleBulletList().run()
    },
  },
  {
    title: 'Numbered List',
    description: 'Create a numbered list',
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).run()
      editor.chain().focus().clearNodes().toggleOrderedList().run()
    },
  },

  {
    title: 'Checklist',
    description: 'Track tasks with checkboxes',
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).run()
      editor.chain().focus().toggleTaskList().run()
    },
  },

  {
    title: 'Quote',
    description: 'Capture a quote',
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).run()
      editor.chain().focus().toggleBlockquote().run()
    },
  },

  {
    title: 'Code Block',
    description: 'Write code with formatting',
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).run()
      editor.chain().focus().toggleCodeBlock().run()
    },
  },

  {
    title: 'Divider',
    description: 'Visually separate content',
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).run()
      editor.chain().focus().setHorizontalRule().run()
    },
  },

  {
    title: 'Bold',
    description: 'Make text bold',
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBold().run()
    },
  },
  {
    title: 'Italic',
    description: 'Italic text',
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleItalic().run()
    },
  },
  {
    title: 'Inline Code',
    description: 'Code inside text',
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleCode().run()
    },
  },
]

export const bubbleCommands: BubbleCommandType[] = [
  {
    label: 'Bold',
    action: (editor) => editor.chain().focus().toggleBold().run(),
    isActive: (editor) => editor.isActive('bold'),
  },

  {
    label: 'Italic',
    action: (editor) => editor.chain().focus().toggleItalic().run(),
    isActive: (editor) => editor.isActive('italic'),
  },

  {
    label: 'Strikethrough',
    action: (editor) => editor.chain().focus().toggleStrike().run(),
    isActive: (editor) => editor.isActive('strike'),
  },

  {
    label: '`',
    action: (editor) => editor.chain().focus().toggleCode().run(),
    isActive: (editor) => editor.isActive('code'),
  },

  {
    label: 'H1',
    action: (editor) =>
      editor.chain().focus().toggleHeading({ level: 1 }).run(),
    isActive: (editor) => editor.isActive('heading', { level: 1 }),
  },

  {
    label: 'H2',
    action: (editor) =>
      editor.chain().focus().toggleHeading({ level: 2 }).run(),
    isActive: (editor) => editor.isActive('heading', { level: 2 }),
  },

  {
    label: '•',
    action: (editor) => editor.chain().focus().toggleBulletList().run(),
    isActive: (editor) => editor.isActive('bulletList'),
  },

  {
    label: '1.',
    action: (editor) => editor.chain().focus().toggleOrderedList().run(),
    isActive: (editor) => editor.isActive('orderedList'),
  },

  {
    label: '☑',
    action: (editor) => editor.chain().focus().toggleTaskList().run(),
    isActive: (editor) => editor.isActive('taskList'),
  },

  {
    label: '❝',
    action: (editor) => editor.chain().focus().toggleBlockquote().run(),
    isActive: (editor) => editor.isActive('blockquote'),
  },

  {
    label: '</>',
    action: (editor) => editor.chain().focus().toggleCodeBlock().run(),
    isActive: (editor) => editor.isActive('codeBlock'),
  },

  {
    label: '—',
    action: (editor) => editor.chain().focus().setHorizontalRule().run(),
  },
]