import ImageFallback from "@/layouts/helpers/ImageFallback";
import { getListPage } from "@/lib/contentParser";
import { Button } from "@/types";
import Link from "next/link";

const Home = () => {
  const homepage = getListPage("_index.md");
  const { frontmatter } = homepage;
  const {
    banner,
  }: {
    banner: { title: string; image: string; content?: string; button_black?: Button; button_white?: Button };
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
                <span>
                  <span>
                    {banner.button_white?.enable && (
                      <Link legacyBehavior href={banner.button_white.link}>
                        <a className="btn btn-primary">{banner.button_white.label}</a>
                      </Link>
                    )}
                  </span>
                  <span></span>
                  <span>
                    {banner.button_black?.enable && (
                      <Link legacyBehavior href={banner.button_black.link}>
                        <a className="btn btn-secondary">{banner.button_black.label}</a>
                      </Link>
                    )}
                  </span>
                </span>
              </div>
            </div>

            {/* Image */}
            {banner.image && (
              <div className="w-full lg:w-1/2">
                <ImageFallback
                  src={banner.image}
                  className="mx-auto"
                  width="800"
                  height="420"
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
