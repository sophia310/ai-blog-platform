import { motion } from "framer-motion";

import { ArrowRight } from "lucide-react";

import { Link } from "react-router-dom";

function PostCard({ post }) {

  const stripHtml = (html) => {

    const doc =
      new DOMParser().parseFromString(
        html,
        "text/html"
      );

    return (
      doc.body.textContent || ""
    );
  };

  return (

    <motion.article

      whileHover={{
        y: -6,
        scale: 1.015
      }}

      transition={{
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1]
      }}

      className="blog-card"
    >

      {/* COVER IMAGE */}
      {post.coverImage && (

        <div className="cover-wrapper">

          <img
            src={post.coverImage}
            alt={post.title}
            className="cover-image"
          />

        </div>
      )}

      {/* CARD CONTENT */}
      <div
        className="
          card-content
          d-flex
          flex-column
          h-100
        "
      >

        {/* AUTHOR */}
        <p className="blog-author">

          {post.author?.name ||
            "Unknown Author"}

        </p>

        {/* TITLE */}
        <h2 className="blog-title">

          {post.title}

        </h2>

        {/* PREVIEW */}
        <p className="blog-preview">

          {stripHtml(post.content)
            .length > 140

            ? stripHtml(
              post.content
            ).substring(0, 140) +
            "..."

            : stripHtml(
              post.content
            )}

        </p>

        {/* THIS FIXES ALIGNMENT */}
        <div className="flex-grow-1"></div>

        {/* BOTTOM SECTION */}
        <div>

          {/* TAGS */}
          <div className="tags-wrapper mb-4">

            {post.tags
              ?.slice(0, 3)
              .map(
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

          {/* CTA */}
          <Link
            to={`/posts/${post._id}`}
            className="read-more-link"
          >

            Read Article

            <motion.div
              whileHover={{
                x: 4
              }}
              transition={{
                duration: 0.4
              }}
            >

              <ArrowRight size={16} />

            </motion.div>

          </Link>

        </div>

      </div>

    </motion.article>
  );
}

export default PostCard;