import { plainify } from '@/lib/textConverter';
import { MeetingCardType } from '@/types';
import { useState } from 'react';
import Link from 'next/link';
import Modal from './Modal';

const MeetingCard = ({ data }: { data: MeetingCardType }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <div className="rounded  p-8 text-center ">
        <h4 className="mb-3">
          <button onClick={() => setIsVisible(!isVisible)}>{`Test Meeting ${
            Math.floor(Math.random() * 1)
          }`}</button>
          {/* <Link href={'#'}>{title}</Link> */}
        </h4>

        <div className="space-y-4">
          <p>{data.name}</p>
          <p className="mb-4">{plainify('For Test')}</p>
        </div>
      </div>
      {isVisible && (
        <Modal>
          <>
            <button onClick={() => setIsVisible(!isVisible)}>Cancel</button>
            <Link href={'#'}>
              <div className="px-4 pb-4 pt-5 sm:p-6 sm:pb-4">JOIN ROOM</div>
            </Link>
          </>
        </Modal>
      )}
    </>
  );
};

export default MeetingCard;
