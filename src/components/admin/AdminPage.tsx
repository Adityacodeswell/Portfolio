/// <reference types="vite/client" />
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LogOut, 
  Upload, 
  Link as LinkIcon, 
  Save, 
  Image as ImageIcon, 
  Type, 
  CheckCircle2, 
  AlertCircle,
  Loader2,
  ChevronRight,
  Plus
} from 'lucide-react';
import { supabaseAdmin } from '../../lib/supabase';

// --- Configuration ---

const IMAGE_SLOTS = [
  { id: 'about_portrait', label: 'About — Portrait Photo', section: 'About' },
  { id: 'project_trackle_thumb', label: 'Trackle — Thumbnail', section: 'Projects' },
  { id: 'project_kiln_thumb', label: 'Eco-Smart Kiln — Thumbnail', section: 'Projects' },
  { id: 'project_subsense_thumb', label: 'Subsense — Thumbnail', section: 'Projects' },
  { id: 'project_sahaay_thumb', label: 'Sahaay — Thumbnail', section: 'Projects' },
  { id: 'beyond_01_wrestling', label: 'Beyond — Wrestling', section: 'Beyond' },
  { id: 'beyond_02_training', label: 'Beyond — Training', section: 'Beyond' },
  { id: 'beyond_03_exhibitions', label: 'Beyond — Exhibitions', section: 'Beyond' },
  { id: 'beyond_04_storytelling', label: 'Beyond — Storytelling', section: 'Beyond' },
  { id: 'beyond_05_observation', label: 'Beyond — Observation', section: 'Beyond' },
  { id: 'trackle_hero', label: 'Trackle — Hero/Identity image', section: 'Trackle' },
  { id: 'trackle_research_01', label: 'Trackle — Research image 1', section: 'Trackle' },
  { id: 'trackle_research_02', label: 'Trackle — Research image 2', section: 'Trackle' },
  { id: 'trackle_skeletal', label: 'Trackle — Skeletal mesh analysis', section: 'Trackle' },
  { id: 'kiln_hero', label: 'Eco-Smart Kiln — Hero render', section: 'Eco-Smart Kiln' },
  { id: 'sahaay_hero', label: 'Sahaay — Hero background', section: 'Sahaay' },
];

const CONTENT_SLOTS = [
  { id: 'social_linkedin', label: 'LinkedIn URL', section: 'Footer', type: 'url' },
  { id: 'social_instagram', label: 'Instagram URL', section: 'Footer', type: 'url' },
  { id: 'social_behance', label: 'Behance URL', section: 'Footer', type: 'url' },
  { id: 'contact_email', label: 'Contact Email', section: 'Footer', type: 'email' },
  { id: 'project_trackle_behance', label: 'Trackle Behance', section: 'Projects', type: 'url' },
  { id: 'project_kiln_behance', label: 'Kiln Behance', section: 'Projects', type: 'url' },
  { id: 'project_sahaay_behance', label: 'Sahaay Behance', section: 'Projects', type: 'url' },
  { id: 'project_subsense_behance', label: 'Subsense Behance', section: 'Projects', type: 'url' },
  { id: 'hero_status', label: 'Hero Status Label', section: 'Hero', type: 'text' },
  { id: 'hero_location', label: 'Hero Location', section: 'Hero', type: 'text' },
  { id: 'hero_focus', label: 'Hero Focus', section: 'Hero', type: 'text' },
  { id: 'hero_bio', label: 'Hero Bio (Long)', section: 'Hero', type: 'textarea' },
  { id: 'about_institution', label: 'About Institution', section: 'About', type: 'text' },
  { id: 'about_focus', label: 'About Focus', section: 'About', type: 'text' },
];

// --- Sub-components ---

const Toast = ({ message, type, onComplete }: { message: string, type: 'success' | 'error', onComplete: () => void, key?: React.Key }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, x: 20 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className={`fixed top-8 right-8 z-[100] flex items-center gap-3 px-6 py-4 border font-mono text-xs uppercase tracking-widest shadow-2xl backdrop-blur-xl ${
        type === 'success' ? 'bg-accent/10 border-accent text-accent' : 'bg-red-500/10 border-red-500 text-red-500'
      }`}
    >
      {type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
      <span>[ {type === 'success' ? 'SAVED' : 'ERROR'} // {message} ]</span>
    </motion.div>
  );
};

// --- Main Component ---

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [activeTab, setActiveTab] = useState<'IMAGES' | 'CONTENT'>('IMAGES');
  const [activeFilter, setActiveFilter] = useState('All');
  
  const [imagesData, setImagesData] = useState<Record<string, string>>({});
  const [contentData, setContentData] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState<string | null>(null);
  const [toasts, setToasts] = useState<{ id: number, message: string, type: 'success' | 'error' }[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingSlot, setUploadingSlot] = useState<string | null>(null);

  // Authentication check
  useEffect(() => {
    const sessionAuth = sessionStorage.getItem('portfolio_admin_auth');
    if (sessionAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch initial data
  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [imgRes, contentRes] = await Promise.all([
        supabaseAdmin.from('portfolio_images').select('id, url'),
        supabaseAdmin.from('portfolio_content').select('id, value'),
      ]);

      if (imgRes.data) {
        const map: Record<string, string> = {};
        imgRes.data.forEach(row => { map[row.id] = row.url; });
        setImagesData(map);
      }
      if (contentRes.data) {
        const map: Record<string, string> = {};
        contentRes.data.forEach(row => { map[row.id] = row.value; });
        setContentData(map);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      addToast('OPERATION_FAILED', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === import.meta.env.VITE_ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('portfolio_admin_auth', 'true');
      setLoginError(false);
    } else {
      setLoginError(true);
      setTimeout(() => setLoginError(false), 2000);
    }
  };

  const addToast = (message: string, type: 'success' | 'error') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const handleUpdateImage = async (id: string, url: string) => {
    setIsSaving(id);
    try {
      const { error } = await supabaseAdmin
        .from('portfolio_images')
        .upsert({ id, url, updated_at: new Date().toISOString() });
      
      if (error) throw error;
      
      setImagesData(prev => ({ ...prev, [id]: url }));
      addToast('IMAGE_UPDATED', 'success');
    } catch (err) {
      console.error('Error updating image:', err);
      addToast('OPERATION_FAILED', 'error');
    } finally {
      setIsSaving(null);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingSlot(id);
    setIsSaving(id);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'portfolio_uploads');

      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.secure_url) {
        await handleUpdateImage(id, data.secure_url);
      } else {
        throw new Error('Cloudinary upload failed');
      }
    } catch (err) {
      console.error('Upload error:', err);
      addToast('UPLOAD_FAILED', 'error');
    } finally {
      setUploadingSlot(null);
      setIsSaving(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleUpdateContent = async (id: string, value: string) => {
    setIsSaving(id);
    try {
      const { error } = await supabaseAdmin
        .from('portfolio_content')
        .upsert({ id, value, updated_at: new Date().toISOString() });
      
      if (error) throw error;
      
      setContentData(prev => ({ ...prev, [id]: value }));
      addToast('CONTENT_UPDATED', 'success');
    } catch (err) {
      console.error('Error updating content:', err);
      addToast('OPERATION_FAILED', 'error');
    } finally {
      setIsSaving(null);
    }
  };

  // --- Filtering ---

  const sections = Array.from(new Set([
    'All',
    ...(activeTab === 'IMAGES' 
      ? IMAGE_SLOTS.map(s => s.section) 
      : CONTENT_SLOTS.map(s => s.section))
  ]));

  const filteredImageSlots = activeFilter === 'All' 
    ? IMAGE_SLOTS 
    : IMAGE_SLOTS.filter(s => s.section === activeFilter);

  const filteredContentSlots = activeFilter === 'All' 
    ? CONTENT_SLOTS 
    : CONTENT_SLOTS.filter(s => s.section === activeFilter);

  // --- Render Login ---

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-ink flex items-center justify-center p-6 font-sans">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-sm"
        >
          <div className="mb-12 text-center pointer-events-none">
            <h1 className="text-4xl font-display font-black text-bg tracking-tighter uppercase mb-2">Admin Login</h1>
            <p className="font-mono text-[10px] text-white/40 uppercase tracking-[0.2em]">[ PORTFOLIO_MGMT_SYSTEM ]</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="font-mono text-[9px] text-accent uppercase font-bold tracking-widest block px-1">Access Protocol</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="PASSWORD_REQUIRED"
                className={`w-full bg-white/5 border ${loginError ? 'border-red-500 animate-shake' : 'border-white/10'} text-white font-mono text-sm px-6 py-4 focus:outline-none focus:border-accent transition-all`}
                autoFocus
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-accent text-white font-mono text-xs uppercase tracking-[0.2em] py-5 font-black hover:bg-white hover:text-ink transition-all duration-300 transform active:scale-[0.98]"
            >
              Initialize Dashboard
            </button>
          </form>

          {loginError && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mt-6 font-mono text-[9px] text-red-500 uppercase font-black"
            >
              [ ALERT // INCORRECT_PASSWORD ]
            </motion.p>
          )}
        </motion.div>
      </div>
    );
  }

  // --- Render Dashboard ---

  return (
    <div className="min-h-screen bg-ink text-bg font-sans selection:bg-accent selection:text-white">
      {/* Notifications */}
      <AnimatePresence>
        {toasts.map(toast => (
          <Toast 
            key={toast.id} 
            message={toast.message} 
            type={toast.type} 
            onComplete={() => setToasts(prev => prev.filter(t => t.id !== toast.id))} 
          />
        ))}
      </AnimatePresence>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-ink/80 backdrop-blur-xl border-b border-white/5 px-8 py-6 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <div className="bg-accent p-2">
            <ImageIcon size={18} className="text-white" />
          </div>
          <div>
            <h2 className="font-display font-black text-xl uppercase tracking-tighter">Admin</h2>
            <p className="font-mono text-[9px] text-accent font-black uppercase tracking-widest leading-none mt-1">
              [ STYESTEM_READY // LIVE_CONTENT ]
            </p>
          </div>
        </div>

        <nav className="hidden md:flex items-center bg-white/5 p-1 rounded-sm border border-white/10">
          <button 
            onClick={() => { setActiveTab('IMAGES'); setActiveFilter('All'); }}
            className={`px-8 py-2 font-mono text-[10px] uppercase font-black tracking-widest transition-all ${activeTab === 'IMAGES' ? 'bg-accent text-white' : 'text-white/40 hover:text-white'}`}
          >
            Images
          </button>
          <button 
            onClick={() => { setActiveTab('CONTENT'); setActiveFilter('All'); }}
            className={`px-8 py-2 font-mono text-[10px] uppercase font-black tracking-widest transition-all ${activeTab === 'CONTENT' ? 'bg-accent text-white' : 'text-white/40 hover:text-white'}`}
          >
            Links & Text
          </button>
        </nav>

        <button 
          onClick={() => { sessionStorage.removeItem('portfolio_admin_auth'); setIsAuthenticated(false); }}
          className="flex items-center gap-3 font-mono text-[10px] uppercase font-black tracking-widest text-white/40 hover:text-accent transition-colors"
        >
          Logout <LogOut size={14} />
        </button>
      </header>

      <main className="max-w-[1400px] mx-auto p-8 pt-12">
        {/* Filters bar */}
        <div className="flex flex-wrap items-center gap-2 mb-12">
          <span className="font-mono text-[9px] text-white/20 uppercase font-black tracking-widest mr-4">Filter By Space:</span>
          {sections.map(section => (
            <button
              key={section}
              onClick={() => setActiveFilter(section)}
              className={`px-4 py-1.5 font-mono text-[9px] uppercase font-black tracking-widest border transition-all ${
                activeFilter === section 
                ? 'bg-white text-ink border-white' 
                : 'border-white/10 text-white/40 hover:border-white/40 hover:text-white'
              }`}
            >
              {section}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="h-[400px] flex flex-col items-center justify-center gap-6">
            <Loader2 size={40} className="text-accent animate-spin" />
            <p className="font-mono text-[10px] text-white/40 uppercase tracking-[0.3em] font-black">Decrypting Portfolio Data...</p>
          </div>
        ) : (
          <div className="space-y-24">
            {activeTab === 'IMAGES' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredImageSlots.map(slot => (
                  <div key={slot.id} className="group flex flex-col bg-white/2 p-6 border border-white/5 hover:border-white/20 transition-all duration-500">
                    <div className="relative aspect-video bg-black/40 overflow-hidden mb-6">
                      <img 
                        src={imagesData[slot.id] || `https://placehold.co/400x225/1A1A1B/F9F9F9?text=${slot.id}`} 
                        alt={slot.label} 
                        className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${isSaving === slot.id ? 'opacity-40 animate-pulse' : 'opacity-80 group-hover:opacity-100'}`}
                      />
                      {isSaving === slot.id && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Loader2 size={32} className="text-accent animate-spin" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 flex flex-col">
                      <div className="flex items-start justify-between mb-4">
                        <div className="space-y-1">
                          <p className="font-mono text-[9px] text-accent font-black uppercase tracking-widest">{slot.section}</p>
                          <h3 className="font-display font-bold text-lg uppercase tracking-tight">{slot.label}</h3>
                        </div>
                      </div>

                      <div className="mt-auto pt-6 flex gap-3 border-t border-white/5">
                        <button 
                          onClick={() => { setUploadingSlot(slot.id); fileInputRef.current?.click(); }}
                          className="flex-1 flex items-center justify-center gap-3 bg-white/5 border border-white/10 py-3 font-mono text-[10px] font-black uppercase tracking-widest hover:bg-accent hover:text-white hover:border-accent transition-all"
                        >
                          <Upload size={14} /> Upload
                        </button>
                        <button 
                          onClick={() => {
                            const url = prompt('PASTE_IMAGE_URL');
                            if (url) handleUpdateImage(slot.id, url);
                          }}
                          className="flex-1 flex items-center justify-center gap-3 bg-white/5 border border-white/10 py-3 font-mono text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-ink transition-all"
                        >
                          <LinkIcon size={14} /> Link
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
                {filteredContentSlots.map(slot => (
                  <div key={slot.id} className="group bg-white/2 p-10 border border-white/5 hover:border-white/20 transition-all duration-500">
                    <div className="flex items-center justify-between mb-8">
                       <div className="space-y-1">
                          <p className="font-mono text-[9px] text-accent font-black uppercase tracking-widest">{slot.section}</p>
                          <h3 className="font-display font-bold text-xl uppercase tracking-tight">{slot.label}</h3>
                       </div>
                       <div className="font-mono text-[9px] text-white/20 uppercase font-black">ID: {slot.id}</div>
                    </div>

                    <div className="space-y-6">
                      {slot.type === 'textarea' ? (
                        <textarea 
                          defaultValue={contentData[slot.id] || ''}
                          onBlur={(e) => handleUpdateContent(slot.id, e.target.value)}
                          placeholder={`Enter ${slot.label.toLowerCase()}...`}
                          rows={4}
                          className="w-full bg-white/5 border border-white/10 text-white font-mono text-sm px-6 py-5 focus:outline-none focus:border-accent resize-none transition-all"
                        />
                      ) : (
                        <div className="relative group">
                          <input 
                            type={slot.type}
                            defaultValue={contentData[slot.id] || ''}
                            onBlur={(e) => handleUpdateContent(slot.id, e.target.value)}
                            placeholder={`Enter ${slot.label.toLowerCase()}...`}
                            className="w-full bg-white/5 border border-white/10 text-white font-mono text-sm px-6 py-5 focus:outline-none focus:border-accent transition-all"
                          />
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/10 group-focus-within:text-accent transition-colors">
                            {slot.type === 'url' ? <LinkIcon size={16} /> : slot.type === 'email' ? <Plus size={16} /> : <Type size={16} />}
                          </div>
                        </div>
                      )}
                      
                      <div className="flex justify-end">
                        <button 
                          onClick={(e) => {
                            const input = (e.currentTarget.parentElement?.previousElementSibling as any)?.querySelector('input, textarea');
                            if (input) handleUpdateContent(slot.id, input.value);
                          }}
                          className={`flex items-center gap-3 px-8 py-3 font-mono text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
                            isSaving === slot.id ? 'bg-white/10 text-white/40 cursor-wait' : 'bg-accent text-white hover:bg-white hover:text-ink'
                          }`}
                        >
                          {isSaving === slot.id ? <Loader2 size={12} className="animate-spin" /> : <Save size={12} />}
                          {isSaving === slot.id ? 'SAVING...' : 'SAVE_CHANGES'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Global hidden file input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={(e) => uploadingSlot && handleFileUpload(e, uploadingSlot)}
        className="hidden" 
        accept="image/*"
      />

      <footer className="mt-32 p-24 border-t border-white/5 text-center">
         <p className="font-display font-black text-6xl md:text-8xl text-transparent uppercase opacity-5 select-none" style={{ WebkitTextStroke: '1px white' }}>
           Control Panel
         </p>
         <div className="mt-8 font-mono text-[9px] text-white/20 uppercase tracking-[0.5em]">
           System Access // Secured // 2026
         </div>
      </footer>
    </div>
  );
}
