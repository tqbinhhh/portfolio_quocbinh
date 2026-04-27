import { motion } from "framer-motion";

export default function Stats() {
  const stats = [
    { label: "Tuổi", value: "17" },
    { label: "Giải Thưởng", value: "11+" },
    { label: "Dự Án Đã Làm", value: "10+" },
  ];

  return (
    <section className="relative py-16 md:py-24 border-y border-stroke overflow-hidden">
      {/* Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-gradient-to-r from-[#89AACC]/10 to-[#4E85BF]/10 rounded-[100%] filter blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6 divide-y md:divide-y-0 md:divide-x divide-stroke">
          {stats.map((stat, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: i * 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ once: true, margin: "-50px" }}
              className="flex flex-col items-center text-center pt-8 md:pt-0 pb-8 md:pb-0 px-4 first:pt-0 last:pb-0"
            >
              <div className="text-6xl md:text-7xl lg:text-8xl font-display italic text-text-primary mb-4">
                {stat.value}
              </div>
              <div className="text-xs text-muted uppercase tracking-[0.2em]">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
