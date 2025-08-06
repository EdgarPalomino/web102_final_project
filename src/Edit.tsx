import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import client from "./Supabase";

const Edit = () => {

    const parameters = useParams();
    const navigate = useNavigate();

    const [postTitle, setPostTitle] = useState<string>("");
    const [textContent, setTextContent] = useState<string>("");
    const [imageLink, setImageLink] = useState<string>("");

    useEffect(() => {

        const getPost = async () => {
            const postRequest = await client.from("Posts").select("*").eq("id", parameters.id).single();
            setPostTitle(postRequest.data.title);
            setTextContent(postRequest.data.text_content);
            setImageLink(postRequest.data.image_link);
        }

        getPost()
            .catch((error) => (console.log(error)));

    }, [parameters.id]);

    const handleSubmit = async () => {
        const date = new Date();
        await client.from("Posts").update({title: postTitle, last_edited: date.toISOString(), text_content: textContent, image_link: imageLink}).eq("id", parameters.id);
        navigate("/");
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
            <input type="submit" value="Edit Post!" onClick={handleSubmit} />
        </div>
    )
};

export default Edit;
