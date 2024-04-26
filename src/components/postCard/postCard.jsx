import Link from "next/link"
import directus from "@/lib/directus"
import PostUser from "../postUser/postUser"

const PostCard = async ({post}) => {

  return (
    <div >
      <div>
        {post.image && <div >
          <img src={`${directus.url}assets/${post.image.filename_disk}?width=300`} alt="" fill/>
        </div>}
      </div>
      <div >
        <h1>{post.title}</h1>
       
        <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
        <div >
          <PostUser user={post.user_created} />
        </div>
        <Link href={`/blog/${post.id}`}>READ MORE</Link>
      </div>
    </div>
  )
}

export default PostCard