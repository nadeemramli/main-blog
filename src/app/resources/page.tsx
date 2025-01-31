"use client";

import { ResourceCarousel } from "@/components/ResourceCarousel";
import { blog } from "@/app/resources/content";
import { Column, Heading } from "@/once-ui/components";

export default function ResourcesPage() {
  return (
    <Column maxWidth="xl" gap="xl" paddingY="40">
      <Heading as="h1" variant="display-strong-l" align="center">
        {blog.title}
      </Heading>
      <ResourceCarousel resources={blog.resources} />
    </Column>
  );
}
