/** @jsx h */
import { h } from "preact";
import { useState } from "preact/hooks";

import { Button } from "../components/Button.tsx";
import { trpc } from "../utils/trpc.ts";

export default function Counter() {
  const [helloResponse, setHelloResponse] = useState("");
  const [posts, setPosts] = useState<{ name: string }[]>([]);

  const fetchPosts = () => trpc["post.get"].query().then(setPosts);

  return (
    <div>
      <Button
        onClick={() => {
          trpc["hello"].query().then(setHelloResponse);
        }}
      >
        Hello
      </Button>

      {helloResponse}

      <hr />

      <Button
        onClick={() => {
          trpc["post.create"].mutate({ name: `Random Post ${Math.random()}` })
            .then(
              fetchPosts,
            );
        }}
      >
        Create Random Post
      </Button>

      <hr />

      <Button onClick={fetchPosts}>Get Posts</Button>

      <ul>
        {posts.map((post, i) => <li key={i}>{post.name}</li>)}
      </ul>
    </div>
  );
}
