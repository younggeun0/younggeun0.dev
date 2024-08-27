import fs from 'fs'
import path from 'path'

import { Client } from '@notionhq/client'
import matter from 'gray-matter'
import fetch from 'node-fetch'
import { NotionToMarkdown } from 'notion-to-md'

import { Page, Tag } from 'types'

import markdownToHtml from './markdown'

const notion = new Client({ auth: process.env.NOTION_KEY })
const postDatabaseId = process.env.NOTION_POST_DATABASE_ID // TODO FIX this name on vercel
const n2m = new NotionToMarkdown({ notionClient: notion })

n2m.setCustomTransformer('embed', async block => {
    const { embed } = block as any
    if (!embed?.url) return ''

    // for embeded codepen
    if (embed.url.includes('codepen')) {
        embed.url = embed.url.replace('/pen/', '/embed/')
    }
    return `<iframe src="${embed?.url}" frameborder="no" loading="lazy"></iframe>`
})

async function saveImageToPublic(imgMarkdown: string, fileNameWithDir: string) {
    const publicDir = path.join(process.cwd(), 'public/images')
    const filePath = path.join(publicDir, fileNameWithDir)

    if (fs.existsSync(filePath)) {
        return
    }
    const url = imgMarkdown.substring(imgMarkdown.indexOf('(') + 1, imgMarkdown.length - 1)

    const response = await fetch(url)
    const buffer = await response.buffer()

    const dir = path.dirname(filePath)
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
    }
    fs.writeFileSync(filePath, buffer)
}

function getPages(posts: any) {
    return posts.map((post: any) => {
        const { id, created_time, properties, icon } = post

        return {
            id,
            date: created_time,
            title: properties.이름.title[0].plain_text,
            subtitle: properties.subtitle.rich_text.reduce((str: string, { plain_text }: { plain_text: string }) => {
                return str + plain_text
            }, ''),
            tags: properties.tags.multi_select,
            icon,
        }
    })
}

export async function getRecentPages(): Promise<Page[]> {
    try {
        const response = await notion.databases.query({
            database_id: postDatabaseId as string,
            page_size: 5,
            sorts: [
                {
                    timestamp: 'created_time',
                    direction: 'descending',
                },
            ],
        })

        return getPages(response.results)
    } catch (error) {
        console.error(error)
        return []
    }
}

export async function getTags(): Promise<Tag[]> {
    try {
        const response = await notion.databases.retrieve({ database_id: postDatabaseId as string })
        return (response.properties.tags as any).multi_select.options
    } catch (error) {
        console.error(error)
        return []
    }
}

export async function getNotionPosts(recent: boolean = false): Promise<Page[]> {
    try {
        const response = await notion.databases.query({
            database_id: postDatabaseId as string,
            sorts: [
                {
                    timestamp: 'created_time',
                    direction: 'descending',
                },
            ],
        })

        return getPages(response.results)
    } catch (error) {
        console.error(error)
        return []
    }
}

export async function getPagesByTag(tagName: string): Promise<Page[]> {
    try {
        const response = await notion.databases.query({
            database_id: postDatabaseId as string,
            sorts: [
                {
                    timestamp: 'created_time',
                    direction: 'descending',
                },
            ],
            filter: {
                property: 'tags',
                multi_select: {
                    contains: decodeURIComponent(tagName),
                },
            },
        })

        return getPages(response.results)
    } catch (error) {
        console.error(error)
        return []
    }
}

export async function getSinglePageById(id: string) {
    try {
        const response: any = await notion.pages.retrieve({ page_id: id })
        let mdblocks: any = await n2m.pageToMarkdown(id)

        for (let i = 0; i < mdblocks.length; i++) {
            if (mdblocks[i].type === 'image') {
                const fileName = mdblocks[i].parent.split('/').pop()?.split('?')[0]
                await saveImageToPublic(mdblocks[i].parent, `/${response.id}/${i}_${fileName}`)
                mdblocks[i].parent = `![](/images/${response.id}/${i}_${fileName})`
            }
        }

        const mdString = n2m.toMarkdownString(mdblocks)

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(mdString)

        // Use remark to convert markdown into HTML string
        const contentHtml = await markdownToHtml(matterResult.content)

        // Combine the data with the id and contentHtml
        return {
            date: response.created_time,
            title: response.properties.이름.title[0].plain_text,
            subtitle: response.properties.subtitle.rich_text.reduce(
                (str: string, { plain_text }: { plain_text: string }) => {
                    return str + plain_text
                },
                '',
            ),
            tags: response.properties.tags.multi_select,
            contentHtml,
            icon: response.icon,
            // markdown: matterResult.content,
            // ...matterResult.data,
        }
    } catch (error) {
        console.error(error)
        return null
    }
}

export async function getAllNotionPostIds() {
    const response = await notion.databases.query({
        database_id: postDatabaseId as string,
        sorts: [
            {
                timestamp: 'created_time',
                direction: 'descending',
            },
        ],
    })

    return response.results.map(post => post.id)
}
