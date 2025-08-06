import { useParams, useNavigate, Link } from "react-router";
import { useState, useEffect } from "react";
import client from "./Supabase";

const Post = () => {

    const parameters = useParams();
    const navigate = useNavigate();

    const [postTitle, setPostTitle] = useState<string>("");
    const [firstCreated, setFirstCreated] = useState<string>("");
    const [lastEdited, setLastEdited] = useState<string>("");
    const [textContent, setTextContent] = useState<string>("");
    const [imageLink, setImageLink] = useState<string>("");
    const [postLikes, setPostLikes] = useState<number>(0);
    const [postDislikes, setPostDislikes] = useState<number>(0);

    useEffect(() => {

        const getPost = async () => {
            const postRequest = await client.from("Posts").select("*").eq("id", parameters.id).single();
            setPostTitle(postRequest.data.title);
            setFirstCreated(postRequest.data.first_created);
            setLastEdited(postRequest.data.last_edited);
            setTextContent(postRequest.data.text_content);
            setImageLink(postRequest.data.image_link);
            setPostLikes(postRequest.data.likes);
            setPostDislikes(postRequest.data.dislikes);
        }

        getPost()
            .catch((error) => (console.log(error)));

    }, [parameters.id]);

    const handleGiveLike = async (postLikes: number) => {
        setPostLikes((postLikes) => (postLikes + 1));
        await client.from("Posts").update({likes: postLikes + 1}).eq("id", parameters.id);
    };

    const handleGiveDislike = async (postDislikes: number) => {
        setPostDislikes((postDislikes) => (postDislikes - 1));
        await client.from("Posts").update({dislikes: postDislikes + 1}).eq("id", parameters.id);
    };

    const handleDelete = async () => {
        await client.from("Posts").delete().eq("id", parameters.id);
        navigate("/");
    }

    const formatDate = (timestamp: string) => {
        const date = new Date(timestamp);
        const dateText = date.toLocaleString();
        return dateText;
    };

    return (
        <div className="App">
            <Link to={"/"} style={{display: "flex", justifySelf: "start", padding: "10px", color: "black", border: "1px solid", borderRadius: "15px"}}> Go back! </Link>
            <br />
            <br />
            <div style={{display: "flex", alignItems: "start", flexDirection: "column", width: "1000px", padding: "40px", color: "black", border: "1px solid", borderRadius: "25px"}}>
                <p> {firstCreated == lastEdited ? `Created on ${formatDate(firstCreated)}` : `Edited on ${formatDate(lastEdited)}`} </p>
                <p> <b>{postTitle}</b> </p>
                <p> {textContent} </p>
                <br />
                <img src={imageLink} />
                <br />
                <br />
                <div style={{width: "100%", display: "flex", justifyContent: "space-between"}}>
                    <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
                        <p> {postLikes} </p>
                        <button onClick={() => (handleGiveLike(postLikes))}> 👍 </button>
                        &nbsp;
                        <p> {postDislikes} </p>
                        <button onClick={() => (handleGiveDislike(postDislikes))}> 👎 </button>
                    </div>
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center", gap: "10px"}}>
                        <Link to={`/edit-post/${parameters.id}`}> ✏️ </Link>
                        &nbsp;
                        <a style={{cursor: "pointer"}} onClick={handleDelete}> 🗑️ </a>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Post;
