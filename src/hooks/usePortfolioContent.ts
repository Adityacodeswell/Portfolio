import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

// --- Fallback maps (used if Supabase is unreachable) ---

export const IMAGE_FALLBACK: Record<string, string> = {
  about_portrait: '/src/assets/images/regenerated_image_1778344958042.jpg',
  project_trackle_thumb: '/src/assets/images/regenerated_image_1778344053752.png',
  project_kiln_thumb: '/src/assets/images/regenerated_image_1778344061039.png',
  project_subsense_thumb: '/src/assets/images/regenerated_image_1778344070862.png',
  project_sahaay_thumb: '/src/assets/images/regenerated_image_1778344066159.png',
  beyond_01_wrestling: '/src/assets/images/regenerated_image_1778344968402.jpg',
  beyond_02_training: '/src/assets/images/regenerated_image_1778347015252.jpg',
  beyond_03_exhibitions: '/src/assets/images/regenerated_image_1778344976693.jpg',
  beyond_04_storytelling: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=1200',
  beyond_05_observation: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200',
  trackle_hero: '/src/assets/images/regenerated_image_1778344061039.png',
  trackle_research_01: '/src/assets/images/regenerated_image_1778344066159.png',
  trackle_research_02: '/src/assets/images/regenerated_image_1778344070862.png',
  trackle_skeletal: '/src/assets/images/regenerated_image_1778344970037.png',
  kiln_hero: 'https://images.unsplash.com/photo-1590644365607-1c5a519a9a37?q=80&w=1600',
  sahaay_hero: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=2000',
};

export const CONTENT_FALLBACK: Record<string, string> = {
  social_linkedin: 'https://linkedin.com/in/your-handle',
  social_instagram: 'https://instagram.com/your-handle',
  social_behance: 'https://behance.net/your-handle',
  contact_email: 'aditya.kumar1@nift.ac.in',
  project_trackle_behance: 'https://behance.net',
  project_kiln_behance: 'https://behance.net',
  project_sahaay_behance: 'https://behance.net',
  project_subsense_behance: 'https://behance.net',
  hero_status: 'RESEARCHING',
  hero_location: 'MUMBAI, IN',
  hero_focus: 'Culture × Design × Technology',
  hero_bio: 'I try intersecting design, research and technology into meaningful experiences. My work explores how technology can compliment, and evolve human knowledge.',
  about_institution: 'NIFT Mumbai',
  about_focus: 'Design Research',
  footer_tagline: "Let's Build the \nIntersection.",
};

export type ContentMap = Record<string, string>;

export function usePortfolioContent() {
  const [images, setImages] = useState<ContentMap>(IMAGE_FALLBACK);
  const [content, setContent] = useState<ContentMap>(CONTENT_FALLBACK);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [imgRes, contentRes] = await Promise.all([
          supabase.from('portfolio_images').select('id, url'),
          supabase.from('portfolio_content').select('id, value'),
        ]);

        if (imgRes.data && imgRes.data.length > 0) {
          const map = { ...IMAGE_FALLBACK };
          imgRes.data.forEach((row: { id: string; url: string }) => {
            map[row.id] = row.url;
          });
          setImages(map);
        }

        if (contentRes.data && contentRes.data.length > 0) {
          const map = { ...CONTENT_FALLBACK };
          contentRes.data.forEach((row: { id: string; value: string }) => {
            map[row.id] = row.value;
          });
          setContent(map);
        }
      } catch (error) {
        console.error('Error fetching portfolio content:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const img = (id: string) => images[id] ?? IMAGE_FALLBACK[id] ?? '';
  const txt = (id: string) => content[id] ?? CONTENT_FALLBACK[id] ?? '';

  return { images, content, img, txt, loading };
}
