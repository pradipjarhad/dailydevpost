// data/redirects.js
// 301 Redirects Configuration
// Flattened to remove chains

const redirects = [
    {
        "source": "/categories",
        "destination": "/topics",
        "permanent": true
    },
    // Explicit redirects for old 'dev-diary' URLs that Google has crawled.
    // These are also covered by the catch-all pattern below, but explicit
    // 1-to-1 redirects help Google consolidate signals to the canonical URL faster.
    {
        "source": "/blog/dev-diary/one-frontend-mistake-i-made-earlier-in-my-career-that-shaped-me",
        "destination": "/blog/one-frontend-mistake-i-made-earlier-in-my-career-that-shaped-me",
        "permanent": true
    },
    {
        "source": "/blog/build-in-public/one-react-habit-i-want-to-improve-next-week",
        "destination": "/blog/one-react-habit-i-want-to-improve-next-week",
        "permanent": true
    },
    {
        "source": "/blog/build-in-public/one-frontend-mistake-i-made-earlier-in-my-career-that-shaped-me",
        "destination": "/blog/one-frontend-mistake-i-made-earlier-in-my-career-that-shaped-me",
        "permanent": true
    },
    {
        "source": "/blog/build-in-public/a-bug-caused-by-a-wrong-assumption-i-made",
        "destination": "/blog/a-bug-caused-by-a-wrong-assumption-i-made",
        "permanent": true
    },
    {
        "source": "/blog/build-in-public/a-bug-i-recently-faced-and-how-i-actually-tracked-it-down",
        "destination": "/blog/a-bug-i-recently-faced-and-how-i-actually-tracked-it-down",
        "permanent": true
    },
    {
        "source": "/blog/frontend-engineering/what-are-css-container-queries-and-why-are-they-replacing-media-queries",
        "destination": "/blog/what-are-css-container-queries-and-why-are-they-replacing-media-queries",
        "permanent": true
    },
    {
        "source": "/blog/how-i-learned-to-read-error-messages-better",
        "destination": "/blog/how-to-read-react-stack-trace",
        "permanent": true
    },
    {
        "source": "/blog/dev-diary/what-debugging-taught-me-about-my-thinking-process",
        "destination": "/blog/what-debugging-taught-me-about-my-thinking-process",
        "permanent": true
    },
    {
        "source": "/blog/dev-diary/how-i-really-learn-react-concepts",
        "destination": "/blog/how-i-really-learn-react-concepts",
        "permanent": true
    },
    {
        "source": "/blog/dev-diary/a-bug-caused-by-a-wrong-assumption-i-made",
        "destination": "/blog/a-bug-caused-by-a-wrong-assumption-i-made",
        "permanent": true
    },
    {
        "source": "/blog/dev-diary/why-i-decided-to-learn-in-public-now",
        "destination": "/blog/why-i-decided-to-learn-in-public-now",
        "permanent": true
    },
    // Direct 1-hop redirect for the build-in-public camelCase useEffect path.
    // Without this, the catch-all would send it to the camelCase URL first,
    // which then redirects again to the lowercase canonical (2-hop chain).
    {
        "source": "/blog/build-in-public/one-mistake-i-made-with-useEffect-and-how-i-think-about-it-now",
        "destination": "/blog/one-mistake-i-made-with-useeffect-and-how-i-think-about-it-now",
        "permanent": true
    },
    {
        "source": "/blog/:category(ai-for-developers|build-in-public|career-and-growth|debugging-and-fixes|dev-diary|frontend-engineering|javascript-deep-dives|performance-optimization|tooling-and-dx)/:slug",
        "destination": "/blog/:slug",
        "permanent": true
    },
    {
        "source": "/blog/:category(ai-for-developers|build-in-public|career-and-growth|debugging-and-fixes|dev-diary|frontend-engineering|javascript-deep-dives|performance-optimization|tooling-and-dx)",
        "destination": "/topics/:category",
        "permanent": true
    },
    {
        "source": "/blog/category/:category(ai-for-developers|build-in-public|career-and-growth|debugging-and-fixes|dev-diary|frontend-engineering|javascript-deep-dives|performance-optimization|tooling-and-dx)",
        "destination": "/topics/:category",
        "permanent": true
    },
    {
        "source": "/blog/category/:category(ai-for-developers|build-in-public|career-and-growth|debugging-and-fixes|dev-diary|frontend-engineering|javascript-deep-dives|performance-optimization|tooling-and-dx)/page/:page",
        "destination": "/topics/:category/page/:page",
        "permanent": true
    },
    {
        "source": "/blog/one-mistake-i-made-with-useEffect-and-how-i-think-about-it-now",
        "destination": "/blog/one-mistake-i-made-with-useeffect-and-how-i-think-about-it-now",
        "permanent": true
    }
]

module.exports = redirects
