import { Heading, Text } from "@evan/ui";
import type { MDXComponents } from "mdx/types";
import { Image } from "./Image";
import { imageMap } from "@/posts/images";

// Define your custom MDX components.
export const mdxComponents: MDXComponents = {
  // Override the default <a> element to use the next/link component.
  // a: ({ href, children }) => <Link href={href as string}>{children}</Link>,
  p: ({ children }) => <Text>{children}</Text>,
  h1: ({ children }) => (
    <Heading as="h1" size={3}>
      {children}
    </Heading>
  ),
  h2: ({ children }) => (
    <Heading as="h2" size={3}>
      {children}
    </Heading>
  ),
  h3: ({ children }) => (
    <Heading as="h3" size={3}>
      {children}
    </Heading>
  ),
  Image: ({ src, alt }) => <Image src={src} alt={alt} />,
  ul: ({ children }) => <ul className="list-disc pl-4">{children}</ul>,
  li: ({ children }) => (
    <li className="mb-2 font-primary-sm md:font-primary">{children}</li>
  ),
  img: ({ src, alt }) => {
    if (!src) return null;
    return (
      <Image
        src={(imageMap as any)[src]}
        alt={alt as any}
        className="rounded"
      />
    );
  },
};
