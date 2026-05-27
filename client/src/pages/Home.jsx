import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

import api from "../api/axios";
import PostCard from "../components/PostCard";

function Home() {

  const [posts, setPosts] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [
    selectedTag,
    setSelectedTag
  ] = useState("");

  const [
    searchFocused,
    setSearchFocused
  ] = useState(false);

  const getPosts = async () => {

    try {

      const res = await api.get(
        "/posts"
      );

      setPosts(res.data);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const filteredPosts = posts.filter(
    (post) => {

      const searchText =
        search.toLowerCase();

      const matchesSearch =

        post.title
          .toLowerCase()
          .includes(searchText)

        ||

        post.content
          .toLowerCase()
          .includes(searchText)

        ||

        post.tags?.some((tag) =>
          tag
            .toLowerCase()
            .includes(searchText)
        );

      const matchesTag =

        !selectedTag

        ||

        post.tags?.includes(
          selectedTag
        );

      return (
        matchesSearch &&
        matchesTag
      );
    }
  );

  const allTags = [
    ...new Set(
      posts.flatMap(
        (post) =>
          post.tags || []
      )
    )
  ];

  return (

    <main className="container py-5">

      {/* HERO */}
      <section className="mb-5">

        <motion.div

          initial={{
            opacity: 0,
            y: 24
          }}

          animate={{
            opacity: 1,
            y: 0
          }}

          transition={{
            duration: 1.1,
            ease: [0.22, 1, 0.36, 1]
          }}

          animate={
            searchFocused
              ? {
                opacity: 0.45,
                filter:
                  "blur(3px)"
              }
              : {
                opacity: 1,
                filter:
                  "blur(0px)"
              }
          }
        >

          <p className="hero-subtitle">
            AI Powered Publishing
          </p>

          <h1 className="hero-title editorial-title">
            A space for
            intelligent writing and
            modern storytelling.
          </h1>

        </motion.div>

      </section>

      {/* SEARCH */}
      <motion.section

        initial={{
          opacity: 0,
          y: 18
        }}

        animate={{
          opacity: 1,
          y: 0
        }}

        transition={{
          delay: 0.25,
          duration: 1,
          ease: [0.22, 1, 0.36, 1]
        }}

        className="mb-5"
      >

        <div className="position-relative mb-4">

          <Search
            size={18}
            style={{
              position: "absolute",
              left: "18px",
              top: "18px",
              color: "#71717A"
            }}
          />

          <motion.input
            whileFocus={{
              scale: 1.01
            }}

            transition={{
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1]
            }}

            type="text"

            className="search-bar ps-5"

            placeholder="Search articles, ideas, tags..."

            value={search}

            onFocus={() =>
              setSearchFocused(true)
            }

            onBlur={() =>
              setSearchFocused(false)
            }

            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />

        </div>

        {/* TAGS */}
        <div className="d-flex flex-wrap gap-3">

          <button
            className={`tag-pill ${selectedTag === ""
                ? "active"
                : ""
              }`}
            onClick={() =>
              setSelectedTag("")
            }
          >
            All
          </button>

          {allTags.map(
            (tag, index) => (

              <button
                key={index}

                className={`tag-pill ${selectedTag === tag
                    ? "active"
                    : ""
                  }`}

                onClick={() =>
                  setSelectedTag(
                    tag
                  )
                }
              >
                #{tag}
              </button>

            )
          )}

        </div>

      </motion.section>

      {/* POSTS */}
      <motion.section

        initial={{
          opacity: 0
        }}

        animate={{
          opacity: 1
        }}

        transition={{
          delay: 0.45,
          duration: 1.2
        }}

        className="row g-4"
      >

        <div className="posts-grid">

          {filteredPosts.map((post) => (

            <PostCard
              key={post._id}
              post={post}
            />

          ))}

        </div>

      </motion.section>

    </main>
  );
}

export default Home;