import { baseURL } from "@/app/resources";
import { resources, person } from "@/app/resources/content";
import { ResourceCarousel } from "@/components/ResourceCarousel";

export async function generateMetadata() {
  const title = resources.title;
  const description = resources.description;
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}/resources`,
      images: [
        {
          url: ogImage,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function Resources() {
  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            headline: resources.title,
            description: resources.description,
            url: `https://${baseURL}/resources`,
            image: `${baseURL}/og?title=${encodeURIComponent(resources.title)}`,
            author: {
              "@type": "Person",
              name: person.name,
              image: {
                "@type": "ImageObject",
                url: `${baseURL}${person.avatar}`,
              },
            },
          }),
        }}
      />
      <ResourceCarousel resources={resources.resources} />
    </>
  );
}
