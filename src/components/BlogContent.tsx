"use client";

import { Column, Heading } from "@/once-ui/components";
import { ResourceCarousel } from "@/components/ResourceCarousel";
import { blog } from "@/app/resources/content";

export function BlogContent() {
  return (
    <Column maxWidth="xl">
      <Heading marginBottom="xl" variant="display-strong-l" align="center">
        {blog.title}
      </Heading>
      <ResourceCarousel resources={blog.resources} />
    </Column>
  );
}
