import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Info, Check, X } from "lucide-react"; // Added X for close
import Input from "../../components/Input";

const RegisterPage = () => {
  const [role, setRole] = useState("customer");
  const [openPassDialog, setOpenPassDialog] = useState(false);

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      password_confirmation: "",
      register_as: "customer",
      salon_name: "",
    },
  });

  const password = watch("password", "");
  const confirmPassword = watch("password_confirmation", "");

  // Refined Logic: Conditions check real-time input
  const passwordConditions = [
    { label: "At least 8 characters", test: password.length >= 8 },
    { label: "One uppercase letter (A-Z)", test: /[A-Z]/.test(password) },
    { label: "One lowercase letter (a-z)", test: /[a-z]/.test(password) },
    { label: "One number (0-9)", test: /\d/.test(password) },
    { label: "One special character", test: /[!@#$%^&*()_+\-={}[\]|:;"'<>,.?/~`]/.test(password) },
    { label: "Passwords match", test: confirmPassword && confirmPassword === password },
  ];

  const onSubmit = (data) => console.log(data);

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-300 p-4 relative overflow-x-hidden">
      <motion.div className="card w-full max-w-lg shadow-2xl bg-white rounded-[32px]" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="card-body p-8">
          <header className="mb-8 text-center">
            <h2 className="text-4xl font-black tracking-tighter text-gray-800 uppercase">Join Us.</h2>
            <p className="text-gray-500 font-medium">Create your premium account today</p>
          </header>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input label="Full Name" placeholder="Jane Doe" {...register("name", { required: "Name is required." })} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Email" type="email" placeholder="you@example.com" {...register("email", { required: "Email required." })} />
              <Input label="Phone" type="tel" placeholder="+961 70 123 456" {...register("phone", { required: "Phone required." })} />
            </div>

            {/* PASSWORD SECTION WITH FIXED DIALOG */}
            <div className="relative">
              <Input
                label="Password"
                labelAddon={
                  <Info
                    size={18}
                    className={`cursor-pointer transition-colors ${openPassDialog ? "text-primary" : "text-gray-400"}`}
                    onClick={() => setOpenPassDialog(!openPassDialog)}
                  />
                }
                type="password"
                placeholder="••••••••"
                error={errors?.password?.message}
                {...register("password", { required: "Password required." })}
              />

              <AnimatePresence>
                {openPassDialog && (
                  <motion.div
                    key="pass-dialog"
                    initial={{ opacity: 0, scale: 0.9, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.9, x: 20 }}
                    // Use fixed or absolute with high z-index
                    className="absolute z-[60] w-full md:w-64 p-5 bg-white border border-gray-100 rounded-3xl shadow-2xl md:left-[105%] md:top-0 left-0 top-full mt-2"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <p className="font-black text-[10px] uppercase tracking-[0.2em] text-gray-400">Security Check</p>
                      <X size={14} className="cursor-pointer text-gray-400" onClick={() => setOpenPassDialog(false)} />
                    </div>
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
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
              error={errors?.password_confirmation?.message}
              {...register("password_confirmation", { required: "Required." })}
            />

            {/* ROLE TOGGLE */}
            <div className="form-control">
              <span className="label-text font-black text-[10px] uppercase tracking-widest text-gray-400 mb-2">Register As</span>
              <div className="grid grid-cols-2 gap-2 bg-gray-100 p-1.5 rounded-2xl">
                {["customer", "owner"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    className={`btn btn-sm h-10 border-none rounded-xl text-[10px] font-black uppercase tracking-widest ${
                      role === type ? "bg-white text-primary shadow-sm" : "bg-transparent text-gray-400"
                    }`}
                    onClick={() => {
                      setRole(type);
                      setValue("register_as", type);
                    }}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <AnimatePresence>
              {role === "owner" && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                  <Input label="Salon Name" placeholder="Glamour Studio" {...register("salon_name", { required: role === "owner" })} />
                </motion.div>
              )}
            </AnimatePresence>

            <button
              className="btn btn-primary btn-block h-14 rounded-2xl text-[12px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 mt-4 border-none"
              type="submit"
            >
              Create Account
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
