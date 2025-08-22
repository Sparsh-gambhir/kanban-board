import { useState } from "react";
import { useDispatch } from "react-redux";
import { signupOrLogin } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validate = () => {
    if (!/^\S+@\S+\.\S+$/.test(email)) return "Enter a valid email.";
    if (pass.length < 6) return "Password must be at least 6 characters.";
    return "";
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const msg = validate();
    if (msg) return setError(msg);
    dispatch(signupOrLogin({ email }));
    navigate("/board");
  };

  return (
    <div className="min-h-screen grid place-items-center px-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm bg-white rounded-xl shadow-card p-6 space-y-4"
      >
        <h1 className="text-xl font-semibold">Sign in / Sign up</h1>
        <div className="space-y-1">
          <label className="text-sm text-gray-600">Email</label>
          <input
            className="w-full border rounded-lg px-3 py-2 outline-none focus:ring focus:ring-indigo-100"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm text-gray-600">Password</label>
          <input
            type="password"
            className="w-full border rounded-lg px-3 py-2 outline-none focus:ring focus:ring-indigo-100 "
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder="••••••••"
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          className="w-full rounded-lg bg-indigo-600 text-white py-2 font-medium hover:opacity-95"
        >
          Continue
        </button>
      </form>
    </div>
  );
}
