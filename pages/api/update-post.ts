import fs from "fs";
import path from "path";
import process from "process";
import { format } from "date-fns";
import { NextApiRequest, NextApiResponse } from "next";
import { getPostString } from "lib/posts";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id, title, category, markdown } = JSON.parse(req.body);

    if (title === "" || markdown === "") {
        res.status(400).end();
    }

    const prevPostDate = id.substring(0, id.lastIndexOf("-"));
    const postData = getPostString(title, category, markdown, new Date(prevPostDate));
    const fileName = `posts/${id}.md`;
    const postPath = path.resolve(path.join(process.cwd(), fileName));

    try {
        fs.writeFileSync(postPath, postData, { flag: "w" });
    } catch (error) {
        console.error(error);
    }

    res.status(200).send({ fileName });
    
}