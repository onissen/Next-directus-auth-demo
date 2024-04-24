import styles from "./update.module.css";
import { getPost } from "@/lib/action";
import { cookies } from "next/headers";
import UpdatePostForm from "@/components/updatePostForm/updatePostForm";

const UpdatePage = async ({ params }) => {
  const { slug } = params;

  // FETCH DATA WITH AN API
  const post = {
    id: 1,
    title: "Kekeeke",
    image: "jbjghj",
    content: "Pepepepepepe",
  }
  const cook = cookies().get("auth_user")
  const user = JSON.parse(cook.value)

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.col}>
          <UpdatePostForm post={post} userId = {user?.id} />
        </div>
      </div>
    </div>
  );
};

export default UpdatePage;
