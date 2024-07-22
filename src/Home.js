import BlogList from "./BlogList";
import useFetch from "./useFetch";

const Home = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    console.log(apiUrl);
    const { data: blogs, isPending, error } = useFetch(apiUrl + "blog");

    return (
        <div className="home">
            {error && <div>{error}</div>}
            {/* All blogs */}
            {isPending && <div>Loading...</div>}
            {blogs && <BlogList blogs={blogs} title="All blogs!" />}
        </div>
    );
};

export default Home;
