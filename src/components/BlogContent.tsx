"use client";

import { Column, Heading } from "@/once-ui/components";
import { ResourceCarousel } from "@/components/ResourceCarousel";
import { resources } from "@/app/resources/content";

export function BlogContent() {
  return (
    <Column maxWidth="xl">
      <Heading marginBottom="xl" variant="display-strong-l" align="center">
        {resources.title}
      </Heading>
      <ResourceCarousel resources={resources.resources} />
    </Column>
  );
}
