import { getPost } from "@/lib/action";
import { cookies } from "next/headers";
import UpdatePostForm from "@/components/updatePostForm/updatePostForm";

const UpdatePage = async ({ params }) => {
  const { slug } = params;
  const post = await getPost(slug);
  const cook = cookies().get("auth_user")
  const user = JSON.parse(cook.value)

  return (
    <div>
      <div>
        <div>
          <UpdatePostForm post={post} userId = {user?.id} />
        </div>
      </div>
    </div>
  );
};

export default UpdatePage;
