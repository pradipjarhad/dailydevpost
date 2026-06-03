// data/redirects.js
// 301 Redirects Configuration
// Flattened to remove chains

const redirects = [
    {
        "source": "/categories",
        "destination": "/blog",
        "permanent": true
    },
    {
        "source": "/blog/:category(ai-for-developers|build-in-public|career-and-growth|debugging-and-fixes|dev-diary|frontend-engineering|javascript-deep-dives|performance-optimization|tooling-and-dx)/:slug",
        "destination": "/blog/:slug",
        "permanent": true
    },
    {
        "source": "/blog/:category(ai-for-developers|build-in-public|career-and-growth|debugging-and-fixes|dev-diary|frontend-engineering|javascript-deep-dives|performance-optimization|tooling-and-dx)",
        "destination": "/blog/category/:category",
        "permanent": true
    },
    {
        "source": "/blog/one-mistake-i-made-with-useEffect-and-how-i-think-about-it-now",
        "destination": "/blog/one-mistake-i-made-with-useeffect-and-how-i-think-about-it-now",
        "permanent": true
    }
]

module.exports = redirects
