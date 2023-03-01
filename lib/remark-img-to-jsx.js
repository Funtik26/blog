import { visit } from 'unist-util-visit'
import fs from 'fs'

export default function remarkImgToJsx() {
  return (tree) => {
    visit(
      tree,
      // only visit p tags that contain an img element
      (node) => node.type === 'paragraph' && node.children.some((n) => n.type === 'image'),
      (node) => {
        const imageNode = node.children.find((n) => n.type === 'image')

        // only local files
        if (fs.existsSync(`${process.cwd()}/public${imageNode.url}`)) {
          // Convert original node to next/image
          ;(imageNode.type = 'mdxJsxFlowElement'),
            (imageNode.name = 'Image'),
            (imageNode.attributes = [
              { type: 'mdxJsxAttribute', name: 'alt', value: imageNode.alt },
              { type: 'mdxJsxAttribute', name: 'src', value: imageNode.url },
            ])

          // Change node type from p to div to avoid nesting error
          node.type = 'div'
          node.children = [imageNode]
        }
      }
    )
  }
}
