export type pageObj = {
    id: string
    title: string
    subtitle: string
    date: string
    tags: tagObj[]
    icon: {
        type: "external" | "emoji"
        emoji: string | null
        external: {
            url: "string"
        } | null
    } | null
}

export type tagObj = { id: string; name: string; color: string };
