import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  const getPost = async () => {
    try {
      const res = await api.get(`/posts/${id}`);
      setPost(res.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load post");
    }
  };

  useEffect(() => {
    getPost();
  }, [id]);

  const calculateReadingTime = (content) => {
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return minutes;
  };

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <div className="card p-4 shadow">
      <h1>{post.title}</h1>

      <p className="text-muted">
        By {post.author?.name || "Unknown Author"} |{" "}
        {calculateReadingTime(post.content)} min read
      </p>

      {post.tags?.length > 0 && (
        <div className="mb-3">
          {post.tags.map((tag, index) => (
            <span key={index} className="badge bg-secondary me-2">
              {tag}
            </span>
          ))}
        </div>
      )}

      {post.metaDescription && (
        <div className="alert alert-info">
          <strong>Meta Description:</strong> {post.metaDescription}
        </div>
      )}

      <p style={{ whiteSpace: "pre-line" }}>{post.content}</p>
    </div>
  );
}

export default PostDetail;