import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "Kizo Shop",
    description: "Kizo Shop – Điểm đến thời trang hiện đại với hàng ngàn sản phẩm.",
    image: "/kizo.png",
    link: "https://kizo-shop.netlify.app/",
  },
  {
    title: "OmiFood",
    description: "Website quảng bá dịch vụ ẩm thực hiện đại.",
    image: "/omifood.png",
    link: "https://tqbinhhh.github.io/Omi-Food/",
  },
  {
    title: "Weather vision Pro",
    description: "Cập nhật nhanh chóng và chính xác tình hình thời tiết.",
    image: "/weatherpro.png",
    link: "https://tqbinhhh.github.io/weatherpro.vn/pages/weather_dashboard_homepage.html",
  },
  {
    title: "Ví Nhỏ Finance",
    description: "Ứng dụng quản lý tài chính thông minh dành riêng cho người Việt.",
    image: "/vinho.png",
    link: "https://vi-nho-finance.netlify.app/pages/homepage.html",
  },
];

export default function SelectedWorks() {
  return (
    <section id="work" className="py-12 md:py-16">
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
              <span className="text-xs text-muted uppercase tracking-[0.3em]">
                Selected Work
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-text-primary tracking-tight">
              Featured <span className="font-display italic">projects</span>
            </h2>
            <p className="text-muted mt-4 max-w-md">
              A selection of projects I've worked on, from concept to launch.
            </p>
          </div>

          <a href="#" className="hidden md:inline-flex items-center gap-2 relative group cursor-pointer text-sm rounded-full bg-surface px-6 py-3 border border-stroke hover:border-transparent transition-colors">
            <span className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <div className="relative z-10 flex items-center gap-2 text-text-primary">
              View all work
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </a>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {projects.map((project, index) => {
            const spanClass =
              index % 4 === 0 || index % 4 === 3
                ? "md:col-span-7"
                : "md:col-span-5";

            return (
              <motion.a
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                viewport={{ once: true, margin: "-50px" }}
                key={project.title}
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className={`group relative overflow-hidden bg-surface border border-stroke rounded-3xl aspect-[4/3] md:aspect-auto ${spanClass} min-h-[300px] md:min-h-[400px] block`}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                {/* Halftone Overlay */}
                <div
                  className="absolute inset-0 opacity-20 mix-blend-multiply pointer-events-none"
                  style={{
                    background: "radial-gradient(circle, #000 1px, transparent 1px)",
                    backgroundSize: "4px 4px",
                  }}
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-bg/70 opacity-0 group-hover:opacity-100 backdrop-blur-lg transition-opacity duration-500 flex flex-col justify-center items-center p-6 text-center">
                  
                  {/* Hover Label */}
                  <div className="relative inline-flex items-center rounded-full p-[2px] mb-4">
                    <span className="absolute inset-0 rounded-full accent-gradient animate-gradient-shift bg-[length:200%_auto]" />
                    <div className="relative bg-white text-black px-6 py-2 rounded-full font-medium flex items-center gap-2">
                      View — <span className="font-display italic text-lg">{project.title}</span>
                    </div>
                  </div>
                  
                  <p className="text-text-primary max-w-sm">
                    {project.description}
                  </p>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
