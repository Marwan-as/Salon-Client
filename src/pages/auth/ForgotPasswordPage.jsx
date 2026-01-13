import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Mail, ArrowLeft, Send, CheckCircle2 } from "lucide-react";
import Input from "../../components/Input";

const ForgotPasswordPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (data) => {
    // Simulate API Call
    console.log("Reset link requested for:", data.email);
    setUserEmail(data.email);

    // Simulate a delay for premium feel
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-300 p-4">
      <motion.div
        className="card w-full max-w-md shadow-2xl bg-white rounded-[40px] overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="card-body p-10">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              /* STEP 1: REQUEST FORM */
              <motion.div key="request" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                <header className="mb-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Mail size={32} />
                  </div>
                  <h2 className="text-4xl font-black tracking-tighter text-gray-800 uppercase leading-none">
                    Password <br />
                    <span className="text-primary">Recovery.</span>
                  </h2>
                  <p className="text-gray-500 font-medium mt-4 text-sm">Enter your email and we'll send you a secure link to reset your password.</p>
                </header>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="jane.doe@example.com"
                    error={errors?.email?.message}
                    {...register("email", {
                      required: "Email is required to proceed.",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
                        message: "Please enter a valid email address.",
                      },
                    })}
                  />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary btn-block h-14 rounded-2xl text-[12px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 border-none"
                  >
                    {isSubmitting ? (
                      <span className="loading loading-spinner"></span>
                    ) : (
                      <>
                        Send Reset Link <Send size={16} className="ml-2" />
                      </>
                    )}
                  </button>

                  <footer className="text-center pt-2">
                    <Link
                      to="/login"
                      className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-primary transition-colors"
                    >
                      <ArrowLeft size={14} /> Back to Login
                    </Link>
                  </footer>
                </form>
              </motion.div>
            ) : (
              /* STEP 2: SUCCESS STATE */
              <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-4">
                <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-green-500/20">
                  <CheckCircle2 size={40} />
                </div>
                <h2 className="text-3xl font-black tracking-tighter text-gray-800 uppercase mb-4">
                  Check your <span className="text-green-500">Inbox.</span>
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed mb-10">
                  We've sent a recovery link to <br />
                  <span className="font-bold text-gray-800">{userEmail}</span>. <br />
                  Please check your spam folder if you don't see it within a few minutes.
                </p>

                <div className="space-y-3">
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="btn btn-ghost btn-block h-14 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-400"
                  >
                    Didn't get it? Try again
                  </button>
                  <Link
                    to="/login"
                    className="btn btn-primary btn-block h-14 rounded-2xl text-[12px] font-black uppercase tracking-widest shadow-xl shadow-primary/20"
                  >
                    Return to Login
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPasswordPage;
