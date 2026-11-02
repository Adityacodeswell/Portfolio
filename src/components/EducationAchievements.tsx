import { motion } from 'motion/react';

interface EducationItem {
  index: string;
  degree: string;
  institution: string;
  subtitle: string;
  period: string;
  dotColor: string;
}

interface AchievementItem {
  index: string;
  title: string;
  role: string;
  year: string;
  dotColor: string;
}

const educationData: EducationItem[] = [
  {
    index: '01',
    degree: 'M.Des',
    institution: 'National Institute of Fashion Technology (NIFT), Mumbai',
    subtitle: 'MASTER OF DESIGN',
    period: '2024 – 2026',
    dotColor: 'bg-[#FF3B30]',
  },
  {
    index: '02',
    degree: 'B.Tech (IT)',
    institution: 'IIMT College of Engineering',
    subtitle: 'BACHELOR OF TECHNOLOGY IN INFORMATION TECHNOLOGY',
    period: '2020 – 2024',
    dotColor: 'bg-sky-400',
  },
];

const achievementsData: AchievementItem[] = [
  {
    index: '01',
    title: "I'CoRD 27",
    role: 'Paper Selected',
    year: '2027',
    dotColor: 'bg-lime-400',
  },
  {
    index: '02',
    title: 'ServDes India',
    role: 'Finalist',
    year: '2026',
    dotColor: 'bg-[#FF3B30]',
  },
  {
    index: '03',
    title: 'ServDes India',
    role: 'Poster Competition Winner',
    year: '2026',
    dotColor: 'bg-sky-400',
  },
  {
    index: '04',
    title: 'India Innovates Hackathon',
    role: 'Finalist',
    year: '2026',
    dotColor: 'bg-purple-400',
  },
];

export default function EducationAchievements() {
  return (
    <section id="education" className="bg-white text-black py-24 md:py-32 px-8 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col"
        >
          <h2 className="font-sans font-black tracking-tight text-5xl md:text-7xl lg:text-8xl text-black leading-[1.05]">
            Education &
          </h2>
          <span className="font-serif italic font-normal text-5xl md:text-7xl lg:text-8xl text-[#FF3B30] leading-[1.05] mt-1 md:mt-2">
            Achievements.
          </span>
        </motion.div>

        {/* Two-Column Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mt-16 md:mt-24 items-start">
          {/* Left Column: Education */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-between pb-4 border-b border-zinc-200 mb-2">
              <span className="text-[11px] font-mono tracking-widest uppercase text-zinc-400 font-semibold">
                // EDUCATION
              </span>
              <span className="text-[11px] font-mono tracking-widest uppercase text-zinc-400">
                TIMELINE
              </span>
            </div>

            <div>
              {educationData.map((item) => (
                <div
                  key={item.index}
                  className="border-b border-zinc-200 py-8 last:border-b-0 group"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <div className="flex items-baseline gap-3 sm:gap-4">
                      <span className="text-xs md:text-sm font-mono text-zinc-400 w-12 shrink-0 select-none">
                        {item.index}
                      </span>
                      <div>
                        <h3 className="font-sans font-bold text-xl md:text-2xl text-black leading-tight group-hover:text-[#FF3B30] transition-colors">
                          {item.degree}
                        </h3>
                        <p className="text-sm md:text-base text-zinc-700 mt-1">
                          {item.institution}
                        </p>
                        <p className="text-[10px] md:text-xs tracking-widest uppercase font-mono text-zinc-400 mt-3">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center shrink-0 ml-4">
                      <span className="text-xs md:text-sm font-mono text-zinc-400 mr-3 whitespace-nowrap">
                        {item.period}
                      </span>
                      <span className={`w-2.5 h-2.5 rounded-full ${item.dotColor} inline-block shrink-0 shadow-sm`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:border-l lg:border-zinc-200 lg:pl-16"
          >
            <div className="flex items-center justify-between pb-4 border-b border-zinc-200 mb-2">
              <span className="text-[11px] font-mono tracking-widest uppercase text-zinc-400 font-semibold">
                // ACHIEVEMENTS & HONORS
              </span>
              <span className="text-[11px] font-mono tracking-widest uppercase text-zinc-400">
                YEAR
              </span>
            </div>

            <div>
              {achievementsData.map((item) => (
                <div
                  key={item.index + item.title}
                  className="border-b border-zinc-200 py-6 last:border-b-0 group"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <div className="flex items-baseline gap-3 sm:gap-4">
                      <span className="text-xs md:text-sm font-mono text-zinc-400 w-10 shrink-0 select-none">
                        {item.index}
                      </span>
                      <div>
                        <h3 className="font-sans font-bold text-lg md:text-xl text-black leading-tight group-hover:text-[#FF3B30] transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-sm text-zinc-600 mt-0.5">
                          {item.role}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center shrink-0 ml-4">
                      <span className="text-xs md:text-sm font-mono text-zinc-400 mr-3 whitespace-nowrap">
                        {item.year}
                      </span>
                      <span className={`w-2.5 h-2.5 rounded-full ${item.dotColor} inline-block shrink-0 shadow-sm`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
