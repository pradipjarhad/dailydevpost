'use client'

import React from 'react'

interface SchemaOrgProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    schema: Record<string, any>
}

/**
 * SchemaOrg component injects JSON-LD structured data into the page.
 * It uses dangerouslySetInnerHTML to render the schema as a script tag.
 */
const SchemaOrg = ({ schema }: SchemaOrgProps) => {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    )
}

export default SchemaOrg
