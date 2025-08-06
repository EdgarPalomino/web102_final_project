import { useNavigate } from "react-router";
import { useState } from "react";
import client from "./Supabase";

const Create = () => {

    const navigate = useNavigate();

    const [postTitle, setPostTitle] = useState<string>("");
    const [textContent, setTextContent] = useState<string>("");
    const [imageLink, setImageLink] = useState<string>("");

    const handleSubmit = async () => {
        if (postTitle != "") {
            await client.from("Posts").insert({title: postTitle, text_content: textContent, image_link: imageLink});
            navigate("/");
        }
    };

    return (
        <div className="App">
            <label htmlFor="post-title"> Title: </label>
            <input id="post-title" type="text" onChange={(e) => (setPostTitle(e.target.value))} value={postTitle} />
            <br />
            <br />
            <label htmlFor="post-text-content"> Text Content (Optional): </label>
            <textarea id="post-text-content" onChange={(e) => (setTextContent(e.target.value))} value={textContent} />
            <br />
            <br />
            <label htmlFor="post-image-link"> Image Link (Optional): </label>
            <textarea id="post-image-link" onChange={(e) => (setImageLink(e.target.value))} value={imageLink} />
            <br />
            <br />
            <input type="submit" value="Create Post!" onClick={handleSubmit} />
        </div>
    );

};

export default Create;
