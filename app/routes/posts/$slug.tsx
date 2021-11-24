import { useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import { getPost } from "~/post";
import type { Post } from "~/post";
import invariant from "tiny-invariant";

export const loader: LoaderFunction = async ({ params }) => {
  // post データを js としてブラウザに含めるのではなく、データソースから取得していることに注目
  // ファイル名を invariant で検証して型安全にすることは良い習慣
  invariant(params.slug, "expected params.slug");
  return getPost(params.slug);
};

export default function PostSlug() {
  const post = useLoaderData<Post>();

  return <div dangerouslySetInnerHTML={{ __html: post.html }} />;
}
