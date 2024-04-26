import PostCard from "@/components/postCard/postCard";
import { getPosts } from "@/lib/action";

const BlogPage = async () => {
  const posts = await getPosts()

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <PostCard post={post} />
        </div>
      ))}
    </div>
  );
};

export default BlogPage;
