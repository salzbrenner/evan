import { VariantProps, cva } from "cva";
import { Icon, IconTypes } from "../Icon/Icon";
import { Link, LinkProps } from "../Link/Link";
import { Text, TextProps } from "../Text/Text";

export interface InlineLinkProps extends LinkProps {
  textSize?: TextProps["size"];
  intent?: TextProps["intent"];
}

export const InlineLink = ({ anchor, textSize, children, intent = 'inlineLink' }: InlineLinkProps) => {
  return (
    <Link anchor={anchor}>
      <span className={`inline-flex items-center`}>
        <Text as="span" size={textSize} intent={intent}>
          {children}
        </Text>
      </span>
    </Link>
  );
};
