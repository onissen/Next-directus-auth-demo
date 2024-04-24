"use client"

import { addPost } from "@/lib/action";
import styles from "./createPostForm.module.css";
import { useFormState } from "react-dom";

const CreatePostForm = ({userId}) => {
  const [state, formAction] = useFormState(addPost, undefined);
  
  return (
    <div className={styles.container}>
      <form action={formAction} >
        <h1>Add New Post</h1>
        <input type="hidden" name="userId" value={userId} />
        <input type="text" name="title" placeholder="Title" />
        <input type="file" name="image" placeholder="upload image" accept="image/*"/>
        <textarea type="text" name="content" placeholder="content" rows={10} />
        <button>Add</button>
        {state?.error}
      </form>
    </div>
  );
};

export default CreatePostForm;
