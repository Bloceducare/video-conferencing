export type MeetingCardType = {
  title: string;
  cohort: string;
  room: string;
  description: string;
  image: string;
  link: string;
};

export type RegularPage = {
  frontmatter: {
    title: string;
    image?: string;
    description?: string;
    meta_title?: string;
    layout?: string;
    draft?: boolean;
  };
  content: string;
  slug?: string;
};

export type Button = {
  enable: boolean;
  label: string;
  link: string;
};
