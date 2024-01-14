'use client';
import { useEffect, useState } from 'react';
import MeetingCard from '@/components/MeetingCard';
import PageHeader from '@/partials/PageHeader';
import { useCreateRoomStore, useMeetingCardStore } from '@/hooks/useAPIStore';
import { MeetingCardType } from '@/types';
import MeetingForm from '@/components/FormMeeting';
import Modal from '@/components/Modal';
import axios from 'axios';
import { toast } from 'react-toastify';
import { RxCross2 } from 'react-icons/rx';

const Students = () => {
  const { meetingCardData } = useMeetingCardStore.getState();
  const { setCreateRoomData } = useCreateRoomStore.getState();
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const handleSubmit = async (formData: any) => {
    try {
      setIsLoading(true);
      setCreateRoomData(formData);

      const response = await axios.post('https://w3bvc.onrender.com/v1/livekit/room', {
        roomName: formData.roomName,
        emptyTimeout: formData.duration,
      });

      if (response.data.status) {
        console.log(response.data);
        toast('Meeting Created Successfully');
      } else {
        console.error('Error creating room:', response.data);
        toast('Error creating room: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error creating room:', error);
    } finally {
      setIsVisible(false);
      setIsLoading(false);
    }
  };

  return (
    <>
      <PageHeader />
      <section>
        <div
          onClick={() => setIsVisible(!isVisible)}
          className="btn text-white hover:text-black bg-black  hover:bg-white border-solid border-white flex justify-center text-center mt-4 "
        >
          CREATE MEETING
        </div>
        <h3 className="flex justify-center text-center mt-4 ">Meeting Rooms</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-16 px-14 mx-4 mt-10 ">
          {!!meetingCardData.length &&
            meetingCardData?.map((card: MeetingCardType, index: number) => (
              <div key={index}>
                <MeetingCard data={card} />
              </div>
            ))}
        </div>
        {isLoading && (
          <div className="text-center px-4 pb-4 pt-5 sm:p-6 sm:pb-4 text-white">LOADING...</div>
        )}
        {!meetingCardData.length && !isLoading && (
          <div className="text-center px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <p>No Meeting Yet</p>
            <button
              onClick={() => setIsVisible(!isVisible)}
              className="btn text-white hover:text-black bg-black  hover:bg-white border-solid border-white "
            >
              CREATE MEETING
            </button>
          </div>
        )}

        {isVisible && (
          <Modal>
            <>
              <button className="p-3" onClick={() => setIsVisible(!isVisible)}>
                <RxCross2 size={24} />
              </button>
              <MeetingForm onSubmit={handleSubmit} />
            </>
          </Modal>
        )}
      </section>
    </>
  );
};

export default Students;
