import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Editor() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [metaDescription, setMetaDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/posts", {
        title,
        content,
        tags: tags.split(",").map((tag) => tag.trim()),
        metaDescription
      });

      alert("Post created successfully");
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create post");
      console.log(error);
    }
  };

  return (
    <div className="row">
      <div className="col-md-8">
        <h2 className="mb-3">Write Blog</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Title</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label>Content</label>
            <textarea
              className="form-control"
              rows="10"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="mb-3">
            <label>Tags comma separated</label>
            <input
              type="text"
              className="form-control"
              placeholder="react, javascript, webdev"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>Meta Description</label>
            <textarea
              className="form-control"
              rows="3"
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
            ></textarea>
          </div>

          <button className="btn btn-dark">
            Publish
          </button>
        </form>
      </div>

      <div className="col-md-4">
        <div className="card p-3">
          <h5>AI SEO Assistant</h5>
          <p className="text-muted">
            We will add this after basic blog creation works.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Editor;