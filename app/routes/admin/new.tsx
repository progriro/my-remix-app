import { useActionData, redirect, Form } from "remix";
import type { ActionFunction } from "remix";
import { createPost } from "~/post";
import invariant from "tiny-invariant";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const title = formData.get("title");
  const slug = formData.get("slug");
  const markdown = formData.get("markdown");

  const errors = {
    title: !title,
    slug: !slug,
    markdown: !markdown,
  };

  if (Object.values(errors).some((e) => e === true)) {
    return errors;
  }

  invariant(typeof title === "string");
  invariant(typeof slug === "string");
  invariant(typeof markdown === "string");
  await createPost({ title, slug, markdown });

  return redirect("/admin");
};

export default function NewPost() {
  const errors = useActionData();

  return (
    <Form method="post">
      <p>
        <label>
          Post Title: {errors?.title && <em>Title is required</em>}
          <input type="text" name="title" />
        </label>
      </p>
      <p>
        <label>
          Post Slug: {errors?.slug && <em>Slug is required</em>}
          <input type="text" name="slug" />
        </label>
      </p>
      <p>
        <label htmlFor="markdown">Markdown:</label>{" "}
        {errors?.markdown && <em>Markdown is required</em>}
        <br />
        <textarea rows={20} name="markdown" />
      </p>
      <p>
        <button type="submit">Create Post</button>
      </p>
    </Form>
  );
}
