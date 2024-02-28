import { type PluginItem } from '@babel/core'

export default function (): PluginItem {
  return {
    visitor: {
      Program (path, state) {
        const forbidden = state.opts.props || []

        path.traverse({
          JSXIdentifier (current) {
            const nodeName = current.node.name

            if (forbidden.include(nodeName)) {
              current.parentPath.remove()
            }
          }
        })
      }
    }
  }
}
