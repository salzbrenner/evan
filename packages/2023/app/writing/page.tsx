import { allPosts, Post } from "contentlayer/generated";

export default function Posts() {
  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {allPosts.map((post) => (
          <li key={post._id}>
            <a href={`/writing/${post._raw.flattenedPath}`}>{post.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
