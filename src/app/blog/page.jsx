import { ResourceCarousel } from "@/components/ResourceCarousel";
import { blog } from "@/app/resources/content";

export default function ResourcesPage() {
  return (
    <div>
      <ResourceCarousel resources={blog.resources} />
    </div>
  );
} 