import { useEffect, useState } from "react";

import { Navigate } from "react-router-dom";

import { toast } from "react-toastify";

import {
  Mail,
  Pencil
} from "lucide-react";

import api from "../api/axios";

import PostCard from "../components/PostCard";

function Profile() {

  const [myPosts, setMyPosts] =
    useState([]);

  const [showModal, setShowModal] =
    useState(false);

  const [name, setName] =
    useState("");

  const [role, setRole] =
    useState("");

  const [instagram, setInstagram] =
    useState("");

  const [profileImage, setProfileImage] =
    useState(null);

  const [preview, setPreview] =
    useState("");

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  if (!user) {

    toast.error(
      "Please login first"
    );

    return <Navigate to="/login" />;
  }

  const getMyPosts = async () => {

    try {

      const res = await api.get(
        "/posts"
      );

      const filteredPosts =
        res.data.filter(
          (post) =>
            post.author?._id ===
            (user?._id || user?.id)
        );

      setMyPosts(filteredPosts);

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to load profile"
      );
    }
  };

  useEffect(() => {

    getMyPosts();

    setName(user?.name || "");

    setRole(
      user?.role ||
      "VISUAL ARTIST & DEVELOPER"
    );

    setInstagram(
      user?.instagram || ""
    );

    setPreview(
      user?.profileImage || ""
    );

  }, []);

  const handleImageChange = (e) => {

    const file =
      e.target.files[0];

    if (!file) return;

    setProfileImage(file);

    setPreview(
      URL.createObjectURL(file)
    );
  };

  const handleUpdateProfile =
    async (e) => {

      e.preventDefault();

      try {

        const formData =
          new FormData();

        formData.append(
          "name",
          name
        );

        formData.append(
          "role",
          role
        );

        formData.append(
          "instagram",
          instagram
        );

        if (profileImage) {

          formData.append(
            "profileImage",
            profileImage
          );
        }

        const res =
          await api.put(
            "/users/profile",
            formData,
            {
              headers: {
                "Content-Type":
                  "multipart/form-data"
              }
            }
          );

        localStorage.setItem(
          "user",
          JSON.stringify(
            res.data.user
          )
        );

        toast.success(
          "Profile updated"
        );

        setShowModal(false);

        window.location.reload();

      } catch (error) {

        console.log(error);

        toast.error(
          "Failed to update profile"
        );
      }
    };

  return (

    <div className="profile-page">

      {/* BACKGROUND ATMOSPHERE */}
      <div className="profile-atmosphere"></div>

      {/* HERO */}
      <section className="profile-hero">

        {/* EDIT BUTTON */}
        <button
          className="edit-profile-btn"
          onClick={() =>
            setShowModal(true)
          }
        >

          <Pencil size={14} />

          Edit Profile

        </button>

        {/* GLOW */}
        <div className="avatar-glow"></div>

        {/* AVATAR */}
        <div className="profile-avatar">

          {user?.profileImage ? (

            <img
              src={
                user.profileImage
              }
              alt="profile"
              className="profile-avatar-image"
            />

          ) : (

            user?.name?.charAt(0)

          )}

        </div>

        {/* NAME */}
        <h1 className="profile-name">

          {user?.name}

        </h1>

        {/* ROLE */}
        <p className="profile-subtitle">

          {user?.role ||
            "VISUAL ARTIST & DEVELOPER"}

        </p>

        {/* SOCIALS */}
        <div className="profile-socials">

          {user?.instagram && (

            <a
              href={`https://instagram.com/${user.instagram}`}
              target="_blank"
              rel="noreferrer"
              className="profile-social-link"
            >

              <span style={{
                fontSize: "15px"
              }}>
                📸
              </span>

              <span>
                @{user.instagram}
              </span>

            </a>

          )}

        </div>

        {/* STATS */}
        <div className="profile-stats-row">

          {/* POSTS */}
          <div className="profile-stat-block">

            <h3>
              {myPosts.length}
            </h3>

            <p>
              Published Stories
            </p>

          </div>

          <div className="profile-divider"></div>

          {/* EMAIL */}
          <div className="profile-stat-block">

            <Mail size={18} />

            <p>
              {user?.email}
            </p>

          </div>

        </div>

      </section>

      {/* BLOGS */}
      <section className="profile-posts-section">

        <h2 className="profile-section-heading">

          Authored Works

        </h2>

        {myPosts.length === 0 ? (

          <div className="empty-profile-state">

            You haven’t published any
            stories yet.

          </div>

        ) : (

          <div className="profile-post-grid">

            {myPosts.map((post) => (

              <PostCard
                key={post._id}
                post={post}
              />

            ))}

          </div>

        )}

      </section>

      {/* ================================= */}
      {/* EDIT MODAL */}
      {/* ================================= */}

      {showModal && (

        <div className="profile-modal-overlay">

          <div className="profile-modal">

            <h2>
              Edit Profile
            </h2>

            <form
              onSubmit={
                handleUpdateProfile
              }
            >

              {/* IMAGE */}
              <div className="mb-4">

                <label>
                  Profile Image
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={
                    handleImageChange
                  }
                />

              </div>

              {/* NAME */}
              <div className="mb-4">

                <label>
                  Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) =>
                    setName(
                      e.target.value
                    )
                  }
                  className="profile-input"
                />

              </div>

              {/* ROLE */}
              <div className="mb-4">

                <label>
                  Role
                </label>

                <input
                  type="text"
                  value={role}
                  onChange={(e) =>
                    setRole(
                      e.target.value
                    )
                  }
                  className="profile-input"
                />

              </div>

              {/* INSTAGRAM */}
              <div className="mb-4">

                <label>
                  Instagram
                </label>

                <input
                  type="text"
                  value={instagram}
                  onChange={(e) =>
                    setInstagram(
                      e.target.value
                    )
                  }
                  className="profile-input"
                  placeholder="username"
                />

              </div>

              {/* ACTIONS */}
              <div className="d-flex gap-3">

                <button
                  type="submit"
                  className="save-profile-btn"
                >
                  Save Changes
                </button>

                <button
                  type="button"
                  className="cancel-profile-btn"
                  onClick={() =>
                    setShowModal(false)
                  }
                >
                  Cancel
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default Profile;