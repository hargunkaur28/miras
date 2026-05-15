import { Link } from '@inertiajs/react';
import { Building2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0c] relative overflow-hidden font-sans selection:bg-primary/30">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 w-full max-w-md px-4"
            >
                <div className="flex flex-col items-center mb-8">
                    <Link href="/" className="group">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-blue-500 flex items-center justify-center shadow-2xl shadow-purple-500/30 group-hover:scale-110 transition-transform duration-500">
                            <Building2 className="text-white w-8 h-8" />
                        </div>
                    </Link>
                    <h1 className="mt-6 text-3xl font-black text-white tracking-tighter uppercase">MSIRMS</h1>
                    <p className="text-gray-500 text-sm font-medium tracking-wide">Enterprise Resource Gateway</p>
                </div>

                <div className="glass-card rounded-[2.5rem] p-10 border border-white/5 shadow-2xl backdrop-blur-3xl relative overflow-hidden">
                    {children}
                </div>

                <div className="mt-8 text-center">
                    <p className="text-gray-600 text-xs font-bold uppercase tracking-widest">
                        &copy; {new Date().getFullYear()} Micro/Small Industry Resource Management
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
