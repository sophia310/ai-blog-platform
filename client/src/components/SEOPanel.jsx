import { useState } from "react";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import api from "../api/axios";

function SEOPanel({
  title,
  content,
  setTitle,
  setMetaDescription
}) {

  const [seoData, setSeoData] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const analyzeSEO = async () => {

    if (!title || !content) {

      toast.error(
        "Please enter title and content first"
      );

      return;
    }

    try {

      setLoading(true);

      const res =
        await api.post("/ai/seo", {
          title,
          content
        });

      setSeoData(res.data);

      toast.success(
        "SEO analysis generated successfully"
      );

    } catch (error) {

      console.log(error);

      if (
        error.response?.data?.message ===
        "Invalid token"
      ) {

        toast.error(
          "Session expired. Please login again."
        );

        localStorage.clear();

        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);

      } else {

        toast.error(
          error.response?.data?.message ||
          "AI analysis failed"
        );
      }

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="cinematic-seo-panel">

      {/* Glow */}
      <div className="cinematic-seo-glow"></div>

      {/* Header */}
      <div className="seo-panel-header">

        <p className="seo-panel-label">
          AI POWERED
        </p>

        <h2 className="seo-panel-heading">
          SEO Assistant
        </h2>

        <p className="seo-panel-description">

          Generate optimized titles,
          keywords, and meta descriptions
          with AI assistance.

        </p>

      </div>

      {/* Button */}
      <button
        className="cinematic-seo-btn"
        onClick={analyzeSEO}
        disabled={loading}
      >

        {loading ? (

          <ClipLoader
            size={20}
            color="#ffffff"
          />

        ) : (

          "Analyze SEO"

        )}

      </button>

      {/* RESULTS */}

      {seoData && (

        <div className="seo-results-wrapper">

          {/* Suggested Titles */}

          <div className="seo-result-section">

            <h5 className="seo-result-heading">
              Suggested Titles
            </h5>

            {seoData.suggestedTitles?.map(
              (item, index) => (

                <div
                  key={index}
                  className="seo-result-card"
                >

                  <p className="seo-result-text">
                    {item}
                  </p>

                  <button
                    className="seo-use-btn"
                    onClick={() => {

                      setTitle(item);

                      toast.success(
                        "Title applied"
                      );
                    }}
                  >

                    Use Title

                  </button>

                </div>
              )
            )}

          </div>

          {/* Meta Description */}

          <div className="seo-result-section">

            <h5 className="seo-result-heading">
              Meta Description
            </h5>

            <div className="seo-result-card">

              <p className="seo-result-text">

                {
                  seoData.metaDescription
                }

              </p>

              <button
                className="seo-use-btn"
                onClick={() => {

                  setMetaDescription(
                    seoData.metaDescription
                  );

                  toast.success(
                    "Meta description applied"
                  );
                }}
              >

                Use Meta

              </button>

            </div>

          </div>

          {/* Keywords */}

          <div className="seo-result-section">

            <h5 className="seo-result-heading">
              Keywords
            </h5>

            <div className="d-flex flex-wrap gap-2">

              {seoData.keywords?.map(
                (keyword, index) => (

                  <span
                    key={index}
                    className="seo-keyword"
                  >

                    #{keyword}

                  </span>

                )
              )}

            </div>

          </div>

          {/* Readability */}

          <div className="seo-result-section">

            <h5 className="seo-result-heading">
              Readability Tip
            </h5>

            <div className="seo-tip-box">

              {
                seoData.readabilityTip
              }

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default SEOPanel;