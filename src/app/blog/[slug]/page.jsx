import { redirect } from 'next/navigation'
import PostUser from "@/components/postUser/postUser";
import { Suspense } from "react";
import directus from "@/lib/directus";
import { deletePost, getPost } from "@/lib/action";
import Link from "next/link";
import { cookies } from "next/headers";

export const generateMetadata = async ({ params }) => {
  const { slug } = params;
  const post = await getPost(slug);

  return {
    title: post.title,
  };
};

const SinglePostPage = async ({ params }) => {
  const { slug } = params;
  const post = await getPost(slug);
  const cookie = cookies().get("auth_user")
  const user = JSON.parse(cookie.value)

  const handleDelete = async (data) => {
    "use server";
    const postId = data.get("postId");
    deletePost(postId)
    redirect('/blog')
  };

  return (
    <div>
      {post.image && (
        <div>
          <img src={post.image ? `${directus.url}assets/${post.image.filename_disk}?width=400` : "/noavatar.png" } alt="" fill/>
        </div>
      )}
      <div>
        <h1>{post.title}</h1>
        <div>
          {post && (
            <Suspense fallback={<div>Loading...</div>}>
              <PostUser user={post.user_created} />
            </Suspense>
          )}
          <div>
            <span>Published</span>
            <span>
              {post.date_created.toString().slice(2, 16)}
            </span>
          </div>
          {user?.id === post?.user_created?.id &&  <div>
            <Link href={`/update-post/${post.id}`}>Edit</Link>
            <form action={handleDelete}>
            <input name="postId" style={{visibility: "hidden"}} value={post?.id}/>
            <input name="userId" style={{visibility: "hidden"}} value={user?.id}/>
            <button >Delete</button>
          </form>
          </div>}
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
      </div>
    </div>
  );
};

export default SinglePostPage;
