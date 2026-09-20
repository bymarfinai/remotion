export type MarfinStyle = {
  id: string;
  displayName: string;
  aliases: string[];
  summary: string;
  guidePath: string;
};

export const STYLE_REGISTRY: MarfinStyle[] = [
  {
    id: 'kinetic-editorial-collage',
    displayName: 'Kinetic Editorial Collage',
    aliases: ['KEC', 'editorial collage', 'cutout collage', 'magazine collage'],
    summary:
      'Layered editorial collage motion using generated/photo cutouts, contextual imagery, distressed paper texture, bold native typography, cobalt/orange graphic masses, warm-ivory paper labels, staggered entrances, overshoot, and subtle camera movement.',
    guidePath: 'styles/kinetic-editorial-collage/STYLE.md',
  },
];

const normalize = (value: string) =>
  value.trim().toLowerCase().replace(/[\s_]+/g, '-');

export const findStyle = (query: string): MarfinStyle | undefined => {
  const normalizedQuery = normalize(query);

  return STYLE_REGISTRY.find((style) => {
    if (normalize(style.id) === normalizedQuery) {
      return true;
    }

    if (normalize(style.displayName) === normalizedQuery) {
      return true;
    }

    return style.aliases.some((alias) => normalize(alias) === normalizedQuery);
  });
};
