import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import "./CompanyUpdates.css";

export default function CompanyUpdates({ items = [] }) {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const trackRef = useRef(null);
  const directionRef = useRef(1); // 1 = right, -1 = left
  const [isHovered, setIsHovered] = useState(false);

  // AUTO SCROLL LEFT <-> RIGHT (same as VideoGrid)
  useEffect(() => {
    const el = trackRef.current;
    if (!el || items.length === 0) return;

    let rafId;

    const autoScroll = () => {
      if (!isHovered) {
        el.scrollLeft += directionRef.current * 0.8; // speed

        if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 1) {
          directionRef.current = -1;
        }

        if (el.scrollLeft <= 0) {
          directionRef.current = 1;
        }
      }

      rafId = requestAnimationFrame(autoScroll);
    };

    rafId = requestAnimationFrame(autoScroll);
    return () => cancelAnimationFrame(rafId);
  }, [items, isHovered]);

  if (!items.length) return null;

  const scroll = (dir) => {
    if (!trackRef.current) return;

    trackRef.current.scrollBy({
      left: dir === "left" ? -340 : 340,
      behavior: "smooth",
    });
  };

  return (
    <section className="companySection">
      <div className="companyHead">
        <h2 className="sectionTitle">{t("companyUpdatesTitle")}</h2>
        <p className="sectionSub">{t("companyUpdatesDesc")}</p>
      </div>

      <div
        className="companyScrollWrapper"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* LEFT ARROW */}
        <button className="companyArrow left" onClick={() => scroll("left")}>
          ‹
        </button>

        {/* SCROLL TRACK */}
        <div className="companyScrollTrack" ref={trackRef}>
          {items.map((p) => (
            <article
              key={p.id}
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
        <button className="companyArrow right" onClick={() => scroll("right")}>
          ›
        </button>
      </div>
    </section>
  );
}
