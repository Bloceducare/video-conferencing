import ImageFallback from '@/layouts/helpers/ImageFallback';
import { plainify } from '@/lib/textConverter';
import { MeetingCardType } from '@/types';
import Link from 'next/link';

const MeetingCard = ({ data }: { data: MeetingCardType }) => {
  const { title, cohort, room, image } = data;
  return (
    <div className="rounded  p-8 text-center ">
      {image && (
        <ImageFallback
          className="mx-auto mb-6 rounded"
          src={image}
          alt={title}
          width={120}
          height={120}
        />
      )}
      <h4 className="mb-3">
        <Link href={'#'}>{title}</Link>
      </h4>

      <div className="space-y-4">
        <p>{data.cohort}</p>

        <p>{data.room}</p>
        <p className="mb-4">{plainify(data.description)}</p>
      </div>
    </div>
  );
};

export default MeetingCard;
