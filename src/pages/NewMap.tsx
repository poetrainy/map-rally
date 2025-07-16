import { useState, type ChangeEvent, type ReactNode } from "react";
import { Link } from "react-router";
import {
  Button,
  ButtonGroup,
  Center,
  Flex,
  Input,
  Image,
  Steps,
} from "@chakra-ui/react";
import { Header } from "@/components/Header";
import { Layout } from "@/layouts";
import { MapSelect } from "@/components/MapImage";
import type { MapEdit, MapVisibility, Region } from "@/types/map";
import { MapEditable } from "@/components/MapEditable";
import { MapVisibilityMenu } from "@/components/MapVisibilityMenu";
import IMAGE_CONFETTI from "@/assets/images/confetti.png";

export function NewMapPage() {
  const [name, setName] = useState("");
  const [region, setRegion] = useState<Region>();
  const [_visibility, setVisibility] = useState<MapVisibility>("public");

  const updateData = (getData: MapEdit) => setName(getData.name);

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
        <Center flex="1">
          <MapSelect onValueChange={(value) => setRegion(value)} />
        </Center>
      ),
      nextTriggerDisabled: !region,
    },
    {
      title: "マップの情報を追加する",
      description: "あとから変更できます",
      content: (
        <MapEditable
          data={{ name, region: region ?? "hokkaido-tohoku" }}
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
                  "&[data-current]": { bg: "gray.contrast", color: "gray.fg" },
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
                  <MapVisibilityMenu
                    onChange={(value) => setVisibility(value)}
                  />
                  <Steps.NextTrigger asChild>
                    <Button flex="1" size="xl" fontWeight="bold" rounded="full">
                      作る！
                    </Button>
                  </Steps.NextTrigger>
                </ButtonGroup>
              )}
            </Steps.Content>
          )
        )}
        <Steps.CompletedContent
          flex="1"
          display="flex"
          flexDir="column"
          justifyContent="center"
          alignItems="center"
        >
          <Center as="figure" w="40" mb="8">
            <Image src={IMAGE_CONFETTI} />
          </Center>
          <Steps.Title
            color="gray.secondary"
            fontSize="xl"
            fontWeight="bold"
            lineHeight="2rem"
            mb="2"
          >
            マップを作成しました！🗾
          </Steps.Title>
          <Steps.Description color="gray.tertiary" mb="6" textAlign="center">
            これからたくさんの記録を
            <br />
            塗り重ねていきましょう！🎨
          </Steps.Description>
          <Button asChild size="xl" w="fit" fontWeight="bold" rounded="full">
            <Link to="/maps/map4?from=home">作成したマップを確認する</Link>
          </Button>
        </Steps.CompletedContent>
      </Steps.Root>
    </Layout>
  );
}
