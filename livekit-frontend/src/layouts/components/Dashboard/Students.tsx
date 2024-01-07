'use client'
import MeetingCard from '@/layouts/components/MeetingCard';
import PageHeader from '@/layouts/partials/PageHeader';
import { useMeetingCardStore } from '@/hooks/useAPIStore';
import { MeetingCardType } from '@/types';

const Students = () => {
  const { meetingCardData } = useMeetingCardStore.getState();

  return (
    <>
      <PageHeader />
      <section>
        <h3 className="flex justify-center text-center mt-4 ">Meeting Rooms</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-16 px-14 mx-4 mt-10 ">
          {meetingCardData.length &&
            meetingCardData?.map((card: MeetingCardType, index: number) => (
              <div key={index}>
                <MeetingCard data={card} />
              </div>
            ))}
          {!meetingCardData.length && (
            <div key={1} className="text-center px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <p>No Meeting Yet</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Students;
