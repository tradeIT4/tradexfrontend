import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import "./VideoGrid.css";

export default function VideoGrid({ items = [] }) {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const trackRef = useRef(null);
  const directionRef = useRef(1); // 1 = right, -1 = left
  const [isHovered, setIsHovered] = useState(false);

  // STICKY AUTO SCROLL LEFT <-> RIGHT
  useEffect(() => {
    const el = trackRef.current;
    if (!el || items.length === 0) return;

    let rafId;

    const autoScroll = () => {
      if (!isHovered) {
        // move scroll
        el.scrollLeft += directionRef.current * 1; // speed

        // reverse direction if at edges
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
      left: dir === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  return (
    <section className="videoMarqueeSection">
      <div className="videoHeader">
        <h2 className="videoSectionTitle">{t("videos")}</h2>
        <p className="videoSectionSub">{t("videosDesc")}</p>
      </div>

      <div
        className="videoMarquee"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <button className="scrollBtn left" onClick={() => scroll("left")}>
          ‹
        </button>

        <div className="videoTrack" ref={trackRef}>
          {items.map((v) => (
            <div
              key={v.id}
              className="videoItem"
              onClick={() => navigate(`/video/${v.id}`)}
            >
              <img src={v.thumbnail} alt={v.title} />
              <div className="videoTitleOverlay">
                <span className="videoItemTitle">{v.title}</span>
              </div>
            </div>
          ))}
        </div>

        <button className="scrollBtn right" onClick={() => scroll("right")}>
          ›
        </button>
      </div>
    </section>
  );
}
