import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import useFetch from "../hooks/useFetch";

const CreateBlog = () => {
    const apiUrl = process.env.REACT_APP_API_URL;

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [author, setAuthor] = useState(0);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState("");
    const history = useHistory();
    const { data: authors, isPending: authorsPending, error: authorsError } = useFetch(apiUrl + "author");

    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = { title, description: body, AuthorId: author };

        if (title === "" || author === "" || author === 0 || author === "") {
            setError("All fields are required.");
            return;
        }

        setIsPending(true);
        setError(""); // Clear error message

        fetch(apiUrl + "blog", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(blog),
        }).then(() => {
            console.log("new blog added");
            setIsPending(false);
            // history.go(-1);
            history.push("/");
        });
    };

    return (
        <div className="create">
            <h2>Add a New blog</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit}>
                <label>Blog title:</label>
                <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} />

                <label>Blog body</label>
                <textarea required value={body} onChange={(e) => setBody(e.target.value)}></textarea>

                <label>Blog author:</label>
                {authorsPending && <div>Loading authors...</div>}
                {authorsError && <div>{authorsError}</div>}
                <select value={author} onChange={(e) => setAuthor(e.target.value)} disabled={authorsPending}>
                    <option value="">Select an author</option>
                    {authors &&
                        authors.map((author) => (
                            <option key={author.id} value={author.id}>
                                {author.name}
                            </option>
                        ))}
                </select>

                {!isPending && <button>Add blog</button>}
                {isPending && <button disabled>Adding blog...</button>}
            </form>
        </div>
    );
};

export default CreateBlog;
