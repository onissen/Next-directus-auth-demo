import directus from "@/lib/directus";

const PostUser = async ({ user }) => {

  return (
    <div>
      <img
        src={
          user?.photo
            ? `${directus.url}assets/${user.photo.filename_disk}?width=100`
            : "/noavatar.png"
        }
        alt=""
        fill
      />
      <div>
        <span>Author</span>
        <span
        >{`${user?.first_name} ${user?.last_name}`}</span>
      </div>
    </div>
  );
};

export default PostUser;
