import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const BlogDetails = () => {
    const { id } = useParams();
    const apiUrl = process.env.REACT_APP_API_URL;
    const { data: blog, error, isPending } = useFetch(apiUrl + "blog/" + id);
    const history = useHistory();

    const handleClick = () => {
        fetch(apiUrl + "blog/?id=" + blog.id, {
            method: "DELETE",
        }).then(() => {
            history.push("/");
        });
    };

    return (
        <div className="blog-details">
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {blog && (
                <article>
                    <h2>{blog.title}</h2>
                    <p>Written by {blog.author.name}</p>
                    <div>{blog.description}</div>
                    <button onClick={handleClick}>delete</button>
                </article>
            )}
        </div>
    );
};

export default BlogDetails;
