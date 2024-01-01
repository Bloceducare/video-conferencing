import MeetingCard from "@/layouts/components/MeetingCard";
import PageHeader from "@/layouts/partials/PageHeader";
import { MeetingCardType } from "@/types";

const MeetingCards = () => {
  const meetingCards: MeetingCardType[] = [
    {
      title: "Web3Track",
      description:
        "Live Webinar",
      image: "/images/webinar.png",
      link: "#"
    }
  ];
  return (
    <>
      <PageHeader />
      <section className="section-sm pb-0">
        <div className="container">
          <div className="row justify-center">
            {meetingCards.map((card: MeetingCardType, index: number) => (
              <div className="mb-14 md:col-6 lg:col-4" key={index}>
                <MeetingCard data={card} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default MeetingCards;
