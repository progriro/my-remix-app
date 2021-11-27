import { Outlet, Link, useLoaderData } from "remix";
import { getPosts } from "~/post";
import type { Post } from "~/post";
import adminStyles from "~/styles/admin.css";

// <link> タグの配列を返す links 関数
// root.tsx の links 関数は全ページで読み込まれるが、それ以外はそのページがレンダリングされる際に読み込まれる
export const links = () => {
  return [{ rel: "stylesheet", href: adminStyles }];
};

export const loader = () => {
  return getPosts();
};

export default function Admin() {
  const posts = useLoaderData<Post[]>();

  return (
    <div className="admin">
      <nav>
        <h1>Admin</h1>
        <ul>
          {posts.map((post) => (
            <li key={post.slug}>
              <Link to={post.slug}>{post.title}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <main>
        {/* URL が routes/admin と一致すると Outlet 部分に routes/admin/index.tsx が読み込まれる */}
        <Outlet />
      </main>
    </div>
  );
}
