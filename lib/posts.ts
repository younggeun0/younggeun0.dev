import matter from "gray-matter";
import markdownToHtml from "./markdown";
import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { pageObj, tagObj } from "types";

const notion = new Client({ auth: process.env.NOTION_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;
const n2m = new NotionToMarkdown({ notionClient: notion });

n2m.setCustomTransformer('embed', async (block) => {
    const {embed} = block as any;
    if (!embed?.url) return '';
    return `<iframe src="${embed?.url}"></iframe>`;
});

function getPages(posts: any) {
    return posts.map((post: any) => {
        const { id, created_time, properties, icon } = post

        return {
            id,
            date: created_time,
            title: properties.이름.title[0].plain_text,
            subtitle: properties.subtitle.rich_text.reduce((str: string, { plain_text }: { plain_text: string }) => {
                return str + plain_text
            }, ""),
            tags: properties.tags.multi_select,
            icon,
        }
    })
}

export async function getRecentPages(): Promise<pageObj[]> {
    try {
        const response = await notion.databases.query({
            database_id: databaseId as string,
            page_size: 5,
            sorts: [
                {
                    timestamp: "created_time",
                    direction: "descending",
                },
            ],
        })

        return getPages(response.results)
    } catch (error) {
        console.error(error)
        return []
    }
}

export async function getTags(): Promise<tagObj[]> {
    try {
        const response = await notion.databases.retrieve({ database_id: databaseId as string })
        return (response.properties.tags as any).multi_select.options
    } catch (error) {
        console.error(error)
        return []
    }
}

export async function getNotionPosts(recent: boolean = false): Promise<pageObj[]> {
    try {
        const response = await notion.databases.query({
            database_id: databaseId as string,
            sorts: [
                {
                    timestamp: "created_time",
                    direction: "descending",
                },
            ],
        })

        return getPages(response.results)
    } catch (error) {
        console.error(error)
        return []
    }
}

export async function getPagesByTag(tagName: string): Promise<pageObj[]> {
    try {
        const response = await notion.databases.query({
            database_id: databaseId as string,
            sorts: [
                {
                    timestamp: "created_time",
                    direction: "descending",
                },
            ],
            filter: {
                property: "tags",
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
        const mdblocks = await n2m.pageToMarkdown(id)
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
                "",
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
        database_id: databaseId as string,
        sorts: [
            {
                timestamp: "created_time",
                direction: "descending",
            },
        ],
    });

    return response.results.map(post => post.id);
}
