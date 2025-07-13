import { useState, type ChangeEvent, type ReactNode } from "react";
import {
  Button,
  ButtonGroup,
  Center,
  Checkbox,
  Flex,
  Input,
  Steps,
} from "@chakra-ui/react";
import { Header } from "@/components/Header";
import { Layout } from "@/layouts";
import Map from "@/components/MapImage";
import type { MapEdit, Region } from "@/types/map";
import { MapEditable } from "@/components/MapEditable";

export function NewMapPage() {
  const [name, setName] = useState("");
  const [region, setRegion] = useState<Region | "all" | null>("all");
  const [data, setData] = useState<MapEdit>(); // FIXME: State

  const updateData = (getData: MapEdit) => setData(getData);

  const stepperItems: {
    title: string;
    description?: string;
    content: ReactNode;
    nextTriggerDisabled?: boolean;
  }[] = [
    {
      title: "マップに名前をつける",
      content: (
        <Center flex="1">
          <Input
            name="name"
            value={name}
            variant="flushed"
            placeholder="じぶんのマップ"
            color="gray.fg"
            fontWeight="bold"
            fontSize="2xl"
            textAlign="center"
            mb="16"
            _placeholder={{
              color: "gray.emphasized",
            }}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setName(event.target.value)
            }
          />
        </Center>
      ),
      nextTriggerDisabled: !name.length,
    },
    {
      title: "マップの地域をえらぶ",
      content: (
        // FIXME: State
        <Center flexDir="column" alignItems="center" gap="2" flex="1">
          <Center
            w="full"
            h="25rem"
            mb="2"
            _icon={{ boxSize: "full", objectFit: "contain" }}
          >
            <Map.All />
          </Center>
          <Checkbox.Root
            name="region"
            value="all"
            checked={region === "all"}
            gap="2"
            onCheckedChange={() =>
              setRegion((p) => (p === "all" ? null : "all"))
            }
          >
            <Checkbox.HiddenInput />
            <Checkbox.Control />
            <Checkbox.Label>全国</Checkbox.Label>
          </Checkbox.Root>
        </Center>
      ),
      nextTriggerDisabled: !region,
    },
    {
      title: "マップに情報を追加する", // FIXME: Rename the label
      description: "あとから変更できます",
      content: (
        <MapEditable
          data={{ name, ...(!!region && { region }) }}
          onChange={updateData}
        />
      ),
      nextTriggerDisabled: !name.length,
    },
  ];

  return (
    <Layout hasNavigation={false} pt="20" pb="10" minH="dvh">
      <Header backLinkType="close">新しいマップを作る</Header>
      <Steps.Root
        colorPalette="teal"
        count={stepperItems.length}
        gap="6"
        flex="1"
        h="full"
      >
        <Steps.List>
          {stepperItems.map((_, i) => (
            <Steps.Item key={i} index={i}>
              <Steps.Indicator
                css={{
                  "&[data-current]": { bg: "transparent", color: "gray.fg" },
                }}
              />
              <Steps.Separator />
            </Steps.Item>
          ))}
        </Steps.List>
        {stepperItems.map(
          ({ title, description, content, nextTriggerDisabled }, i) => (
            <Steps.Content
              key={i}
              index={i}
              display="flex"
              flexDir="column"
              gap="6"
              flex="1"
            >
              <Flex flexDir="column" gap="0.5">
                <Steps.Title
                  color="gray.secondary"
                  fontSize="xl"
                  fontWeight="bold"
                  textAlign="center"
                  lineHeight="2rem"
                >
                  {title}
                </Steps.Title>
                {description && (
                  <Steps.Description color="gray.tertiary" textAlign="center">
                    {description}
                  </Steps.Description>
                )}
              </Flex>
              {content}
              {i < 2 ? (
                <Steps.NextTrigger asChild>
                  <Button
                    colorPalette="teal"
                    disabled={nextTriggerDisabled}
                    size="xl"
                    rounded="full"
                  >
                    次へ
                  </Button>
                </Steps.NextTrigger>
              ) : (
                <ButtonGroup w="full">
                  <Button
                    variant="outline"
                    colorPalette="gray"
                    size="xl"
                    color="gray.secondary"
                    bg="gray.contrast"
                    fontWeight="bold"
                    rounded="full"
                    borderColor="gray.tertiary"
                    borderWidth="2px"
                  >
                    下書き保存
                  </Button>
                  <Steps.NextTrigger asChild>
                    <Button flex="1" size="xl" fontWeight="bold" rounded="full">
                      公開
                    </Button>
                  </Steps.NextTrigger>
                </ButtonGroup>
              )}
            </Steps.Content>
          )
        )}
      </Steps.Root>
    </Layout>
  );
}

// FIXME: Finally
// - Post preview