import { FormEvent, RefObject, useCallback, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "../store";

const Register = () => {
  const navigate = useNavigate();
  const nameRef = useRef() as RefObject<HTMLInputElement>;
  const emailRef = useRef() as RefObject<HTMLInputElement>;
  const passwordRef = useRef() as RefObject<HTMLInputElement>;
  const [mutation, { isSuccess, isError, error }] =
    authApi.useRegisterMutation();

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const name = nameRef.current?.value || "";
      const email = emailRef.current?.value || "";
      const password = passwordRef.current?.value || "";
      if (name !== "" || email !== "" || password !== "") {
        mutation({ email, password, name });
      }
    },
    [mutation]
  );

  useEffect(() => {
    if (isSuccess) navigate("/login");
    if (isError) console.log("error", error);
  }, [isSuccess, isError, error]);

  return (
    <div className="auth-container">
      <h1>Register</h1>
      <form onSubmit={onSubmit}>
        <input ref={nameRef} placeholder="Full Name" />
        <input ref={emailRef} placeholder="Email" autoComplete="username" />
        <input
          ref={passwordRef}
          placeholder="Password"
          type="password"
          autoComplete="current-password"
        />
        <button type="submit">Register</button>
      </form>
      <Link to="/login">Go to login</Link>
    </div>
  );
};

export default Register;
