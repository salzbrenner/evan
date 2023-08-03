import { Icon, IconTypes, Text } from "@evan/ui-vite";

export function Details() {
  return (
    <div className="flex h-16 justify-">
      <div className="flex items-center mr-auto px-4">
        <div className="text-clr-gray-40 dark:text-clr-gray-50">
          <Text size={"xs"} accent>
            evan.salzbrenner @ gmail.com
          </Text>
          <Text size={"xs"} accent>
            awaiting communication
          </Text>
        </div>
      </div>
      <div className="flex items-center justify-center w-16 text-clr-ui-accent border-l border-r border-clr-ui-accent bg-clr-text-primary opacity-[0.05] dark:opacity-100 dark:bg-clr-gray-11" />
      <div className="flex items-center justify-center w-16 text-clr-gray-40 dark:text-clr-ui-accent ">
        <Icon type={IconTypes.logo} />
      </div>
    </div>
  );
}
