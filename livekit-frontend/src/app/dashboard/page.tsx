'use client';
import { useMeetingCardStore } from '@/hooks/useAPIStore';
import useAxios from '@/hooks/useAxios';
import { MeetingCardType } from '@/types';
import Student from './student';

const MeetingCards = () => {
  const { setMeetingCardData } = useMeetingCardStore.getState();
  const { data, error, isLoading } = useAxios('https://w3bvc.onrender.com/v1/livekit/room', 'get', {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!isLoading) {
    setMeetingCardData(data as MeetingCardType[]);
  }
  return (
    <>
      <Student />
    </>
  );
};

export default MeetingCards;
