import Image from "next/image"
import styles from "./postCard.module.css"
import Link from "next/link"
import directus from "@/lib/directus"
import PostUser from "../postUser/postUser"

const PostCard = async ({post}) => {

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        {post.image && <div className={styles.imgContainer}>
          <img src={`${directus.url}assets/${post.image.filename_disk}?width=300`} alt="" fill className={styles.img}/>
        </div>}
      </div>
      <div className={styles.bottom}>
        <h1 className={styles.title}>{post.title}</h1>
       
        <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
        <div className={styles.spaceY}>
          <PostUser user={post.user_created} />
        </div>
        <Link className={styles.link} href={`/blog/${post.id}`}>READ MORE</Link>
      </div>
    </div>
  )
}

export default PostCard