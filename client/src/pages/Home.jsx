import { useEffect, useState } from "react";
import api from "../api/axios";
import PostCard from "../components/PostCard";

function Home() {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    try {
      const res = await api.get("/posts");
      setPosts(res.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load posts");
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Latest Blogs</h2>
      </div>

      {posts.length === 0 ? (
        <p>No posts yet. Write your first blog!</p>
      ) : (
        posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))
      )}
    </div>
  );
}

export default Home;