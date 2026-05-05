import { useState, useRef } from "react";
import useInView from "../hooks/useInView";

export default function ProjectCard({ project, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, 0.2);

  return (
    <div
      ref={ref}
      className="project-card"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(30px)",
        transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 100}ms`,
      }}
    >
      <div
        className="project-card-inner"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
          border: `1px solid ${isHovered ? "rgba(59,130,246,0.3)" : "rgba(255,255,255,0.08)"}`,
          borderRadius: "24px",
          overflow: "hidden",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          transform: isHovered ? "translateY(-8px)" : "translateY(0)",
          boxShadow: isHovered ? "0 25px 40px -12px rgba(0,0,0,0.5)" : "none",
        }}
      >
        <div className="project-card-image">
          <img
            src={project.img}
            alt={project.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
              transform: isHovered ? "scale(1.08)" : "scale(1)",
            }}
          />
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(5,5,8,0.95) 0%, transparent 50%)",
          }} />
          <div className="project-card-badges">
            <span className="project-card-category">{project.category}</span>
            {project.highlight && (
              <span className="project-card-featured">⭐ Recomendado</span>
            )}
          </div>
          <div className="project-card-year" style={{ background: "linear-gradient(135deg, #3B82F6, #06B6D4)" }}>
            {project.price}
          </div>
        </div>
        <div className="project-card-content">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <h3 className="project-card-title" style={{ margin: 0 }}>
              {project.title}
            </h3>
            <span style={{
              background: "rgba(6,182,212,0.15)",
              color: "#06B6D4",
              padding: "4px 12px",
              borderRadius: "20px",
              fontSize: "12px",
              fontWeight: 600,
            }}>
              {project.duration}
            </span>
          </div>
          <p className="project-card-desc">
            {project.desc}
          </p>
          <div className="project-card-features-section">
            <div className="project-card-features-label">
              INCLUYE
            </div>
            <div className="project-card-features">
              {project.features.map(f => (
                <span key={f} className="project-card-feature" style={{ color: "#06B6D4", background: "rgba(6,182,212,0.1)" }}>✓ {f}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
