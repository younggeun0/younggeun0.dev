import Layout from "components/layout";
import utilStyles from "../../../styles/utils.module.css";
import Head from "next/head";
import CreateIcon from "@mui/icons-material/Create";
import {
    Alert,
    Box,
    Button,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    Snackbar,
    TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import MarkdownEditor from "../../../components/react-md-editor/MdEditor";
import { RequestInit } from "next/dist/server/web/spec-extension/request";
import { GetStaticPaths, GetStaticProps } from "next";
import { getAllPostIds, getPostData } from "lib/posts";
import { getSession, useSession } from "next-auth/react"
import { useRouter } from "next/router";
import AccessDenied from "components/accessDenied";

export async function getServerSideProps(context: any) {
    const session = await getSession(context);

    if (!session || (session?.user?.email !== "younggeun0@mme.dongguk.edu")) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }

    const postData = await getPostData(context.params?.id as string);
    return {
        props: {
            postData: {
                ...postData,
                id: context.params?.id,
            },
            session,
        },
    };
}

const EditPost = ({ postData, session }: any) => {
    const router = useRouter();
    const [title, setTitle] = useState<string>(postData.title);
    const [markdown, setMarkdown] = useState<string>(postData.markdown);
    const [category, setCategory] = useState<string>(postData.project ? "project" : "post");
    const [open, setOpen] = useState<boolean>(false);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    const handleChange = (e: any) => {
        setCategory(e.target.value);
    };

    const handleSubmit = async () => {
        const params: RequestInit = {
            method: "PUT",
            body: JSON.stringify({
                id: postData.id,
                title,
                category,
                markdown,
            }),
        };

        fetch("/api/update-post", params)
            .then((response: any) => {
                setOpen(true);
                return response.json();
            })
            .then(({ fileName }) => {
                router.push(`/${fileName.substring(0, fileName.lastIndexOf("."))}`)
            })
            .catch((error: any) => {
                console.error(error);
            });
    };

    return (
        <Layout>
            <Head>
                <title>수정하기</title>
            </Head>

            <section className={`${utilStyles.padding1px}`}>
                <Box>
                    <TextField
                        label="제목"
                        name="title"
                        value={title}
                        variant="standard"
                        sx={{ width: "80%" }}
                        onChange={(e: any) => setTitle(e.target.value)}
                    />
                    <FormControl sx={{ width: "20%" }}>
                        <InputLabel id="category">구분</InputLabel>
                        <Select
                            labelId="category"
                            name="category"
                            id="demo-simple-select"
                            defaultValue={category}
                            value={category}
                            label="구분"
                            variant="standard"
                            onChange={handleChange}
                        >
                            <MenuItem value={"post"}>Post</MenuItem>
                            <MenuItem value={"project"}>Project</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <MarkdownEditor markdown={markdown} setMarkdown={setMarkdown} />

                <Box sx={{ display: "flex", justifyContent: "end", mt: 3 }}>
                    <Button
                        variant="contained"
                        endIcon={<CreateIcon />}
                        onClick={handleSubmit}
                    >
                        수정
                    </Button>
                    <Snackbar
                        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                        open={open}
                        autoHideDuration={3000}
                        onClose={handleClose}
                    >
                        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
                            글이 수정됐습니다
                        </Alert>
                    </Snackbar>
                </Box>
            </section>
        </Layout>
    );
};

export default EditPost;
