import { useState, type ChangeEvent, type FC } from "react";
import { IoClose } from "react-icons/io5";
import { InputGroup, Input, Text, VStack } from "@chakra-ui/react";
import { Tag } from "@/components/Tag";

type Props = {
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const TagSearch: FC<Props> = ({ onChange }) => {
  const [tags, setTags] = useState<string[]>([]);

  // FIXME: Suggestion display
  return (
    <VStack alignItems="stretch" p="0">
      {tags.map((tag) => (
        <Tag
          key={tag}
          onClick={() => setTags((p) => p.filter((item) => item != tag))}
        >
          <IoClose />
          {tag}
        </Tag>
      ))}
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
      >
        <Input
          name="tag"
          placeholder="タグを入力"
          onChange={onChange}
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
    </VStack>
  );
};
