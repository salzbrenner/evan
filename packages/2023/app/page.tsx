import Image from "next/image";
import { Button } from "@evan/ui-vite";
import { Text } from "@evan/ui-vite";
import Link from "next/link";
import { compareDesc, format, parseISO } from "date-fns";
import { allPosts, Post } from "contentlayer/generated";

export default function Home() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Text accent>HELLOOOO</Text>
      <Text size={"sm"}>HELLOOOO</Text>
      {posts.map((post, idx) => (
        <PostCard key={idx} {...post} />
      ))}
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
