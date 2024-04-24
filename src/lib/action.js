"use server";

import { revalidatePath } from "next/cache";
import { signIn, signOut } from "./auth";
import { createItem, createUser, deleteItem, readItem, readItems, updateItem, uploadFiles } from "@directus/sdk";
import directus from "@/lib/directus";
import { redirect } from "next/navigation";

export const uploadPostImage = async (image, title) => {
  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", image);

    const result = await directus.request(uploadFiles(formData));
    return result;
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};

export const addPost = async (prevState, formData) => {
  const { title, content, image, userId } = Object.fromEntries(formData);
  
  try {
    const postImage = await uploadPostImage(image, title);
    if(postImage) {
      const result = await directus.request(
        createItem("posts", {
          title,
          content,
          image: postImage.id,
          user_created: userId,
          user_role: process.env.USER_ROLE
        })
      );
      if(result.id) {
        console.log("saved to db", userId, result);
        revalidatePath("/blog");
        redirect("/blog")
      }
    }
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const deletePost = async (postId) => {
  try {
    await directus.request(deleteItem('posts', postId));
    revalidatePath("/blog");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const updatePost = async (formData) => {
  const { id, title, content, image, userId } = formData;
  let postImage = ""
  if(!image.id) {
    //upload image to directus
    const response = await uploadPostImage(image, title)
    if(response.id) {
      postImage = response.id
    }
  } else {
    //use image id
    postImage = image.id
  }

  try {
    const result = await directus.request(
      updateItem('posts', id, {
        title: title,
        image: postImage,
        user_updated: userId,
        content,
      })
    );
    if(result.id) {
      revalidatePath("/blog");
      redirect("/blog")
    }
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const handleLogout = async () => {
  await signOut();
  await directus.logout();
};

export const register = async (previousState, formData) => {
  try {
    const { first_name, last_name, email, password } =
      Object.fromEntries(formData);
    const result = await directus.request(
      createUser({
        first_name,
        last_name,
        email,
        password,
        role: process.env.USER_ROLE,
      })
    );
    return { message: "Account Created!", status: 201 };
  } catch (e) {
    console.log(e);
    const code = e.errors[0].extensions.code;
    if (code === "RECORD_NOT_UNIQUE") {
      return { message: "This user already exist", status: 409 };
    }
    return {
      message: "An unexpected error occurred, please try again",
      status: 500,
    };
  }
};

export const login = async (prevState, formData) => {
  const { email, password } = Object.fromEntries(formData);

  try {
    await signIn("credentials", { email, password });
  } catch (err) {
    console.log(err);
    if (err.message.includes("CredentialsSignin")) {
      return { error: "Invalid username or password" };
    }
    throw err;
  }
};

export const getPosts = async () => {
  try {
    const result = await directus.request(
      readItems("posts", {
        fields: [
          "title",
          "id",
          { author: ["name"] },
          "image.*",
          "content",
          "date_created",
          "user_created.*",
        ],
      })
    );
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getPost = async (slug) => {
  try {
    const post = await directus.request(
      readItem("posts", slug, {
        fields: [
          "title",
          "id",
          "author.*.*",
          "image.*",
          "content",
          "date_created",
          "user_created.*",
        ],
      })
    );

    return post;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch post!");
  }
};
