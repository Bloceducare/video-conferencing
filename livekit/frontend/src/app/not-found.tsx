import ImageFallback from "@/layouts/helpers/ImageFallback";
import MDXContent from "@/layouts/helpers/MDXContent";
import { getListPage } from "@/lib/contentParser";
import { RegularPage } from "@/types";
import Link from "next/link";

const NotFound = async () => {
  const data: RegularPage = getListPage("404.md");
  const { image, title } = data.frontmatter;
  return (
    <>
      <section className="section-sm">
        <div className="container">
          <div className="row justify-center">
            <div className="text-center sm:col-10 md:col-8 lg:col-6">
              <ImageFallback
                className="mb-8 w-full"
                src={image}
                alt="page not found"
                height={320}
                width={630}
              />
              <h1
                className="h2 mb-4"
              >{title}</h1>
              <div className="content">
                <MDXContent content={data.content} />
              </div>
              <Link href="/" className="btn btn-primary mt-8">
                Back To Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;
