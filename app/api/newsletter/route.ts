import { NewsletterAPI } from 'pliny/newsletter'
import siteMetadata from '@/data/siteMetadata'

let handler;

try {
  handler = NewsletterAPI({
    // @ts-ignore
    provider: siteMetadata.newsletter.provider,
  });
} catch (e) {
  console.error('NewsletterAPI setup failed:', e);
  handler = async () =>
    new Response(JSON.stringify({ error: 'Newsletter config failed' }), {
      status: 500,
    });
}

export { handler as GET, handler as POST }
