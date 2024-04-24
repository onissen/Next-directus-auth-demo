"use client";

import { register } from "@/lib/action";
import styles from "./registerForm.module.css";
import { useFormState } from "react-dom";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const RegisterForm = () => {
  const [state, formAction] = useFormState(register, undefined);

  const router = useRouter();
  const [error, setError] = useState('')

  useEffect(() => {
    state?.status === 201 && router.push("/login");
    state?.status === 409 && setError('A user with this email already exist');
  }, [state?.status, router]);
  

  return (
    <form className={styles.form} action={formAction}>
      <input type="text" placeholder="First name" name="first_name" />
      <input type="text" placeholder="Last name" name="last_name" />
      <input type="email" placeholder="email" name="email" />
      <input type="password" placeholder="password" name="password" />
      <button>Register</button>
      {state?.error}
      <Link href="/login">
        Have an account? <b>Login</b>
      </Link>
      <p>{error}</p>
    </form>
  );
};

export default RegisterForm;
