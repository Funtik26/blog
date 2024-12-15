import { NewsletterAPI } from 'pliny/newsletter'
import siteMetadata from '@/data/siteMetadata'

export const dynamic = 'force-static'

const handler = NewsletterAPI({
  // @ts-expect-error it is original disable
  provider: siteMetadata.newsletter.provider,
})

export { handler as GET, handler as POST }
