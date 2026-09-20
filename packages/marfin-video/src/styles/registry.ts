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
      'Photographic cutouts, paper/grain texture, bold editorial typography, geometric layers, fast stagger, overshoot, slight rotation, and subtle camera push.',
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
