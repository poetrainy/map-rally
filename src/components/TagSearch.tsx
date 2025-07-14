import { useState, type ChangeEvent, type KeyboardEvent, type FC } from "react";
import { IoClose } from "react-icons/io5";
import { InputGroup, Input, Text, VStack, Flex, Box } from "@chakra-ui/react";
import { Tag } from "@/components/Tag";

type Props = {
  onChange: (tags: string[]) => void;
};

const SUGGESTION_ITEMS = [
  { label: "ミュージック", postLength: 1979 },
  { label: "ミュージアム", postLength: 706 },
  { label: "ミュージカル", postLength: 101 },
];

// @ts-ignore Processes not currently used
const Suggestion = () => (
  <Box
    pt="14"
    px="4"
    pb="2"
    bg="gray.contrast"
    pos="absolute"
    inset="0 0 auto 0"
    rounded="lg"
    borderColor="gray.muted"
    borderWidth="1px"
    borderStyle="solid"
  >
    {SUGGESTION_ITEMS.map(({ label, postLength }) => (
      <Flex
        as="button"
        key={label}
        justifyContent="space-between"
        alignItems="center"
        w="full"
        h="8"
        fontSize="xs"
      >
        <Text as="span" color="gray.fg">{`#${label}`}</Text>
        <Text
          as="span"
          color="gray.focusRing"
          fontWeight="bold"
        >{`${postLength}件`}</Text>
      </Flex>
    ))}
  </Box>
);

export const TagSearch: FC<Props> = ({ onChange }) => {
  const [tags, setTags] = useState<string[]>([]);
  const [value, setValue] = useState<string>("");

  return (
    <VStack alignItems="stretch" p="0">
      <InputGroup
        startElement={
          <Text
            as="span"
            color="gray.tertiary"
            pl="1"
            pt="0.5"
            fontSize="md"
            fontWeight="bold"
          >
            #
          </Text>
        }
        pos="relative"
        zIndex="1"
      >
        <Input
          name="tag"
          value={value}
          placeholder="タグを入力"
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setValue(event.target.value)
          }
          onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
            if (event.key === "Enter" && !tags.includes(value)) {
              const newTags = [...tags, value];
              setTags(newTags);
              onChange(newTags);
              setValue("");
            }
          }}
          w="full"
          h="12"
          bg="gray.contrast"
          pl="7"
          pr="3"
          fontSize="md"
          rounded="lg"
          _placeholder={{
            color: "gray.focusRing",
          }}
          css={{ paddingInlineStart: "0 !important" }}
        />
      </InputGroup>
      {!!tags.length && (
        <Flex gap="2" flexWrap="wrap">
          {tags.map((tag) => (
            <Tag
              key={tag}
              onClick={() => setTags((p) => p.filter((item) => item != tag))}
            >
              <IoClose />
              {tag}
            </Tag>
          ))}
        </Flex>
      )}
    </VStack>
  );
};
