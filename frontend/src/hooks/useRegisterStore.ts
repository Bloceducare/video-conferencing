import { meetingCards } from '@/components/Dashboard/Students';
import { MeetingCardType } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface RegisterState {
  data: MeetingCardType[];
  setData: (data: MeetingCardType[]) => void;
}

const useRegisterStore = create<RegisterState>()(
  persist(
    (set) => ({
      data: meetingCards,
      setData: (data) => set(() => ({ data })),
    }),
    {
      name: 'register',
    }
  )
);

export default useRegisterStore;

// https://docs.pmnd.rs/zustand/integrations/persisting-store-data
