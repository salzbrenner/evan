import { Text } from "@evan/ui";

export function BracketedTitle({ title }: { title: string }) {
  return (
    <div className="flex h-2">
      <div className="border-b border-t border-l border-clr-text-secondary w-[3px] mr-2" />
      <Text
        leading={"none"}
        accent
        size="xxs"
        className="text-clr-text-secondary"
      >
        {title}
      </Text>
      <div className="border-b border-t border-r border-clr-text-secondary  w-[3px] ml-2" />
    </div>
  );
}
