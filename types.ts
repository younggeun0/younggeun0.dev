export type pageObj = {
    id: string;
    title: string;
    subtitle: string;
    date: string;
    tags: tagObj[];
};

export type tagObj = { id: string; name: string; color: string };
