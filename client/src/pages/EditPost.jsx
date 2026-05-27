import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/axios";

function EditPost() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [metaDescription, setMetaDescription] =
    useState("");

  const getPost = async () => {

    try {

      const res = await api.get(`/posts/${id}`);

      const post = res.data;

      setTitle(post.title);
      setContent(post.content);
      setTags(post.tags.join(", "));
      setMetaDescription(
        post.metaDescription || ""
      );

    } catch (error) {

      console.log(error);

      toast.error("Failed to load post");
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  const handleUpdate = async (e) => {

    e.preventDefault();

    try {

      await api.put(`/posts/${id}`, {
        title,
        content,
        tags: tags
          .split(",")
          .map((tag) => tag.trim()),
        metaDescription
      });

      toast.success(
        "Post updated successfully"
      );

      setTimeout(() => {
        navigate(`/posts/${id}`);
      }, 1500);

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to update post"
      );
    }
  };

  return (

    <div className="row justify-content-center">

      <div className="col-md-8">

        <div className="card shadow p-4">

          <h2 className="mb-4">
            Edit Blog Post
          </h2>

          <form onSubmit={handleUpdate}>

            {/* Title */}
            <div className="mb-3">

              <label className="form-label">
                Title
              </label>

              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                required
              />

            </div>

            {/* Content */}
            <div className="mb-3">

              <label className="form-label">
                Content
              </label>

              <textarea
                rows="10"
                className="form-control"
                value={content}
                onChange={(e) =>
                  setContent(e.target.value)
                }
                required
              />

            </div>

            {/* Tags */}
            <div className="mb-3">

              <label className="form-label">
                Tags
              </label>

              <input
                type="text"
                className="form-control"
                placeholder="react, javascript, frontend"
                value={tags}
                onChange={(e) =>
                  setTags(e.target.value)
                }
              />

            </div>

            {/* Meta Description */}
            <div className="mb-4">

              <label className="form-label">
                Meta Description
              </label>

              <textarea
                rows="3"
                className="form-control"
                value={metaDescription}
                onChange={(e) =>
                  setMetaDescription(
                    e.target.value
                  )
                }
              />

            </div>

            {/* Submit Button */}
            <button className="btn btn-dark">
              Update Post
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default EditPost;