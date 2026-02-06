import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import "./CompanyUpdates.css";

export default function CompanyUpdates({ items = [] }) {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const trackRef = useRef(null);

  if (!items.length) return null;

  // Duplicate items for seamless scroll
  const scrollItems = [...items, ...items];

  const scroll = (direction) => {
    const el = trackRef.current;
    if (!el) return;

    el.scrollBy({
      left: direction === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  return (
    <section className="companySection">
      <div className="companyHead">
        <h2 className="sectionTitle">{t("companyUpdatesTitle")}</h2>
        <p className="sectionSub">{t("companyUpdatesDesc")}</p>
      </div>

      <div className="companyScrollWrapper">
        {/* LEFT ARROW */}
        <button
          className="companyArrow left"
          onClick={() => scroll("left")}
          aria-label="Scroll left"
        >
          ‹
        </button>

        {/* SCROLL TRACK */}
        <div className="companyScrollTrack" ref={trackRef}>
          {scrollItems.map((p, idx) => (
            <article
              key={`${p.id}-${idx}`}
              className="companyCard"
              onClick={() => navigate(`/company/${p.id}`)}
            >
              <div className="companyThumb">
                <img src={p.image} alt={p.title} loading="lazy" />
              </div>
              <div className="companyBody">
                <h3 className="companyTitle">{p.title}</h3>
                <p className="companyDesc">{p.description}</p>
                <div className="companyMeta">
                  <span>{p.author}</span> · <span>{p.date}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* RIGHT ARROW */}
        <button
          className="companyArrow right"
          onClick={() => scroll("right")}
          aria-label="Scroll right"
        >
          ›
        </button>
      </div>
    </section>
  );
}
