import { motion } from "framer-motion";

const entries = [
  {
    title: "Bắt đầu học lập trình",
    company: "Funix Việt Nam và 28 Tech",
    date: "09/2022 - 01/2025",
    readTime: "2 mins",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2940&auto=format&fit=crop",
  },
  {
    title: "Frontend Developer",
    company: "CodeGym Việt Nam",
    date: "02/2025 - Present",
    readTime: "Current",
    image: "/codegym.png",
  },
];

export default function Journal() {
  return (
    <section id="resume" className="py-16 md:py-24">
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
                Experience
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-text-primary tracking-tight">
              Recent <span className="font-display italic">journey</span>
            </h2>
          </div>
        </motion.div>

        {/* Entries */}
        <div className="flex flex-col gap-4">
          {entries.map((entry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-4 bg-surface/30 hover:bg-surface border border-stroke rounded-[40px] sm:rounded-full transition-colors duration-300"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-full overflow-hidden bg-stroke hidden sm:block">
                <img src={entry.image} alt={entry.company} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 px-2 sm:px-0">
                <h3 className="text-xl text-text-primary font-medium mb-1">{entry.title}</h3>
                <p className="text-muted text-sm">{entry.company}</p>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted px-2 sm:px-6 w-full sm:w-auto justify-between sm:justify-end">
                <span>{entry.date}</span>
                <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-stroke" />
                <span>{entry.readTime}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
