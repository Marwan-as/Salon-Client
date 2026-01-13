import { motion } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext"; // Import your new hook
import Input from "../../components/Input";

const LoginPage = () => {
  const { login } = useAuth(); // Destructure login from context
  const navigate = useNavigate();
  const location = useLocation();

  // Determine where to send the user after login (defaults to dashboard)
  const from = location.state?.from?.pathname || "/dashboard";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    // 1. Simulate API call
    // In production: const response = await api.post("/auth/login", data);

    const mockUser = {
      id: "123",
      name: "Jane Doe",
      email: data.email,
      role: "customer", // This would come from your backend
      points: 1250,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
    };

    // 2. Update Global Auth State
    login(mockUser);

    // 3. Redirect back to where they wanted to go, or the dashboard
    navigate(from, { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-300 p-4">
      <motion.div
        className="card w-full max-w-md shadow-2xl bg-white rounded-[32px] overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="card-body p-10">
          <header className="mb-10 text-center">
            <h2 className="text-4xl font-black tracking-tighter text-gray-800 uppercase">
              Welcome <span className="text-primary text-outline">Back.</span>
            </h2>
            <p className="text-gray-500 font-medium mt-2 text-sm">Sign in to your premium hub</p>
          </header>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              error={errors?.email?.message}
              {...register("email", {
                required: "Email is required.",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
                  message: "Please enter a valid email address.",
                },
              })}
            />

            <div className="space-y-2">
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                error={errors?.password?.message}
                {...register("password", {
                  required: "Password is required.",
                })}
              />

              <div className="flex justify-between items-center px-1">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" className="checkbox checkbox-primary checkbox-xs rounded-md border-gray-300" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-primary transition-colors">Remember me</span>
                </label>
                <Link
                  to="/forgot-password"
                  size="sm"
                  className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline underline-offset-4"
                >
                  Forgot?
                </Link>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary btn-block h-14 rounded-2xl text-[12px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 border-none"
              >
                {isSubmitting ? <span className="loading loading-spinner"></span> : "Sign In"}
              </button>
            </div>

            <footer className="text-center pt-6">
              <p className="text-sm text-gray-400 font-medium">
                Don’t have an account?{" "}
                <Link to="/register" className="text-primary font-black hover:underline underline-offset-4">
                  Join Now
                </Link>
              </p>
            </footer>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
