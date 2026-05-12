import { motion } from "framer-motion";

const techs = [
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", name: "HTML5" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", name: "CSS3" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", name: "JavaScript" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", name: "TypeScript" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", name: "React" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", name: "Node.js" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", name: "Python" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", name: "Java" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", name: "C++" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg", name: "Swift" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg", name: "Flutter" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg", name: "Bootstrap" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", name: "MySQL" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", name: "Git" },
];

export default function Explorations() {
  return (
    <section className="relative py-16 md:py-24 border-t border-stroke overflow-hidden z-10">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6"
        >
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em]">Toolkit</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-text-primary tracking-tight">
              Visual <span className="font-display italic">playground</span>
            </h2>
          </div>
          <p className="text-muted max-w-xs text-sm md:text-base">
            Technologies and languages I use to build scalable web applications.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-4">
          {techs.map((tech, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
              className="group flex flex-col items-center gap-3"
            >
              <div className="w-full aspect-square bg-surface border border-stroke rounded-2xl flex items-center justify-center hover:border-white/20 hover:bg-surface/80 hover:scale-105 transition-all duration-300 cursor-pointer p-4">
                <img
                  src={tech.src}
                  alt={tech.name}
                  className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              </div>
              <span className="text-xs text-muted group-hover:text-text-primary transition-colors duration-300 text-center">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
