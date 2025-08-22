import { useState } from "react";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";

const AuthModal = ({ isOpen, onClose, onAuthSuccess }) => {
  const [activeTab, setActiveTab] = useState("login"); // "login" or "signup"

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
        {/* Close button */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Tabs */}
        <div className="flex mb-4">
          <button
            className={`flex-1 py-2 ${
              activeTab === "login" ? "border-b-2 border-blue-600" : ""
            }`}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
          <button
            className={`flex-1 py-2 ${
              activeTab === "signup" ? "border-b-2 border-blue-600" : ""
            }`}
            onClick={() => setActiveTab("signup")}
          >
            Sign Up
          </button>
        </div>

        {/* Tab content */}
        {activeTab === "login" ? (
          <Login onAuthSuccess={onAuthSuccess} />
        ) : (
          <Signup onAuthSuccess={onAuthSuccess} />
        )}
      </div>
    </div>
  );
};

export default AuthModal;
