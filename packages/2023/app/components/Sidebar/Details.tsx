import { Icon, IconTypes, Text } from "@evan/ui";

export function Details() {
  return (
    <div className="flex h-16 ">
      <div className="flex items-center justify-center w-16 text-clr-ui-accent border-r border-clr-ui-accent">
        <Icon type={IconTypes.logo} />
      </div>
      <div className="flex items-center justify-center m-auto px-4 text-center">
        <div className="text-clr-text-secondary text-center">
          <Text size={"xs"} accent>
            evan.salzbrenner @ gmail.com
          </Text>
          <Text size={"xs"} accent>
            awaiting communication
          </Text>
        </div>
      </div>
      <div className="flex items-center justify-center w-16 text-clr-ui-accent border-r border-clr-ui-accent rotate-180">
        <Icon type={IconTypes.logo} />
      </div>
    </div>
  );
}
