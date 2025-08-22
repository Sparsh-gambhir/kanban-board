import { useState, useEffect } from "react";
import KanbanBoard from "@/components/KanbanBoard.jsx";
import AuthModal from "@/components/auth/AuthModal.jsx";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("session") === "true");
  }, []);

  const handleLoginClick = () => setIsAuthModalOpen(true);
  const handleLogoutClick = () => {
    localStorage.removeItem("session");
    localStorage.removeItem("currentUser");
    setIsLoggedIn(false);
  };
  const handleAuthSuccess = () => {
    setIsLoggedIn(true);
    setIsAuthModalOpen(false);
  };

  return (
    <>
      {isLoggedIn ? (
        <KanbanBoard
          isLoggedIn={isLoggedIn}
          onLoginClick={handleLoginClick}
          onLogoutClick={handleLogoutClick}
        />
      ) : (
        <div className="min-h-screen flex items-center justify-center">
          <button
            className="bg-blue-600 text-white px-5 py-2 rounded-full"
            onClick={handleLoginClick}
          >
            Login / Sign up
          </button>
        </div>
      )}

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />
    </>
  );
};

export default Index;
