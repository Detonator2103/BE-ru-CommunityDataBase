import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import { componentRegistry } from "./quartz/components/registry"

// ключ "explorer" — имя плагина из `source: github:quartz-community/explorer`
componentRegistry.setOptionOverrides("explorer", {
  sortFn: (
    a: { isFolder: boolean; slugSegment: string },
    b: { isFolder: boolean; slugSegment: string },
  ) => {
    if (a.isFolder !== b.isFolder) return a.isFolder ? -1 : 1
    return a.slugSegment.localeCompare(b.slugSegment, undefined, {
      numeric: true,
      sensitivity: "base",
    })
  },
  mapFn: (node: { displayName: string }) => {
    node.displayName = node.displayName.replace(/^\d+[\s._-]+/, "")
    return node
  },
})

const config = await loadQuartzConfig()
export default config
export const layout = await loadQuartzLayout()