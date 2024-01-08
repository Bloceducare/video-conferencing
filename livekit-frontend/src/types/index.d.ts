export type MeetingCardType = {
  sid: string;
  name: string;
  emptyTimeout: number;
  maxParticipants: number;
  creationTime: number;
  turnPassword: string;
  enabledCodecs: {
    mime: string;
    fmtpLine: string;
  }[];
  metadata: string;
  numParticipants: number;
  numPublishers: number;
  activeRecording: boolean;
};

export type CreateRoomType = {
  roomName: string;
  duration: number;
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
