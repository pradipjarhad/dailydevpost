// data/redirects.js
// 301 Redirects Configuration
// Flattened to remove chains

const redirects = [
    {
        "source": "/categories",
        "destination": "/topics",
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
