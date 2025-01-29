import { Grid } from "@/once-ui/components";
import { ResourceCard } from "../ResourceCard";
import { blog } from "@/app/resources/content";

interface PostsProps {
  range?: [number] | [number, number];
  columns?: "1" | "2" | "3";
}

export function Posts({ range, columns = "3" }: PostsProps) {
  const resources = blog.resources;

  const displayedResources = range
    ? resources.slice(
        range[0] - 1,
        range.length === 2 ? range[1] : resources.length
      )
    : resources;

  return (
    <>
      {displayedResources.length > 0 && (
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 var(--static-space-24)",
          }}
        >
          <Grid
            columns={columns}
            mobileColumns="1"
            fillWidth
            marginBottom="40"
            gap="24"
            style={{
              gridTemplateColumns: "repeat(3, 1fr)",
              justifyItems: "center",
              width: "100%",
              maxWidth: "100%",
            }}
          >
            {displayedResources.map((resource, index) => (
              <ResourceCard key={index} {...resource} />
            ))}
          </Grid>
        </div>
      )}
    </>
  );
}
