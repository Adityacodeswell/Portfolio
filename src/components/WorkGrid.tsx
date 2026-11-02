import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, LayoutGrid, List } from 'lucide-react';

interface ProjectItem {
  id: string;
  title: string;
  tag: string;
  year: string;
  desc: string;
  image: string;
  link: string;
  isHero?: boolean;
}

export default function WorkGrid() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Case Studies with updated Behance links
  const projectsData: ProjectItem[] = [
    {
      id: '01',
      title: "Design Portfolio '26",
      tag: '[COMPREHENSIVE DESIGN SPACE & RESEARCH]',
      year: '2026',
      desc: 'An end-to-end investigation of physical movement, interaction systems, and cultural technologies across sports, craft, and healthcare.',
      image: '/assets/images/regenerated_image_1778413103942.png',
      link: 'https://www.behance.net/gallery/257643363/Design-Portfolio-Aditya-Kumar',
      isHero: true,
    },
    {
      id: '02',
      title: 'Sahaay',
      tag: '[HEALTHCARE / SYSTEM DESIGN]',
      year: '2026',
      desc: 'Assistive systems and human-centered design intervention.',
      image: '/assets/images/regenerated_image_1778405268648.png',
      link: 'https://www.behance.net/gallery/248825327/Sahaay',
    },
    {
      id: '03',
      title: 'Summer Internship Project',
      tag: '[COMMUNITY-LED RESEARCH]',
      year: '2025',
      desc: 'Urban coastal pollution profiling & volunteer platform.',
      image: '/assets/images/regenerated_image_1778411284666.jpg',
      link: 'https://www.behance.net/gallery/256367979/Internship-project',
    },
    {
      id: '04',
      title: 'Eco-Smart Kiln',
      tag: '[DESIGN FOR HUMAN AND ENVIRONMENT]',
      year: '2025',
      desc: 'Applying thermal sensor arrays and telemetry visualization.',
      image: '/assets/images/regenerated_image_1778344061039.png',
      link: 'https://www.behance.net/gallery/249093817/Eco-smart-kiln',
    },
  ];

  return (
    <section id="work" className="relative w-full bg-white text-black py-20 md:py-28 px-6 sm:px-8 md:px-12 lg:px-16 border-t border-zinc-100">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Unified "WORK" Header */}
        <div className="text-center pt-2 pb-6 md:pb-10 select-none">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-7xl sm:text-8xl md:text-9xl lg:text-[11rem] font-black text-black tracking-tight uppercase leading-none select-none text-center"
          >
            WORK
          </motion.h2>
        </div>

        {/* Control Bar */}
        <div className="flex items-center justify-between gap-4 pb-6 border-b border-zinc-200 text-xs font-mono tracking-widest text-zinc-500 uppercase">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#FF3B30] animate-pulse" />
            <span className="text-zinc-950 font-bold">SELECTED SHOWCASE</span>
            <span className="text-zinc-400">/ [01—04]</span>
          </div>

          {/* View Switcher */}
          <div className="flex items-center gap-1 border border-zinc-200 rounded-lg p-0.5 bg-zinc-50">
            <button
              onClick={() => setViewMode('grid')}
              title="Grid View"
              className={`p-1.5 rounded cursor-pointer transition-colors ${
                viewMode === 'grid' ? 'bg-white shadow-xs text-zinc-950 font-bold' : 'text-zinc-400 hover:text-zinc-900'
              }`}
            >
              <LayoutGrid size={15} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              title="List View"
              className={`p-1.5 rounded cursor-pointer transition-colors ${
                viewMode === 'list' ? 'bg-white shadow-xs text-zinc-950 font-bold' : 'text-zinc-400 hover:text-zinc-900'
              }`}
            >
              <List size={15} />
            </button>
          </div>
        </div>

        {/* Cards Display (Contained in the Work div with all project links) */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {projectsData.map((project) => (
              <a
                key={project.id}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative rounded-2xl bg-zinc-50/70 border border-zinc-200/90 hover:border-zinc-400 hover:shadow-xl transition-all duration-500 flex flex-col p-4 sm:p-5 md:p-6 cursor-pointer ${
                  project.isHero ? 'md:col-span-2' : ''
                }`}
              >
                {/* Window Mockup Top Bar */}
                <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-zinc-200/80 text-[10px] font-mono text-zinc-500">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400/90" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400/90" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/90" />
                  </div>
                  <span className="uppercase text-zinc-600 font-semibold tracking-wider">
                    {project.tag}
                  </span>
                  <span className="text-zinc-400 font-mono">{project.year}</span>
                </div>

                {/* Image Window */}
                <div
                  className={`w-full rounded-xl overflow-hidden bg-zinc-100 mb-4 relative ${
                    project.isHero ? 'aspect-[21/9] sm:aspect-[2/1] md:aspect-[2.3/1]' : 'aspect-[16/10]'
                  }`}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                  />

                  {/* Hover Floating Badge */}
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md border border-zinc-200 flex items-center justify-center text-zinc-800 opacity-0 group-hover:opacity-100 group-hover:scale-110 shadow-md transition-all duration-300">
                    <ArrowUpRight size={18} />
                  </div>
                </div>

                {/* Project Meta Information (Title and Direct Link) */}
                <div className="flex items-center justify-between gap-4 mt-auto pt-1">
                  <div className="max-w-2xl">
                    <h3
                      className={`font-bold tracking-tight text-zinc-950 group-hover:text-[#FF3B30] transition-colors ${
                        project.isHero ? 'text-2xl sm:text-3xl md:text-4xl' : 'text-xl sm:text-2xl'
                      }`}
                    >
                      {project.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-zinc-500 group-hover:text-[#FF3B30] transition-colors shrink-0">
                    <span>VIEW ON BEHANCE</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="divide-y divide-zinc-200">
            {projectsData.map((project) => (
              <a
                key={project.id}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group py-6 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-zinc-50 px-4 sm:px-6 rounded-xl transition-all duration-300 gap-4"
              >
                <div className="flex items-baseline gap-4 sm:gap-8">
                  <span className="font-mono text-xs text-zinc-400 font-bold">{project.id}</span>
                  <div>
                    <h4 className="text-xl sm:text-2xl font-bold text-zinc-950 group-hover:text-[#FF3B30] transition-colors">
                      {project.title}
                    </h4>
                    <p className="text-xs font-mono text-zinc-500 mt-1">{project.tag}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 shrink-0">
                  <span className="font-mono text-xs text-zinc-400">{project.year}</span>
                  <div className="flex items-center gap-2 font-mono text-xs font-bold text-zinc-600 group-hover:text-[#FF3B30] transition-colors">
                    <span>VIEW</span>
                    <div className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-700 group-hover:border-[#FF3B30] group-hover:text-[#FF3B30] transition-colors">
                      <ArrowUpRight size={14} />
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
