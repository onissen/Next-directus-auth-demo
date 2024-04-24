import { redirect } from 'next/navigation'
import styles from "./singlePost.module.css";
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
    <div className={styles.container}>
      {post.image && (
        <div className={styles.imgContainer}>
          {/*<Image src={post.image} alt="" fill className={styles.img} />*/}
          <img src={post.image ? `${directus.url}assets/${post.image.filename_disk}?width=400` : "/noavatar.png" } alt="" fill className={styles.img}/>
        </div>
      )}
      <div className={styles.textContainer}>
        <h1 className={styles.title}>{post.title}</h1>
        <div className={styles.detail}>
          {post && (
            <Suspense fallback={<div>Loading...</div>}>
              <PostUser user={post.user_created} />
            </Suspense>
          )}
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Published</span>
            <span className={styles.detailValue}>
              {post.date_created.toString().slice(2, 16)}
            </span>
          </div>
          {console.log({authUser: user?.id, author: post})}
          {user?.id === post?.user_created?.id &&  <div className={styles.btnContainer}>
            <Link href={`/update-post/${post.id}`} style={{color: "white", backgroundColor: "green" }} className={styles.btn}>Edit</Link>
            <form action={handleDelete}>
            <input name="postId" style={{visibility: "hidden"}} value={post?.id}/>
            <input name="userId" style={{visibility: "hidden"}} value={user?.id}/>
            <button style={{color: "white", backgroundColor: "red" }} className={styles.btn}>Delete</button>
          </form>
          </div>}
        </div>
        <div className={styles.content} dangerouslySetInnerHTML={{ __html: post.content }}></div>
      </div>
    </div>
  );
};

export default SinglePostPage;
