import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import useFetch from "./useFetch";

const Create = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [author, setAuthor] = useState(0);
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();
    const apiUrl = process.env.REACT_APP_API_URL;
    const { data: authors, isPending: authorsPending, error: authorsError } = useFetch(apiUrl + "author");

    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = { title, description: body, AuthorId: author };

        setIsPending(true);

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
            <form onSubmit={handleSubmit}>
                <label>Blog title:</label>
                <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} />

                <label>Blog body</label>
                <textarea required value={body} onChange={(e) => setBody(e.target.value)}></textarea>

                <label>Blog author:</label>
                {authorsPending && <div>Loading authors...</div>}
                {authorsError && <div>{authorsError}</div>}
                <select value={author} onChange={(e) => setAuthor(e.target.value)} disabled={authorsPending}>
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

export default Create;
