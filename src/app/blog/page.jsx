import { ResourceCarousel } from "@/components/ResourceCarousel";
import { blog } from "@/app/resources/content";

export default function ResourcesPage() {
  return (
    <div style={{ padding: "40px 0" }}>
      <ResourceCarousel resources={blog.resources} />
    </div>
  );
} 