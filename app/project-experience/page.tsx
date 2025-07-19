import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkPrism from "remark-prism";

import StickyClassAdder from "@/components/StickyClassAdder";
import { getMarkmdown } from "@/lib/markdown";

import '../../styles/prism-one-light.css'

export default async function Contribute() {
  const projects = await getMarkmdown('projects')

  return (
    <>
      <ReactMarkdown remarkPlugins={[remarkGfm, remarkPrism]}>{projects ?? ''}</ReactMarkdown>

      <StickyClassAdder />
    </>
  )
}