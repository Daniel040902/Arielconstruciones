import { useState, useEffect, useCallback } from "react";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300&display=swap');

  :root {
    --gold: #C9A84C;
    --gold-light: #E8C97A;
    --gold-dark: #9B7A28;
    --dark: #1E1E1E;
    --dark2: #2A2A2A;
    --dark3: #353535;
    --dark4: #404040;
    --gray: #AAAAAA;
    --gray-light: #CCCCCC;
    --white: #F5F0E8;
    --white2: #EDE8DC;
    --bg-light: #E8E4D9;
    --bg-card: #F2EFE8;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    font-family: 'Barlow', sans-serif;
    background: var(--bg-light);
    color: var(--dark);
    overflow-x: hidden;
  }

  .ac-header {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    padding: 0 5%;
    height: 72px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: all 0.4s ease;
  }

  .ac-header.scrolled {
    background: rgba(232,228,217,0.97);
    border-bottom: 1px solid rgba(201,168,76,0.3);
    backdrop-filter: blur(8px);
  }

  .ac-logo {
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    text-decoration: none;
  }

  .ac-logo-icon {
    width: 42px;
    height: 42px;
    background: linear-gradient(135deg, var(--gold), var(--gold-dark));
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  }

  .ac-logo-text {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 22px;
    letter-spacing: 2px;
    color: var(--dark);
    line-height: 1;
  }

  .ac-logo-sub {
    font-size: 10px;
    letter-spacing: 3px;
    color: var(--gold-dark);
    text-transform: uppercase;
    font-weight: 600;
  }

  .ac-nav {
    display: flex;
    gap: 32px;
  }

  .ac-nav button {
    background: none;
    border: none;
    color: var(--gray);
    font-family: 'Barlow', sans-serif;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    cursor: pointer;
    transition: color 0.3s;
    padding: 4px 0;
    position: relative;
  }

  .ac-nav button::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 1px;
    background: var(--gold);
    transition: width 0.3s;
  }

  .ac-nav button:hover, .ac-nav button.active {
    color: var(--gold-dark);
  }

  .ac-nav button:hover::after, .ac-nav button.active::after {
    width: 100%;
  }

  .ac-cta-btn {
    background: var(--white);
    color: var(--gold);
    border: 1.5px solid var(--gold);
    font-family: 'Barlow', sans-serif;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    padding: 10px 22px;
    cursor: pointer;
    transition: all 0.3s;
    clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px));
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }

  .ac-cta-btn:hover {
    background: var(--gold);
    color: var(--white);
    transform: translateY(-2px);
    box-shadow: 0 6px 25px rgba(201,168,76,0.35);
  }

  .ac-whatsapp-hero {
    background: var(--white);
    color: var(--gold);
    border: 1.5px solid var(--gold);
    font-family: 'Barlow', sans-serif;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    padding: 16px 36px;
    cursor: pointer;
    transition: all 0.3s;
    clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));
    display: inline-flex;
    align-items: center;
    gap: 10px;
  }

  .ac-whatsapp-hero:hover {
    background: var(--gold);
    color: var(--white);
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(201,168,76,0.35);
  }

  /* HERO */
  .ac-hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
    padding: 0 5%;
    background: var(--bg-light);
  }

  .ac-hero-bg {
    position: absolute;
    inset: 0;
    background:
      linear-gradient(135deg, rgba(201,168,76,0.08) 0%, transparent 50%),
      repeating-linear-gradient(
        90deg,
        transparent,
        transparent 80px,
        rgba(201,168,76,0.05) 80px,
        rgba(201,168,76,0.05) 81px
      ),
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 80px,
        rgba(201,168,76,0.05) 80px,
        rgba(201,168,76,0.05) 81px
      );
  }

  .ac-hero-accent {
    position: absolute;
    right: 0;
    top: 0;
    width: 45%;
    height: 100%;
    background: linear-gradient(135deg, transparent 0%, rgba(201,168,76,0.1) 100%);
    clip-path: polygon(15% 0, 100% 0, 100% 100%, 0% 100%);
  }

  .ac-hero-number {
    position: absolute;
    right: 5%;
    bottom: 10%;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 180px;
    color: rgba(201,168,76,0.1);
    line-height: 1;
    letter-spacing: -10px;
    user-select: none;
  }

  .ac-hero-content {
    position: relative;
    z-index: 2;
    max-width: 600px;
  }

  .ac-hero-image-wrap {
    position: relative;
    z-index: 2;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 40px;
  }

  .ac-hero-image {
    width: 450px;
    height: 500px;
    object-fit: cover;
    border: 4px solid var(--gold);
    box-shadow: 0 20px 60px rgba(0,0,0,0.15);
    position: relative;
    z-index: 2;
    filter: grayscale(10%) brightness(1.02);
  }

  .ac-hero-image-ring {
    position: absolute;
    width: 490px;
    height: 540px;
    border: 1px solid rgba(201,168,76,0.3);
    top: 50%;
    left: calc(50% + 20px);
    transform: translate(-50%, -50%);
    z-index: 1;
  }

  .ac-hero-image-ring2 {
    position: absolute;
    width: 530px;
    height: 580px;
    border: 1px dashed rgba(201,168,76,0.2);
    top: 50%;
    left: calc(50% + 20px);
    transform: translate(-50%, -50%);
    z-index: 1;
  }

  @media (max-width: 1024px) {
    .ac-hero-image-wrap {
      padding-left: 0;
      margin-top: 40px;
    }
    .ac-hero-image {
      width: 280px;
      height: 320px;
    }
    .ac-hero-image-ring { display: none; }
    .ac-hero-image-ring2 { display: none; }
  }

  @media (max-width: 768px) {
    .ac-hero {
      flex-direction: column;
      padding: 100px 5% 60px;
      min-height: auto;
    }
    .ac-hero-content {
      max-width: 100%;
      text-align: center;
    }
    .ac-eyebrow {
      justify-content: center;
    }
    .ac-hero-actions {
      justify-content: center;
      flex-wrap: wrap;
    }
    .ac-hero-image-wrap {
      margin-top: 30px;
      padding-left: 0;
    }
    .ac-hero-image {
      width: 240px;
      height: 280px;
    }
    .ac-hero-number {
      display: none;
    }
    .ac-hero-accent {
      display: none;
    }
  }

  .ac-eyebrow {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 24px;
  }

  .ac-eyebrow-line {
    width: 40px;
    height: 1px;
    background: var(--gold);
  }

  .ac-eyebrow-text {
    font-size: 12px;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: var(--gold-dark);
    font-weight: 600;
  }

  .ac-hero-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(56px, 8vw, 100px);
    line-height: 0.95;
    letter-spacing: 3px;
    margin-bottom: 8px;
    color: var(--dark);
  }

  .ac-hero-title span {
    color: var(--gold-dark);
    display: block;
  }

  .ac-hero-owner {
    font-size: 15px;
    font-weight: 400;
    font-style: italic;
    color: var(--gray);
    margin-bottom: 28px;
    letter-spacing: 1px;
  }

  .ac-hero-owner strong {
    color: var(--dark);
    font-style: normal;
    font-weight: 700;
  }

  .ac-hero-desc {
    font-size: 17px;
    line-height: 1.7;
    color: var(--gray);
    max-width: 520px;
    margin-bottom: 40px;
    font-weight: 400;
  }

  .ac-hero-actions {
    display: flex;
    gap: 16px;
    align-items: center;
  }

  .ac-btn-primary {
    background: var(--gold);
    color: var(--dark);
    border: none;
    font-family: 'Barlow', sans-serif;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    padding: 16px 36px;
    cursor: pointer;
    transition: all 0.3s;
    clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));
  }

  .ac-btn-primary:hover {
    background: var(--gold-light);
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(201,168,76,0.3);
  }

  .ac-btn-outline {
    background: transparent;
    color: var(--dark);
    border: 1px solid rgba(0,0,0,0.15);
    font-family: 'Barlow', sans-serif;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    padding: 16px 36px;
    cursor: pointer;
    transition: all 0.3s;
  }

  .ac-btn-outline:hover {
    border-color: var(--gold);
    color: var(--gold-dark);
  }

  .ac-hero-stats {
    display: flex;
    gap: 48px;
    margin-top: 56px;
    padding-top: 40px;
    border-top: 1px solid rgba(0,0,0,0.1);
  }

  .ac-stat-num {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 42px;
    color: var(--gold-dark);
    letter-spacing: 2px;
    line-height: 1;
  }

  .ac-stat-label {
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--gray);
    margin-top: 4px;
    font-weight: 600;
  }

  /* SECTION COMMON */
  .ac-section {
    padding: 100px 5%;
  }

  .ac-section-header {
    margin-bottom: 64px;
  }

  .ac-section-tag {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 16px;
  }

  .ac-section-tag span {
    font-size: 11px;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: var(--gold-dark);
    font-weight: 600;
  }

  .ac-section-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(36px, 5vw, 60px);
    letter-spacing: 2px;
    line-height: 1;
    margin-bottom: 16px;
    color: var(--dark);
  }

  .ac-section-title em {
    color: var(--gold-dark);
    font-style: normal;
  }

  .ac-section-desc {
    font-size: 16px;
    color: var(--gray);
    max-width: 560px;
    line-height: 1.7;
    font-weight: 400;
  }

  /* SERVICIOS */
  .ac-services-bg {
    background: var(--bg-card);
  }

  .ac-services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 2px;
  }

  .ac-service-card {
    background: var(--white);
    position: relative;
    cursor: pointer;
    transition: all 0.4s ease;
    overflow: hidden;
    border: 1px solid rgba(0,0,0,0.05);
  }

  .ac-service-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(201,168,76,0.08), transparent);
    opacity: 0;
    transition: opacity 0.4s;
  }

  .ac-service-card:hover::before {
    opacity: 1;
  }

  .ac-service-card:hover {
    background: var(--bg-card);
    transform: translateY(-4px);
    box-shadow: 0 20px 30px -15px rgba(0,0,0,0.1);
  }

  .ac-service-card::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0;
    width: 0;
    height: 2px;
    background: var(--gold);
    transition: width 0.4s;
  }

  .ac-service-card:hover::after {
    width: 100%;
  }


  .ac-service-img-wrap {
    width: 100%;
    height: 200px;
    overflow: hidden;
    position: relative;
  }

  .ac-service-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  .ac-service-card:hover .ac-service-img {
    transform: scale(1.08);
  }

  .ac-service-img-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.1) 0%, transparent 50%);
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    padding: 12px;
  }

  .ac-service-img-overlay .ac-service-icon {
    font-size: 28px;
    margin: 0;
    background: rgba(255,255,255,0.9);
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  }

  .ac-service-body {
    padding: 24px 28px 32px;
  }


  .ac-service-num {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 48px;
    color: rgba(201,168,76,0.25);
    line-height: 1;
    margin-bottom: 16px;
    letter-spacing: 2px;
  }


  .ac-service-name {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 22px;
    letter-spacing: 2px;
    margin-bottom: 8px;
    color: var(--dark);
  }

  .ac-service-desc {
    font-size: 14px;
    color: var(--gray);
    line-height: 1.7;
    font-weight: 400;
    margin-bottom: 16px;
  }

  .ac-service-items {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .ac-service-tag {
    font-size: 11px;
    letter-spacing: 1px;
    padding: 4px 10px;
    background: rgba(201,168,76,0.15);
    color: var(--gold-dark);
    border: 1px solid rgba(201,168,76,0.3);
    font-weight: 600;
  }

  /* PROYECTOS */
  .ac-projects-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2px;
  }

  .ac-project-card {
    position: relative;
    overflow: hidden;
    aspect-ratio: 4/3;
    cursor: pointer;
  }

  .ac-project-card.featured {
    grid-row: span 2;
    aspect-ratio: auto;
  }

  .ac-project-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
    filter: brightness(0.85);
  }

  .ac-project-card:hover .ac-project-img {
    transform: scale(1.05);
    filter: brightness(0.75);
  }

  .ac-project-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 32px;
  }

  .ac-project-label {
    font-size: 11px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--gold);
    font-weight: 600;
    margin-bottom: 8px;
  }

  .ac-project-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 28px;
    letter-spacing: 2px;
    color: var(--white);
  }

  /* NOSOTROS */
  .ac-about-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
  }

  .ac-about-img-wrapper {
    position: relative;
  }

  .ac-about-img {
    width: 100%;
    aspect-ratio: 3/4;
    object-fit: cover;
    filter: grayscale(20%) brightness(1.02);
  }

  .ac-about-img-accent {
    position: absolute;
    bottom: -20px;
    right: -20px;
    width: 60%;
    height: 60%;
    border: 2px solid var(--gold);
    opacity: 0.5;
    pointer-events: none;
  }

  .ac-about-badge {
    position: absolute;
    top: 24px;
    left: -16px;
    background: var(--gold);
    color: var(--dark);
    padding: 16px 24px;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 14px;
    letter-spacing: 2px;
  }

  .ac-about-values {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    margin-top: 40px;
  }

  .ac-value-item {
    border-left: 2px solid var(--gold);
    padding-left: 16px;
  }

  .ac-value-name {
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: var(--dark);
    margin-bottom: 4px;
  }

  .ac-value-desc {
    font-size: 13px;
    color: var(--gray);
    line-height: 1.5;
    font-weight: 400;
  }

  /* CONTACTO */
  .ac-contact-bg {
    background: var(--bg-card);
  }

  .ac-contact-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: start;
  }

  .ac-contact-info {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  .ac-contact-item {
    display: flex;
    gap: 16px;
    align-items: flex-start;
  }

  .ac-contact-icon-box {
    width: 48px;
    height: 48px;
    background: rgba(201,168,76,0.15);
    border: 1px solid rgba(201,168,76,0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    flex-shrink: 0;
    color: var(--gold-dark);
  }

  .ac-contact-label {
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--gold-dark);
    font-weight: 600;
    margin-bottom: 4px;
  }

  .ac-contact-value {
    font-size: 15px;
    color: var(--dark);
    font-weight: 500;
  }

  .ac-form {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .ac-input, .ac-textarea {
    background: var(--white);
    border: 1px solid rgba(0,0,0,0.1);
    color: var(--dark);
    font-family: 'Barlow', sans-serif;
    font-size: 14px;
    padding: 16px 20px;
    outline: none;
    transition: border-color 0.3s;
    width: 100%;
    letter-spacing: 0.5px;
  }

  .ac-input:focus, .ac-textarea:focus {
    border-color: var(--gold);
  }

  .ac-input::placeholder, .ac-textarea::placeholder {
    color: var(--gray-light);
  }

  .ac-textarea {
    resize: none;
    min-height: 120px;
  }

  /* FOOTER */
  .ac-footer {
    background: var(--bg-light);
    border-top: 1px solid rgba(0,0,0,0.1);
    padding: 40px 5%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;
  }

  .ac-footer-text {
    font-size: 13px;
    color: var(--gray);
    letter-spacing: 0.5px;
  }

  .ac-footer-links {
    display: flex;
    gap: 24px;
  }

  .ac-footer-links button {
    background: none;
    border: none;
    color: var(--gray);
    font-family: 'Barlow', sans-serif;
    font-size: 12px;
    letter-spacing: 2px;
    text-transform: uppercase;
    cursor: pointer;
    transition: color 0.3s;
    font-weight: 500;
  }

  .ac-footer-links button:hover {
    color: var(--gold-dark);
  }

  /* GOLD LINE */
  .ac-divider {
    width: 40px;
    height: 2px;
    background: var(--gold);
    margin-bottom: 12px;
  }

  /* MOBILE */
  @media (max-width: 768px) {
    .ac-nav { display: none; }
    .ac-header { padding: 0 4%; }
    .ac-logo-text { font-size: 18px; }
    .ac-hero-stats { gap: 16px; flex-wrap: wrap; justify-content: center; }
    .ac-stat-num { font-size: 32px; }
    .ac-projects-grid { grid-template-columns: 1fr; }
    .ac-project-card.featured { grid-row: auto; }
    .ac-about-grid, .ac-contact-grid { grid-template-columns: 1fr; gap: 32px; }
    .ac-about-values { grid-template-columns: 1fr; }
    .ac-section { padding: 60px 4%; }
    .ac-section-header { margin-bottom: 40px; }
    .ac-services-grid { grid-template-columns: 1fr; }
    .ac-service-img-wrap { height: 180px; }
    .ac-footer { flex-direction: column; text-align: center; gap: 12px; }
    .ac-footer-links { flex-wrap: wrap; justify-content: center; gap: 16px; }
    .ac-hero-owner { font-size: 14px; }
    .ac-hero-desc { font-size: 15px; }
    .ac-about-img-accent { display: none; }
    .ac-about-badge { left: 8px; top: 8px; font-size: 12px; padding: 10px 16px; }
    .ac-btn-primary, .ac-whatsapp-hero { padding: 14px 24px; font-size: 12px; }
    .ac-contact-info { gap: 20px; }
    .ac-hero-title { font-size: clamp(40px, 12vw, 56px); }
  }

  @media (max-width: 480px) {
    .ac-hero-image { width: 200px; height: 240px; }
    .ac-hero-stats { gap: 12px; }
    .ac-stat-num { font-size: 26px; }
    .ac-stat-label { font-size: 10px; }
    .ac-service-img-wrap { height: 160px; }
    .ac-service-body { padding: 16px 18px 24px; }
    .ac-btn-primary, .ac-whatsapp-hero { padding: 12px 20px; font-size: 11px; letter-spacing: 1px; }
    .ac-input, .ac-textarea { padding: 12px 16px; font-size: 13px; }
  }
`;

const services = [
  {
    num: "01",
    icon: "🖌️",
    name: "Pintura",
    desc: "Acabados de alta calidad en interior y exterior. Pintura lisa, texturizada, anticorrosiva y decorativa para todo tipo de superficies.",
    tags: ["Interior", "Exterior", "Texturada", "Anticorrosiva"],
    img: "https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=600&q=80",
  },
  {
    num: "02",
    icon: "⬜",
    name: "Cielo Raso",
    desc: "Instalación profesional de cielos rasos en gypsum, PVC, y materiales compuestos. Diseños planos, con moldurados y coffered.",
    tags: ["Gypsum", "PVC", "Moldurado", "Coffered"],
    img: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=600&q=80",
  },
  {
    num: "03",
    icon: "🧱",
    name: "Repello & Fino",
    desc: "Aplicación de repello y fino de paredes con mezclas balanceadas para superficies lisas y uniformes, listas para pintar.",
    tags: ["Repello", "Fino", "Afinado", "Nivelación"],
    img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80",
  },
  {
    num: "04",
    icon: "🪟",
    name: "Divisiones & Tabiques",
    desc: "Construcción de tabiques en gypsum, vidrio templado o PVC para espacios de oficina, comerciales o residenciales.",
    tags: ["Gypsum", "Vidrio", "PVC", "Oficinas"],
    img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80",
  },
  {
    num: "05",
    icon: "🏗️",
    name: "Construcción General",
    desc: "Obra civil desde cero: cimientos, levantado de paredes, columnas, vigas y estructura completa con materiales certificados.",
    tags: ["Cimientos", "Paredes", "Columnas", "Vigas"],
    img: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80",
  },
  {
    num: "06",
    icon: "🔌",
    name: "Instalaciones",
    desc: "Instalaciones eléctricas, hidráulicas y sanitarias con técnicos certificados para proyectos residenciales y comerciales.",
    tags: ["Eléctrica", "Hidráulica", "Sanitaria", "Certificada"],
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80",
  },
  {
    num: "07",
    icon: "🪵",
    name: "Pisos & Revestimientos",
    desc: "Colocación de pisos cerámicos, porcelanato, madera y revestimiento de paredes para baños y cocinas.",
    tags: ["Cerámica", "Porcelanato", "Madera", "Baños"],
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
  },
  {
    num: "08",
    icon: "🏠",
    name: "Remodelaciones",
    desc: "Renovación integral de espacios residenciales y comerciales. Transformamos cualquier ambiente con calidad garantizada.",
    tags: ["Residencial", "Comercial", "Integral", "Garantizado"],
    img: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80",
  },
  {
    num: "09",
    icon: "📐",
    name: "Impermeabilización",
    desc: "Sistemas de impermeabilización en terrazas, losas y fundaciones para protección duradera contra filtraciones y humedad.",
    tags: ["Terrazas", "Losas", "Fundaciones", "Durable"],
    img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&q=80",
  },
];

const projects = [
  { label: "Residencial", title: "Residencia San Pedro", img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80", featured: true },
  { label: "Comercial", title: "Edificio Corporativo", img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80" },
  { label: "Remodelación", title: "Interior Moderno", img: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80" },
  { label: "Industrial", title: "Bodega Industrial", img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80" },
];

const navLinks = [
  { id: "inicio", label: "Inicio" },
  { id: "servicios", label: "Servicios" },
  { id: "proyectos", label: "Proyectos" },
  { id: "nosotros", label: "Nosotros" },
  { id: "contacto", label: "Contacto" },
];

export default function ArielConstrucciones() {
  const [activeNav, setActiveNav] = useState("inicio");
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", service: "", message: "" });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      for (const { id } of navLinks) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) { setActiveNav(id); break; }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 72, behavior: "smooth" });
      setActiveNav(id);
    }
  }, []);

  const sendWhatsApp = () => {
    const msg = `Hola Ariel Construcciones!%0A%0A*Nombre:* ${formData.name}%0A*Teléfono:* ${formData.phone}%0A*Servicio:* ${formData.service}%0A*Mensaje:* ${formData.message}`;
    window.open(`https://wa.me/50458622708?text=${msg}`, "_blank");
  };

  const openWhatsApp = (service = "") => {
    const msg = service
      ? `Hola Ariel Construcciones!%0A%0AQuisiera cotizar el servicio de: *${service}*`
      : `Hola Ariel Construcciones!%0A%0AQuisiera cotizar un proyecto.`;
    window.open(`https://wa.me/50458622708?text=${msg}`, "_blank");
  };

  return (
    <div style={{ fontFamily: "'Barlow', sans-serif" }}>
      <style>{style}</style>

      {/* HEADER */}
      <header className={`ac-header ${scrolled ? "scrolled" : ""}`}>
        <div className="ac-logo" onClick={() => scrollTo("inicio")}>
          <div className="ac-logo-icon">🏗️</div>
          <div>
            <div className="ac-logo-text">Ariel <span style={{ color: "var(--gold-dark)" }}>Construcciones</span></div>
            <div className="ac-logo-sub">Ariel Rojas Torres</div>
          </div>
        </div>
        <nav className="ac-nav">
          {navLinks.map(({ id, label }) => (
            <button key={id} onClick={() => scrollTo(id)} className={activeNav === id ? "active" : ""}>{label}</button>
          ))}
        </nav>
        <button className="ac-cta-btn" onClick={() => openWhatsApp()}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>Cotizar</button>
      </header>

      {/* HERO */}
      <section id="inicio" className="ac-hero">
        <div className="ac-hero-bg" />
        <div className="ac-hero-accent" />
        <div className="ac-hero-number">2009</div>
        <div className="ac-hero-content">
          <div className="ac-divider" style={{ width: 60, height: 2, background: "var(--gold)", marginBottom: 24 }} />
          <div className="ac-eyebrow">
            <div className="ac-eyebrow-line" />
            <span className="ac-eyebrow-text">Empresa de Construcción Certificada</span>
          </div>
          <h1 className="ac-hero-title">
            Ariel
            <span>Construcciones</span>
          </h1>
          <p className="ac-hero-owner">
            Fundada y dirigida por <strong>Ing. Ariel Rojas Torres</strong>
          </p>
          <p className="ac-hero-desc">
            Más de 15 años construyendo con excelencia. Desde pintura y cielos rasos hasta construcción completa — soluciones integrales para proyectos residenciales, comerciales e industriales en León, Nicaragua.
          </p>
          <div className="ac-hero-actions">
            <button className="ac-btn-primary" onClick={() => scrollTo("servicios")}>Ver Servicios</button>
            <button className="ac-whatsapp-hero" onClick={() => openWhatsApp()}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>Cotizar Proyecto</button>
          </div>
          <div className="ac-hero-stats">
            {[
              { num: "15+", label: "Años de Experiencia" },
              { num: "300+", label: "Proyectos Entregados" },
              { num: "100%", label: "Calidad Garantizada" },
              { num: "9", label: "Servicios Especializados" },
            ].map(s => (
              <div key={s.label}>
                <div className="ac-stat-num">{s.num}</div>
                <div className="ac-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="ac-hero-image-wrap">
          <div className="ac-hero-image-ring2" />
          <div className="ac-hero-image-ring" />
          <img src="/Arielconstrucione.png" alt="Ing. Ariel Rojas Torres" className="ac-hero-image" />
        </div>
      </section>

      {/* SERVICIOS */}
      <section id="servicios" className="ac-section ac-services-bg">
        <div className="ac-section-header">
          <div className="ac-section-tag">
            <div className="ac-divider" style={{ margin: 0 }} />
            <span>Nuestros Servicios</span>
          </div>
          <h2 className="ac-section-title">Todo en <em>Construcción</em></h2>
          <p className="ac-section-desc">Ofrecemos una amplia gama de servicios especializados con materiales de primera calidad y mano de obra certificada.</p>
        </div>
        <div className="ac-services-grid">
          {services.map((svc) => (
            <div key={svc.num} className="ac-service-card">
              <div className="ac-service-img-wrap">
                <img src={svc.img} alt={svc.name} className="ac-service-img" />
                <div className="ac-service-img-overlay">
                  <span className="ac-service-icon">{svc.icon}</span>
                </div>
              </div>
              <div className="ac-service-body">
                <div className="ac-service-num">{svc.num}</div>
                <h3 className="ac-service-name">{svc.name}</h3>
                <p className="ac-service-desc">{svc.desc}</p>
                <div className="ac-service-items">
                  {svc.tags.map(t => <span key={t} className="ac-service-tag">{t}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROYECTOS */}
      <section id="proyectos" className="ac-section">
        <div className="ac-section-header">
          <div className="ac-section-tag">
            <div className="ac-divider" style={{ margin: 0 }} />
            <span>Portafolio</span>
          </div>
          <h2 className="ac-section-title">Proyectos <em>Realizados</em></h2>
          <p className="ac-section-desc">Cada obra refleja nuestro compromiso con la excelencia, puntualidad y acabados de primer nivel.</p>
        </div>
        <div className="ac-projects-grid">
          {projects.map((p) => (
            <div key={p.title} className={`ac-project-card ${p.featured ? "featured" : ""}`}>
              <img src={p.img} alt={p.title} className="ac-project-img" />
              <div className="ac-project-overlay">
                <div className="ac-project-label">{p.label}</div>
                <div className="ac-project-title">{p.title}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* NOSOTROS */}
      <section id="nosotros" className="ac-section ac-services-bg">
        <div className="ac-about-grid">
          <div className="ac-about-img-wrapper">
            <img
              src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80"
              alt="Equipo de construcción trabajando"
              className="ac-about-img"
            />
            <div className="ac-about-img-accent" />
            <div className="ac-about-badge">+15 AÑOS DE EXPERIENCIA</div>
          </div>
          <div>
            <div className="ac-section-tag">
              <div className="ac-divider" style={{ margin: 0 }} />
              <span>Equipo Ariel Construcciones</span>
            </div>
            <h2 className="ac-section-title">Construimos con <em>Pasión</em></h2>
            <p style={{ fontSize: "16px", color: "var(--gray)", lineHeight: "1.8", fontWeight: 400, marginBottom: "16px" }}>
              <strong style={{ color: "var(--gold-dark)" }}>Ariel Rojas Torres</strong> fundó Ariel Construcciones con una visión clara: ofrecer servicios de construcción de alta calidad a precios justos, con honestidad y compromiso en cada proyecto.
            </p>
            <p style={{ fontSize: "15px", color: "var(--gray)", lineHeight: "1.8", fontWeight: 400, marginBottom: "40px" }}>
              Desde pequeñas remodelaciones hasta grandes obras civiles, nuestro equipo de profesionales certificados garantiza resultados que superan las expectativas de nuestros clientes en toda Nicaragua, León, El Sauce.
            </p>
            <div className="ac-about-values">
              {[
                { name: "Calidad", desc: "Materiales certificados y mano de obra experta en cada proyecto." },
                { name: "Puntualidad", desc: "Cumplimos los plazos acordados sin sacrificar la calidad." },
                { name: "Transparencia", desc: "Presupuestos claros y comunicación directa en todo momento." },
                { name: "Garantía", desc: "Respaldamos nuestro trabajo con garantía post-entrega." },
              ].map(v => (
                <div key={v.name} className="ac-value-item">
                  <div className="ac-value-name">{v.name}</div>
                  <div className="ac-value-desc">{v.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contacto" className="ac-section ac-contact-bg">
        <div className="ac-section-header">
          <div className="ac-section-tag">
            <div className="ac-divider" style={{ margin: 0 }} />
            <span>Contacto</span>
          </div>
          <h2 className="ac-section-title">Cotiza tu <em>Proyecto</em></h2>
          <p className="ac-section-desc">Cuéntanos sobre tu proyecto y te damos una cotización sin compromiso. Atendemos en toda Nicaragua, León, El Sauce.</p>
        </div>
        <div className="ac-contact-grid">
          <div className="ac-contact-info">
            {[
              { icon: "📱", label: "WhatsApp / Teléfono", value: "+504 5862-2708" },
              { icon: "📧", label: "Correo Electrónico", value: "info@arielconstrucciones.com" },
              { icon: "📍", label: "Ubicación", value: "León, Nicaragua" },
              { icon: "🕐", label: "Horario de Atención", value: "Lunes – Sábado: 7:00 AM – 6:00 PM" },
            ].map(c => (
              <div key={c.label} className="ac-contact-item">
                <div className="ac-contact-icon-box">{c.icon}</div>
                <div>
                  <div className="ac-contact-label">{c.label}</div>
                  <div className="ac-contact-value">{c.value}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="ac-form">
            <input className="ac-input" placeholder="Tu nombre completo" value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })} />
            <input className="ac-input" placeholder="Número de teléfono" value={formData.phone}
              onChange={e => setFormData({ ...formData, phone: e.target.value })} />
            <select className="ac-input" value={formData.service}
              onChange={e => setFormData({ ...formData, service: e.target.value })}
              style={{ cursor: "pointer" }}>
              <option value="">— Selecciona un servicio —</option>
              {services.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
            </select>
            <textarea className="ac-textarea" placeholder="Describe tu proyecto: ¿Qué necesitas? ¿Dónde? ¿Cuándo?"
              value={formData.message}
              onChange={e => setFormData({ ...formData, message: e.target.value })} />
            <button className="ac-btn-primary" onClick={sendWhatsApp}>
              Enviar por WhatsApp 💬
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="ac-footer">
        <div>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "18px", letterSpacing: "2px", marginBottom: "4px", color: "var(--dark)" }}>
            Ariel <span style={{ color: "var(--gold-dark)" }}>Construcciones</span>
          </div>
          <div className="ac-footer-text">Ariel Rojas Torres · © 2026 · Todos los derechos reservados</div>
        </div>
        <div className="ac-footer-links">
          {navLinks.map(({ id, label }) => (
            <button key={id} onClick={() => scrollTo(id)}>{label}</button>
          ))}
        </div>
      </footer>
    </div>
  );
}