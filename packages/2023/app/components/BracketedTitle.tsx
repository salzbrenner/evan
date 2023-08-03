import { Text } from "@evan/ui-vite/components/Text/Text";

export function BracketedTitle({ title }: { title: string }) {
  return (
    <div className="flex h-2">
      <div className="border-b border-t border-l border-clr-gray-40 dark:border-clr-gray-70 w-[3px] mr-2" />
      <Text
        leading={"none"}
        accent
        size="xs"
        className="!text-[10px] text-clr-gray-40 dark:text-clr-gray-70"
      >
        {title}
      </Text>
      <div className="border-b border-t border-r border-clr-gray-40 dark:border-clr-gray-70  w-[3px] ml-2" />
    </div>
  );
}
