import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

import {
  ImageIcon
} from "lucide-react";

import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import api from "../api/axios";

import SEOPanel from "../components/SEOPanel";

function Editor() {

  const navigate = useNavigate();

  const [title, setTitle] =
    useState("");

  const [content, setContent] =
    useState("");

  const [tags, setTags] =
    useState("");

  const [
    metaDescription,
    setMetaDescription
  ] = useState("");

  const [coverImage, setCoverImage] =
    useState(null);

  const [preview, setPreview] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleImageChange = (e) => {

    const file =
      e.target.files[0];

    if (!file) return;

    setCoverImage(file);

    setPreview(
      URL.createObjectURL(file)
    );
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const formData =
        new FormData();

      formData.append(
        "title",
        title
      );

      formData.append(
        "content",
        content
      );

      formData.append(
        "metaDescription",
        metaDescription
      );

      formData.append(
        "tags",

        JSON.stringify(
          tags
            .split(",")
            .map((tag) =>
              tag.trim()
            )
        )
      );

      if (coverImage) {

        formData.append(
          "coverImage",
          coverImage
        );
      }

      await api.post(
        "/posts",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data"
          }
        }
      );

      toast.success(
        "Story published successfully"
      );

      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to publish story"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="editorial-editor-page">

      {/* ATMOSPHERIC GLOW */}
      <div className="editor-atmosphere"></div>

      <div className="container-fluid px-lg-5 position-relative">

        <div className="row g-5">

          {/* LEFT SIDE */}
          <div className="col-lg-8">

            <div className="editorial-layout">

              <h1 className="editorial-main-heading">
                Write Story
              </h1>

              <form onSubmit={handleSubmit}>

                {/* COVER IMAGE */}

                <div className="mb-5">

                  <p className="editorial-label">
                    COVER IMAGE
                  </p>

                  <label className="upload-zone">

                    <input
                      type="file"
                      accept="image/*"
                      onChange={
                        handleImageChange
                      }
                      hidden
                    />

                    <ImageIcon
                      size={28}
                      strokeWidth={1.5}
                    />

                    <span>
                      Click or drag to upload
                      cover image
                    </span>

                  </label>

                </div>

                {/* PREVIEW */}

                {preview && (

                  <div className="editor-cover-preview-wrapper">

                    <img
                      src={preview}
                      alt="preview"
                      className="editor-cover-preview"
                    />

                  </div>
                )}

                {/* TITLE */}

                <div className="mb-5">

                  <p className="editorial-label">
                    STORY TITLE
                  </p>

                  <input
                    type="text"
                    className="editorial-title-input"
                    placeholder="Your story begins here..."
                    value={title}
                    onChange={(e) =>
                      setTitle(
                        e.target.value
                      )
                    }
                    required
                  />

                </div>

                {/* CONTENT */}

                <div className="mb-5">

                  <p className="editorial-label mb-4">
                    CONTENT
                  </p>

                  <div className="editorial-quill-wrapper">

                    <ReactQuill
                      theme="snow"
                      value={content}
                      onChange={setContent}
                      style={{
                        height: "380px",
                        marginBottom: "80px"
                      }}
                    />

                  </div>

                </div>

                {/* TAGS */}

                <div className="mb-5">

                  <p className="editorial-label">
                    TAGS
                  </p>

                  <input
                    type="text"
                    className="editorial-minimal-input"
                    placeholder="ai, design, react..."
                    value={tags}
                    onChange={(e) =>
                      setTags(
                        e.target.value
                      )
                    }
                  />

                </div>

                {/* META */}

                <div className="mb-5">

                  <p className="editorial-label">
                    META DESCRIPTION
                  </p>

                  <textarea
                    rows="3"
                    className="editorial-minimal-input"
                    placeholder="Brief SEO description..."
                    value={metaDescription}
                    onChange={(e) =>
                      setMetaDescription(
                        e.target.value
                      )
                    }
                  ></textarea>

                </div>

                {/* BUTTON */}

                <button
                  className="editorial-publish-btn"
                  disabled={loading}
                >

                  {loading
                    ? "Publishing..."
                    : "Publish Story"}

                </button>

              </form>

            </div>

          </div>

          {/* RIGHT SIDE */}

          <div className="col-lg-4">

            <div className="seo-glass-wrapper">

              <SEOPanel
                title={title}
                content={content}
                setTitle={setTitle}
                setMetaDescription={
                  setMetaDescription
                }
              />

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Editor;