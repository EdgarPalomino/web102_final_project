import { useState, useEffect } from "react";
import { Link } from "react-router";
import client from "./Supabase";
import type PostInformation from "./PostInformation";

const Home = () => {

    const [posts, setPosts] = useState<PostInformation[]>([]);
    const [searchText, setSearchText] = useState<string>("");
    const [orderSelection, setOrderSelection] = useState<string>("");
    const [mostRecent, setMostRecent] = useState<boolean>(false);
    const [mostLikes, setMostLikes] = useState<boolean>(false);
    const [mostDislikes, setMostDislikes] = useState<boolean>(false);

    useEffect(() => {

        const getPosts = async () => {
            const postsRequests = await client.from("Posts").select("*");
            setPosts(postsRequests.data != null ? postsRequests.data : []);
        };

        getPosts()
            .catch((error) => (console.log(error)));

    }, []);

    const formatDate = (timestamp: string) => {
        const date = new Date(timestamp);
        const dateText = date.toLocaleString();
        return dateText;
    };

    return (
        <div className="App">
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", gap: "30px"}}>
                <label htmlFor="search-text"> Search for a Post: </label>
                <input type="text" placeholder="Search for a Post" onChange={(e) => (setSearchText(e.target.value))} value={searchText} />
                <label htmlFor="order-selection"> Choose an Order: </label>
                <select id="order-selection" onChange={(e) => (setOrderSelection(e.target.value))} value={orderSelection}>
                    <option value=""> Select an Order </option>
                    <option value="Most Recent"> Most Recent </option>
                    <option value="Most Likes"> Most Likes </option>
                    <option value="Most Dislikes"> Most Dislikes </option>
                </select>
            </div>
            <br />
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", gap: "20px"}}>
                {(searchText == "" && orderSelection == "") ?
                    posts.map((post: PostInformation) => (
                        <Link to={`/post/${post.id}`} style={{display: "flex", alignItems: "start", flexDirection: "column", width: "1000px", padding: "40px", color: "black", border: "1px solid", borderRadius: "25px"}} key={post.id}>
                            <p> {post.first_created == post.last_edited ? `Created on ${formatDate(post.first_created)}` : `Edited on ${formatDate(post.last_edited)}`} </p>
                            <p> <b>{post.title}</b> </p>
                            <p> {post.likes} 👍 &nbsp; {post.dislikes} 👎 </p>
                        </Link>
                    ))
                    :
                    posts.filter((post: PostInformation) => (post.title.toLowerCase().includes(searchText.toLowerCase()) == true))
                        .sort((post1: PostInformation, post2: PostInformation) => {
                            if (orderSelection == "Most Recent") {
                                return 0;
                            } else if (orderSelection == "Most Likes") {
                                return post2.likes - post1.likes;
                            } else if (orderSelection == "Most Dislikes") {
                                return post2.dislikes - post1.dislikes;
                            } else {
                                return 0;
                            }
                        })
                        .map((post: PostInformation) => (
                            <Link to={`/post/${post.id}`} style={{display: "flex", alignItems: "start", flexDirection: "column", width: "1000px", padding: "40px", color: "black", border: "1px solid", borderRadius: "25px"}} key={post.id}>
                                <p> {post.first_created == post.last_edited ? `Created on ${formatDate(post.first_created)}` : `Edited on ${formatDate(post.last_edited)}`} </p>
                                <p> <b>{post.title}</b> </p>
                                <p> {post.likes} 👍 &nbsp; {post.dislikes} 👎 </p>
                            </Link>
                        ))
                }
            </div>
            <br />
            <br />
            <Link to="/create-post" style={{padding: "10px", color: "black", border: "1px solid", borderRadius: "15px"}}> Create a new post! </Link>
        </div>
    );

};

export default Home;
