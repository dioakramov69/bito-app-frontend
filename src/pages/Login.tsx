import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      console.log("SEND:", {
        email,
        password,
      });

      const res = await api.post(
        "/auth/login",
        {
          email,
          password,
        }
      );

      console.log(res.data);

      login(res.data);

      navigate("/");
    } catch (error: any) {
      console.log(
        "SERVER ERROR:",
        error.response?.data
      );
    }
  };

  return (
    <form onSubmit={submit}>
      <h2>Login</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <button>
        Login
      </button>
    </form>
  );
}