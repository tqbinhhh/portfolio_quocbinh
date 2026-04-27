import { Trophy, Medal, Rocket, Lightbulb, Gamepad2, Sparkles } from "lucide-react";

const groupedAwards = [
  {
    year: "2024",
    awards: [
      {
        title: "Top 30 - VORC",
        description: "Giải Vô địch Robotics",
        icon: <Gamepad2 className="w-8 h-8 text-text-primary" />,
      },
      {
        title: "Giải Ba - Cuộc thi Sáng tạo Trẻ",
        description: "Tỉnh Quảng Nam",
        icon: <Medal className="w-8 h-8 text-text-primary" />,
      },
      {
        title: "Top 10 - Open Stem Day",
        description: "FPT Hà Nam",
        icon: <Rocket className="w-8 h-8 text-text-primary" />,
      },
      {
        title: "Top 2 - RC Challenge",
        description: "FPT Đà Nẵng",
        icon: <Gamepad2 className="w-8 h-8 text-text-primary" />,
      },
      {
        title: "Giải Nhì - Vex-League Đà Nẵng",
        description: "Cuộc thi Robotics",
        icon: <Trophy className="w-8 h-8 text-text-primary" />,
      },
    ]
  },
  {
    year: "2025",
    awards: [
      {
        title: "Top 8 - U-Invent 7",
        description: "Cuộc thi Sáng tạo",
        icon: <Lightbulb className="w-8 h-8 text-text-primary" />,
      },
      {
        title: "Top 30 - Miss & Mister",
        description: "FPT Đà Nẵng",
        icon: <Sparkles className="w-8 h-8 text-text-primary" />,
      },
    ]
  },
  {
    year: "2026",
    awards: [
      {
        title: "Top 250 - AI Young Guru",
        description: "Cuộc thi AI",
        icon: <Rocket className="w-8 h-8 text-text-primary" />,
      },
      {
        title: "Giải Khuyến khích - HSG Tin Học",
        description: "Đà Nẵng",
        icon: <Trophy className="w-8 h-8 text-text-primary" />,
      },
      {
        title: "Giải Khuyến khích - Tin Học Trẻ",
        description: "Đà Nẵng",
        icon: <Medal className="w-8 h-8 text-text-primary" />,
      },
      {
        title: "Giải Khuyến khích - U-Invent 8",
        description: "Cuộc thi Sáng tạo",
        icon: <Lightbulb className="w-8 h-8 text-text-primary" />,
      },
    ]
  }
];

export default function Awards() {
  return (
    <section id="awards" className="relative py-16 md:py-24 border-t border-stroke overflow-hidden z-10">
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em]">
                Achievements
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-text-primary tracking-tight">
              Thành tích <span className="font-display italic">nổi bật</span>
            </h2>
          </div>
        </div>

        {/* Grouped Grids */}
        <div className="flex flex-col gap-16 md:gap-24">
          {groupedAwards.map((group) => (
            <div key={group.year}>
              {/* Year Label */}
              <div className="flex items-center gap-6 mb-8 md:mb-12">
                <h3 className="text-4xl md:text-6xl font-display italic text-text-primary">
                  {group.year}
                </h3>
                <div className="h-px bg-stroke flex-1" />
              </div>

              {/* Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {group.awards.map((award, index) => (
                  <div
                    key={index}
                    className="group relative p-[1px] rounded-[32px] overflow-hidden"
                  >
                    {/* Animated Border Reveal on Hover */}
                    <span className="absolute inset-0 rounded-[32px] accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-gradient-shift pointer-events-none" />
                    
                    <div className="relative bg-surface border border-stroke group-hover:border-transparent rounded-[32px] p-8 h-full flex flex-col gap-6 transition-all duration-300">
                      <div className="w-16 h-16 rounded-full border border-stroke flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500">
                        {award.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-medium text-text-primary mb-2">
                          {award.title}
                        </h3>
                        <p className="text-muted text-sm">
                          {award.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
