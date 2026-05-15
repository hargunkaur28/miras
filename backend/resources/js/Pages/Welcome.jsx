import { Head, Link } from '@inertiajs/react';
import { 
    LayoutDashboard, 
    ArrowRight,
    Building2,
    PieChart,
    Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';

// React Bits Components
import DotGrid from '@/Components/ReactBits/DotGrid';
import ShinyText from '@/Components/ReactBits/ShinyText';
import StarBorder from '@/Components/ReactBits/StarBorder';
import SplitText from '@/Components/ReactBits/SplitText';
import BorderGlow from '@/Components/ReactBits/BorderGlow';

const FloatingWidget = ({ children, delay = 0, x = 0, y = 0, className = "" }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ 
            opacity: 1, 
            y: [y, y - 15, y],
        }}
        transition={{ 
            delay,
            duration: 0.8,
            y: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }}
        className={`absolute z-20 pointer-events-none ${className}`}
        style={{ left: x, top: y }}
    >
        <div className="glass p-4 rounded-2xl shadow-2xl border border-white/10 backdrop-blur-2xl">
            {children}
        </div>
    </motion.div>
);

export default function Welcome({ auth }) {
    return (
        <div className="min-h-screen bg-[#030303] text-white selection:bg-purple-500 selection:text-white overflow-hidden font-['Inter'] relative">
            <Head title="MSIRMS - The Industry OS" />

            <DotGrid 
                dotColor="rgba(168, 85, 247, 0.2)" 
                gap={35} 
                hoverRadius={250} 
                className="opacity-70"
            />

            <div className="fixed top-[-5%] left-[-5%] w-[50%] h-[50%] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none" />
            <div className="fixed bottom-[-5%] right-[-5%] w-[50%] h-[50%] bg-pink-600/10 blur-[150px] rounded-full pointer-events-none" />

            <nav className="fixed top-0 w-full z-50 py-8 px-6 md:px-12">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                            <Building2 className="text-purple-400 w-5 h-5" />
                        </div>
                        <span className="text-xl font-bold tracking-tighter">MSIRMS</span>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <Link
                            href={auth.user ? route('dashboard') : route('login')}
                            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 transition-all font-bold text-sm"
                        >
                            <LayoutDashboard className="w-4 h-4 text-purple-400" />
                            {auth.user ? 'Dashboard' : 'Sign In'}
                        </Link>
                    </div>
                </div>
            </nav>

            <main className="relative z-10 pt-40 pb-20 px-6">
                <div className="max-w-6xl mx-auto relative">
                    <FloatingWidget x="5%" y="150px" delay={0.2} className="hidden xl:block">
                        <div className="space-y-3">
                            <div className="flex items-center justify-between gap-8 text-[10px] font-black uppercase text-gray-500">
                                <span>Stats</span>
                                <span className="text-emerald-400">+32.5%</span>
                            </div>
                            <div className="h-1.5 w-32 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 w-[70%]" />
                            </div>
                        </div>
                    </FloatingWidget>

                    <FloatingWidget x="85%" y="100px" delay={0.4} className="hidden xl:block">
                        <div className="flex flex-col items-center gap-2 text-pink-400">
                            <PieChart className="w-8 h-8" />
                        </div>
                    </FloatingWidget>

                    <div className="relative z-10 glass-card rounded-[3rem] p-12 md:p-24 border border-white/10 bg-black/60 backdrop-blur-3xl overflow-hidden group shadow-[0_0_100px_rgba(0,0,0,0.8)]">
                        <div className="relative z-10 text-center space-y-12">
                            <div className="flex justify-center">
                                <StarBorder color="#c084fc" speed="3s" className="rounded-full">
                                    <ShinyText 
                                        text="Micro/Small Industry Resource Management" 
                                        className="text-[11px] font-black uppercase tracking-[0.3em] px-4"
                                    />
                                </StarBorder>
                            </div>

                            <div className="space-y-6">
                                <h1 className="text-6xl md:text-8xl font-black tracking-tight text-white leading-[0.9]">
                                    <span className="block mb-4">The OS for</span>
                                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500">Modern Industry.</span>
                                </h1>
                            </div>

                            <div className="max-w-2xl mx-auto p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-2xl">
                                <p className="text-gray-300 text-xl font-medium leading-relaxed">
                                    Scale your business with an enterprise-grade SaaS platform designed for resource management, 
                                    financial tracking, and operational excellence.
                                </p>
                            </div>

                            {/* Action Buttons - Stripped of problematic animations */}
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-6">
                                <BorderGlow glowColor="#a855f7" className="w-full sm:w-auto rounded-2xl">
                                    <Link
                                        href={route('register')}
                                        className="w-full sm:w-auto px-12 py-6 bg-white text-black font-black text-xl flex items-center justify-center gap-4 hover:bg-gray-100 transition-colors group"
                                    >
                                        Start Free Trial
                                        <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </BorderGlow>

                                <button className="w-full sm:w-auto px-12 py-6 rounded-2xl bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all font-black text-xl backdrop-blur-xl">
                                    View Demo
                                </button>
                            </div>
                        </div>

                        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/15 blur-[120px] -z-10" />
                        <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-500/15 blur-[120px] -z-10" />
                    </div>
                </div>

                <div className="mt-16 text-center">
                    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-xs font-black text-gray-400 uppercase tracking-widest">
                        Redesigned with React Bits
                        <Sparkles className="w-4 h-4 text-purple-400" />
                    </div>
                </div>
            </main>
        </div>
    );
}
