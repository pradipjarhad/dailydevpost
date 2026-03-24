export const formatCategoryTitle = (segment: string) => {
    const specialCases: Record<string, string> = {
        'webgpu': 'WebGPU',
        'nextjs': 'Next.js',
        'node.js': 'Node.js',
        'javascript': 'JavaScript',
        'typescript': 'TypeScript',
        'reactjs': 'React.js',
    }
    const acronyms = ['DX', 'AI', 'SEO', 'CSS', 'JS', 'HTML', 'API', 'UI', 'UX', 'IT']
    
    return segment
        .split('-')
        .map((word) => {
            const lowerWord = word.toLowerCase()
            if (specialCases[lowerWord]) {
                return specialCases[lowerWord]
            }
            const upperWord = word.toUpperCase()
            if (acronyms.includes(upperWord)) {
                return upperWord
            }
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        })
        .join(' ')
}
