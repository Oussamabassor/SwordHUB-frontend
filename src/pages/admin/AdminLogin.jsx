import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { LogIn, Loader } from "lucide-react";

export const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login(credentials);
      navigate("/admin");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-8 sm:py-12 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="p-6 bg-white border border-gray-200 shadow-xl dark:bg-gray-800 rounded-2xl sm:p-8 dark:border-gray-700">
          <div className="text-center">
            {/* Logo */}
            <div className="flex justify-center mb-10 sm:mb-6">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl animate-pulse"></div>
                <img
                  src="/images/logo/sword-logo.png"
                  alt="SwordHub Logo"
                  className="relative object-contain w-16 h-16 mx-auto sm:w-20 sm:h-20 md:w-24 md:h-24 drop-shadow-lg"
                />
              </div>
            </div>

            <h2 className="mb-2 text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
              <span className="text-gray-900 dark:text-white">SWORD</span>
              <span className="text-primary">HUB</span>
            </h2>
            <p className="mb-1 text-xs font-medium text-gray-500 sm:text-sm dark:text-gray-400">
              Admin Portal
            </p>
            <p className="text-xs text-gray-600 sm:text-sm dark:text-gray-400">
              Sign in to manage your store
            </p>
          </div>

          <form className="mt-6 space-y-5 sm:mt-8" onSubmit={handleSubmit}>
            {error && (
              <div className="p-3 border border-red-200 rounded-lg sm:p-4 bg-red-50 dark:bg-red-900/20 dark:border-red-800">
                <p className="text-xs font-medium text-red-800 sm:text-sm dark:text-red-200">
                  {error}
                </p>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full px-4 py-3 text-base text-gray-900 placeholder-gray-400 transition-all border border-gray-300 rounded-lg appearance-none dark:border-gray-600 dark:placeholder-gray-500 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700"
                  placeholder="admin@swordhub.com"
                  value={credentials.email}
                  onChange={(e) =>
                    setCredentials({ ...credentials, email: e.target.value })
                  }
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full px-4 py-3 text-base text-gray-900 placeholder-gray-400 transition-all border border-gray-300 rounded-lg appearance-none dark:border-gray-600 dark:placeholder-gray-500 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700"
                  placeholder="Enter your password"
                  value={credentials.password}
                  onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="relative flex justify-center items-center w-full px-4 py-3.5 text-base font-semibold text-white border border-transparent rounded-lg group bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 mr-2 animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5 mr-2" />
                    <span>Sign in</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <p className="mt-4 text-xs text-center text-gray-500 dark:text-gray-400">
          © 2025 SwordHub. All rights reserved.
        </p>
      </div>
    </div>
  );
};


export default AdminLogin;
