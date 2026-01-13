import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Lock, Check, Info, ShieldCheck } from "lucide-react";
import Input from "../../components/Input";

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [openPassDialog, setOpenPassDialog] = useState(false);
  const [token, setToken] = useState(null);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { password: "", password_confirmation: "" },
  });

  const password = watch("password", "");
  const confirmPassword = watch("password_confirmation", "");

  useEffect(() => {
    const t = searchParams.get("token");
    if (!t) {
      // If no token exists, they shouldn't be here
      navigate("/login");
    }
    setToken(t);
  }, [searchParams, navigate]);

  const passwordConditions = [
    { label: "At least 8 characters", test: password.length >= 8 },
    { label: "One uppercase letter", test: /[A-Z]/.test(password) },
    { label: "One number (0-9)", test: /\d/.test(password) },
    { label: "One special character", test: /[!@#$%^&*]/.test(password) },
    { label: "Passwords match", test: confirmPassword && confirmPassword === password },
  ];

  const onSubmit = async (data) => {
    console.log("Resetting password with token:", token, "New Pass:", data.password);
    // @TODO: API call to update password
    // On success:
    navigate("/login", { state: { message: "Password updated successfully!" } });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-300 p-4">
      <motion.div className="card w-full max-w-md shadow-2xl bg-white rounded-[40px]" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
        <div className="card-body p-10">
          <header className="mb-8 text-center">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
              <ShieldCheck size={32} />
            </div>
            <h2 className="text-4xl font-black tracking-tighter text-gray-800 uppercase leading-none">
              New <br />
              <span className="text-primary">Credentials.</span>
            </h2>
            <p className="text-gray-500 font-medium mt-4 text-sm">Please choose a strong password that you haven't used before.</p>
          </header>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="relative">
              <Input
                label="New Password"
                type="password"
                placeholder="••••••••"
                labelAddon={
                  <Info
                    size={18}
                    className={`cursor-pointer transition-colors ${openPassDialog ? "text-primary" : "text-gray-400"}`}
                    onClick={() => setOpenPassDialog(!openPassDialog)}
                  />
                }
                error={errors?.password?.message}
                {...register("password", { required: "Password is required" })}
              />

              <AnimatePresence>
                {openPassDialog && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="absolute z-50 w-64 p-5 bg-white border border-gray-100 rounded-3xl shadow-2xl md:left-[110%] md:top-0 left-0 top-full mt-2"
                  >
                    <p className="font-black text-[10px] uppercase tracking-widest text-gray-400 mb-3">Requirements</p>
                    <ul className="space-y-2">
                      {passwordConditions.map((cond, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs">
                          <Check size={14} className={cond.test ? "text-success" : "text-gray-300"} />
                          <span className={cond.test ? "text-gray-800 font-bold" : "text-gray-400"}>{cond.label}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Input
              label="Confirm New Password"
              type="password"
              placeholder="••••••••"
              error={errors?.password_confirmation?.message}
              {...register("password_confirmation", {
                required: "Please confirm your password",
                validate: (v) => v === password || "Passwords do not match",
              })}
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary btn-block h-14 rounded-2xl text-[12px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 border-none"
            >
              {isSubmitting ? <span className="loading loading-spinner"></span> : "Update Password"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default ResetPasswordPage;
