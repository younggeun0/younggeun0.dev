import fs from 'fs'
import path from 'path'

import matter from 'gray-matter'

export async function getReadmeMarkmdown() {
    try {
        const mdString = fs.readFileSync(path.join(process.cwd(), 'README.md'), 'utf8')
        const matterResult = matter(mdString)
        return matterResult.content
    } catch (error) {
        console.error(error)
        throw new Error('Failed to get README markdown')
    }
}
