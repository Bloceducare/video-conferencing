import { MeetingCardType, CreateRoomType } from '@/types';
import { createStore } from 'zustand';

interface MeetingCardStore {
  meetingCardData: MeetingCardType[];
  setMeetingCardData: (data: MeetingCardType[]) => void;
}

interface CreateRoomStore {
  createRoomData: CreateRoomType;
  setCreateRoomData: (data: CreateRoomType) => void;
}

interface TokenStore {
  token: string;
  setToken: (token: string) => void;
}

export const useMeetingCardStore = createStore<MeetingCardStore>((set) => ({
  meetingCardData: [],
  setMeetingCardData: (data: MeetingCardType[]) => set({ meetingCardData: data }),
}));

export const useTokenStore = createStore<TokenStore>((set) => ({
  token: '',
  setToken: (token: string) => set({ token }),
}));

export const useCreateRoomStore = createStore<CreateRoomStore>((set) => ({
  createRoomData: {
    roomName: '',
    duration: 0,
  },
  setCreateRoomData: (data: CreateRoomType) => set({ createRoomData: data }),
}));
