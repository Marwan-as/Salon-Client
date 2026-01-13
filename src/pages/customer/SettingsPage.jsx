import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { User, Lock, Bell, CreditCard, Camera, Check, ShieldCheck, ChevronRight } from "lucide-react";

const SettingsPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Lock },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "billing", label: "Billing", icon: CreditCard },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      {/* HEADER */}
      <section className="bg-white border-b border-gray-100 pt-16 pb-12 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-2">Account Control</p>
          <h1 className="text-5xl font-black tracking-tighter text-gray-800 uppercase italic leading-none">
            Settings<span className="text-outline text-primary">.</span>
          </h1>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-6 -mt-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* SIDEBAR NAVIGATION */}
          <aside className="lg:w-1/4">
            <div className="bg-white rounded-[32px] p-4 shadow-sm border border-gray-100 sticky top-28">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all group ${
                    activeTab === tab.id ? "bg-primary text-white shadow-lg shadow-primary/20" : "hover:bg-gray-50 text-gray-400 hover:text-gray-800"
                  }`}
                >
                  <tab.icon size={18} />
                  <span className="text-[10px] font-black uppercase tracking-widest">{tab.label}</span>
                </button>
              ))}
            </div>
          </aside>

          {/* CONTENT AREA */}
          <section className="lg:w-3/4">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[40px] p-8 md:p-12 shadow-xl shadow-gray-200/50 border border-gray-100 min-h-[600px]"
            >
              {activeTab === "profile" && (
                <form onSubmit={handleSave} className="space-y-8">
                  <div className="flex items-center gap-8 mb-10">
                    <div className="relative group">
                      <div className="w-24 h-24 rounded-[32px] overflow-hidden ring-4 ring-gray-50 shadow-inner">
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`} alt="Avatar" className="bg-primary/10" />
                      </div>
                      <button
                        type="button"
                        className="absolute -bottom-2 -right-2 bg-white p-2 rounded-xl shadow-lg border border-gray-100 text-primary hover:scale-110 transition-transform"
                      >
                        <Camera size={16} />
                      </button>
                    </div>
                    <div>
                      <h2 className="text-xl font-black uppercase text-gray-800 tracking-tight italic">Personal Details</h2>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Manage your identity across the platform</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputGroup label="Full Name" placeholder={user?.name || "Jane Doe"} />
                    <InputGroup label="Email Address" placeholder={user?.email || "jane@example.com"} type="email" />
                    <InputGroup label="Phone Number" placeholder="+1 (555) 000-0000" />
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-1">Preferred Language</label>
                      <select className="select select-bordered rounded-2xl h-14 font-bold focus:outline-primary border-gray-200">
                        <option>English (US)</option>
                        <option>French</option>
                        <option>Spanish</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-gray-50 flex items-center justify-between">
                    <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest flex items-center gap-2">
                      <ShieldCheck size={14} className="text-green-500" /> Data is encrypted
                    </p>
                    <button type="submit" className="btn btn-primary rounded-2xl px-10 font-black uppercase tracking-widest text-[10px] h-14">
                      {isSaved ? (
                        <span className="flex items-center gap-2">
                          <Check size={16} /> Saved
                        </span>
                      ) : (
                        "Update Profile"
                      )}
                    </button>
                  </div>
                </form>
              )}

              {activeTab === "security" && (
                <div className="space-y-8">
                  <div className="mb-10">
                    <h2 className="text-xl font-black uppercase text-gray-800 tracking-tight italic">Security Settings</h2>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Update your password and 2FA</p>
                  </div>
                  <div className="space-y-4">
                    <SecurityCard title="Change Password" desc="Last updated 3 months ago" action="Update" />
                    <SecurityCard title="Two-Factor Authentication" desc="Currently disabled" action="Enable" highlight />
                    <SecurityCard title="Connected Devices" desc="3 Active sessions" action="Manage" />
                  </div>
                </div>
              )}

              {activeTab === "notifications" && (
                <div className="space-y-8">
                  <div className="mb-10">
                    <h2 className="text-xl font-black uppercase text-gray-800 tracking-tight italic">Communications</h2>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Control how we keep you updated</p>
                  </div>
                  <div className="space-y-6">
                    <ToggleItem title="Appointment Reminders" desc="Get SMS notifications 2 hours before your session" defaultChecked />
                    <ToggleItem title="Marketing Emails" desc="Receive offers, discounts, and salon news" />
                    <ToggleItem title="Loyalty Updates" desc="Notify me when I earn enough points for a reward" defaultChecked />
                  </div>
                </div>
              )}

              {activeTab === "billing" && (
                <div className="text-center py-20">
                  <CreditCard size={48} className="mx-auto text-gray-200 mb-6" />
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Payment methods coming soon</p>
                </div>
              )}
            </motion.div>
          </section>
        </div>
      </main>
    </div>
  );
};

// --- HELPER COMPONENTS ---

const InputGroup = ({ label, placeholder, type = "text" }) => (
  <div className="flex flex-col gap-2">
    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-1">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      className="input input-bordered rounded-2xl h-14 font-bold focus:outline-primary border-gray-200 placeholder:text-gray-300"
    />
  </div>
);

const SecurityCard = ({ title, desc, action, highlight }) => (
  <div className="flex items-center justify-between p-6 bg-gray-50 rounded-3xl border border-transparent hover:border-gray-200 transition-all">
    <div>
      <p className="font-black uppercase text-sm tracking-tight text-gray-800">{title}</p>
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{desc}</p>
    </div>
    <button className={`btn btn-sm rounded-xl font-black text-[10px] uppercase tracking-widest ${highlight ? "btn-primary" : "btn-ghost"}`}>{action}</button>
  </div>
);

const ToggleItem = ({ title, desc, defaultChecked }) => (
  <div className="flex items-center justify-between group">
    <div className="max-w-md">
      <p className="font-black uppercase text-sm tracking-tight text-gray-800 group-hover:text-primary transition-colors">{title}</p>
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-relaxed">{desc}</p>
    </div>
    <input type="checkbox" className="toggle toggle-primary" defaultChecked={defaultChecked} />
  </div>
);

export default SettingsPage;
