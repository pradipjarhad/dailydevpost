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
        "source": "/blog/:category(ai-for-developers|build-in-public|career-and-growth|debugging-and-fixes|frontend-engineering|javascript-deep-dives|performance-optimization|tooling-and-dx)/:slug",
        "destination": "/blog/:slug",
        "permanent": true
    },
    {
        "source": "/blog/:category(ai-for-developers|build-in-public|career-and-growth|debugging-and-fixes|frontend-engineering|javascript-deep-dives|performance-optimization|tooling-and-dx)",
        "destination": "/blog/category/:category",
        "permanent": true
    },
    {
        "source": "/blog/dev-diary/why-i-chose-this-tech-stack-for-my-developer-blog",
        "destination": "/blog/why-i-chose-this-tech-stack-for-my-developer-blog",
        "permanent": true
    },
    {
        "source": "/blog/dev-diary/why-naming-is-harder-than-logic-in-frontend-code",
        "destination": "/blog/why-naming-is-harder-than-logic-in-frontend-code",
        "permanent": true
    },
    {
        "source": "/blog/dev-diary/one-habit-that-made-my-code-easier-to-read",
        "destination": "/blog/one-habit-that-made-my-code-easier-to-read",
        "permanent": true
    },
    {
        "source": "/blog/dev-diary/what-debugging-taught-me-about-my-thinking-process",
        "destination": "/blog/what-debugging-taught-me-about-my-thinking-process",
        "permanent": true
    },
    {
        "source": "/blog/dev-diary/one-debugging-habit-that-saves-me-hours-every-week",
        "destination": "/blog/one-debugging-habit-that-saves-me-hours-every-week",
        "permanent": true
    },
    {
        "source": "/blog/dev-diary/how-i-learned-to-read-error-messages-better",
        "destination": "/blog/how-i-learned-to-read-error-messages-better",
        "permanent": true
    },
    {
        "source": "/blog/dev-diary/what-debugging-taught-me-that-tutorials-didnt",
        "destination": "/blog/what-debugging-taught-me-that-tutorials-didnt",
        "permanent": true
    },
    {
        "source": "/blog/dev-diary/a-bug-caused-by-a-wrong-assumption-i-made",
        "destination": "/blog/a-bug-caused-by-a-wrong-assumption-i-made",
        "permanent": true
    },
    {
        "source": "/blog/dev-diary/a-bug-i-recently-faced-and-how-i-actually-tracked-it-down",
        "destination": "/blog/a-bug-i-recently-faced-and-how-i-actually-tracked-it-down",
        "permanent": true
    },
    {
        "source": "/blog/dev-diary/one-react-habit-i-want-to-improve-next-week",
        "destination": "/blog/one-react-habit-i-want-to-improve-next-week",
        "permanent": true
    },
    {
        "source": "/blog/dev-diary/one-mental-model-that-made-react-easier-for-me",
        "destination": "/blog/one-mental-model-that-made-react-easier-for-me",
        "permanent": true
    },
    {
        "source": "/blog/dev-diary/how-i-actually-reduced-unnecessary-re-renders",
        "destination": "/blog/how-i-actually-reduced-unnecessary-re-renders",
        "permanent": true
    },
    {
        "source": "/blog/dev-diary/what-actually-caused-unnecessary-re-renders",
        "destination": "/blog/what-actually-caused-unnecessary-re-renders",
        "permanent": true
    },
    {
        "source": "/blog/dev-diary/the-time-i-removed-state-instead-of-adding-more",
        "destination": "/blog/the-time-i-removed-state-instead-of-adding-more",
        "permanent": true
    },
    {
        "source": "/blog/dev-diary/one-mistake-i-made-with-useEffect-and-how-i-think-about-it-now",
        "destination": "/blog/one-mistake-i-made-with-useEffect-and-how-i-think-about-it-now",
        "permanent": true
    },
    {
        "source": "/blog/dev-diary/where-i-am-right-now-as-a-frontend-developer",
        "destination": "/blog/where-i-am-right-now-as-a-frontend-developer",
        "permanent": true
    },
    {
        "source": "/blog/dev-diary/what-i-care-about-more-than-frameworks",
        "destination": "/blog/what-i-care-about-more-than-frameworks",
        "permanent": true
    },
    {
        "source": "/blog/dev-diary/one-frontend-mistake-i-made-earlier-in-my-career-that-shaped-me",
        "destination": "/blog/one-frontend-mistake-i-made-earlier-in-my-career-that-shaped-me",
        "permanent": true
    },
    {
        "source": "/blog/dev-diary/how-i-really-learn-react-concepts",
        "destination": "/blog/how-i-really-learn-react-concepts",
        "permanent": true
    },
    {
        "source": "/blog/dev-diary/what-dailydevpost-is-not",
        "destination": "/blog/what-dailydevpost-is-not",
        "permanent": true
    },
    {
        "source": "/blog/dev-diary/why-i-decided-to-learn-in-public-now",
        "destination": "/blog/why-i-decided-to-learn-in-public-now",
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
        "source": "/blog/build-in-public/how-i-learned-to-read-error-messages-better",
        "destination": "/blog/how-i-learned-to-read-error-messages-better",
        "permanent": true
    },
    {
        "source": "/blog/build-in-public/the-one-debugging-habit-that-saves-me-hours-every-week",
        "destination": "/blog/the-one-debugging-habit-that-saves-me-hours-every-week",
        "permanent": true
    },
    {
        "source": "/blog/build-in-public/what-debugging-taught-me-about-my-thinking-process",
        "destination": "/blog/what-debugging-taught-me-about-my-thinking-process",
        "permanent": true
    },
    {
        "source": "/blog/build-in-public/what-debugging-taught-me-that-tutorials-didnt",
        "destination": "/blog/what-debugging-taught-me-that-tutorials-didnt",
        "permanent": true
    },
    {
        "source": "/blog/build-in-public/how-i-actually-reduced-unnecessary-re-renders",
        "destination": "/blog/how-i-actually-reduced-unnecessary-re-renders",
        "permanent": true
    },
    {
        "source": "/blog/build-in-public/the-time-i-removed-state-instead-of-adding-more",
        "destination": "/blog/the-time-i-removed-state-instead-of-adding-more",
        "permanent": true
    },
    {
        "source": "/blog/build-in-public/what-actually-caused-unnecessary-re-renders",
        "destination": "/blog/what-actually-caused-unnecessary-re-renders",
        "permanent": true
    },
    {
        "source": "/blog/build-in-public/how-i-really-learn-react-concepts",
        "destination": "/blog/how-i-really-learn-react-concepts",
        "permanent": true
    },
    {
        "source": "/blog/build-in-public/one-mental-model-that-made-react-easier-for-me",
        "destination": "/blog/one-mental-model-that-made-react-easier-for-me",
        "permanent": true
    },
    {
        "source": "/blog/build-in-public/one-mistake-i-made-with-useEffect-and-how-i-think-about-it-now",
        "destination": "/blog/one-mistake-i-made-with-useEffect-and-how-i-think-about-it-now",
        "permanent": true
    },
    {
        "source": "/blog/build-in-public/one-frontend-mistake-i-made-earlier-in-my-career-that-shaped-me",
        "destination": "/blog/one-frontend-mistake-i-made-earlier-in-my-career-that-shaped-me",
        "permanent": true
    },
    {
        "source": "/blog/build-in-public/one-react-habit-i-want-to-improve-next-week",
        "destination": "/blog/one-react-habit-i-want-to-improve-next-week",
        "permanent": true
    },
    {
        "source": "/blog/build-in-public/what-i-care-about-more-than-frameworks",
        "destination": "/blog/what-i-care-about-more-than-frameworks",
        "permanent": true
    },
    {
        "source": "/blog/build-in-public/where-i-am-right-now-as-a-frontend-developer",
        "destination": "/blog/where-i-am-right-now-as-a-frontend-developer",
        "permanent": true
    },
    {
        "source": "/blog/build-in-public/one-habit-that-made-my-code-easier-to-read",
        "destination": "/blog/one-habit-that-made-my-code-easier-to-read",
        "permanent": true
    },
    {
        "source": "/blog/build-in-public/why-naming-is-harder-than-logic-in-frontend-code",
        "destination": "/blog/why-naming-is-harder-than-logic-in-frontend-code",
        "permanent": true
    }
]

module.exports = redirects
