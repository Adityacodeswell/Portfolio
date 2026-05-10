export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  year: string;
  image: string;
  video: string;
  metadata: {
    role: string;
    timeline: string;
    tools: string;
    location: string;
  };
  content: {
    friction: string;
    logic: string;
    impact: string;
  };
  gallery: string[];
}

export const projects: Project[] = [
  {
    id: '01',
    slug: 'trackle',
    title: 'TRACKLE',
    category: 'Community-led Research / AI / Motion Tracking',
    year: '2025',
    image: '/assets/images/regenerated_image_1778405244621.png',
    video: 'https://cdn.pixabay.com/video/2024/05/13/211751-942621743_tiny.mp4',
    metadata: {
      role: 'Lead Design Researcher',
      timeline: '8 Months',
      tools: 'OpenCV, MediaPipe, Python, Arduino',
      location: 'Western Maharashtra, India'
    },
    content: {
      friction: 'Traditional wrestling practitioners (Kushti) lack technical feedback systems that respect their cultural context and physical environment (mud-based arenas).',
      logic: 'Developing a non-invasive computer vision system that decodes technical maneuvers without the need for wearable sensors which interfere with the sport\'s physical mechanics.',
      impact: 'A functional tracking prototype that allows coaches to analyze technical precision while maintaining the sanctity of the mud arena.'
    },
    gallery: [
      'https://images.unsplash.com/photo-1551135049-8a33b5883817?q=80&w=1200',
      'https://images.unsplash.com/photo-1594911772125-07fc7a2d8d9f?q=80&w=1200',
      'https://images.unsplash.com/photo-1532187643603-ba119ca4109e?q=80&w=1200'
    ]
  },
  {
    id: '02',
    slug: 'eco-smart-kiln',
    title: 'ECO-SMART KILN',
    category: 'Design for human and environment',
    year: '2025',
    image: '/assets/images/regenerated_image_1778344061039.png',
    video: 'https://cdn.pixabay.com/video/2022/10/21/135905-763428133_tiny.mp4',
    metadata: {
      role: 'System Designer',
      timeline: '6 Months',
      tools: 'IoT Sensors, Thermal Imaging, SolidWorks',
      location: 'Gujarat, India'
    },
    content: {
      friction: 'Small-scale ceramic potters face high fuel costs and inconsistent firing results due to lack of visibility into thermal gradients within traditional kilns.',
      logic: 'Applying thermal sensor arrays and cloud-based data visualization to provide real-time firing feedback, enabling optimized fuel consumption.',
      impact: '20% reduction in fuel consumption and 15% increase in product yield for rural artisans.'
    },
    gallery: [
      'https://images.unsplash.com/photo-1493106819501-66d381c466f1?q=80&w=1200',
      'https://images.unsplash.com/photo-1621252179027-94459d278660?q=80&w=1200'
    ]
  },
  {
    id: '03',
    slug: 'subsense',
    title: 'Subsense',
    category: 'Interface-UI/UX',
    year: '2026',
    image: '/assets/images/regenerated_image_1778405257189.png',
    video: 'https://cdn.pixabay.com/video/2021/11/14/95671-645856161_tiny.mp4',
    metadata: {
      role: 'UI/UX Designer',
      timeline: 'Ongoing',
      tools: 'Figma, React, Three.js, shaders',
      location: 'Remote / NIFT Mumbai'
    },
    content: {
      friction: 'Digital interfaces often lack the haptic and sensory depth of physical interactions, leading to a disconnected experience in complex data manipulation.',
      logic: 'Researching multi-modal feedback loops through generative visuals and adaptive interface states that respond to fine motor behaviors.',
      impact: 'A fluid, predictive interface system that reduces cognitive load during high-density data analysis.'
    },
    gallery: [
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200',
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200'
    ]
  },
  {
    id: '04',
    slug: 'sahaay',
    title: 'SAHAAY',
    category: 'Service Design',
    year: '2026',
    image: '/assets/images/regenerated_image_1778405268648.png',
    video: 'https://cdn.pixabay.com/video/2018/06/07/16664-275135689_tiny.mp4',
    metadata: {
      role: 'Service Designer',
      timeline: '1 Year',
      tools: 'Service Blueprinting, Stakeholder Mapping, Ethnography',
      location: 'Mumbai, India'
    },
    content: {
      friction: 'Fragmented communication between healthcare providers and field workers in urban slums creates critical delays in maternal health interventions.',
      logic: 'Mapping existing behavioral patterns to design a streamlined communication protocol that leverages established trust networks.',
      impact: 'Improved intervention response times and a clearer roadmap for long-term health outcomes in underserved communities.'
    },
    gallery: [
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1200',
      'https://images.unsplash.com/photo-1584483766114-2cea6facdf57?q=80&w=1200'
    ]
  }
];
