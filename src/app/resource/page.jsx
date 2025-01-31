import { ResourceCarousel } from "@/components/ResourceCarousel";
import { resources } from "@/app/resources/content";

export default function ResourcesPage() {
  return (
    <div>
      <ResourceCarousel resources={resources.resources} />
    </div>
  );
} 