import NGODetailPage from "@/app/map/components/NgoDetails";

export default function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;

  console.log("Page.tsx received slug:", slug);

  return <NGODetailPage slug={slug} />;
}
