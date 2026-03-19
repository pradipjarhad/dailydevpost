export const formatCategoryTitle = (segment: string) => {
    const acronyms = ['DX', 'AI', 'SEO', 'CSS', 'JS', 'HTML', 'API', 'UI', 'UX', 'IT']
    return segment
        .split('-')
        .map((word) => {
            const upperWord = word.toUpperCase()
            if (acronyms.includes(upperWord)) {
                return upperWord
            }
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        })
        .join(' ')
}
