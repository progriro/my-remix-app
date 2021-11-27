import { Form } from "remix";

export default function NewPost() {
  return (
    <Form method="post">
      <p>
        <label>
          Post Title: <input type="text" name="title" />
        </label>
      </p>
      <p>
        <label>
          Post Slug: <input type="text" name="slug" />
        </label>
      </p>
      <p>
        <label htmlFor="markdown">Markdown</label>
        <br />
        <textarea rows={20} name="markdown" />
      </p>
      <p>
        <button type="submit">Create Post</button>
      </p>
    </Form>
  );
}
