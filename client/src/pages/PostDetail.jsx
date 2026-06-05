
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

  const [showDeleteModal,
    setShowDeleteModal] =
    useState(false);

  const [isSaved,
    setIsSaved] =
    useState(false);

  const [comments,
    setComments] =
    useState([]);

  const [commentText,
    setCommentText] =
    useState("");

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

  const getComments =
    async () => {

      try {

        const res =
          await api.get(
            `/comments/${id}`
          );

        setComments(
          res.data
        );

      } catch (error) {

        console.log(error);
      }
    };

  const checkSavedStatus =
    async () => {

      if (!user) return;

      try {

        const res =
          await api.get(
            `/bookmarks/check/${id}`
          );

        setIsSaved(
          res.data.saved
        );

      } catch (error) {

        console.log(error);
      }
    };

  useEffect(() => {

    getPost();

    getComments();

    checkSavedStatus();

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



  const handleBookmark =
    async () => {

      try {

        if (isSaved) {

          await api.delete(
            `/bookmarks/${post._id}`
          );

          setIsSaved(false);

          toast.success(
            "Removed from saved"
          );

        } else {

          await api.post(
            `/bookmarks/${post._id}`
          );

          setIsSaved(true);

          toast.success(
            "Story saved"
          );
        }

      } catch (error) {

        console.log(error);

        toast.error(
          "Bookmark failed"
        );
      }
    };

  const handleShare =
    async () => {

      const url =
        window.location.href;

      try {

        if (
          navigator.share
        ) {

          await navigator.share({
            title:
              post.title,
            url
          });

        } else {

          await navigator.clipboard.writeText(
            url
          );

          toast.success(
            "Link copied!"
          );
        }

      } catch (error) {

        console.log(error);
      }
    };

  const handleComment =
    async () => {

      if (
        !commentText.trim()
      )
        return;

      try {

        await api.post(
          `/comments/${id}`,
          {
            text:
              commentText
          }
        );

        toast.success(
          "Comment added"
        );

        setCommentText("");

        getComments();

      } catch (error) {

        toast.error(
          "Failed to comment"
        );
      }
    };

  const handleDelete =
    async () => {

      try {

        await api.delete(
          `/posts/${id}`
        );

        toast.success(
          "Story deleted successfully"
        );

        navigate("/");

      } catch (error) {

        console.log(error);

        toast.error(
          "Failed to delete story"
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

      {post.coverImage && (

        <img
          src={post.coverImage}
          alt={post.title}
          className="post-detail-cover"
        />

      )}

      <h1 className="post-detail-title">

        {post.title}

      </h1>

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

      <div
        className="d-flex gap-3 mb-5 flex-wrap"
      >

        {user?.id ===
          post.author?._id && (

            <>
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
                onClick={() =>
                  setShowDeleteModal(
                    true
                  )
                }
              >
                Delete
              </button>
            </>

          )}

        <button
          className="bookmark-btn"
          onClick={
            handleBookmark
          }
        >
          {isSaved
            ? "★ Saved"
            : "☆ Save"}
        </button>

        <button
          className="share-btn"
          onClick={
            handleShare
          }
        >
          Share
        </button>

      </div>

      <div
        className="post-detail-content"
        dangerouslySetInnerHTML={{
          __html:
            post.content
        }}
      ></div>

      <section
        className="comments-section"
      >

        <h2>
          Comments
        </h2>

        {user && (

          <div
            className="comment-form"
          >

            <textarea
              value={commentText}
              onChange={(e) =>
                setCommentText(
                  e.target.value
                )
              }
              placeholder="Share your thoughts..."
            />

            <button
              className="save-profile-btn comment-submit-btn"
              onClick={handleComment}
            >
              Post Comment
            </button>

          </div>

        )}

        <div className="comments-list">

          {comments.length === 0 ? (

            <div className="empty-profile-state">
              No comments yet.
              Be the first to comment.
            </div>

          ) : (

            comments.map(
              (comment) => (

                <div
                  key={comment._id}
                  className="comment-card"
                >

                  <h5>
                    {comment.author?.name}
                  </h5>

                  <p>
                    {comment.text}
                  </p>

                </div>

              )
            )

          )}

        </div>

      </section>

      {showDeleteModal && (

        <div className="delete-overlay">

          <div className="delete-modal">

            <h3>
              Delete Story?
            </h3>

            <p>
              This action cannot
              be undone.
            </p>

            <div
              className="delete-modal-actions"
            >

              <button
                className="cancel-profile-btn"
                onClick={() =>
                  setShowDeleteModal(
                    false
                  )
                }
              >
                Cancel
              </button>

              <button
                className="save-profile-btn"
                onClick={
                  handleDelete
                }
              >
                Delete
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default PostDetail;

