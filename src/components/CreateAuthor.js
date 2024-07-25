import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const CreateAuthor = () => {
    const apiUrl = process.env.REACT_APP_API_URL;

    const [name, setName] = useState("");
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState("");

    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (name === "") {
            setError("All fields are required.");
            return;
        }

        setIsPending(true);
        setError(""); // Clear error message

        fetch(`${apiUrl}author/?name=${name}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        }).then(() => {
            console.log("new author added");
            setIsPending(false);
            // history.go(-1);
            history.push("/");
        });
    };

    return (
        <div className="create">
            <h2>Add a New Author</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit}>
                <label>Author name:</label>
                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} />

                {!isPending && <button>Add author</button>}
                {isPending && <button disabled>Adding author...</button>}
            </form>
        </div>
    );
};

export default CreateAuthor;
