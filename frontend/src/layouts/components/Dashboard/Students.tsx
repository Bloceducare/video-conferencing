import MeetingCard from '@/layouts/components/MeetingCard';
import PageHeader from '@/layouts/partials/PageHeader';
import { MeetingCardType } from '@/types';

const Students = () => {
  const meetingCards: MeetingCardType[] = [
    {
      title: 'Web3 Stack',
      cohort: 'Cohort X',
      room: 'Room I',
      description: 'Live Webinar',
      image: '/images/webinar.png',
      link: '#',
    },

    {
      title: 'Web2 Stack',
      cohort: 'Cohort X',
      room: 'Room II',
      description: 'Live Webinar',
      image: '/images/webinar.png',
      link: '#',
    },

    {
      title: 'Masterclass',
      cohort: 'Cartesi',
      room: 'Room III',
      description: 'Live Webinar',
      image: '/images/webinar.png',
      link: '#',
    },

    {
      title: 'General',
      cohort: 'Web3bridge',
      room: 'Room IV',
      description: 'Live Webinar',
      image: '/images/webinar.png',
      link: '#',
    },

    {
      title: 'Staff',
      cohort: 'Web3bridge',
      room: 'Room V',
      description: 'Live Webinar',
      image: '/images/webinar.png',
      link: '#',
    },
  ];
  return (
    <>
      <section>
        <h3 className="flex justify-center text-center mt-4 ">Meeting Rooms</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 px-6 mx-4 mt-10 ">
          {meetingCards.map((card: MeetingCardType, index: number) => (
            <div key={index} className="p-6 border rounded-xl shadow-md ">
              <MeetingCard data={card} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Students;
