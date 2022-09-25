import fs from "fs";
import path from "path";
import process from "process";
import { format } from "date-fns";
import { NextApiRequest, NextApiResponse } from "next";
import { getPostString } from "lib/posts";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { title, tags, markdown } = JSON.parse(req.body);

    if (title === "" || markdown === "") {
        res.status(400).end();
    }
    const postData = getPostString(title, tags, markdown);
    const fileName = `posts/${format(new Date(), "yyyy-MM-dd")}-${title.split(" ")[0]}.md`;
    const postPath = path.resolve(path.join(process.cwd(), fileName));

    try {
        fs.writeFileSync(
            postPath,
            postData,
            { flag: 'w' }
        );
    } catch (error) {
        console.error(error);
    }

    res.status(200).send({ fileName });
}
