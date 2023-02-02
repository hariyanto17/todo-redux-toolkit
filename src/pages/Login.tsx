import { FormEvent, RefObject, useCallback, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import ShowIf from "../components/ShowIf";
import { authApi } from "../store";

const Login = () => {
  const navigate = useNavigate();
  const emailRef = useRef() as RefObject<HTMLInputElement>;
  const passwordRef = useRef() as RefObject<HTMLInputElement>;
  const [mutation, { isSuccess, isError, error }] = authApi.useLoginMutation();

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const email = emailRef.current?.value || "";
      const password = passwordRef.current?.value || "";
      if (email !== "" || password !== "") {
        mutation({ email, password });
      } else {
        console.log("email or password can't be null");
      }
    },
    [mutation, emailRef, passwordRef]
  );

  useEffect(() => {
    if (isSuccess) navigate("/");
    if (isError) console.log("error", error);
  }, [isSuccess, navigate, isError, error]);

  return (
    <div className="auth-container">
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <input ref={emailRef} placeholder="Email" autoComplete="username" />
        <input
          ref={passwordRef}
          placeholder="Password"
          type="password"
          autoComplete="current-password"
        />
        <button type="submit">Login</button>
      </form>
      <ShowIf show={true}>
        <Link to="/register">Go to Register</Link>
      </ShowIf>
    </div>
  );
};

export default Login;

// email: "hariyanto@mail.com", password: "H4r1y4nt0"
