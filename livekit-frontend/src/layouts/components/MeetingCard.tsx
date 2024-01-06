import { plainify } from '@/lib/textConverter';
import { MeetingCardType } from '@/types';
import {useState} from 'react';
import Link from 'next/link';
import Modal from './Modal';

const MeetingCard = ({ data }: { data: MeetingCardType }) => {
  const [isVisible, setIsVisible] = useState(false)

  const { title, cohort, room, image } = data;
  
  return (
    <>
      <div className="rounded  p-8 text-center ">
        {/* {image && (
        <ImageFallback
          className="mx-auto mb-6 rounded"
          src={image}
          alt={title}
          width={120}
          height={120}
        />
      )} */}
        <h4 className="mb-3">
          <button onClick={() => setIsVisible(!isVisible)}>{title}</button>
          {/* <Link href={'#'}>{title}</Link> */}
        </h4>

        <div className="space-y-4">
          <p>{data.cohort}</p>

          <p>{data.room}</p>
          <p className="mb-4">{plainify(data.description)}</p>
        </div>
      </div>
      {isVisible && <Modal>
        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
          <input placeholder={`This is ${title} input`} style={{ width: "100%" }} />
        </div>

        <button onClick={() => setIsVisible(!isVisible)}>Cancel</button>
      </Modal>}
    </>
  );
};

export default MeetingCard;
