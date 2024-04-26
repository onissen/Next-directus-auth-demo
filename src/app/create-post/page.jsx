import CreatePostForm from "@/components/createPostForm/createPostForm";
import { cookies } from "next/headers";

const CreatePostPage = async () => {
  const cook = cookies().get("auth_user")
  const user = JSON.parse(cook.value)

  return (
    <div>
      <div>
        <div>
          <CreatePostForm userId = {user?.id} />
        </div>
      </div>
    </div>
  );
};

export default CreatePostPage;
