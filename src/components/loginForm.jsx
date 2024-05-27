"use client";
import { login } from "@/lib/action";
import { useFormState } from "react-dom";

const LoginForm = () => {
  const [state, formAction] = useFormState(login, undefined);

  return (
    <form action={formAction}>
      <input type="email" placeholder="email" name="email" />
      <input type="password" placeholder="password" name="password" />
      <button>Login</button>
      {state?.error}
    </form>
  );
};

export default LoginForm;
