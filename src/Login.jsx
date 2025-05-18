// src/Login.jsx
import { useState } from "react";

const fakeUsers = {
  nurse: [
    { username: "nurse001", password: "nursepass" },
    { username: "nurse002", password: "nursepass2" },
  ],
  headnurse: [
    { username: "headnurse", password: "admin123" },
  ],
};

export default function Login({ onLogin }) {
  const [role, setRole] = useState("nurse"); // default พยาบาล
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleLogin = () => {
    const userList = fakeUsers[role] || [];
    const match = userList.find(
      (u) => u.username === form.username && u.password === form.password
    );
    if (match) {
      onLogin({ ...match, role });
    } else {
      setError("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-4xl w-full rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row bg-white">
        {/* Left blue side */}
        <div className="hidden md:flex md:flex-col md:justify-center md:p-12 md:w-1/2 bg-gradient-to-tr from-blue-600 to-blue-400 text-white">
          <h2 className="text-4xl font-extrabold mb-6">ระบบบริหารจัดการโรงพยาบาล</h2>
        </div>

        {/* Right login form */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-3">ยินดีต้อนรับ</h2>

          {/* Role selector with animation */}
          <div className="flex mb-6 border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setRole("headnurse")}
              className={`flex-1 py-3 font-semibold transition-all duration-300 ease-in-out
      ${role === "headnurse"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }
      rounded-l-lg
      border-r border-gray-300
    `}
            >
              หัวหน้าพยาบาล
            </button>
            <button
              onClick={() => setRole("nurse")}
              className={`flex-1 py-3 font-semibold transition-all duration-300 ease-in-out
      ${role === "nurse"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }
      rounded-r-lg
    `}
            >
              พยาบาล
            </button>
          </div>


          <input
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            className="mb-4 w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="mb-4 w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          {error && <p className="text-red-600 mb-4">{error}</p>}

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-semibold transition"
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}
