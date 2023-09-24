import { defineDocumentType, makeSource } from "contentlayer/source-files";

export const Post = defineDocumentType(() => ({
  name: "Post",
  contentType: "mdx",
  filePathPattern: `**/**/*.mdx`,
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    category: { type: "string", required: false },
    main: { type: "boolean", required: false },
    featured: { type: "boolean", required: false },
    description: { type: "string", required: true },
    tags: { type: "list", required: false, of: { type: "string" } },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (post) => `/posts/${post._raw.flattenedPath}`,
    },
    excerpt: {
      type: "string",
      resolve: (post) => post._raw.contentType,
    },
  },
}));

export default makeSource({ contentDirPath: "posts", documentTypes: [Post] });
