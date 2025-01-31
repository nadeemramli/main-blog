import { Column } from "@/once-ui/components";
import { ResourceCard } from "@/components/ResourceCard";
import { resources } from "@/app/resources/content";

interface PostsProps {
  range?: [number, number?];
  columns?: string;
}

export function Posts({ range, columns = "3" }: PostsProps) {
  const { resources: allResources } = resources;

  const displayedResources = range
    ? allResources.slice(range[0] - 1, range[1])
    : allResources;

  return (
    <Column gap="32" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
      {displayedResources.map((resource) => (
        <ResourceCard
          key={resource.title}
          title={resource.title}
          description={resource.description}
          imageSrc={resource.imageSrc}
          link={resource.link}
        />
      ))}
    </Column>
  );
}
