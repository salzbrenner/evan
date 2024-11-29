import { Icon, IconTypes } from "../Icon/Icon";
import { Link, LinkProps } from "../Link/Link";
import { Text, TextProps } from "../Text/Text";

export interface ArrowLinkProps extends LinkProps {
  textSize?: TextProps["size"];
  intent?: TextProps["intent"];
}

export const ArrowLink = ({
  anchor,
  textSize,
  children,
  display = "inline",
  intent,
}: ArrowLinkProps) => {
  const anchorDisplay = display === "inline" ? "inline-flex" : "flex";
  const paddingLeft = display === "inline" ? "ml-5" : "";
  const iconDisplay = display === "inline" ? "absolute" : "block";
  const _intent = intent ?? (display === "inline" ? "gradientLink" : "gradientLink");
  return (
    <Link anchor={anchor}>
      <span className={`${anchorDisplay} gap-1 items-start`}>
        <span className={`${iconDisplay} pt-1 text-clr-gray-99`}>
          <Icon type={IconTypes.arrowDownRight} />
        </span>
        <Text as="span" size={textSize} intent={_intent}>
          <span className={paddingLeft}>{children}</span>
        </Text>
      </span>
    </Link>
  );
};
