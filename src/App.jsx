import "./index.css";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaShieldAlt,
  FaCode,
  FaBug,
  FaServer,
  FaExternalLinkAlt,
  FaDownload,
  FaArrowRight,
  FaLayerGroup,
} from "react-icons/fa";

const skills = {
  "Programming Languages": ["C", "Java", "Python", "SQL"],
  "Web Technologies": ["HTML", "CSS", "JavaScript", "Angular", "Flask"],
  "Cybersecurity / Tools": ["Kali Linux", "Git", "GitHub", "MySQL", "Tableau"],
  "Core CS": ["Operating Systems", "Computer Networks", "DBMS", "OOPs"],
};

const projects = [
  {
    id: "01",
    title: "Voice Cloning Detection with Audio Watermarking",
    tag: "Security + Signal Processing",
    tech: "Python • FFT • Signal Processing",
    desc: "Implemented frequency-domain watermark embedding and FFT-based spectral modification to protect audio authenticity while preserving perceptual quality.",
    impact:
      "Focused on protecting digital audio integrity using watermarking-driven secure media techniques.",
    actions: [
      { label: "GitHub", href: "https://github.com/tanujaprakash" },
      { label: "Case Study", href: "#projects" },
    ],
  },
  {
    id: "02",
    title: "NLP Article Summarizer",
    tag: "Web App + NLP",
    tech: "Flask • Python • spaCy • Jinja",
    desc: "Built a web-based article summarizer using tokenization, normalization, sentence scoring, and statistical text processing techniques.",
    impact:
      "Demonstrates backend logic, NLP understanding, and practical web application implementation.",
    actions: [
      { label: "GitHub", href: "https://github.com/tanujaprakash" },
      { label: "Live Demo (Later)", href: "#projects" },
    ],
  },
  {
    id: "03",
    title: "Smart Watch UI/UX Interface",
    tag: "UI/UX + Product Design",
    tech: "Figma • Design Thinking",
    desc: "Created interactive mockups with improved user flows, responsive thinking, accessibility considerations, and feedback-driven refinements.",
    impact:
      "Highlights product design thinking and UI/UX capability in addition to development and security interests.",
    actions: [
      { label: "Preview", href: "#projects" },
      { label: "Figma", href: "#" },
    ],
  },
];

const experiences = [
  {
    company: "Techfino Capital Pvt Ltd",
    role: "Software Development Intern",
    points: [
      "Worked on B2B and MSME software development projects.",
      "Contributed to backend development, frontend UI implementation, debugging, and feature enhancements in web applications.",
    ],
  },
  {
    company: "National Information and Cybersecurity Council (NICC)",
    role: "Cybersecurity Intern (VAPT of Web Application)",
    points: [
      "Performed vulnerability assessment and penetration testing of web applications.",
      "Worked with reconnaissance and steganographic tools in cybersecurity workflows.",
    ],
  },
];

const certifications = [
  "Zero Trust Cyber Associate – Zscaler",
  "Introduction to Cybersecurity – Cisco Networking Academy",
  "Career Essentials in Cybersecurity – Microsoft & LinkedIn Learning",
  "Introduction to Cybersecurity Careers and Essentials – IBM",
  "FLY Scholar – FFE",
];

const services = [
  {
    icon: <FaCode />,
    title: "Software Development",
    desc: "Building practical applications with structured logic, clean code, and scalable implementation.",
  },
  {
    icon: <FaServer />,
    title: "Web Development",
    desc: "Creating responsive interfaces and backend-aware solutions with a product-focused mindset.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Cybersecurity & VAPT",
    desc: "Exploring secure systems, web application security, vulnerability assessment, and defense-oriented thinking.",
  },
  {
    icon: <FaBug />,
    title: "Python & Problem Solving",
    desc: "Using Python for experimentation, automation, backend workflows, and project-driven execution.",
  },
];

function SectionTitle({ label, title, desc }) {
  return (
    <div className="section-head">
      <p className="section-label">{label}</p>
      <h2>{title}</h2>
      {desc && <p className="section-desc">{desc}</p>}
    </div>
  );
}

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [bits, setBits] = useState([]);
  const bitIdRef = useRef(0);

  const sectionIds = useMemo(
    () => [
      "home",
      "about",
      "experience",
      "services",
      "skills",
      "projects",
      "certifications",
      "contact",
    ],
    []
  );

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        let topVisible = null;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!topVisible || entry.intersectionRatio > topVisible.intersectionRatio) {
              topVisible = entry;
            }
          }
        });

        if (topVisible?.target?.id) {
          setActiveSection(topVisible.target.id);
        }
      },
      {
        threshold: [0.25, 0.45, 0.65],
        rootMargin: "-10% 0px -35% 0px",
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [sectionIds]);

  useEffect(() => {
    let throttle = false;

    const handleMove = (e) => {
      if (throttle) return;
      throttle = true;

      const spawnCount = 2;
      const newBits = Array.from({ length: spawnCount }).map((_, i) => ({
        id: bitIdRef.current++,
        x: e.clientX + (Math.random() * 26 - 13),
        y: e.clientY + (Math.random() * 26 - 13),
        value: Math.random() > 0.5 ? "1" : "0",
        dx: (Math.random() * 30 - 15).toFixed(2),
        dy: (Math.random() * -50 - 10).toFixed(2),
        delay: i * 0.04,
      }));

      setBits((prev) => [...prev.slice(-36), ...newBits]);

      setTimeout(() => {
        setBits((prev) => prev.filter((b) => !newBits.some((n) => n.id === b.id)));
      }, 1200);

      setTimeout(() => {
        throttle = false;
      }, 80);
    };

    window.addEventListener("mousemove", handleMove);

    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const isActive = (id) => activeSection === id;

  return (
    <div className="app-shell">
      <div className="noise-layer"></div>
      <div className="grid-layer"></div>
      <div className="glow glow-cyan"></div>
      <div className="glow glow-violet"></div>

      <div className="binary-layer" aria-hidden="true">
        {bits.map((bit) => (
          <span
            key={bit.id}
            className="binary-bit"
            style={{
              left: `${bit.x}px`,
              top: `${bit.y}px`,
              "--dx": `${bit.dx}px`,
              "--dy": `${bit.dy}px`,
              animationDelay: `${bit.delay}s`,
            }}
          >
            {bit.value}
          </span>
        ))}
      </div>

      <header className="topbar">
        <div className="brand-wrap">
          <span className="brand-dot"></span>
          <span className="brand-text">Tanuja G P</span>
        </div>

        <nav className="nav-links">
          <a href="#home" className={isActive("home") ? "nav-active" : ""}>
            Home
          </a>
          <a href="#about" className={isActive("about") ? "nav-active" : ""}>
            About
          </a>
          <a href="#experience" className={isActive("experience") ? "nav-active" : ""}>
            Internships
          </a>
          <a href="#services" className={isActive("services") ? "nav-active" : ""}>
            What I Do
          </a>
          <a href="#skills" className={isActive("skills") ? "nav-active" : ""}>
            Skills
          </a>
          <a href="#projects" className={isActive("projects") ? "nav-active" : ""}>
            Projects
          </a>
          <a
            href="#certifications"
            className={isActive("certifications") ? "nav-active" : ""}
          >
            Certifications
          </a>
          <a href="#contact" className={isActive("contact") ? "nav-active" : ""}>
            Contact
          </a>
        </nav>
      </header>

      <main className="container">
        <section id="home" className={`hero-v3 section-shell ${isActive("home") ? "section-active" : ""}`}>
          <div className="hero-copy">
            <p className="hero-kicker">Cybersecurity • Software Development • UI/UX Thinking</p>
              <p className="hero-name">Tanuja G P</p>
                <h1>
                    Building secure,
                      <span>practical digital experiences.</span>
                  </h1>

            <p className="hero-description">
              Computer Science student focused on software development,
              cybersecurity, and product-minded problem solving. I build
              applications with a strong balance of functionality, usability,
              and security-aware thinking.
            </p>

            <div className="hero-cta">
              <a href="#experience" className="btn btn-primary">
                View Internships <FaArrowRight />
              </a>
              <a href="/resume.pdf" className="btn btn-secondary" download>
                <FaDownload /> Resume
              </a>
              <a href="#contact" className="btn btn-ghost">
                Contact
              </a>
            </div>

            <div className="hero-socials">
              <a href="https://github.com/tanujaprakash" target="_blank" rel="noreferrer">
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/tanuja-g-p-342852279"
                target="_blank"
                rel="noreferrer"
              >
                <FaLinkedin />
              </a>
              <a href="mailto:tanujagp11@gmail.com">
                <FaEnvelope />
              </a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-card hero-terminal">
              <div className="hero-terminal-top">
                <span></span>
                <span></span>
                <span></span>
              </div>

              <div className="hero-terminal-body">
                <p className="mono cyan">secure_profile.init</p>
                <p className="mono"><span className="green">$</span> role</p>
                <p className="mono light">Cybersecurity Enthusiast | Software Developer</p>
                <p className="mono"><span className="green">$</span> stack</p>
                <p className="mono light">Python • Java • SQL • Angular • Flask • JavaScript</p>
                <p className="mono"><span className="green">$</span> focus</p>
                <p className="mono light">Web Development • VAPT • NLP • Secure Systems</p>
              </div>
            </div>

            <div className="hero-stats">
              <div className="stat-panel">
                <span className="stat-num">02</span>
                <span className="stat-label">Internships</span>
              </div>
              <div className="stat-panel">
                <span className="stat-num">03+</span>
                <span className="stat-label">Projects</span>
              </div>
              <div className="stat-panel">
                <span className="stat-num">05</span>
                <span className="stat-label">Certifications</span>
              </div>
            </div>
          </div>
        </section>

        <section
          id="about"
          className={`section-block section-shell ${isActive("about") ? "section-active" : ""}`}
        >
          <SectionTitle
            label="About"
            title="A developer with a security-first mindset"
            desc="Blending software development, cybersecurity, and UI/UX awareness into practical, portfolio-worthy work."
          />

          <div className="feature-panel">
            <div className="feature-content">
              <p>
                I am a Computer Science and Engineering student at SJB Institute
                of Technology with strong interest in software development and
                cybersecurity. My work spans web applications, Python-based
                projects, UI/UX design, and cybersecurity practices such as
                VAPT and secure systems thinking.
              </p>
              <p>
                I enjoy building solutions that are not only functional and
                user-friendly, but also security-conscious. My goal is to grow
                into a developer who understands both how systems are built and
                how they can be protected.
              </p>
            </div>

            <div className="about-metrics">
              <div className="metric-card">
                <FaShieldAlt />
                <h3>Security Aware</h3>
                <p>Focused on secure systems, VAPT exposure, and defensive thinking.</p>
              </div>
              <div className="metric-card">
                <FaLayerGroup />
                <h3>Product Mindset</h3>
                <p>Interested in usable, scalable, and visually thoughtful digital experiences.</p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="experience"
          className={`section-block section-shell ${isActive("experience") ? "section-active" : ""}`}
        >
          <SectionTitle
            label="Internships"
            title="Practical experience with real-world exposure"
            desc="Highlighted early to strengthen credibility before projects."
          />

          <div className="timeline-v3">
            {experiences.map((exp, index) => (
              <div className="timeline-item" key={index}>
                <div className="timeline-line"></div>
                <div className="premium-card timeline-panel">
                  <h3>{exp.company}</h3>
                  <h4>{exp.role}</h4>
                  <ul>
                    {exp.points.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          id="services"
          className={`section-block section-shell ${isActive("services") ? "section-active" : ""}`}
        >
          <SectionTitle
            label="What I Do"
            title="Core capabilities"
            desc="A balanced profile across development, security, and design-led execution."
          />

          <div className="card-grid four-grid">
            {services.map((item, index) => (
              <div className="premium-card hover-3d" key={index}>
                <div className="card-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="skills"
          className={`section-block section-shell ${isActive("skills") ? "section-active" : ""}`}
        >
          <SectionTitle
            label="Skills"
            title="Technical stack & foundations"
            desc="Organized to show both breadth and clarity for internship evaluators."
          />

          <div className="skills-layout">
            {Object.entries(skills).map(([category, items]) => (
              <div className="premium-card skill-card" key={category}>
                <h3>{category}</h3>
                <div className="chips">
                  {items.map((skill) => (
                    <span className="skill-chip" key={skill}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          id="projects"
          className={`section-block section-shell ${isActive("projects") ? "section-active" : ""}`}
        >
          <SectionTitle
            label="Projects"
            title="Featured work"
            desc="Presented as mini case studies to create stronger recruiter impact."
          />

          <div className="project-stack">
            {projects.map((project) => (
              <div className="project-showcase hover-3d" key={project.id}>
                <div className="project-accent"></div>

                <div className="project-head">
                  <span className="project-id">{project.id}</span>
                  <span className="project-tag">{project.tag}</span>
                </div>

                <h3>{project.title}</h3>
                <p className="project-techline">{project.tech}</p>
                <p className="project-body">{project.desc}</p>

                <div className="impact-box">
                  <span>Why it matters</span>
                  <p>{project.impact}</p>
                </div>

                <div className="project-links">
                  {project.actions.map((action, i) => (
                    <a key={i} href={action.href} className="inline-link">
                      {action.label} <FaExternalLinkAlt />
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          id="certifications"
          className={`section-block section-shell ${isActive("certifications") ? "section-active" : ""}`}
        >
          <SectionTitle
            label="Certifications"
            title="Continuous learning"
            desc="A focused mix of cybersecurity, zero trust, and career readiness."
          />

          <div className="card-grid cert-grid">
            {certifications.map((cert, index) => (
              <div className="premium-card cert-v3 hover-3d" key={index}>
                <span className="cert-badge">0{index + 1}</span>
                <p>{cert}</p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="contact"
          className={`section-block section-shell ${isActive("contact") ? "section-active" : ""}`}
        >
          <SectionTitle
            label="Contact"
            title="Open to impactful opportunities"
            desc="Actively seeking internships and learning-driven roles in software development and cybersecurity."
          />

          <div className="contact-panel contact-panel-v2">
            <div className="contact-copy">
              <h3>Let’s connect</h3>
              <p>
                If you’re looking for someone who combines technical curiosity,
                development capability, and security-minded thinking, I’d love
                to connect.
              </p>
            </div>

            <div className="contact-actions contact-actions-v2">
              <a href="mailto:tanujagp11@gmail.com">tanujagp11@gmail.com</a>
              <a href="https://github.com/tanujaprakash" target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/tanuja-g-p-342852279"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;