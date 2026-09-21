export type VideoStyleDefinition = {
  number: string;
  id: string;
  shortCode: string;
  displayName: string;
  category: string;
  aliases: string[];
  description: string;
};

export const VIDEO_STYLE_REGISTRY: VideoStyleDefinition[] = [
  {
    number: '001',
    id: 'kinetic-editorial-collage',
    shortCode: 'KEC',
    displayName: 'Kinetic Editorial Collage',
    category: 'Editorial Collage',
    aliases: [
      'KEC',
      'editorial collage',
      'cutout collage',
      'magazine collage',
    ],
    description:
      'Layered generated/photo cutouts, contextual collage imagery, distressed charcoal/paper texture, warm-ivory labels, bold native typography, cobalt/orange graphic masses, fast stagger, overshoot, slight rotation, and subtle camera push.',
  },
  {
    number: '002',
    id: 'editorial-infographic-motion',
    shortCode: 'EIM',
    displayName: 'Editorial Infographic Motion',
    category: 'Editorial Infographic',
    aliases: [
      'EIM',
      'editorial infographic',
      'infographic motion',
      'clean editorial motion',
    ],
    description:
      'Clean editorial explainer motion using ivory cards, navy/blue typography, circular masks, curved paths, markers, segmented bars, restrained cutouts, and sequential information reveals.',
  },
];

export const getVideoStyle = (query: string) => {
  const normalized = query.trim().toLowerCase().replace(/[\s_]+/g, '-');

  return VIDEO_STYLE_REGISTRY.find((style) => {
    const candidates = [
      style.id,
      style.shortCode,
      style.displayName,
      ...style.aliases,
    ].map((value) => value.trim().toLowerCase().replace(/[\s_]+/g, '-'));

    return candidates.includes(normalized);
  });
};
