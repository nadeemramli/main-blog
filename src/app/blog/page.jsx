import { ResourceCard } from "@/components/ResourceCard";
import { Grid } from "@/once-ui/components";
import { blog } from "@/app/resources/content";

export default function ResourcesPage() {
  return (
    <Grid columns={3} gap="24">
      {blog.resources.map((resource, index) => (
        <ResourceCard
          key={index}
          {...resource}
        />
      ))}
    </Grid>
  );
} 