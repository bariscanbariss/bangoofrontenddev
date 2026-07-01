import { Text } from "@medusajs/ui"

import NextJs from "../../../common/icons/nextjs"

const StoreCTA = () => {
  return (
    <Text className="flex gap-x-2 txt-compact-small-plus items-center">
      Powered by
      <span className="text-ui-fg-muted font-semibold">Store Platform</span>
      &
      <a href="https://nextjs.org" target="_blank" rel="noreferrer">
        <NextJs fill="#9ca3af" />
      </a>
    </Text>
  )
}

export default StoreCTA
