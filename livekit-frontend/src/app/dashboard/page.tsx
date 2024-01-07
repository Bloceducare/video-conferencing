'use client';
import { useMeetingCardStore } from '@/hooks/useAPIStore';
import useAxios from '@/hooks/useAxios';
import { MeetingCardType } from '@/types';
import Student from './student';
import { useEffect } from 'react';

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

    useEffect(() => {
      const fetchedMeetingCardData: MeetingCardType[] = [];

      setMeetingCardData(fetchedMeetingCardData);
    }, []);
  return (
    <>
      <Student />
    </>
  );
};

export default MeetingCards;
