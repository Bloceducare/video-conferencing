import Link from 'next/link';
import ImageFallback from '@/layouts/helpers/ImageFallback';
import { getListPage } from '@/lib/contentParser';
import { Button } from '@/types';
import HomepageButton from '@/helpers/HomepageButton';

const Home = () => {
  const homepage = getListPage('_index.md');
  const { frontmatter } = homepage;
  const {
    banner,
  }: {
    banner: {
      title: string;
      image: string;
      content?: string;
      button_black?: Button;
      button_white?: Button;
    };
  } = frontmatter;
  return (
    <>
      <section className="section pt-14">
        <div className="container">
          <div className="flex flex-wrap items-center justify-between">
            {/* Content */}
            <div className="w-full lg:w-1/2 lg:pr-12">
              <div className="mb-16 text-center">
                <h1 className="mb-4">{banner.title}</h1>
                <p className="mb-8">{banner.content ?? ''}</p>
                <HomepageButton />
              </div>
            </div>

            {/* Image */}
            {banner.image && (
              <div className="w-full lg:w-1/2 h-2/3">
                <ImageFallback
                  src={banner.image}
                  className="mx-auto "
                  width="400"
                  height="90"
                  alt="banner image"
                  priority
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
