import { Link } from "react-router-dom";

function PostCard({ post }) {
  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <h4>{post.title}</h4>

        <p className="text-muted">
          By {post.author?.name || "Unknown Author"}
        </p>

        <p>
          {post.content.length > 150
            ? post.content.substring(0, 150) + "..."
            : post.content}
        </p>

        {post.tags?.length > 0 && (
          <div className="mb-2">
            {post.tags.map((tag, index) => (
              <span key={index} className="badge bg-secondary me-2">
                {tag}
              </span>
            ))}
          </div>
        )}

        <Link to={`/posts/${post._id}`} className="btn btn-sm btn-dark">
          Read More
        </Link>
      </div>
    </div>
  );
}

export default PostCard;