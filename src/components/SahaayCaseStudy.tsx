import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Target, Users, Layout, ShieldAlert, Heart, Activity, ChevronRight, Moon, Sun, MessageSquare, ClipboardList, Briefcase, Share2, Lightbulb, ShieldCheck } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export default function SahaayCaseStudy() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { img, txt } = useContent();
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeFeature, setActiveFeature] = useState<number | null>(null);

  const features = [
    {
      title: "Alert & Escalation System",
      desc: "Structured flows for reporting health issues. SAHAAY codifies urgency, ensuring that a child's pain is never lost in a stack of paper logs or a noisy WhatsApp group.",
      icon: <ShieldAlert className="text-[#F58220]" />
    },
    {
      title: "Night-Time Support System",
      desc: "Dedicated monitoring of high-risk families beyond staff hours. This 'Night Guard' layer provides a safety net during the hours when professional staff are unavailable.",
      icon: <Moon className="text-[#F58220]" />
    },
    {
      title: "Guided Care (Parent Support)",
      desc: "Step-by-step instructions for daily routines and emergencies. By reducing ambiguity, we reduce parent anxiety and prevent preventable errors in home-care.",
      icon: <Heart className="text-[#F58220]" />
    },
    {
      title: "Staff Dashboard",
      desc: "Prioritizes risks for faster decision-making. Managers can see at a glance which centres or specific families require immediate attention.",
      icon: <Layout className="text-[#F58220]" />
    },
    {
      title: "System Memory",
      desc: "A centralized archive of care history. Every interaction builds a data profile that informs clinical decisions and long-term research.",
      icon: <ClipboardList className="text-[#F58220]" />
    }
  ];

  return (
    <motion.div 
      ref={scrollRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-[#FDFBF7] min-h-screen text-[#2E3192] selection:bg-[#F58220] selection:text-white"
    >
      {/* 1. The 'Night Gap' Hero Section */}
      <header className="relative h-screen w-full overflow-hidden bg-[#2E3192]">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.8 }}
          transition={{ duration: 2, ease: "circOut" }}
          className="absolute inset-0"
        >
          {/* Background: wide-angle image of facility playground */}
          <img 
            src={img('sahaay_hero')} 
            alt="St. Jude Facility"
            className="w-full h-full object-cover grayscale brightness-75 contrast-110"
          />
        </motion.div>
        <div className="absolute inset-0 bg-[#2E3192]/40 mix-blend-multiply" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
          <motion.h1 
             initial={{ y: 50, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ delay: 0.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
             className="text-[15vw] font-display font-black tracking-tightest uppercase text-white leading-none mix-blend-overlay"
          >
            SAHAAY
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-4"
          >
            <p className="text-[#F58220] font-mono text-sm uppercase tracking-[0.4em] font-bold">
              Humanitarian Service Design // St. Jude India
            </p>
          </motion.div>
        </div>

        {/* Metadata Bar */}
        <div className="absolute bottom-0 left-0 w-full bg-[#F58220] px-8 py-5 z-40">
          <div className="max-w-[1800px] mx-auto flex flex-wrap justify-between items-center gap-8 text-white">
             <div className="flex flex-col">
               <span className="font-mono text-[9px] uppercase font-bold opacity-70">ROLE</span>
               <span className="font-sans font-bold uppercase tracking-tighter text-xs">Service Designer & Researcher</span>
             </div>
             <div className="flex flex-col">
               <span className="font-mono text-[9px] uppercase font-bold opacity-70">DOMAIN</span>
               <span className="font-sans font-bold uppercase tracking-tighter text-xs">Pediatric Oncology Support</span>
             </div>
             <div className="flex flex-col">
               <span className="font-mono text-[9px] uppercase font-bold opacity-70">METHODS</span>
               <span className="font-sans font-bold uppercase tracking-tighter text-xs">Field Visits, Observations, Interviews</span>
             </div>
             <div className="flex items-center gap-3">
               <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
               <span className="font-mono text-[9px] uppercase font-bold">Active_Intervention</span>
             </div>
          </div>
        </div>
      </header>

      {/* Intro Narration */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          <h2 className="text-4xl md:text-6xl font-display font-medium tracking-tight uppercase leading-none">
            From Fragmented Care <br/><span className="text-[#4A773C] italic font-light">to Continuous Support.</span>
          </h2>
          <p className="text-2xl font-sans font-light leading-relaxed text-[#2E3192]/80">
            A 4-month service design intervention for St. Jude India ChildCare Centres to bridge the "Night Gap" in pediatric oncology care. Sahaay bridges the transition from episodic verification to continuous monitoring.
          </p>
        </div>
      </section>

      {/* 01. Problem Discovery: The Night Gap */}
      <section className="bg-[#2E3192] text-white py-32 md:py-56 px-6 overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-32">
            <div className="space-y-12">
              <span className="text-[#F58220] font-mono text-xs font-bold tracking-[0.5em] uppercase">01 // THE NIGHT GAP</span>
              <h3 className="text-5xl md:text-8xl font-display font-medium tracking-tightest uppercase leading-none">
                Visibility <br/> Dissolves <br/> at 6:00 PM.
              </h3>
              <p className="text-white/60 text-lg leading-relaxed font-sans max-w-lg">
                Care for a child is a 24/7 requirement, yet professional staff support is time-bound. This creates a Night-Time Visibility Gap where parents are left without guidance during critical health changes.
              </p>
            </div>
            
            {/* Day vs Night Split Visual */}
            <div className="relative aspect-square md:aspect-[4/5] bg-white/5 rounded-3xl overflow-hidden border border-white/10 flex">
               <div className="w-1/2 h-full bg-[#4A773C]/20 border-r border-white/5 p-8 flex flex-col justify-between">
                  <div className="flex items-center gap-3">
                    <Sun className="text-white/40" size={20} />
                    <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-white/40">Staff Hours</span>
                  </div>
                  <div className="space-y-4">
                    <div className="w-full h-8 bg-white/10 rounded-sm" />
                    <div className="w-4/5 h-8 bg-white/10 rounded-sm" />
                    <div className="w-full h-8 bg-white/10 rounded-sm" />
                  </div>
                  <span className="font-mono text-[9px] text-[#4A773C] font-bold">SYSTEMATIC_CARE</span>
               </div>
               <div className="w-1/2 h-full bg-black/40 p-8 flex flex-col justify-between">
                  <div className="flex items-center gap-3">
                    <Moon className="text-white/40" size={20} />
                    <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-white/40">The Gap</span>
                  </div>
                  <div className="space-y-4 opacity-30 blur-[1px]">
                    <div className="w-full h-8 bg-red-600/20 rounded-sm" />
                    <div className="w-3/5 h-8 bg-red-600/20 rounded-sm" />
                    <div className="w-full h-4 bg-red-600/20 rounded-sm" />
                  </div>
                  <span className="font-mono text-[9px] text-[#F58220] font-bold animate-pulse">INFORMAL_CHAOS</span>
               </div>
               <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="p-4 bg-[#F58220] text-white font-mono text-[10px] font-black uppercase tracking-tighter rotate-[-5deg]">
                    Data_Loss_Risk_Level: CRITICAL
                  </div>
               </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto text-center space-y-12 py-24 border-y border-white/10">
            <p className="font-mono text-xs uppercase text-[#F58220] font-black tracking-widest">Core Inquiry</p>
            <h4 className="text-3xl md:text-5xl font-display font-black uppercase leading-tight">
              "How might we enable staff to ensure consistent, timely and reliable care without increasing manual workload or dependency on informal coordination?"
            </h4>
          </div>
        </div>
      </section>

      {/* 04. The Scholar’s Process (Research & Mapping) */}
      <section className="py-32 md:py-56 px-6 bg-[#FDFBF7]">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-24 flex items-center gap-8">
            <span className="text-[#4A773C] font-mono text-xs font-bold tracking-[0.5em] uppercase whitespace-nowrap">02 // RESEARCH & MAPPING</span>
            <div className="h-[1px] w-full bg-[#2E3192]/10" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
            <div className="p-12 bg-[#2E3192] text-white space-y-6">
              <span className="text-[#F58220] font-mono text-[10px] font-bold tracking-widest uppercase opacity-70">[ INSIGHT_01 ]</span>
              <h4 className="text-3xl font-display font-bold uppercase tracking-tight">Healthcare Burnout</h4>
              <p className="text-white/60 text-base leading-relaxed">High dependency on staff for all decisions creates cognitive overload. When staff leave at 6 PM, they carry the emotional and administrative weight of 'what if' concerns home.</p>
            </div>
            <div className="p-12 bg-white border border-[#2E3192]/5 space-y-6">
              <span className="text-[#4A773C] font-mono text-[10px] font-bold tracking-widest uppercase opacity-70">[ INSIGHT_02 ]</span>
              <h4 className="text-3xl font-display font-bold uppercase tracking-tight text-[#2E3192]">Data Management</h4>
              <p className="text-[#2E3192]/50 text-base leading-relaxed">Reliance on WhatsApp and physical logs leads to human error. Critical health change notifications are buried in social chats, making reactive care the only viable mode.</p>
            </div>
          </div>

          {/* Voices from the Field */}
          <div className="space-y-24 mb-56">
            <h5 className="font-mono text-xs font-black uppercase text-[#F58220] text-center tracking-[0.3em]">Voices from the Field</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
               <blockquote className="space-y-6">
                  <div className="w-12 h-1 bg-[#4A773C]" />
                  <p className="text-2xl font-serif italic text-[#2E3192] leading-tight">"After staff hours, it becomes difficult to monitor everything continuously. We worry for the children."</p>
                  <cite className="block font-mono text-[10px] uppercase font-bold text-[#2E3192]/40">— Centre Staff</cite>
               </blockquote>
               <blockquote className="space-y-6">
                  <div className="w-12 h-1 bg-[#F58220]" />
                  <p className="text-2xl font-serif italic text-[#2E3192] leading-tight">"At night, if fever spikes, I don't know who to call first. We just wait for the sun."</p>
                  <cite className="block font-mono text-[10px] uppercase font-bold text-[#2E3192]/40">— Parent Participant</cite>
               </blockquote>
               <blockquote className="space-y-6">
                  <div className="w-12 h-1 bg-[#2E3192]" />
                  <p className="text-2xl font-serif italic text-[#2E3192] leading-tight">"Managing logs is more work than caring for the child sometimes. It's too much data, not enough time."</p>
                  <cite className="block font-mono text-[10px] uppercase font-bold text-[#2E3192]/40">— Support Monitor</cite>
               </blockquote>
            </div>
          </div>

          {/* Journey Mapping Preview */}
          <div className="bg-[#2E3192] p-12 md:p-24 text-white relative overflow-hidden rounded-3xl">
            <div className="relative z-10 max-w-2xl">
              <span className="text-[#F58220] font-mono text-xs font-bold tracking-[0.5em] uppercase">Service Artifact_093</span>
              <h4 className="text-4xl md:text-5xl font-display font-medium tracking-tight uppercase mt-4 mb-12">Staff Daily Journey Mapping</h4>
              <p className="text-white/60 mb-12 leading-relaxed">
                Our ethnographic mapping revealed the intense overlap of <span className="text-[#F58220] font-bold">Managerial</span>, <span className="text-[#4A773C] font-bold">Emotional</span>, and <span className="text-white font-bold">Administrative</span> roles. Staff were not just working; they were tethering a fragmented system together.
              </p>
              
              <div className="space-y-4">
                 {[
                   { time: "09:00", task: "Administrative log review & handoff", roles: "Admin" },
                   { time: "13:00", task: "Direct family support & counseling", roles: "Emotional / Clinical" },
                   { time: "17:30", task: "Emergency prep for night shift", roles: "Managerial" },
                   { time: "18:00", task: "The Handoff: Information leakage prone", roles: "GAP_ZONE" }
                 ].map((step, idx) => (
                    <div key={idx} className="flex gap-8 group">
                      <span className="font-mono text-[10px] font-bold text-white/30 group-hover:text-[#F58220]">{step.time}</span>
                      <div className="flex-grow border-b border-white/10 pb-4 flex justify-between items-center">
                        <span className="text-sm font-medium">{step.task}</span>
                        <span className={idx === 3 ? "text-[#F58220] font-mono text-[9px] font-black" : "font-mono text-[9px] text-white/20 uppercase"}>[{step.roles}]</span>
                      </div>
                    </div>
                 ))}
              </div>
            </div>
            
            {/* Visual background abstract mapping */}
            <div className="absolute right-0 top-0 h-full w-1/3 bg-white/5 skew-x-[-15deg] translate-x-1/2" />
          </div>
        </div>
      </section>

      {/* 05. The Proposed Solution: SAHAAY System */}
      <section className="py-32 md:py-56 px-6 bg-white overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5 space-y-12">
              <span className="text-[#F58220] font-mono text-xs font-bold tracking-[0.5em] uppercase">03 // THE PROPOSED SYSTEM</span>
              <h2 className="text-5xl md:text-7xl font-display font-medium tracking-tightest uppercase text-[#2E3192]">The SAHAAY <br/> Care System</h2>
              <p className="text-lg text-[#2E3192]/60 leading-relaxed font-sans">
                Sahaay connects parents, night monitors, and daytime staff to ensure every concern is heard and followed through without delay.
              </p>
              
              {/* Feature List (Vertical expandable cards) */}
              <div className="space-y-4">
                {features.map((feature, i) => (
                  <motion.div 
                    key={i}
                    className="border border-[#2E3192]/5 bg-[#FDFBF7] p-6 hover:border-[#F58220]/20 transition-all cursor-pointer"
                    onClick={() => setActiveFeature(activeFeature === i ? null : i)}
                  >
                    <div className="flex justify-between items-center">
                       <div className="flex items-center gap-4">
                         {feature.icon}
                         <h5 className="font-display font-bold uppercase text-sm tracking-widest">{feature.title}</h5>
                       </div>
                       <ChevronRight className={`transition-transform duration-300 ${activeFeature === i ? 'rotate-90' : ''}`} size={16} />
                    </div>
                    {activeFeature === i && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        className="overflow-hidden"
                      >
                        <p className="mt-6 text-sm text-[#2E3192]/60 leading-relaxed pl-10 border-l border-[#F58220]/30 ml-2">
                          {feature.desc}
                        </p>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 bg-[#2E3192] p-12 md:p-20 text-white rounded-3xl relative">
              <h4 className="font-mono text-xs text-[#F58220] font-black uppercase mb-16 tracking-[0.3em]">The Response Cycle</h4>
              
              <div className="space-y-24 relative">
                 {/* Timeline Line */}
                 <div className="absolute left-[23px] top-0 bottom-0 w-[1px] bg-white/10" />

                 {[
                   { step: "01", actor: "Parent", msg: "Raises a fever concern via Sahaay App.", icon: <MessageSquare size={20}/> },
                   { step: "02", actor: "Monitor", msg: "Review protocol: Instructions provided for sponge bath.", icon: <ClipboardList size={20}/> },
                   { step: "03", actor: "Staff", msg: "Resolved: Log verified and child stabilized.", icon: <ShieldCheck size={20}/> }
                 ].map((node, i) => (
                   <div key={i} className="flex gap-12 items-start relative z-10">
                      <div className="w-12 h-12 bg-[#F58220] flex items-center justify-center rounded-full border-4 border-[#2E3192] text-white">
                        {node.icon}
                      </div>
                      <div className="space-y-2">
                        <span className="font-mono text-[9px] uppercase font-bold text-white/40">Step_{node.step} // {node.actor}</span>
                        <p className="text-xl font-display font-medium tracking-tight uppercase leading-none">{node.msg}</p>
                      </div>
                   </div>
                 ))}
              </div>
              
              <div className="mt-32 p-8 bg-white/5 border border-white/5 rounded-2xl flex items-center gap-6">
                <Activity className="text-[#4A773C]" size={32} />
                <div>
                   <p className="font-mono text-[10px] text-white/30 uppercase">System Status</p>
                   <p className="text-lg font-bold">LATENCY_REDUCED_BY_40%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 06. Technical Blueprinting */}
      <section className="py-32 md:py-56 px-6 bg-[#FDFBF7]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-stretch">
            <div className="lg:col-span-12 mb-24">
              <span className="text-[#4A773C] font-mono text-xs font-bold tracking-[0.5em] uppercase px-4 border-l border-[#4A773C]">04 // SERVICE_ARCHAEOLOGY</span>
              <h3 className="text-5xl md:text-7xl font-display font-medium tracking-tightest uppercase text-[#2E3192] mt-8">Technical Blueprinting</h3>
            </div>
            
            {/* Service Blueprint Representation */}
            <div className="lg:col-span-8 bg-white border border-[#2E3192]/5 p-8 md:p-16 rounded-3xl space-y-12 shadow-sm">
               <h4 className="text-xl font-bold uppercase tracking-widest text-[#2E3192]/40 border-b border-[#2E3192]/5 pb-6">Proposed Service Blueprint</h4>
               <div className="overflow-x-auto">
                 <div className="min-w-[800px] space-y-8">
                    {/* Swimlanes representation */}
                    {[
                      { lane: "Customer Actions", content: "Parent monitors symptom → Accesses Sahaay → Reports Incident" },
                      { lane: "Onstage Actions", content: "AI Guide provides immediate relief steps → System alerts Night Monitor" },
                      { lane: "Backstage Actions", content: "Night Monitor validates report → Incident escalated to Senior Supervisor" },
                      { lane: "Support Processes", content: "Log archived in Cloud Memory → Daytime staff notified for review" }
                    ].map((row, i) => (
                      <div key={i} className="grid grid-cols-4 gap-8 items-center border-b border-[#2E3192]/5 pb-6">
                        <div className="font-mono text-[10px] font-black uppercase text-[#F58220]">{row.lane}</div>
                        <div className="col-span-3 text-sm font-medium text-[#2E3192]/60 italic">{row.content}</div>
                      </div>
                    ))}
                 </div>
               </div>
               <p className="font-mono text-[9px] text-[#2E3192]/30 uppercase text-center italics mt-8">
                 Ref: Page 39 // St. Jude India Service Design Documentation
               </p>
            </div>

            {/* Value Flow Diagram Representation */}
            <div className="lg:col-span-4 bg-[#2E3192] text-white p-12 rounded-3xl flex flex-col justify-between">
               <div className="space-y-8">
                  <Share2 className="text-[#F58220]" size={40} />
                  <h4 className="text-2xl font-display font-medium uppercase tracking-tight">The Value Linkage</h4>
                  <p className="text-white/50 text-sm leading-relaxed">
                    SAHAAY acts as the central link, neutralizing information asymmetry between <span className="text-white font-bold">Clinical Staff</span>, <span className="text-white font-bold">Social Workers</span>, and <span className="text-white font-bold">Under-resourced Families</span>.
                  </p>
               </div>
               
               <div className="relative h-48 flex items-center justify-center">
                  <div className="w-24 h-24 bg-[#F58220] rounded-full flex items-center justify-center font-bold text-xs ring-8 ring-white/5">
                    SAHAAY
                  </div>
                  <div className="absolute top-0 right-0 p-3 bg-white/10 rounded-lg text-[9px] font-mono">STAFF</div>
                  <div className="absolute bottom-0 right-10 p-3 bg-white/10 rounded-lg text-[9px] font-mono">PARENTS</div>
                  <div className="absolute bottom-10 left-0 p-3 bg-white/10 rounded-lg text-[9px] font-mono">ADMIN</div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 07. Impact & Results */}
      <section className="bg-white py-32 md:py-56 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-32">
             <span className="text-[#4A773C] font-mono text-xs font-bold tracking-[0.5em] uppercase">05 // OUTCOMES & METRICS</span>
             <h2 className="text-5xl md:text-9xl font-display font-black tracking-tightest uppercase text-[#2E3192] mt-12">Care Delivered.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { title: "System Impact", label: "Integrated Care", desc: "Dissolved the 'Night Gap' through established, codified support architecture." },
              { title: "Operational Impact", label: "Faster Response", desc: "40% reduction in response latency for high-risk fever spikes." },
              { title: "Behavioral Impact", label: "Parent Empowerment", desc: "Self-correction during minor incidents reduced center-wide panic levels." },
              { title: "Safety Protocol", label: "Panic Reduction", desc: "Centralized logs removed individual liability fears from ground-level monitors." }
            ].map((metric, i) => (
              <div key={i} className="space-y-6 group">
                <div className="h-1 w-full bg-[#2E3192]/5 group-hover:bg-[#F58220] transition-colors duration-500" />
                <div className="space-y-2">
                  <h5 className="font-mono text-[9px] font-black uppercase text-[#2E3192]/40 tracking-widest">{metric.title}</h5>
                  <p className="text-xl font-display font-bold uppercase leading-tight">{metric.label}</p>
                </div>
                <p className="text-sm text-[#2E3192]/60 leading-relaxed italic">{metric.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 08. Future Scope & Reboot */}
      <section className="bg-[#4A773C] text-white py-32 md:py-56 px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-16 relative z-10">
          <Lightbulb className="mx-auto text-white/40" size={60} />
          <h2 className="text-4xl md:text-6xl font-display font-medium uppercase tracking-tightest">Future Scope // <br/> Scalability</h2>
          <p className="text-xl md:text-2xl font-sans font-light leading-relaxed text-indigo-50/80">
            Beyond St. Jude India, the SAHAAY logic is built for scalability. We envision integration with hospital data systems for <span className="font-bold text-white uppercase italic">predictive diagnostics</span> and real-time triage in other high-risk pediatric contexts.
          </p>
          
          <div className="pt-24">
            <Link 
              to="/"
              className="px-12 py-5 bg-[#F58220] hover:bg-white hover:text-[#F58220] transition-all duration-500 font-display font-black uppercase tracking-widest text-sm inline-block"
            >
              REBOOT SYSTEM
            </Link>
          </div>
        </div>
        
        {/* Abstract pattern background */}
        <div className="absolute inset-x-0 bottom-0 top-1/2 opacity-10 pointer-events-none">
           <div className="w-full h-full flex flex-wrap">
              {[...Array(100)].map((_, i) => (
                <div key={i} className="w-10 h-10 border border-white/20 transform rotate-45" />
              ))}
           </div>
        </div>
      </section>

      {/* Navigation Footer */}
      <footer className="py-24 px-6 border-t border-[#2E3192]/10 bg-[#FDFBF7]">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center">
          <Link to="/" className="group flex items-center gap-4">
             <div className="w-12 h-12 bg-[#2E3192] text-white flex items-center justify-center rounded-full group-hover:bg-[#F58220] transition-colors">
               <ArrowLeft size={18} />
             </div>
             <span className="font-display font-bold uppercase tracking-widest text-sm text-[#2E3192]">Back to Portfolio</span>
          </Link>
          
          <div className="flex flex-col items-end">
             <span className="font-mono text-[10px] text-[#2E3192]/40 uppercase mb-2">Adjacent Research</span>
             <Link to="/project/subsense" className="text-2xl md:text-4xl font-display font-bold uppercase hover:text-[#F58220] transition-colors flex items-center gap-4 text-[#2E3192]">
               Subsense <ChevronRight size={24} className="text-[#F58220]" />
             </Link>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}
