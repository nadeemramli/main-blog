import fs from "fs";
import path from "path";

import { resources } from "@/app/resources/content";
import type { ResourceCardProps } from "@/components/ResourceCard";

// Server-only: verifies thumbnails on disk (design.md §6.4 screen-saver
// rule applied to the §6.5 handhelds) and assigns stable node IDs.
export function getHandheldResources(): ResourceCardProps[] {
  return resources.resources.map((resource, index) => ({
    ...resource,
    imageSrc:
      resource.imageSrc &&
      resource.imageSrc.startsWith("/") &&
      fs.existsSync(path.join(process.cwd(), "public", resource.imageSrc))
        ? resource.imageSrc
        : null,
    nodeId: `NODE-RES.${String(index + 1).padStart(2, "0")}`,
  }));
}
