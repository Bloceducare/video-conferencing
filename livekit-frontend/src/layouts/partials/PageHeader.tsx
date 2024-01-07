import Breadcrumbs from "@/layouts/components/Breadcrumbs";

const PageHeader = () => {
  return (
    <section>
      <div className="container text-center">
        <div className="rounded-2xl bg-gradient-to-b from-body to-theme-light px-2 py-6 dark:from-darkmode-body dark:to-darkmode-theme-light">
          <Breadcrumbs className="mt-1" />
        </div>
      </div>
    </section>
  );
};

export default PageHeader;
