"use client"

import { updatePost } from "@/lib/action";
import styles from "./updatePostForm.module.css";
import { useState } from "react";

const UpdatePostForm = ({userId, post}) => {
  // const [state, formAction] = useFormState(updatePost, {title: post.title});
  const [formState, setFormState] = useState({
    id: post.id,
    title: post.title,
    image: post.image,
    content: post.content,
    userId
  });

  const handleSubmit = () => {
    updatePost(formState)
  }
  
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <h1>Update {post.title}</h1>
        <input type="text" name="title" value={formState.title} onChange={(e)=> setFormState({...formState, title: e.target.value}) } placeholder="Title" />
        <input type="file" name="image" onChange={(e)=> setFormState({...formState, image: e.target.files[0]}) } placeholder="upload image" accept="image/*"/>
        <textarea type="text" name="content" value={formState.content} onChange={(e)=> setFormState({...formState, content: e.target.value}) } placeholder="content" rows={10} />
        <button>Update</button>
      </form>
    </div>
  );
};

export default UpdatePostForm;
