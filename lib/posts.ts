import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { format } from "date-fns";
import markdownToHtml from "./markdown";
import { Client } from "@notionhq/client";
const { NotionToMarkdown } = require("notion-to-md");

const notion = new Client({ auth: process.env.NOTION_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;
const n2m = new NotionToMarkdown({ notionClient: notion });

const postsDirectory = path.join(process.cwd(), "posts");

export async function getNotionPosts(recent: boolean) {
    try {
        let posts = [];
        const response = await notion.databases.query({
            database_id: databaseId as string,
            sorts: [
                {
                    timestamp: "created_time",
                    direction: "descending",
                }
            ],
        });

        if (recent) {
            posts = response.results.filter((_, i: number) => {
                return i < 5;
            })
            .map((post: any) => {
                return {
                    id: post.id,
                    date: post.created_time,
                    title: post.properties.이름.title[0].plain_text,
                };
            })
        } else {
            posts = response.results;
        }

        return posts;
    } catch (error) {
        console.error(error);
    }
}

export async function getSingleNotionPost(id: string) {
    
    const response: any = await notion.pages.retrieve({ page_id: id });
    const mdblocks = await n2m.pageToMarkdown(id);
    const mdString = n2m.toMarkdownString(mdblocks);

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(mdString);

    // Use remark to convert markdown into HTML string
    const contentHtml = await markdownToHtml(matterResult.content);

    // Combine the data with the id and contentHtml
    return {
        date: response.created_time,
        title: response.properties.이름.title[0].plain_text,
        contentHtml,
        // markdown: matterResult.content,
        // ...matterResult.data,
    };
}

export function getSortedPostsData(recent: boolean = false) {
    const allPostData = getAllMarkDownData(postsDirectory);

    if (recent) {
        return allPostData.filter((data: any, i: number) => {
            return i < 5 && data;
        });
    } else {
        return allPostData;
    }
}

export async function getAllNotionPostIds() {
    const response = await notion.databases.query({
        database_id: databaseId as string,
        sorts: [
            {
                timestamp: "created_time",
                direction: "descending",
            }
        ],
    });

    return response.results.map(post => post.id);
}

export function getAllPostIds() {
    return getAllPostIdsRecursively(postsDirectory);
}

const getAllPostIdsRecursively: any = (dirPath: string) => {
    const fileNames = fs.readdirSync(dirPath);
    return fileNames
        .filter(fileName => fileName !== ".DS_Store")
        .reduce((acc: any, fileName: string) => {
            // const fullPath = path.join(dirPath, fileName);
            // if (fs.lstatSync(fullPath).isDirectory()) {
            //     return [...acc, ...getAllPostIdsRecursively(fullPath)];
            // }

            return [
                ...acc,
                {
                    params: {
                        id: fileName.replace(/\.md$/, ""),
                    },
                },
            ];
        }, []);
};

const getAllMarkDownData: any = (dirPath: string) => {
    const fileNames = fs.readdirSync(dirPath);
    return fileNames
        .filter(fileName => fileName !== ".DS_Store")
        .reduce((acc: any, fileName: string) => {
            const fullPath = path.join(dirPath, fileName);
            // if (fs.lstatSync(fullPath).isDirectory()) {
            //     return [...acc, ...getAllMarkDownData(fullPath)];
            // }

            // Remove ".md" from file name to get id
            const id = fileName.replace(/\.md$/, "");

            // Read markdown file as string
            // const fullPath = path.join(dirPath, fileName);
            const fileContents = fs.readFileSync(fullPath, "utf8");

            // Use gray-matter to parse the post metadata section
            const matterResult = matter(fileContents);

            if (typeof matterResult.data?.date !== "string") {
                matterResult.data.date = format(matterResult.data.date, "yyyy-MM-dd");
            }

            // Combine the data with the id
            return [
                ...acc,
                {
                    id,
                    ...matterResult.data,
                },
            ];
        }, [])
        .sort(({ date: a }: any, { date: b }: any) => {
            if (a < b) {
                return 1;
            } else if (a > b) {
                return -1;
            } else {
                return 0;
            }
        });
};

export async function getPostData(id: string) {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    if (typeof matterResult.data?.date !== "string") {
        matterResult.data.date = format(matterResult.data.date, "yyyy-MM-dd");
    }

    // Use remark to convert markdown into HTML string
    const contentHtml = await markdownToHtml(matterResult.content);

    // Combine the data with the id and contentHtml
    return {
        id,
        contentHtml,
        markdown: matterResult.content,
        ...matterResult.data,
    };
}

export const getPostString = (title: string, tags: string, markdown: string, date: Date = new Date()) => {
    return `---
title: ${title}
tags: [${tags}]
date: ${format(date, "yyyy-MM-dd")}
---

${markdown}
`;
};
