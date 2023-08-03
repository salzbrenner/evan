import { VariantProps, cva } from "cva";
import { Icon, IconTypes } from "../Icon/Icon";
import { Link, LinkProps } from "../Link/Link";
import { Text, TextProps } from "../Text/Text";

export interface InlineLinkProps extends LinkProps {
  textSize?: TextProps["size"];
}

export const InlineLink = ({ anchor, textSize, children }: InlineLinkProps) => {
  return (
    <Link anchor={anchor}>
      <span className={`inline-flex items-center`}>
        <Text as="span" size={textSize} intent={"inlineLink"}>
          {children}
        </Text>
      </span>
    </Link>
  );
};
