import { useState, useEffect, useRef, useCallback } from "react";
import useCounter from "../hooks/useCounter";
import AnimSection from "../components/AnimSection";
import ProjectCard from "../components/ProjectCard";
import "../css/Inicio.css";
import {
  destinations,
  services,
  navLinks,
  categories,
  contactInfo,
  socialLinks,
  statsData,
} from "../data/portfolioData";

export default function TravelCatalog() {
  const [activeNav, setActiveNav] = useState("inicio");
  const [scrolled, setScrolled] = useState(false);
  const [filterCategory, setFilterCategory] = useState("todos");
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const destCount = useCounter(statsData[0].value, 1500);
  const clientCount = useCounter(statsData[1].value, 1500);
  const experienceYears = useCounter(statsData[2].value, 1500);
  const tourCount = useCounter(statsData[3].value, 1500);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ["inicio", "destinos", "servicios", "contacto"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveNav(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = useCallback((id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({ top: elementPosition, behavior: "smooth" });
      setActiveNav(id);
      setMobileMenuOpen(false);
    }
  }, []);

  const filteredDestinations = filterCategory === "todos"
    ? destinations
    : filterCategory === "destacados"
      ? destinations.filter(p => p.highlight)
      : destinations.filter(p => p.category.toLowerCase() === filterCategory.toLowerCase());

  const stats = [
    { label: statsData[0].label, value: destCount, suffix: statsData[0].suffix },
    { label: statsData[1].label, value: clientCount, suffix: statsData[1].suffix },
    { label: statsData[2].label, value: experienceYears, suffix: statsData[2].suffix },
    { label: statsData[3].label, value: tourCount, suffix: statsData[3].suffix },
  ];

  return (
    <div className="portfolio">
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {/* ========== NAVBAR ========== */}
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
          <button
            onClick={() => scrollTo("inicio")}
            className="logo-button"
          >
            <div className="logo-avatar">
              🌎
            </div>
            <div>
              <div className="logo-text">
                Turismo<span>Honduras</span>
              </div>
              <div className="logo-subtitle">
                Agencia de Viajes
              </div>
            </div>
          </button>

          <nav className={`nav ${scrolled ? 'scrolled' : ''} ${mobileMenuOpen ? 'nav-open' : ''}`}>
            {navLinks.map(({ id, label, icon }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`nav-button ${activeNav === id ? 'active' : ''}`}
              >
                <span>{icon}</span>
                <span>{label}</span>
              </button>
            ))}
          </nav>

          <button
            className={`hamburger ${mobileMenuOpen ? 'hamburger-active' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        {mobileMenuOpen && (
          <div
            className="mobile-overlay"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </header>

      {/* ========== HERO SECTION ========== */}
      <section id="inicio" className="hero-section">
        <div className="hero-bg">
          <div className="hero-bg-circle1" />
          <div className="hero-bg-circle2" />
          <div className="hero-bg-dots" />
        </div>

        <div className="hero-container">
          <AnimSection>
            <div className="status-badge">
              <div className="status-dot" />
              <span className="status-text">
                OFERTAS ESPECIALES DISPONIBLES
              </span>
            </div>

            <h1 className="hero-title">
              Descubre{" "}
              <span>
                Honduras
              </span>
              <br />
              <span className="hero-subtitle">
                Tu próxima aventura te espera
              </span>
            </h1>

            <p className="hero-description">
              Más de <strong>15 años</strong> creando experiencias inolvidables. Vuelos, hoteles y tours a los mejores destinos con precios exclusivos.
            </p>

            <div className="social-links">
              {socialLinks.map(btn => (
                <a
                  key={btn.label}
                  href={btn.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  {btn.icon} {btn.label}
                </a>
              ))}
            </div>

            <div className="stats-grid">
              {stats.map(stat => (
                <div key={stat.label} className="stat-item">
                  <div className="stat-value">
                    {stat.value}{stat.suffix}
                  </div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </AnimSection>

          <AnimSection delay={200}>
            <div className="hero-image-container">
              <div className="hero-image-bg" />
              <div className="hero-image-wrapper">
                <div className="hero-image-inner">
                  <img
                    src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop"
                    alt="Honduras Beach"
                    className="hero-image"
                    onError={(e) => {
                      e.target.src =
                        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop";
                    }}
                  />
                </div>
              </div>

              <div className="hero-badge1">
                <div className="hero-badge1-content">
                  <div className="hero-badge1-dot" />
                  <span className="hero-badge1-text">Ofertas activas</span>
                </div>
              </div>

              <div className="hero-badge2">
                <span className="hero-badge2-text">✈️ Tours • 🏨 Hoteles</span>
              </div>
            </div>
          </AnimSection>
        </div>
      </section>

      {/* ========== DESTINOS SECTION ========== */}
      <section id="destinos" className="projects-section">
        <div className="projects-container">
          <AnimSection className="projects-header">
            <div className="projects-badge">
              DESTINOS
            </div>
            <h2 className="projects-title">
              Explora los{" "}
              <span>
                mejores lugares
              </span>
            </h2>
            <p className="projects-description">
              Descubre los destinos más fascinantes de Honduras y el mundo
            </p>
          </AnimSection>

          <AnimSection delay={100} className="filter-buttons">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`filter-button ${filterCategory === cat ? 'active' : ''}`}
              >
                {cat === "todos" ? "🌎 Todos" : cat === "destacados" ? "⭐ Destacados" : cat === "Playa" ? "🏖️ Playa" : cat === "Cultural" ? "🏛️ Cultural" : cat === "Naturaleza" ? "🌳 Naturaleza" : "🧗 Aventura"}
              </button>
            ))}
          </AnimSection>

          <div className="projects-grid">
            {filteredDestinations.map((dest, idx) => (
              <ProjectCard key={dest.title} project={dest} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* ========== SERVICIOS SECTION ========== */}
      <section id="servicios" className="about-section">
        <div className="about-container">
          <AnimSection className="about-header">
            <div className="about-badge">
              SERVICIOS
            </div>
            <h2 className="about-title">
              Todo lo que necesitas para{" "}
              <span>
                tu viaje
              </span>
            </h2>
            <p className="about-description">
              Ofrecemos servicios integrales de turismo con la mejor atención y precios competitivos para hacer de tu viaje una experiencia inolvidable.
            </p>
          </AnimSection>

          <div className="services-grid">
            {services.map((service, idx) => (
              <AnimSection key={service.title} delay={idx * 100}>
                <div className="service-card">
                  <div className="service-icon" style={{ fontSize: "32px" }}>
                    {service.icon}
                  </div>
                  <h3 className="service-title">
                    {service.title}
                  </h3>
                  <p className="service-description">
                    {service.desc}
                  </p>
                  <div className="service-features">
                    {service.features.map(f => (
                      <span key={f} className="service-feature" style={{ color: service.accent, background: `${service.accent}15` }}>✓ {f}</span>
                    ))}
                  </div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CONTACTO SECTION ========== */}
      <section id="contacto" className="contact-section">
        <div className="contact-bg">
          <div className="contact-bg-circle" />
        </div>

        <div className="contact-container">
          <AnimSection className="contact-header">
            <div className="contact-badge">
              CONTACTO
            </div>
            <h2 className="contact-title">
              ¿Listo para tu{" "}
              <span>
                próxima aventura?
              </span>
            </h2>
            <p className="contact-description">
              Contáctanos y cotiza tu viaje soñado
            </p>
          </AnimSection>

          <div className="contact-grid">
            {contactInfo.map((contact, idx) => (
              <AnimSection key={contact.title} delay={idx * 80}>
                {contact.action ? (
                  <a
                    href={contact.action}
                    target={contact.action.startsWith("http") ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    className="contact-card"
                  >
                    <div className="contact-icon">
                      {contact.icon}
                    </div>
                    <h3 className="contact-title-card">
                      {contact.title}
                    </h3>
                    <p className="contact-value" style={{ color: contact.color }}>
                      {contact.value}
                    </p>
                  </a>
                ) : (
                  <div className="contact-card">
                    <div className="contact-icon">
                      {contact.icon}
                    </div>
                    <h3 className="contact-title-card">
                      {contact.title}
                    </h3>
                    <p className="contact-value" style={{ color: contact.color }}>
                      {contact.value}
                    </p>
                  </div>
                )}
              </AnimSection>
            ))}
          </div>

          <AnimSection delay={200} className="contact-form-toggle">
            <button
              onClick={() => setShowContactForm(!showContactForm)}
              className="contact-form-button"
            >
              💬 {showContactForm ? "Ocultar formulario" : "Cotizar mi viaje"}
            </button>
          </AnimSection>

          {showContactForm && (
            <AnimSection delay={300} className="contact-form-wrapper">
              <div className="contact-form-container">
                <h3 className="contact-form-title">
                  Cuéntanos sobre tu viaje ideal
                </h3>
                <div className="contact-form-fields">
                  <input
                    type="text"
                    placeholder="Tu nombre"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="contact-input"
                  />
                  <input
                    type="email"
                    placeholder="Tu email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="contact-input"
                  />
                  <textarea
                    placeholder="¿A dónde te gustaría viajar? ¿Cuándo? ¿Cuántas personas?"
                    rows="4"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="contact-textarea"
                  />
                  <button
                    onClick={() => {
                      const whatsappMessage = `Hola! Me llamo ${formData.name}.%0A%0A${formData.message}%0A%0AMi email: ${formData.email}`;
                      window.open(`https://wa.me/50498765432?text=${whatsappMessage}`, "_blank");
                      setFormData({ name: "", email: "", message: "" });
                      setShowContactForm(false);
                    }}
                    className="contact-submit"
                  >
                    Enviar por WhatsApp 💬
                  </button>
                </div>
              </div>
            </AnimSection>
          )}
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-nav">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="footer-link"
              >
                {link.label}
              </button>
            ))}
          </div>
          <p className="footer-text">
            © 2026 TurismoHonduras · Agencia de Viajes · Todos los derechos reservados
          </p>
        </div>
      </footer>
    </div>
  );
}
