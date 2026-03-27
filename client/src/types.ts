import { Editor } from '@tiptap/react'

export type CommandProps = {
    editor: Editor
    range: {
        from: number
        to: number
    }
}

export type slashCommandType = {
    title: string
    description: string
    command: (props: CommandProps) => void
}

export type BubbleCommandType = {
  label: string
  action: (editor: Editor) => void
  isActive?: (editor: Editor) => boolean
}


export type Blog = {
  id: number
  title: string
  content: string
  image_url: string
  created_at: string
}

