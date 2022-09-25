import Layout from "components/layout";
import utilStyles from "../../styles/utils.module.css";
import Head from "next/head";
import CreateIcon from "@mui/icons-material/Create";
import AccessDenied from "components/accessDenied";
import {
    Alert,
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Snackbar,
    TextField,
} from "@mui/material";
import { useState } from "react";
import MarkdownEditor from "../../components/react-md-editor/MdEditor";
import { RequestInit } from "next/dist/server/web/spec-extension/request";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";

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

    return {
        props: { session },
    };
}

const CreatePost = ({ session }: any) => {
    const router = useRouter();
    const [title, setTitle] = useState<string>("");
    const [markdown, setMarkdown] = useState<string>("");
    const [tags, setTags] = useState<string>("");
    const [open, setOpen] = useState<boolean>(false);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    const handleSubmit = async () => {
        const params: RequestInit = {
            method: "POST",
            body: JSON.stringify({
                title,
                tags,
                markdown,
            }),
        };

        fetch("/api/create-post", params)
            .then((response: any) => {
                setTitle("");
                setMarkdown("");
                setTags("");
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
                <title>글쓰기</title>
            </Head>

            <section className={`${utilStyles.padding1px}`}>
                <Box>
                    <TextField
                        name="title"
                        value={title}
                        variant="standard"
                        sx={{ width: "80%" }}
                        placeholder="제목"
                        onChange={(e: any) => setTitle(e.target.value)}
                    />
                    <TextField
                        name="tags"
                        value={tags}
                        variant="standard"
                        sx={{ width: "20%" }}
                        placeholder="구분"
                        onChange={(e: any) => setTags(e.target.value)}
                    />
                </Box>

                <MarkdownEditor markdown={markdown} setMarkdown={setMarkdown} />

                <Box sx={{ display: "flex", justifyContent: "end", mt: 3 }}>
                    <Button
                        variant="contained"
                        endIcon={<CreateIcon />}
                        onClick={handleSubmit}
                    >
                        글쓰기
                    </Button>
                    <Snackbar
                        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                        open={open}
                        autoHideDuration={3000}
                        onClose={handleClose}
                    >
                        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
                            새 글이 등록됐습니다
                        </Alert>
                    </Snackbar>
                </Box>
            </section>
        </Layout>
    );
};

export default CreatePost;
