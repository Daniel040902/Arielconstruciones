export const destinations = [
  {
    title: "Islas de la Bahía, Roatán",
    category: "Playa",
    desc: "Descubre las aguas cristalinas y arrecifes de coral más bellos del Caribe hondureño.",
    img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1200&auto=format&fit=crop",
    price: "$899",
    duration: "7 días",
    highlight: true,
    features: ["Snorkel incluido", "Hotel todo incluido", "Vuelos directos", "Guía turístico"]
  },
  {
    title: "Copán Ruinas",
    category: "Cultural",
    desc: "Explora la fascinante civilización Maya en uno de los sitios arqueológicos más importantes.",
    img: "https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=1200&auto=format&fit=crop",
    price: "$650",
    duration: "5 días",
    highlight: false,
    features: ["Tour arqueológico", "Hotel boutique", "Transporte", "Desayunos incluidos"]
  },
  {
    title: "Lago de Yojoa",
    category: "Naturaleza",
    desc: "El lago más grande de Honduras rodeado de montañas, aves exóticas y cascadas impresionantes.",
    img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop",
    price: "$450",
    duration: "4 días",
    highlight: false,
    features: ["Avistamiento de aves", "Caminatas", "Pesca deportiva", "Ecoturismo"]
  },
  {
    title: "Pico Bonito",
    category: "Aventura",
    desc: "Vive la adrenalina en uno de los parques nacionales más biodiversos con rapids y canopy.",
    img: "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=1200&auto=format&fit=crop",
    price: "$750",
    duration: "6 días",
    highlight: true,
    features: ["Rafting", "Canopy", "Caminatas", "Cabañas ecológicas"]
  },
  {
    title: "Utila",
    category: "Playa",
    desc: "Paraíso para buceadores con los mejores precios para certificaciones PADI en el mundo.",
    img: "https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?q=80&w=1200&auto=format&fit=crop",
    price: "$699",
    duration: "5 días",
    highlight: false,
    features: ["Buceo PADI", "Avistamiento tiburones", "Hostales", "Vida nocturna"]
  },
  {
    title: "La Ceiba",
    category: "Aventura",
    desc: "La capital de la aventura con el famoso carnaval y acceso a Pico Bonito.",
    img: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=1200&auto=format&fit=crop",
    price: "$550",
    duration: "4 días",
    highlight: false,
    features: ["Carnaval", "Río Cangrejal", "Rafting", "Gastronomía local"]
  },
];

export const services = [
  {
    icon: "✈️",
    title: "Vuelos",
    desc: "Los mejores precios en vuelos nacionales e internacionales con atención personalizada.",
    accent: "#3B82F6",
    features: ["Precios competitivos", "Vuelos charter", "Asistencia 24/7", "Cambios flexibles"]
  },
  {
    icon: "🏨",
    title: "Hoteles",
    desc: "Amplia selección de hoteles desde económicos hasta lujo, con las mejores tarifas.",
    accent: "#8B5CF6",
    features: ["Todos los presupuestos", "Reservas flexibles", "Desayuno incluido", "Ubicaciones premium"]
  },
  {
    icon: "🚌",
    title: "Transporte",
    desc: "Transporte terrestre seguro y cómodo con choferes profesionales y vehículos modernos.",
    accent: "#10B981",
    features: ["Flota moderna", "Seguro incluido", "Conductores expertos", "Rutas personalizadas"]
  },
  {
    icon: "🎯",
    title: "Tours Guiados",
    desc: "Experiencias únicas con guías locales certificados y conocimiento profundo.",
    accent: "#F59E0B",
    features: ["Guías bilingües", "Grupos pequeños", "Rutas exclusivas", "Experiencias culturales"]
  },
];

export const navLinks = [
  { id: "inicio", label: "Inicio", icon: "🏠" },
  { id: "destinos", label: "Destinos", icon: "🌎" },
  { id: "servicios", label: "Servicios", icon: "⚙️" },
  { id: "contacto", label: "Contacto", icon: "📧" },
];

export const categories = ["todos", "Playa", "Cultural", "Naturaleza", "Aventura", "destacados"];

export const contactInfo = [
  { icon: "✉️", title: "Email", value: "info@turismohonduras.com", color: "#3B82F6", action: "mailto:info@turismohonduras.com" },
  { icon: "💬", title: "WhatsApp", value: "+504 9876 5432", color: "#22C55E", action: "https://wa.me/50498765432" },
  { icon: "📍", title: "Oficina", value: "Tegucigalpa, Honduras", color: "#8B5CF6", action: null },
  { icon: "📞", title: "Teléfono", value: "+504 2234 5678", color: "#F59E0B", action: "tel:+50422345678" },
];

export const socialLinks = [
  { label: "Facebook", href: "https://facebook.com", icon: "📘", color: "#1877F2" },
  { label: "Instagram", href: "https://instagram.com", icon: "📸", color: "#E4405F" },
  { label: "WhatsApp", href: "https://wa.me/50498765432", icon: "💬", color: "#25D366" },
];

export const statsData = [
  { label: "Destinos", value: 50, suffix: "+" },
  { label: "Clientes Felices", value: 1200, suffix: "+" },
  { label: "Experiencia", value: 15, suffix: "+ años" },
  { label: "Tours Diarios", value: 30, suffix: "+" },
];
