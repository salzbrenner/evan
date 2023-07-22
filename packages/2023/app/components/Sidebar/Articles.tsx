import { ArrowLink, Button } from "@evan/ui";
import { Text } from "@evan/ui/components/Text/Text";
import NextLink from "next/link";
import { BracketedTitle } from "../BracketedTitle";
import { useFadeInUp } from "@/app/hooks/useFadeInUp";
import { FadeInUp } from "../FadeInUp";

const DATA = [
  {
    title: "lorem ipsum dolor sit amet consectetur adipisicing elit",
  },
  {
    title: "qwrefr ipsum dolor sit amet consectetur adipisicing elit",
  },
  {
    title: "etrt ipsum dolor sit amet consectetur adipisicing elit",
  },
];

export function ArticlesBlock() {
  return (
    <FadeInUp className="px-3 pt-9" delay={600}>
      <div className="pb-9">
        <BracketedTitle title="Articles" />
      </div>
      {DATA.map((article) => {
        return (
          <div className="pb-9" key={article.title}>
            <ArrowLink
              display="block"
              textSize={"sm"}
              anchor={({ children }) => (
                <NextLink href="/">{children}</NextLink>
              )}
            >
              {article.title}
            </ArrowLink>
          </div>
        );
      })}
      <Button size={"sm"}>All Writing</Button>
    </FadeInUp>
  );
}
