import styles from "./create.module.css";
import CreatePostForm from "@/components/createPostForm/createPostForm";
import { cookies } from "next/headers";

const AdminPage = async () => {
  const cook = cookies().get("auth_user")
  const user = JSON.parse(cook.value)

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.col}>
          <CreatePostForm userId = {user?.id} />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
