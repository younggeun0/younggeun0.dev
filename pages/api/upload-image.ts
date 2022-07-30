import fs from "fs";
import path from "path";
import process from "process";
import { format } from "date-fns";
import { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {
            done(null, "public/images");
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname);
            done(null, `${new Date().getTime()}${ext}`);
        },
    }),
    limits: { fieldSize: 5 * 1024 * 1024 }, // 5MB
});

export const config = {
    api: {
        bodyParser: false,
    },
};

function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: any) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result: any) => {
            if (result instanceof Error) {
                return reject(result);
            }

            return resolve(result);
        });
    });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await runMiddleware(req, res, upload.single("file"));

    res.status(200).send({ filePath: `/images/${(req as any).file.filename}` });
}
