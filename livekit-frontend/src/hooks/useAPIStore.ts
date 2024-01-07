import { MeetingCardType } from '@/types';
import { createStore} from 'zustand';

interface MeetingCardStore {
  meetingCardData: MeetingCardType[];
  setMeetingCardData: (data: MeetingCardType[]) => void;
}

export const useMeetingCardStore = createStore<MeetingCardStore>((set) => ({
  meetingCardData: [],
  setMeetingCardData: (data: MeetingCardType[]) => set({ meetingCardData: data }),
}));
