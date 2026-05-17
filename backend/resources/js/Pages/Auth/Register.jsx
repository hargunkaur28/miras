import { Head, Link, useForm } from '@inertiajs/react';
import { 
    User, 
    Mail, 
    Lock, 
    ShieldCheck, 
    ArrowRight,
    Building2
} from 'lucide-react';
import { motion } from 'framer-motion';

// --- Animation Blueprints ---
const premiumEase = [0.16, 1, 0.3, 1];

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const fadeUpVariant = {
    hidden: { opacity: 0, y: 24 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.7, ease: premiumEase }
    }
};

const slideInLeft = {
    hidden: { opacity: 0, x: -40 },
    visible: { 
        opacity: 1, 
        x: 0,
        transition: { duration: 0.9, ease: premiumEase }
    }
};

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="min-h-screen bg-[#080808] text-white font-['Inter'] flex overflow-hidden antialiased relative">
            <Head title="Establish Organization — MSIRMS" />

            {/* Top gradient accent line */}
            <div className="absolute top-0 w-full h-[2px] bg-gradient-to-r from-green-500 via-yellow-500 to-green-500 z-50 opacity-80" />

            {/* LEFT SIDE: Branding Panel (The "Card") */}
            <motion.div 
                initial="hidden"
                animate="visible"
                variants={slideInLeft}
                className="hidden lg:flex lg:w-1/2 relative flex-col justify-center items-center p-12 border-r border-white/[0.05]"
            >
                {/* Background ambient glows */}
                <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />
                
                {/* Brand Card */}
                <div className="relative z-10 text-center max-w-md">
                    <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br from-[#8a2be2] to-[#4169e1] flex items-center justify-center mb-10 shadow-[0_0_40px_rgba(138,43,226,0.3)] border border-white/10">
                        <Building2 className="w-12 h-12 text-white" />
                    </div>
                    <h1 className="text-5xl font-serif tracking-tight mb-4 text-white">MSIRMS</h1>
                    <p className="text-xl font-medium text-gray-400 tracking-wide">Enterprise Resource Gateway</p>
                </div>
            </motion.div>

            {/* RIGHT SIDE: Authentication Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-12 relative z-10 overflow-y-auto">
                <motion.div 
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="w-full max-w-md py-8"
                >
                    {/* Mobile Header (Hidden on Desktop) */}
                    <div className="lg:hidden text-center mb-8">
                        <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[#8a2be2] to-[#4169e1] flex items-center justify-center mb-6 shadow-lg shadow-purple-500/20">
                            <Building2 className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-3xl font-serif tracking-tight text-white mb-2">MSIRMS</h1>
                        <p className="text-sm font-medium text-gray-400 uppercase tracking-widest">Enterprise Resource Gateway</p>
                    </div>

                    <div className="bg-[#0b0b0b] border border-white/[0.08] rounded-[2rem] p-8 sm:p-10 shadow-2xl relative">
                        {/* Inner subtle gradient */}
                        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent rounded-[2rem] pointer-events-none" />

                        <form className="relative z-10 space-y-6" onSubmit={submit}>
                            
                            {/* Principal Identity (Name) */}
                            <motion.div variants={fadeUpVariant} className="space-y-2">
                                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                                    Principal Identity
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-600 group-focus-within:text-[#8a2be2] transition-colors">
                                        <User className="w-5 h-5" />
                                    </div>
                                    <input 
                                        type="text" 
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Full Legal Name"
                                        className="w-full bg-[#f0f4f8] text-gray-900 border-none rounded-xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-[#8a2be2]/50 transition-all font-medium placeholder-gray-500"
                                        autoComplete="name"
                                        required
                                    />
                                </div>
                                {errors.name && <p className="text-[10px] text-rose-500 font-bold mt-1 ml-1">{errors.name}</p>}
                            </motion.div>

                            {/* Corporate Communication (Email) */}
                            <motion.div variants={fadeUpVariant} className="space-y-2">
                                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                                    Corporate Communication
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-600 group-focus-within:text-[#8a2be2] transition-colors">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <input 
                                        type="email" 
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="Official Email Address"
                                        className="w-full bg-[#f0f4f8] text-gray-900 border-none rounded-xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-[#8a2be2]/50 transition-all font-medium placeholder-gray-500"
                                        autoComplete="username"
                                        required
                                    />
                                </div>
                                {errors.email && <p className="text-[10px] text-rose-500 font-bold mt-1 ml-1">{errors.email}</p>}
                            </motion.div>

                            {/* Password Fields in a Grid (Access Key & Verification) */}
                            <motion.div variants={fadeUpVariant} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                                        Access Key
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-600 group-focus-within:text-[#8a2be2] transition-colors">
                                            <Lock className="w-5 h-5" />
                                        </div>
                                        <input 
                                            type="password" 
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            placeholder="Security Key"
                                            className="w-full bg-[#f0f4f8] text-gray-900 border-none rounded-xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-[#8a2be2]/50 transition-all font-medium placeholder-gray-500 tracking-widest"
                                            autoComplete="new-password"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                                        Verification
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-600 group-focus-within:text-[#8a2be2] transition-colors">
                                            <ShieldCheck className="w-5 h-5" />
                                        </div>
                                        <input 
                                            type="password" 
                                            value={data.password_confirmation}
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                            placeholder="Repeat Key"
                                            className="w-full bg-[#f0f4f8] text-gray-900 border-none rounded-xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-[#8a2be2]/50 transition-all font-medium placeholder-gray-500 tracking-widest"
                                            autoComplete="new-password"
                                            required
                                        />
                                    </div>
                                </div>
                            </motion.div>
                            {(errors.password || errors.password_confirmation) && (
                                <p className="text-[10px] text-rose-500 font-bold mt-1 ml-1">
                                    {errors.password || errors.password_confirmation}
                                </p>
                            )}

                            {/* Submit Button */}
                            <motion.div variants={fadeUpVariant} className="pt-4">
                                <button 
                                    type="submit" 
                                    disabled={processing}
                                    className="w-full bg-white text-black font-bold text-sm tracking-wider uppercase py-4 rounded-2xl hover:bg-gray-100 transition-all shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_40px_rgba(255,255,255,0.25)] flex items-center justify-center gap-2 group disabled:opacity-50"
                                >
                                    Initialize Organization
                                    <ArrowRight className="w-4 h-4 opacity-50 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </motion.div>

                        </form>
                    </div>

                    {/* Back to Login Link */}
                    <motion.div variants={fadeUpVariant} className="mt-8 text-center">
                        <Link href={route('login')} className="text-[11px] font-bold text-gray-500 hover:text-white uppercase tracking-widest transition-colors">
                            Existing Partner? Return to Portal
                        </Link>
                    </motion.div>

                </motion.div>
                
                {/* Bottom Footer */}
                <div className="absolute bottom-6 w-full text-center">
                    <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">
                        © 2026 Micro/Small Industry Resource Management
                    </p>
                </div>
            </div>
        </div>
    );
}
