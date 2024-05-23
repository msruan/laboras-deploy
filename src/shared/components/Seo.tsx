import { Helmet } from "react-helmet-async";

type SeoProps = {
  title: string;
};

function Seo({ title }: SeoProps) {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
}

export default Seo;
