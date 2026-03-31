
const { useEffect, useMemo, useState } = React;
const framer = window.framerMotion || window.FramerMotion;
const fallbackMotion = new Proxy(
  {},
  {
    get: (_, tag) =>
      React.forwardRef(({ children, ...props }, ref) =>
        React.createElement(tag, { ...props, ref }, children)
      )
  }
);
const motion = framer ? framer.motion : fallbackMotion;
const AnimatePresence = framer
  ? framer.AnimatePresence
  : ({ children }) => React.createElement(React.Fragment, null, children);

const menuItems = [
  {
    name: "Nigiri Toro Bluefin",
    description: "Atum bluefin maturado, arroz shari e finalização com sal cristalino.",
    price: 42,
    category: "sushi",
    image: "https://images.unsplash.com/photo-1546069901-eacef0df6022?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Nigiri Wagyu A5",
    description: "Carne marmorizada selada no ponto perfeito e molho tare envelhecido.",
    price: 48,
    category: "sushi",
    image: "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Uramaki Trufa Negra",
    description: "Salmão selvagem, cream cheese leve e finalização trufada.",
    price: 38,
    category: "sushi",
    image: "https://images.unsplash.com/photo-1562158070-57d3f6b1dbd3?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Sashimi de Bluefin",
    description: "Corte translúcido com ponzu cítrico e flor de sal.",
    price: 58,
    category: "sashimi",
    image: "https://images.unsplash.com/photo-1576402187878-974f70c890a5?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Sashimi de Hamachi",
    description: "Barriga de peixe-olho com toque de yuzu kosho.",
    price: 52,
    category: "sashimi",
    image: "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Combo Kuro Signature - 24 peças",
    description: "Seleção premium do chef com nigiris e sashimis especiais.",
    price: 188,
    category: "combos",
    image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Combo Imperial 32 peças",
    description: "Para quem deseja viver o ritual completo da casa.",
    price: 248,
    category: "combos",
    image: "https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Omakase Imperial - 7 etapas",
    description: "Sequência exclusiva com harmonização sugerida.",
    price: 289,
    category: "especiais",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Ritual Omakase",
    description: "Degustação guiada com harmonização premium.",
    price: 289,
    category: "especiais",
    image: "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Festival de Bluefin",
    description: "Seleção exclusiva de cortes raros do atum bluefin.",
    price: 198,
    category: "especiais",
    image: "https://images.unsplash.com/photo-1546069901-eacef0df6022?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Black Cod Miso",
    description: "Bacalhau negro com missô branco e finalização cítrica.",
    price: 92,
    category: "especiais",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Tartar de Bluefin Trufado",
    description: "Textura cremosa com yuzu kosho e microbrotos.",
    price: 78,
    category: "especiais",
    image: "https://images.unsplash.com/photo-1546069901-eacef0df6022?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Saquê Junmai Daiginjo",
    description: "Servido em taça de cristal, notas florais suaves.",
    price: 46,
    category: "bebidas",
    image: "https://images.unsplash.com/photo-1527169402691-feff5539e52c?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Yuzu Highball",
    description: "Whisky japonês, yuzu fresco e gelo cristalino.",
    price: 42,
    category: "bebidas",
    image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Chá Gyokuro",
    description: "Infusão delicada com aroma verde e acabamento suave.",
    price: 22,
    category: "bebidas",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80"
  }
];

const units = {
  mococa: {
    key: "mococa",
    label: "Mococa - Shopping Fonseca",
    whatsapp: "5519998881122",
    whatsappDisplay: "(19) 99888-1122"
  },
  rpd: {
    key: "rpd",
    label: "São José do Rio Pardo - Centro",
    whatsapp: "5519997703344",
    whatsappDisplay: "(19) 99770-3344"
  }
};

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0
});

const formatCurrency = (value) => currencyFormatter.format(value);

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 0.61, 0.36, 1] }
  }
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
};

const hoverLift = {
  y: -10,
  boxShadow: "0 28px 70px rgba(0, 0, 0, 0.45)",
  transition: { type: "spring", stiffness: 220, damping: 20 }
};

const Section = ({ id, className = "", children }) => (
  <motion.section
    id={id}
    className={`section ${className}`}
    variants={stagger}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
    layout
  >
    {children}
  </motion.section>
);

const App = () => {
  const [selectedUnit, setSelectedUnit] = useState(() => localStorage.getItem("IPPONUnit") || "");
  const [gateOpen, setGateOpen] = useState(() => !localStorage.getItem("IPPONUnit"));
  const [filter, setFilter] = useState("all");
  const [cart, setCart] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [lastAdded, setLastAdded] = useState("");
  const [loading, setLoading] = useState(true);
  const [cartPulse, setCartPulse] = useState(false);
  const [ctaPulse, setCtaPulse] = useState(false);

  const currentUnitKey = selectedUnit || "mococa";
  const currentUnit = units[currentUnitKey];

  const filteredItems = useMemo(() => {
    if (filter === "all") return menuItems;
    return menuItems.filter((item) => item.category === filter);
  }, [filter]);

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const deliveryFee = 12;
  const totalWithFee = cart.length > 0 ? subtotal + deliveryFee : 0;

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("is-locked", gateOpen);
    document.body.classList.toggle("entered", !gateOpen);
  }, [gateOpen]);

  const pushToast = (message) => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 2600);
  };

  const pulseCart = () => {
    setCartPulse(true);
    setTimeout(() => setCartPulse(false), 500);
  };

  const pulseCta = () => {
    setCtaPulse(true);
    setTimeout(() => setCtaPulse(false), 500);
  };

  const addToCart = (itemName) => {
    const item = menuItems.find((menuItem) => menuItem.name === itemName);
    if (!item) return;

    setCart((prev) => {
      const existing = prev.find((cartItem) => cartItem.name === itemName);
      if (existing) {
        return prev.map((cartItem) =>
          cartItem.name === itemName ? { ...cartItem, qty: cartItem.qty + 1 } : cartItem
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });

    setLastAdded(itemName);
    setTimeout(() => setLastAdded(""), 1200);

    pushToast(`${item.name} adicionado ao pedido.`);
    pulseCart();
    pulseCta();
  };

  const changeQuantity = (itemName, delta) => {
    setCart((prev) => {
      return prev
        .map((item) =>
          item.name === itemName ? { ...item, qty: item.qty + delta } : item
        )
        .filter((item) => item.qty > 0);
    });
    pulseCart();
    pulseCta();
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      pushToast("Seu carrinho está vazio.");
      return;
    }

    if (!selectedUnit) {
      setGateOpen(true);
      pushToast("Selecione a unidade para finalizar o pedido.");
      return;
    }

    const total = subtotal + deliveryFee;
    const summary = cart
      .map((item) => `• ${item.name} (x${item.qty}) - ${formatCurrency(item.price * item.qty)}`)
      .join("%0A");
    const message = `Olá! Gostaria de fazer um pedido na unidade ${currentUnit.label}:%0A${summary}%0A%0ASubtotal: ${formatCurrency(subtotal)}%0AEntrega: ${formatCurrency(deliveryFee)}%0ATotal: ${formatCurrency(total)}%0A%0ANome:%0AEndereço:%0AForma de pagamento:`;
    const url = `https://wa.me/${currentUnit.whatsapp}?text=${message}`;

    window.open(url, "_blank");
  };

  const handleSelectUnit = (unitKey) => {
    setSelectedUnit(unitKey);
    localStorage.setItem("IPPONUnit", unitKey);
    setGateOpen(false);
    pushToast(`Você está na unidade ${units[unitKey].label}.`);
  };

  const heroVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.1, ease: [0.22, 0.61, 0.36, 1], staggerChildren: 0.15 }
    }
  };

  return (
    <>
      <div className="noise"></div>

      <AnimatePresence>
        {loading && (
          <motion.div
            className="preloader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="preloader-ring"></div>
            <div className="preloader-logo">IPPON</div>
            <p>Carregando experiência sensorial</p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {gateOpen && (
          <motion.section
            className="unit-gate"
            aria-label="Escolha a unidade"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <div className="gate-ambient"></div>
            <div className="gate-content">
              <span className="gate-kicker">Selecione sua unidade</span>
              <h1>IPPON</h1>
              <p className="gate-lead">Mais do que comida japonesa. Uma experiência sensorial de luxo absoluto.</p>

              <div className="unit-options">
                <motion.button
                  className="unit-card"
                  data-unit="mococa"
                  whileHover={{ y: -6, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSelectUnit("mococa")}
                >
                  <span className="unit-title">Mococa</span>
                  <span className="unit-sub">Shopping Fonseca</span>
                  <span className="unit-action">Entrar</span>
                </motion.button>
                <motion.button
                  className="unit-card"
                  data-unit="rpd"
                  whileHover={{ y: -6, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSelectUnit("rpd")}
                >
                  <span className="unit-title">São José do Rio Pardo</span>
                  <span className="unit-sub">Centro</span>
                  <span className="unit-action">Entrar</span>
                </motion.button>
              </div>

              <div className="gate-foot">
                <span>Delivery premium & omakase exclusivo</span>
                <span>Atendimento concierge em minutos</span>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <motion.div
        className="site-wrap"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: gateOpen ? 0 : 1, y: gateOpen ? 20 : 0 }}
        transition={{ duration: 0.9, ease: [0.22, 0.61, 0.36, 1] }}
      >
        <header className="site-header">
          <div className="container nav">
            <a className="logo" href="#top" aria-label="IPPON">
              <span className="logo-mark">I</span>
              <span className="logo-text">IPPON</span>
            </a>

            <nav className={`menu ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(false)}>
              <a href="#sobre">Sobre</a>
              <a href="#premium">Pratos premium</a>
              <a href="#cardapio">Cardápio</a>
              <a href="#pedido">Pedido online</a>
              <a href="#contato">Contato</a>
            </nav>

            <div className="nav-actions">
              <span className="current-unit">{currentUnit.label}</span>
              <motion.button
                className="btn ghost swap-unit"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setGateOpen(true)}
              >
                Trocar unidade
              </motion.button>
              <button className="menu-toggle" aria-label="Abrir menu" onClick={() => setMenuOpen(!menuOpen)}>
                <span></span><span></span><span></span>
              </button>
            </div>
          </div>
        </header>

        <main id="top">
          <section className="hero">
            <div className="hero-media" aria-hidden="true">
              <video
                className="hero-video"
                autoPlay
                muted
                loop
                playsInline
                poster="https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=1800&q=80"
              >
                <source src="https://cdn.coverr.co/videos/coverr-sushi-chef-1574/1080p.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="hero-overlay" aria-hidden="true"></div>
            <div className="hero-glow" aria-hidden="true"></div>
            <motion.div
              className="container hero-content hero-center"
              variants={heroVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div className="hero-pill" variants={fadeUp}>{currentUnit.label}</motion.div>
              <motion.h2 className="hero-title" variants={fadeUp}>A arte do sushi no seu ápice.</motion.h2>
              <motion.p className="hero-lead" variants={fadeUp}>
                Um ritual de luxo absoluto com ingredientes raros, cortes milimétricos e apresentação de alta joalheria.
              </motion.p>
              <motion.div className="hero-signature" variants={fadeUp}>
                Omakase privado • Bluefin maturado • Entrega premium
              </motion.div>
              <motion.div className="hero-actions" variants={fadeUp}>
                <motion.a className="btn primary" href="#pedido" whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                  Fazer Pedido
                </motion.a>
                <motion.a className="btn ghost" href="#cardapio" whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                  Explorar cardápio
                </motion.a>
              </motion.div>
              <motion.div className="hero-info-row" variants={fadeUp}>
                <div className="hero-info-card">
                  <span className="hero-label">Tempo médio</span>
                  <strong>30 min</strong>
                </div>
                <div className="hero-info-card">
                  <span className="hero-label">Avaliação</span>
                  <strong>4,9 de 5</strong>
                </div>
                <div className="hero-info-card">
                  <span className="hero-label">Especialidade</span>
                  <strong>Omakase & Bluefin</strong>
                </div>
              </motion.div>
            </motion.div>
            <div className="hero-scroll">Role para descobrir</div>
          </section>
          <Section className="prestige">
            <div className="container prestige-grid">
              <motion.div variants={fadeUp}>
                <p className="eyebrow">Luxo extremo</p>
                <h3>Design, serviço e gastronomia em um só ritual.</h3>
              </motion.div>
              {[
                { label: "Seleção diária", value: "+28 ingredientes premium" },
                { label: "Experiência sensorial", value: "Harmonização exclusiva" },
                { label: "Chef exclusivo", value: "Assinatura IPPON" }
              ].map((item) => (
                <motion.div key={item.label} className="prestige-card" variants={fadeUp} whileHover={hoverLift}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </motion.div>
              ))}
            </div>
          </Section>

          <Section id="premium" className="premium">
            <div className="container">
              <motion.div className="section-header" variants={fadeUp}>
                <div>
                  <p className="eyebrow">Pratos premium</p>
                  <h2>O auge da experiência IPPON.</h2>
                  <p className="muted">Criações autorais com ingredientes raros e apresentação de alto impacto.</p>
                </div>
              </motion.div>
              <motion.div className="premium-grid" variants={stagger}>
                {[
                  {
                    title: "Omakase Imperial - 7 etapas",
                    tag: "Seleção do chef",
                    text: "Sequência exclusiva com bluefin, vieiras Hokkaido e finalização com ouro comestível.",
                    image: "https://images.unsplash.com/photo-1546069901-eacef0df6022?auto=format&fit=crop&w=1200&q=80"
                  },
                  {
                    title: "Combo Kuro Signature - 24 peças",
                    tag: "Mais pedido",
                    text: "Seleção de nigiris selados, sashimis translúcidos e uramakis trufados.",
                    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80"
                  },
                  {
                    title: "Tartar de Bluefin Trufado",
                    tag: "Experiência IPPON",
                    text: "Textura cremosa com yuzu kosho, finalização cítrica e microbrotos.",
                    image: "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=1200&q=80"
                  }
                ].map((card) => (
                  <motion.article
                    key={card.title}
                    className="premium-card"
                    style={{ "--bg": `url('${card.image}')` }}
                    variants={fadeUp}
                    whileHover={hoverLift}
                  >
                    <div className="premium-content">
                      <span className="tag">{card.tag}</span>
                      <h3>{card.title}</h3>
                      <p>{card.text}</p>
                      <motion.button
                        className="btn small ghost"
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => addToCart(card.title)}
                      >
                        Adicionar ao carrinho
                      </motion.button>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            </div>
          </Section>

          <Section id="sobre" className="about">
            <div className="container grid two">
              <motion.div variants={fadeUp}>
                <p className="eyebrow">A marca</p>
                <h2>Uma casa para quem busca excelência sem concessões.</h2>
                <p>
                  O IPPON nasceu para traduzir a sofisticação de Tóquio em uma experiência contemporânea. Cada prato é tratado
                  como peça de alta joalheria: preciso, raro e memorável.
                </p>
                <p>
                  Ingredientes frescos, curadoria rigorosa e serviço silencioso. Aqui, o luxo está no detalhe e na sensação de
                  exclusividade que acompanha cada etapa da jornada.
                </p>
                <div className="about-signature">
                  <span>Chef Kenji Nakamura</span>
                  <span>Especialista em omakase e cortes nobres</span>
                </div>
              </motion.div>
              <motion.div className="about-card" variants={fadeUp} whileHover={hoverLift}>
                <div className="about-image" aria-hidden="true"></div>
                <div className="about-stats">
                  <div>
                    <strong>9</strong>
                    <span>anos de excelência</span>
                  </div>
                  <div>
                    <strong>48</strong>
                    <span>criações autorais</span>
                  </div>
                  <div>
                    <strong>6</strong>
                    <span>etapas omakase</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </Section>
          <Section className="highlights">
            <div className="container">
              <motion.div className="section-header" variants={fadeUp}>
                <div>
                  <p className="eyebrow">Destaques</p>
                  <h2>O que torna o IPPON inesquecível.</h2>
                  <p className="muted">Combos, rituais e curadoria com assinatura da casa.</p>
                </div>
              </motion.div>
              <motion.div className="highlight-grid" variants={stagger}>
                {[
                  {
                    title: "Combo Imperial 32 peças",
                    tag: "Mais pedidos",
                    text: "Para quem deseja provar o máximo da casa com elegância e intensidade.",
                    price: "R$ 248"
                  },
                  {
                    title: "Ritual Omakase",
                    tag: "Experiência IPPON",
                    text: "Um menu fechado com degustação guiada e harmonização premium.",
                    price: "R$ 289"
                  },
                  {
                    title: "Festival de Bluefin",
                    tag: "Seleção do chef",
                    text: "Atum bluefin em cortes raros com finalizações especiais.",
                    price: "R$ 198"
                  }
                ].map((item) => (
                  <motion.article
                    key={item.title}
                    className="highlight-card"
                    variants={fadeUp}
                    whileHover={hoverLift}
                  >
                    <span className="tag">{item.tag}</span>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                    <div className="price">{item.price}</div>
                    <motion.button
                      className="btn small"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => addToCart(item.title)}
                    >
                      Adicionar ao carrinho
                    </motion.button>
                  </motion.article>
                ))}
              </motion.div>
            </div>
          </Section>

          <Section id="cardapio" className="menu-section">
            <div className="container">
              <motion.div className="section-header" variants={fadeUp}>
                <div>
                  <p className="eyebrow">Cardápio</p>
                  <h2>Seleção premium, intuitiva e elegante.</h2>
                  <p className="muted">Explore por categorias e monte seu pedido com poucos cliques.</p>
                </div>
                <motion.a className="btn ghost" href="#pedido" whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                  Ir para o pedido
                </motion.a>
              </motion.div>

              <motion.div className="filters" role="tablist" variants={fadeUp}>
                {[
                  { key: "all", label: "Todos" },
                  { key: "sushi", label: "Sushi" },
                  { key: "sashimi", label: "Sashimi" },
                  { key: "combos", label: "Combos" },
                  { key: "especiais", label: "Especiais da casa" },
                  { key: "bebidas", label: "Bebidas" }
                ].map((category) => (
                  <motion.button
                    key={category.key}
                    className={`filter-btn ${filter === category.key ? "active" : ""}`}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setFilter(category.key)}
                  >
                    {category.label}
                  </motion.button>
                ))}
              </motion.div>

              <motion.div className="menu-grid" layout>
                <AnimatePresence mode="popLayout">
                  {filteredItems.map((item) => {
                    const isAdded = lastAdded === item.name;
                    return (
                      <motion.article
                        key={item.name}
                        className="menu-card"
                        layout
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        whileHover={hoverLift}
                        transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
                      >
                        <img src={item.image} alt={item.name} loading="lazy" />
                        <div>
                          <h3>{item.name}</h3>
                          <p>{item.description}</p>
                        </div>
                        <div className="menu-actions">
                          <span className="menu-price">{formatCurrency(item.price)}</span>
                          <motion.button
                            className={`btn small primary ${isAdded ? "is-added" : ""}`}
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.97 }}
                            animate={isAdded ? { scale: 1.03 } : { scale: 1 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => addToCart(item.name)}
                          >
                            {isAdded ? "Adicionado" : "Adicionar"}
                          </motion.button>
                          {isAdded && (
                            <motion.span
                              className="added-indicator"
                              initial={{ opacity: 0, y: 6 }}
                              animate={{ opacity: 1, y: 0 }}
                            >
                              Item adicionado
                            </motion.span>
                          )}
                        </div>
                      </motion.article>
                    );
                  })}
                </AnimatePresence>
              </motion.div>
            </div>
          </Section>
          <Section className="parallax">
            <div className="container">
              <motion.div className="parallax-content" variants={fadeUp}>
                <p className="eyebrow">Experiência sensorial</p>
                <h2>Silêncio, precisão e impacto visual.</h2>
                <p>
                  O salão foi desenhado com materiais naturais, iluminação baixa e acústica refinada.
                  No delivery, cada detalhe é preservado em embalagens térmicas premium.
                </p>
              </motion.div>
            </div>
          </Section>

          <Section id="pedido" className="order">
            <div className="container grid two">
              <motion.div variants={fadeUp}>
                <p className="eyebrow">Pedido online</p>
                <h2>Finalize no WhatsApp com um resumo perfeito.</h2>
                <p className="muted">
                  Adicione itens ao carrinho e finalize com um resumo automático. Atendimento concierge, confirmação imediata.
                </p>
                <div className="order-steps">
                  <div><span>1</span>Escolha seus pratos favoritos</div>
                  <div><span>2</span>Revise o carrinho com valores</div>
                  <div><span>3</span>Envie para o WhatsApp</div>
                </div>
                <div className="whatsapp-note">
                  <strong>WhatsApp direto:</strong>
                  <span>{currentUnit.whatsappDisplay}</span>
                </div>
              </motion.div>

              <motion.aside
                className="cart"
                animate={cartPulse ? {
                  scale: 1.01,
                  boxShadow: "0 0 0 1px rgba(211, 22, 36, 0.6), 0 30px 60px rgba(177, 13, 23, 0.35)"
                } : {
                  scale: 1,
                  boxShadow: "0 0 0 1px rgba(255, 255, 255, 0.08), 0 22px 48px rgba(0, 0, 0, 0.35)"
                }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
              >
                <div className="cart-header">
                  <h3>Seu carrinho</h3>
                  <span className="cart-count">{totalItems} itens</span>
                </div>
                <ul className="cart-items">
                  {cart.length === 0 ? (
                    <li className="cart-empty">Seu pedido está vazio. Escolha um prato premium.</li>
                  ) : (
                    cart.map((item) => (
                      <li key={item.name}>
                        <div className="cart-item-row">
                          <span>{item.name}</span>
                          <span className="cart-qty">x{item.qty}</span>
                        </div>
                        <div className="cart-item-row">
                          <span>{formatCurrency(item.price * item.qty)}</span>
                          <div className="cart-actions">
                            <button onClick={() => changeQuantity(item.name, -1)}>-</button>
                            <button onClick={() => changeQuantity(item.name, 1)}>+</button>
                          </div>
                        </div>
                      </li>
                    ))
                  )}
                </ul>
                <div className="cart-summary">
                  <div>
                    <span>Subtotal</span>
                    <strong className="cart-total">{formatCurrency(subtotal)}</strong>
                  </div>
                  <div>
                    <span>Entrega premium</span>
                    <strong className="cart-fee">{formatCurrency(deliveryFee)}</strong>
                  </div>
                  <div className="cart-total-row">
                    <span>Total</span>
                    <strong>{formatCurrency(totalWithFee)}</strong>
                  </div>
                </div>
                <motion.button
                  className="btn primary"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCheckout}
                >
                  Finalizar no WhatsApp
                </motion.button>
                <p className="cart-disclaimer">Pedidos acima de R$ 180 ganham sobremesa do dia.</p>
              </motion.aside>
            </div>
          </Section>
          <Section className="testimonials">
            <div className="container">
              <motion.div className="section-header" variants={fadeUp}>
                <div>
                  <p className="eyebrow">Depoimentos</p>
                  <h2>Clientes que voltam pelo ritual.</h2>
                </div>
              </motion.div>
              <motion.div className="testimonials-grid" variants={stagger}>
                {[
                  {
                    quote: "O nível de cuidado é raro. Cada detalhe do delivery lembra um restaurante Michelin.",
                    name: "Marina R. · Executiva"
                  },
                  {
                    quote: "Omakase impecável, sabores limpos e atendimento silencioso. IPPON virou referência.",
                    name: "Felipe H. · Arquiteto"
                  },
                  {
                    quote: "Apresentação, textura e perfume. É um jantar completo, mesmo em casa.",
                    name: "Luiza M. · Chef"
                  }
                ].map((item) => (
                  <motion.article key={item.name} variants={fadeUp} whileHover={hoverLift}>
                    <p>"{item.quote}"</p>
                    <span>{item.name}</span>
                  </motion.article>
                ))}
              </motion.div>
            </div>
          </Section>

          <Section id="contato" className="contact">
            <div className="container">
              <motion.div className="section-header" variants={fadeUp}>
                <div>
                  <p className="eyebrow">Contato</p>
                  <h2>Reservas, eventos e pedidos corporativos.</h2>
                  <p className="muted">Atendimento de terça a domingo. Concierge responde em até 15 minutos.</p>
                </div>
              </motion.div>

              <motion.div className="contact-grid" variants={stagger}>
                {[
                  {
                    key: "mococa",
                    name: "Mococa",
                    sub: "Shopping Fonseca",
                    address: "Av. Dr. Amador de Barros, 1460 · Shopping Fonseca · Mococa - SP",
                    phone: "(19) 99888-1122",
                    map: "https://maps.google.com/maps?q=Shopping%20Fonseca%20Mococa&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  },
                  {
                    key: "rpd",
                    name: "São José do Rio Pardo",
                    sub: "Centro",
                    address: "Rua Coronel João Pedro, 322 · Centro · São José do Rio Pardo - SP",
                    phone: "(19) 99770-3344",
                    map: "https://maps.google.com/maps?q=Centro%20S%C3%A3o%20Jos%C3%A9%20do%20Rio%20Pardo&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  }
                ].map((unit) => (
                  <motion.article
                    key={unit.key}
                    className={`contact-card ${currentUnitKey === unit.key ? "is-selected" : ""}`}
                    variants={fadeUp}
                    whileHover={hoverLift}
                  >
                    <div>
                      <h3>{unit.name}</h3>
                      <p className="contact-sub">{unit.sub}</p>
                      <p>{unit.address}</p>
                      <p>Ter - Dom · 12h às 15h | 19h às 23h</p>
                      <p className="contact-phone">{unit.phone}</p>
                    </div>
                    <div className="contact-actions">
                      <motion.a
                        className="btn primary"
                        href={`https://wa.me/${units[unit.key].whatsapp}`}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        WhatsApp da unidade
                      </motion.a>
                      <motion.a className="btn ghost" href={`mailto:${unit.key}@IPPON.com.br`} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                        Enviar e-mail
                      </motion.a>
                    </div>
                    <div className="map">
                      <iframe title={`Mapa ${unit.name}`} loading="lazy" src={unit.map}></iframe>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            </div>
          </Section>
        </main>
        <footer className="site-footer">
          <div className="container footer-grid">
            <div>
              <span className="logo-text">IPPON</span>
              <p>Restaurante japonês de luxo extremo com foco em omakase e cozinha autoral.</p>
            </div>
            <div>
              <h4>Contato</h4>
              <p>mococa@IPPON.com.br</p>
              <p>rpd@IPPON.com.br</p>
            </div>
            <div>
              <h4>Horário</h4>
              <p>Ter - Dom · 12h às 15h</p>
              <p>Ter - Dom · 19h às 23h</p>
            </div>
            <div>
              <h4>Links</h4>
              <a href="#cardapio">Cardápio</a>
              <a href="#pedido">Pedido online</a>
              <a href="#contato">Contato</a>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 IPPON. Todos os direitos reservados.</span>
            <span>Luxo extremo em gastronomia japonesa.</span>
          </div>
        </footer>
      </motion.div>

      <motion.a
        className="floating-cta"
        href="#pedido"
        whileHover={{ y: -3 }}
        whileTap={{ scale: 0.98 }}
        animate={ctaPulse ? { scale: 1.04 } : { scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
      >
        <span className="cta-copy">
          <span className="cta-text">Pedir agora</span>
          <span className="cta-sub">{formatCurrency(totalWithFee)}</span>
        </span>
        <span className="floating-count">{totalItems}</span>
      </motion.a>

      <AnimatePresence>
        {toasts.length > 0 && (
          <div className="toast-stack">
            {toasts.map((toast) => (
              <motion.div
                key={toast.id}
                className="toast"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.4 }}
              >
                {toast.message}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);



