import {Extension} from "@tiptap/core";
import Suggestion from "@tiptap/suggestion"
import type {slashCommandType} from "../types.ts";
import {slashCommands} from "./commands.ts";




export const slashCommand = Extension.create({
    name: "SlashCommand",
    addOptions() {
        return {
          suggestion: {
            char: '/',
            allow: () => true,
            startOfLine: false,
            allowSpaces: false,

            command: ({ editor, range, props }: any) => {
              console.log('RUNNING COMMAND')
              props.command({ editor, range })
            },
            items: ({ query }: { query: string }) => {
              if (!query) {
                return slashCommands.slice(0, 6)
              }

              return slashCommands
                .filter((item) =>
                  item.title.toLowerCase().includes(query.toLowerCase())
                )
                .slice(0, 6)
            },

            render: () => {
              let selectedIndex = 0
              let component: HTMLDivElement

              return {
                onStart: () => {
                  component = document.createElement('div')
                  component.className =
                    'bg-white border shadow-md rounded-lg flex gap-2 p-2 z-50'
                  document.body.appendChild(component)
                },

                onUpdate: (props: any) => {
                  if (!component) return

                  component.innerHTML = ''

                  props.items.forEach(
                    (cmd: slashCommandType, index: number) => {
                      const item = document.createElement('div')

                      item.innerHTML = `
                                  <div>
                                    <div>${cmd.title}</div>
                                  </div>
                                `

                      item.className =
                        'px-3 py-1 text-sm rounded-md cursor-pointer whitespace-nowrap'

                      if (index === selectedIndex) {
                        item.classList.add('bg-gray-200')
                      } else {
                        item.classList.add('hover:bg-gray-100')
                      }

                      item.onclick = () => {
                        props.command(cmd)
                      }

                      component.appendChild(item)
                    }
                  )

                  if (selectedIndex >= props.items.length) {
                    selectedIndex = props.items.length - 1
                  }
                  if (selectedIndex < 0) {
                    selectedIndex = 0
                  }

                  const rect = props.clientRect?.()
                  if (rect) {
                    component.style.position = 'absolute'
                    component.style.top =
                      rect.top - component.offsetHeight - 8 + 'px'
                    component.style.left = rect.left + 'px'
                  }
                },

                onKeyDown(props: any) {
                  if (!props.items || props.items.length === 0) return false

                  // DOWN
                  if (props.event.key === 'ArrowDown') {
                    selectedIndex++
                    return true
                  }

                  // UP
                  if (props.event.key === 'ArrowUp') {
                    selectedIndex--
                    return true
                  }

                  // ENTER
                  if (props.event.key === 'Enter') {
                    props.command(props.items[selectedIndex])
                    return true
                  }

                  // ESC
                  if (props.event.key === 'Escape') {
                    return false
                  }

                  return false
                },

                onExit() {
                  component?.remove()
                },
              }
            },
          },
        }
    },
    addProseMirrorPlugins() {
        return [
            Suggestion({
                editor: this.editor,
                ...this.options.suggestion,
            })
        ]
    }
})