import { ArrowLink, Button } from "@evan/ui";
import NextLink from "next/link";
import { BracketedTitle } from "../BracketedTitle";

const DATA = [
  {
    title: "lorem ipsum dolor sit amet consectetur adipisicing elit",
  },
  {
    title: "qwrefr ipsum dolor sit amet consectetur adipisicing elit",
  },
];

export function ArticlesBlock() {
  return (
    <div className="px-16 pt-10">
      <div className="pb-9">
        <BracketedTitle title="Writing" />
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
      <Button size={"xs"}>All Writing</Button>
    </div>
  );
}
