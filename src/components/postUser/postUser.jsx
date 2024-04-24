import styles from "./postUser.module.css";
import directus from "@/lib/directus";

const PostUser = async ({ user }) => {

  return (
    <div className={styles.container}>
      <img
        src={
          user?.photo
            ? `${directus.url}assets/${user.photo.filename_disk}?width=100`
            : "/noavatar.png"
        }
        alt=""
        fill
        className={styles.avatar}
      />
      <div className={styles.texts}>
        <span className={styles.title}>Author</span>
        <span
          className={styles.username}
        >{`${user?.first_name} ${user?.last_name}`}</span>
      </div>
    </div>
  );
};

export default PostUser;
