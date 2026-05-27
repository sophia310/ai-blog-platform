import {
  useEffect,
  useState
} from "react";

import {
  useParams,
  useNavigate
} from "react-router-dom";

import { toast } from "react-toastify";

import api from "../api/axios";

function PostDetail() {

  const navigate =
    useNavigate();

  const { id } =
    useParams();

  const [post, setPost] =
    useState(null);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const getPost = async () => {

    try {

      const res =
        await api.get(
          `/posts/${id}`
        );

      setPost(res.data);

    } catch (error) {

      toast.error(
        "Failed to load post"
      );
    }
  };

  useEffect(() => {
    getPost();
  }, [id]);

  const calculateReadingTime =
    (content) => {

      const words =
        content
          .replace(/<[^>]+>/g, "")
          .split(/\s+/).length;

      return Math.ceil(
        words / 200
      );
    };

  const handleDelete =
    async () => {

      const confirmDelete =
        window.confirm(
          "Delete this post?"
        );

      if (!confirmDelete)
        return;

      try {

        await api.delete(
          `/posts/${id}`
        );

        toast.success(
          "Post deleted"
        );

        navigate("/");

      } catch (error) {

        toast.error(
          "Failed to delete"
        );
      }
    };

  if (!post) {

    return (
      <div className="text-center mt-5">
        Loading...
      </div>
    );
  }

  return (

    <div className="post-detail-container">

      {/* COVER */}

      {post.coverImage && (

        <div className="detail-cover-wrapper">

          <img
            src={post.coverImage}
            alt={post.title}
            className="detail-cover-image"
          />

        </div>
      )}

      <div className="post-detail-card">

        <h1 className="detail-title">
          {post.title}
        </h1>

        <div className="detail-meta">

          <span>
            By{" "}
            {post.author?.name}
          </span>

          <span>
            {
              calculateReadingTime(
                post.content
              )
            }{" "}
            min read
          </span>

        </div>

        <div className="tags-wrapper mb-4">

          {post.tags?.map(
            (tag, index) => (

              <span
                key={index}
                className="minimal-tag"
              >
                #{tag}
              </span>

            )
          )}

        </div>

        {user?.id ===
          post.author?._id && (

            <div className="mb-4">

              <button
                className="btn btn-outline-light me-3"
                onClick={() =>
                  navigate(
                    `/edit/${post._id}`
                  )
                }
              >
                Edit
              </button>

              <button
                className="btn btn-outline-danger"
                onClick={
                  handleDelete
                }
              >
                Delete
              </button>

            </div>
          )}

        <div
          className="detail-content"
          dangerouslySetInnerHTML={{
            __html:
              post.content
          }}
        ></div>

      </div>

    </div>
  );
}

export default PostDetail;