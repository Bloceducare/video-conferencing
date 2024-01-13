import { plainify } from '@/lib/textConverter';
import { MeetingCardType } from '@/types';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Modal from './Modal';
import { useCreateRoomStore } from '@/hooks/useAPIStore';

const MeetingCard = ({ data }: { data: MeetingCardType }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { setCreateRoomData } = useCreateRoomStore.getState();

  const handleClick = () => {
    setCreateRoomData({ duration: 100, roomName: data.name });
    setIsVisible(!isVisible);
  };

  return (
    <>
      <div className="rounded  p-8 text-center ">
        <h4 className="mb-3">
          <b>{data.name}</b>
        </h4>

        <div className="space-y-4">
          <button
            onClick={handleClick}
            className="btn text-white hover:text-black bg-black  hover:bg-white border-solid border-white "
          >
            {`Join ${data.name} Room`}
          </button>
        </div>
      </div>
      {isVisible && (
        <Modal>
          <>
            <button onClick={() => setIsVisible(!isVisible)}>Cancel</button>
            <Link href={'/preview'}>
              <div className="px-4 pb-4 pt-5 sm:p-6 sm:pb-4">JOIN ROOM</div>
            </Link>
          </>
        </Modal>
      )}
    </>
  );
};

export default MeetingCard;
