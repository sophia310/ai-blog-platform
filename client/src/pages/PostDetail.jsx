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

      console.log(error);

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

        console.log(error);

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

    <div className="post-detail-page">

      {/* COVER IMAGE */}

      {post.coverImage && (

        <img
          src={post.coverImage}
          alt={post.title}
          className="post-detail-cover"
        />

      )}

      {/* TITLE */}

      <h1 className="post-detail-title">

        {post.title}

      </h1>

      {/* META */}

      <div className="post-detail-meta">

        <span>
          By {post.author?.name}
        </span>

        <span>
          {calculateReadingTime(
            post.content
          )} min read
        </span>

      </div>

      {/* TAGS */}

      <div className="post-detail-tags">

        {post.tags?.map(
          (tag, index) => (

            <span
              key={index}
              className="post-detail-tag"
            >
              #{tag}
            </span>

          )
        )}

      </div>

      {/* ACTION BUTTONS */}

      {user?.id ===
        post.author?._id && (

          <div
            className="d-flex gap-3 mb-5"
          >

            <button
              className="save-profile-btn"
              onClick={() =>
                navigate(
                  `/edit/${post._id}`
                )
              }
            >
              Edit Story
            </button>

            <button
              className="cancel-profile-btn"
              onClick={
                handleDelete
              }
            >
              Delete
            </button>

          </div>

        )}

      {/* CONTENT */}

      <div
        className="post-detail-content"
        dangerouslySetInnerHTML={{
          __html:
            post.content
        }}
      ></div>

    </div>
  );
}

export default PostDetail;