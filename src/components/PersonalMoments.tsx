import { motion } from "framer-motion";

const moments = [
  {
    title: "MC Sự kiện Blooming",
    image: "/mc-blooming.jpg",
    colSpan: "md:col-span-1",
  },
  {
    title: "MC Sự kiện Prom",
    image: "/mc-prom.jpg",
    colSpan: "md:col-span-1",
  },
  {
    title: "Open STEM Day 2024",
    image: "/open-stem-day-2024.jpg",
    colSpan: "md:col-span-1",
  },
  {
    title: "Giải Khuyến Khích UI-8",
    image: "/trao-giai-khuyen-khich-ui-8.jpg",
    colSpan: "md:col-span-2",
  },
  {
    title: "Trao giải STEM 2024",
    image: "/trao-giai-stem-2024.jpg",
    colSpan: "md:col-span-1",
  },
  {
    title: "Miss & Mister",
    image: "/miss-mister.jpeg",
    colSpan: "md:col-span-3",
  },
];

export default function PersonalMoments() {
  return (
    <section id="personal-moments" className="py-16 md:py-24 overflow-hidden">
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
                Gallery
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-text-primary tracking-tight">
              Dấu Ấn <span className="font-display italic">Cá Nhân</span>
            </h2>
          </div>
          <p className="text-muted max-w-sm text-sm md:text-base leading-relaxed">
            Những khoảnh khắc, hoạt động đáng nhớ trong quá trình học tập và phát triển bản thân.
          </p>
        </motion.div>

        {/* Masonry-like Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {moments.map((moment, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
              className={`relative group overflow-hidden rounded-[20px] md:rounded-[32px] bg-surface/30 border border-stroke aspect-[4/3] md:aspect-auto md:min-h-[300px] ${moment.colSpan}`}
            >
              <img
                src={moment.image}
                alt={moment.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              {/* Overlay with glassmorphism */}
              <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6 md:p-8">
                <h3 className="text-lg md:text-xl font-medium text-text-primary translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {moment.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
