"use client";

import {
  Card,
  SmartImage,
  Column,
  Text,
  Line,
  Row,
  Icon,
  Button,
  SmartLink,
} from "@/once-ui/components";
import styles from "./blog/Posts.module.scss";

interface ResourceCardProps {
  title: string;
  description: string;
  imageSrc: string;
  link: string;
}

export function ResourceCard({
  title,
  description,
  imageSrc,
  link,
}: ResourceCardProps) {
  return (
    <Card width={24} radius="l-4" direction="column" className={styles.hover}>
      <SmartImage
        sizes="640px"
        fillWidth
        aspectRatio="4 / 3"
        radius="l"
        src={imageSrc}
        alt={title}
      />
      <Column fillWidth paddingX="20" paddingY="24" gap="8">
        <Text variant="body-default-xl">{title}</Text>
        <Text onBackground="neutral-weak" variant="body-default-s">
          {description}
        </Text>
      </Column>
      <Line background="neutral-alpha-medium" />
      <Row paddingX="20" paddingY="12" vertical="center" horizontal="end">
        <SmartLink href={link} target="_blank" unstyled>
          <Button size="s" variant="secondary">
            VISIT SITE
          </Button>
        </SmartLink>
      </Row>
    </Card>
  );
}
