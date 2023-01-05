/* eslint-disable react/display-name */
import { useEffect, useMemo, useState } from 'react'
import { getMDXComponent } from 'mdx-bundler/client'
import Image from './Image'
import CustomLink from './Link'
import TOCInline from './TOCInline'
import Pre from './Pre'
import { BlogNewsletterForm } from './NewsletterForm'

export const MDXLayoutRenderer = ({ layout, mdxSource, ...rest }) => {
  const MDXLayout = useMemo(() => getMDXComponent(mdxSource), [mdxSource])
  const [MDXComponents, setComponents] = useState(null)
  useEffect(() => {
    setComponents({
      Image,
      TOCInline,
      a: CustomLink,
      pre: Pre,
      BlogNewsletterForm: BlogNewsletterForm,
      wrapper: ({ components, layout, ...rest }) => {
        const Layout = require(`../layouts/${layout}`).default
        return <Layout {...rest} />
      },
    })
  }, [])

  return (
    <>
      <MDXLayout layout={layout} components={MDXComponents} {...rest} />
    </>
  )
}
