import React from "react";

export const Comments = () => {
    return (
        <section
            style={{ width: "100%", marginTop: "50px" }}
            ref={element => {
                if (!element) {
                    return;
                }

                const scriptElem = document.createElement("script");
                scriptElem.setAttribute("src", "https://utteranc.es/client.js");
                scriptElem.setAttribute("repo", "younggeun0/younggeun0.dev");
                scriptElem.setAttribute("issue-term", "pathname");
                scriptElem.setAttribute('label', 'comment :speech_balloon:')
                scriptElem.setAttribute("theme", "github-light");
                scriptElem.setAttribute("crossorigin", "anonymous");
                scriptElem.setAttribute("async", "true");
                element.replaceChildren(scriptElem);
            }}
        />
    );
}
