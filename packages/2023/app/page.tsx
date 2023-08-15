"use client";
import Link from "next/link";
import { compareDesc, format, parseISO } from "date-fns";
import { allPosts, Post } from "contentlayer/generated";
import { Text, BodyContainer, Button, ArrowLink, Heading } from "@evan/ui";
import { BracketedTitle } from "./components/BracketedTitle";

import NextLink from "next/link";
export default function Home() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  return (
    <main className="flex min-h-screen px-12 py-24 ">
      <div className="flex flex-col gap-12">
        <BodyContainer>
          <Text accent size={"lg"}>
            This is some blog title
          </Text>
          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
            maxime nam suscipit iure aliquam atque cum sed, perferendis
            consequuntur odit aliquid incidunt exercitationem eius accusantium
            aspernatur ipsum eaque laboriosam fugit. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Doloremque ducimus nostrum placeat
            nihil perspiciatis velit quaerat ullam sunt, mollitia quia
            accusantium exercitationem in eum! Esse provident veritatis suscipit
            reiciendis qui! Lorem ipsum dolor sit amet, consectetur adipisicing
            elit. Consequuntur possimus cupiditate magni blanditiis! Praesentium
            rerum id atque quibusdam ut quae iure iste repellendus voluptate
            soluta, labore fuga aperiam illo ullam.
          </Text>
          <ArrowLink
            display="block"
            textSize={"sm"}
            anchor={({ children }) => (
              <NextLink className="inline-block" href="/">
                {children}
              </NextLink>
            )}
          >
            Continue reading
          </ArrowLink>
          <div className="pt-12">
            <BracketedTitle title="about" />
          </div>
          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
            maxime nam suscipit iure aliquam atque cum sed, perferendis
            consequuntur odit aliquid incidunt exercitationem eius accusantium
            aspernatur ipsum eaque laboriosam fugit. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Doloremque ducimus nostrum placeat
            nihil perspiciatis velit quaerat ullam sunt, mollitia quia
            accusantium exercitationem in eum! Esse provident veritatis suscipit
            reiciendis qui! Lorem ipsum dolor sit amet, consectetur adipisicing
            elit. Consequuntur possimus cupiditate magni blanditiis! Praesentium
            rerum id atque quibusdam ut quae iure iste repellendus voluptate
            soluta, labore fuga aperiam illo ullam.
          </Text>

          <div className="pt-12">
            <BracketedTitle title="experience" />
          </div>
          <div className="flex gap-32">
            <div>
              <Text>2020 - 2021</Text>
            </div>
            <div>
              <Text>HNT Labs</Text>
              <Text className="text-clr-gray-50">Engineer</Text>
            </div>
          </div>
          <div className="flex gap-32">
            <div>
              <Text>2020 - 2021</Text>
            </div>
            <div>
              <Text>HNT Labs</Text>
              <Text className="text-clr-gray-50">Engineer</Text>
            </div>
          </div>
        </BodyContainer>
      </div>
    </main>
  );
}
function PostCard(post: Post) {
  return (
    <div className="mb-8">
      <h2 className="mb-1 text-xl">
        <Link
          href={post.url}
          className="text-blue-700 hover:text-blue-900 dark:text-blue-400"
        >
          {post.title}
        </Link>
      </h2>
      <h1>wwoowowow pizza</h1>
      <time dateTime={post.date} className="mb-2 block text-xs text-gray-600">
        {format(parseISO(post.date), "LLLL d, yyyy")}
      </time>
      <div
        className="text-sm [&>*]:mb-3 [&>*:last-child]:mb-0"
        dangerouslySetInnerHTML={{ __html: post.title }}
      />
    </div>
  );
}
