import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import {
    LayoutDashboard, ArrowRight, Building2, ChevronDown,
    CheckCircle2, BarChart3, Cog, Shield, TrendingUp,
    Lightbulb, Handshake, Star, Phone, Mail, MapPin, Plus, Minus, Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Professional, fluid easing function (Custom Cubic Bezier)
const premiumEase = [0.16, 1, 0.3, 1];

// Animation presets
const revealVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.6, ease: premiumEase }
    }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.05
        }
    }
};

const SERVICES = [
    {
        icon: <Cog className="w-6 h-6" />,
        tag: 'Core',
        title: 'Core Resource Operations',
        desc: 'End-to-end management of raw materials, inventory, machinery, and workforce allocation — giving you real-time visibility into every operational asset.',
        points: ['Inventory & stock tracking', 'Machine utilisation reports', 'Workforce scheduling', 'Supplier management'],
    },
    {
        icon: <BarChart3 className="w-6 h-6" />,
        tag: 'Analytics',
        title: 'Performance & Analytics',
        desc: 'Data-driven insights with live dashboards, automated reports, and predictive analytics to keep your operations ahead of the curve.',
        points: ['Custom KPI dashboards', 'Predictive demand forecasting', 'Cost variance analysis', 'Automated compliance reports'],
    },
];

const PROCESS = [
    { n: '01', title: 'Onboarding & Setup', desc: 'We configure the platform to match your industry workflows and data structure in under 48 hours.' },
    { n: '02', title: 'Data Migration', desc: 'Seamlessly migrate your existing records, inventory lists, and financial data with zero downtime.' },
    { n: '03', title: 'Team Training', desc: 'Role-based training sessions ensure every team member is productive from day one.' },
    { n: '04', title: 'Scale & Optimise', desc: 'Continuous support and quarterly reviews keep your system aligned with your growth.' },
];

const WHY = [
    { icon: <Lightbulb className="w-5 h-5" />, title: 'Built for Small Industry', desc: 'Designed specifically for micro and small manufacturers — not a scaled-down enterprise tool.' },
    { icon: <Users className="w-5 h-5" />, title: 'Dedicated Support Team', desc: 'A real human responds within 4 hours. No bots, no ticket queues.' },
    { icon: <TrendingUp className="w-5 h-5" />, title: 'Proven ROI', desc: 'Clients report an average 28% reduction in operational costs within the first quarter.' },
    { icon: <Shield className="w-5 h-5" />, title: 'Enterprise-Grade Security', desc: 'ISO 27001 aligned infrastructure with role-based access controls and audit logs.' },
    { icon: <Handshake className="w-5 h-5" />, title: '100% Free Platform', desc: 'No subscriptions, no hidden fees, and no locked features — completely free for small industries.' },
    { icon: <Cog className="w-5 h-5" />, title: 'Deep Integrations', desc: 'Connects with Tally, Zoho, GST portals, and all major Indian banking APIs.' },
];

const TESTIMONIALS = [
    { name: 'Rajiv Mehra', role: 'MD, Mehra Fabrications', stars: 5, text: 'MSIRMS eliminated our manual stock errors overnight. The real-time dashboards alone saved us two full-time positions worth of effort.' },
    { name: 'Sunita Patel', role: 'Owner, Patel Textiles', stars: 5, text: 'Implementation was shockingly smooth. Our team was fully trained in a day and we saw measurable improvements in the first week.' },
];

const FAQS = [
    { q: 'Is MSIRMS suitable for a business with under 20 employees?', a: 'Absolutely. The platform was purpose-built for micro and small industries, supporting teams of all sizes with zero feature restrictions.' },
    { q: 'How long does the onboarding process take?', a: 'Standard onboarding takes 24–48 hours. Complex data migrations may take up to 5 business days. We assign a dedicated onboarding manager to every new account.' },
    { q: 'Does it integrate with Tally ERP?', a: 'Yes. MSIRMS has a native two-way sync with Tally Prime and Tally ERP 9, keeping your accounts and inventory in perfect alignment.' },
    { q: 'What happens to my data if I decide to leave?', a: 'Your data belongs to you. You can export it in CSV/Excel format within 48 hours at any point, and all copies are permanently deleted from our servers per our data retention policy.' },
    { q: 'Is MSIRMS completely free?', a: 'Yes, MSIRMS is 100% free with full access to all modules. There are no premium gating mechanisms, hidden tiers, or credit card requirements.' },
];

function FaqItem({ q, a }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="border-b border-white/10 py-5">
            <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between text-left gap-4 group">
                <span className="text-base font-semibold text-white/90 group-hover:text-purple-300 transition-colors">{q}</span>
                <span className="relative flex items-center justify-center w-4 h-4 text-purple-400 shrink-0">
                    <motion.div
                        animate={{ rotate: open ? 90 : 0 }}
                        transition={{ duration: 0.3, ease: premiumEase }}
                        className="absolute"
                    >
                        {open ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </motion.div>
                </span>
            </button>
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: premiumEase }}
                        className="overflow-hidden"
                    >
                        <p className="mt-4 text-gray-400 text-sm leading-relaxed pr-8">{a}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function Welcome({ auth }) {
    return (
        <div className="bg-[#080808] text-white font-['Inter'] overflow-x-hidden antialiased">
            <Head title="MSIRMS — The Industry OS" />

            {/* NAV */}
            <motion.header
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: premiumEase }}
                className="fixed top-0 w-full z-50 bg-[#080808]/80 backdrop-blur-xl border-b border-white/[0.07]"
            >
                <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center">
                            <Building2 className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-lg font-bold tracking-tight">MSIRMS</span>
                    </div>
                    <nav className="hidden md:flex items-center gap-8 text-sm text-gray-400">
                        {['Services', 'Process', 'Why Us', 'Testimonials', 'FAQ'].map(l => (
                            <a key={l} href={`#${l.toLowerCase().replace(' ', '-')}`} className="hover:text-white transition-colors relative group py-1">
                                {l}
                                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                            </a>
                        ))}
                    </nav>
                    <div className="flex items-center gap-3">
                        <Link
                            href={auth.user ? route('dashboard') : route('login')}
                            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-gray-300 hover:text-white border border-white/10 hover:border-white/20 transition-all"
                        >
                            <LayoutDashboard className="w-4 h-4" />
                            {auth.user ? 'Dashboard' : 'Sign In'}
                        </Link>
                        <Link href={route('register')} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-purple-600 hover:bg-purple-500 transition-colors shadow-sm shadow-purple-600/10">
                            Get Free Access
                        </Link>
                    </div>
                </div>
            </motion.header>

            {/* HERO */}
            <section className="relative pt-36 pb-28 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.02)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.2, ease: premiumEase }}
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" 
                />
                
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                    >
                        <motion.div
                            variants={revealVariants}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-semibold uppercase tracking-widest mb-6"
                        >
                            Free Platform for Small Industry
                        </motion.div>
                        <motion.h1
                            variants={revealVariants}
                            className="text-5xl md:text-6xl font-black tracking-tight leading-[1.05] mb-6"
                        >
                            Transform Your Operations With{' '}
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">MSIRMS.</span>
                        </motion.h1>
                        <motion.p
                            variants={revealVariants}
                            className="text-gray-400 text-lg leading-relaxed mb-10 max-w-lg"
                        >
                            An enterprise-grade platform built for micro & small industries — manage resources, track finances, and drive operational excellence from a single dashboard.
                        </motion.p>
                        <motion.div
                            variants={revealVariants}
                            className="flex flex-col sm:flex-row gap-4"
                        >
                            <Link href={route('register')} className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-purple-600 hover:bg-purple-500 font-bold text-base transition-colors group shadow-lg shadow-purple-600/10">
                                Get Free Access <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                            </Link>
                            <button className="flex items-center justify-center px-8 py-4 rounded-xl border border-white/15 hover:border-white/30 text-gray-300 hover:text-white font-semibold text-base transition-all">
                                View Demo
                            </button>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.98, y: 15 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: premiumEase, delay: 0.2 }}
                        className="hidden md:block"
                    >
                        <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl p-8 space-y-4 shadow-2xl relative overflow-hidden group hover:border-white/15 transition-colors duration-500">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                            <p className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-5 relative z-10">All-in-One Platform Features</p>
                            
                            <div className="space-y-3 relative z-10">
                                {['Real-time inventory & stock management', 'Automated payroll & financial tracking', 'Production scheduling & machine logs', 'GST & compliance reporting', 'Role-based access for your entire team'].map((f, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <CheckCircle2 className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                                        <span className="text-gray-300 text-sm">{f}</span>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="mt-6 pt-5 border-t border-white/10 grid grid-cols-3 gap-3 text-center relative z-10">
                                {[['300+', 'Companies'], ['28%', 'Avg Cost Saving'], ['48h', 'Onboarding']].map(([v, l]) => (
                                    <div key={l} className="bg-white/5 rounded-xl py-3 px-2 border border-white/[0.03]">
                                        <p className="text-xl font-black text-purple-300">{v}</p>
                                        <p className="text-[11px] text-gray-500 mt-0.5">{l}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
                <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ delay: 0.8, duration: 0.5 }} 
                    className="flex justify-center mt-20"
                >
                    <ChevronDown className="w-5 h-5 text-white/20 animate-bounce" />
                </motion.div>
            </section>

            {/* ABOUT */}
            <section className="bg-[#0e0e0e] py-20 px-6 border-y border-white/[0.06]">
                <div className="max-w-5xl mx-auto text-center">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                    >
                        <motion.p variants={revealVariants} className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-4">About MSIRMS</motion.p>
                        <motion.h2 variants={revealVariants} className="text-3xl md:text-4xl font-black tracking-tight mb-6 leading-tight">
                            We believe every small manufacturer<br className="hidden md:block" /> deserves enterprise-grade tools.
                        </motion.h2>
                        <motion.p variants={revealVariants} className="text-gray-400 text-lg leading-relaxed max-w-3xl mx-auto mb-14">
                            Our mission is to eliminate the operational inefficiencies holding micro and small industries back — through intelligent software that is completely open, intuitive, and built for the shop floor.
                        </motion.p>
                    </motion.div>

                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                        className="grid md:grid-cols-2 gap-8 text-left"
                    >
                        <motion.div variants={revealVariants} className="bg-white/[0.02] border border-white/10 rounded-2xl p-8 hover:border-white/15 transition-colors duration-300">
                            <p className="text-sm font-bold text-purple-400 uppercase tracking-wider mb-3">Our Mission</p>
                            <p className="text-gray-300 leading-relaxed text-sm md:text-base">To empower micro and small industrial organisations with the software infrastructure that previously only Fortune 500 companies could afford — enabling smarter decisions, leaner operations, and sustainable growth.</p>
                        </motion.div>
                        <motion.div variants={revealVariants} className="bg-white/[0.02] border border-white/10 rounded-2xl p-8 hover:border-white/15 transition-colors duration-300">
                            <p className="text-sm font-bold text-pink-400 uppercase tracking-wider mb-3">Our Core Values</p>
                            <ul className="space-y-3">
                                {['Transparency in every interaction', 'Accessible tools for all factories', 'Continuous product innovation', 'Data privacy by default'].map(v => (
                                    <li key={v} className="flex items-center gap-2.5 text-gray-300 text-sm">
                                        <span className="w-1.5 h-1.5 rounded-full bg-pink-400 shrink-0" />{v}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* SERVICES */}
            <section id="services" className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={staggerContainer}
                        >
                            <motion.p variants={revealVariants} className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-3">Services</motion.p>
                            <motion.h2 variants={revealVariants} className="text-3xl md:text-4xl font-black tracking-tight">Our Comprehensive Platform Modules</motion.h2>
                            <motion.p variants={revealVariants} className="text-gray-400 mt-4 max-w-xl mx-auto">Everything you need to manage, optimise, and scale — delivered as one cohesive system.</motion.p>
                        </motion.div>
                    </div>

                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-60px" }}
                        variants={staggerContainer}
                        className="space-y-6"
                    >
                        {SERVICES.map((s, i) => (
                            <motion.div 
                                key={i} 
                                variants={revealVariants} 
                                className="grid md:grid-cols-[1fr_1.4fr] rounded-2xl border border-white/10 overflow-hidden bg-white/[0.01] hover:border-white/15 transition-colors duration-500 group"
                            >
                                <div className="p-8 md:p-10 border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-between relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/[0.01] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                    <div className="relative z-10">
                                        <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-purple-500/15 text-purple-300 border border-purple-500/20 mb-4">{s.tag}</span>
                                        <div className="text-purple-400 mb-4 group-hover:scale-105 transition-transform duration-300 origin-left ease-out">{s.icon}</div>
                                        <h3 className="text-xl font-bold text-white mb-3">{s.title}</h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
                                    </div>
                                </div>
                                <div className="p-8 md:p-10 bg-white/[0.005] flex flex-col justify-center">
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-5">Key Capabilities</p>
                                    <ul className="grid sm:grid-cols-2 gap-4">
                                        {s.points.map(p => (
                                            <li key={p} className="flex items-center gap-3 text-gray-300 text-sm">
                                                <CheckCircle2 className="w-4 h-4 text-purple-400/80 shrink-0" />
                                                <span>{p}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* CTA BAND */}
            <section className="relative py-20 px-6 bg-gradient-to-br from-purple-900/20 via-[#0e0e0e] to-pink-900/10 border-y border-white/[0.06] overflow-hidden">
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        <motion.h2 variants={revealVariants} className="text-3xl md:text-5xl font-black tracking-tight mb-6">Ready to Transform Your Workplace?</motion.h2>
                        <motion.p variants={revealVariants} className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">Join 300+ manufacturers already running leaner with MSIRMS.</motion.p>
                        <motion.div variants={revealVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href={route('register')} className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-black font-bold text-base hover:bg-gray-100 transition-colors group shadow-xl">
                                Get Free Access <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300 ease-out" />
                            </Link>
                            <button className="px-8 py-4 rounded-xl border border-white/20 text-white font-semibold hover:border-white/40 transition-all backdrop-blur-sm">
                                Have Questions? Contact Us
                            </button>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* PROCESS */}
            <section id="process" className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={staggerContainer}
                        >
                            <motion.p variants={revealVariants} className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-3">Process</motion.p>
                            <motion.h2 variants={revealVariants} className="text-3xl md:text-4xl font-black tracking-tight">Our Onboarding Process</motion.h2>
                        </motion.div>
                    </div>

                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-60px" }}
                        variants={staggerContainer}
                        className="grid sm:grid-cols-2 md:grid-cols-4 gap-6"
                    >
                        {PROCESS.map((p, i) => (
                            <motion.div 
                                key={i} 
                                variants={revealVariants}
                                className="bg-white/[0.02] border border-white/10 rounded-2xl p-7 hover:border-purple-500/30 transition-colors duration-300 group"
                            >
                                <p className="text-5xl font-black text-purple-500/10 mb-4 select-none group-hover:text-purple-500/20 transition-colors duration-300">{p.n}</p>
                                <h3 className="text-base font-bold text-white mb-2">{p.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{p.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* WHY US */}
            <section id="why-us" className="py-24 px-6 bg-[#0e0e0e] border-y border-white/[0.06]">
                <div className="max-w-7xl mx-auto grid md:grid-cols-[1fr_1.5fr] gap-16 items-start">
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                        className="md:sticky md:top-28"
                    >
                        <p className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-3">Why Choose MSIRMS</p>
                        <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight mb-6">Trusted by Leading Companies for Smarter Operations.</h2>
                        <p className="text-gray-400 leading-relaxed mb-8">We don't just provide software — we partner with you to ensure it delivers measurable results, every quarter.</p>
                        <motion.div variants={revealVariants}>
                            <Link href={route('register')} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 font-semibold text-sm transition-colors group shadow-md shadow-purple-600/10">
                                Get Started Free <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300 ease-out" />
                            </Link>
                        </motion.div>
                    </motion.div>

                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-60px" }}
                        variants={staggerContainer}
                        className="grid sm:grid-cols-2 gap-5"
                    >
                        {WHY.map((w, i) => (
                            <motion.div 
                                key={i} 
                                variants={revealVariants}
                                className="bg-white/[0.02] border border-white/10 rounded-xl p-5 hover:border-purple-500/25 transition-colors duration-300"
                            >
                                <div className="text-purple-400 mb-3">{w.icon}</div>
                                <p className="font-bold text-white text-sm mb-1.5">{w.title}</p>
                                <p className="text-gray-400 text-xs leading-relaxed">{w.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* TESTIMONIALS */}
            <section id="testimonials" className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={staggerContainer}
                        >
                            <motion.p variants={revealVariants} className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-3">Reviews</motion.p>
                            <motion.h2 variants={revealVariants} className="text-3xl md:text-4xl font-black tracking-tight">What Our Partners Are Saying.</motion.h2>
                        </motion.div>
                    </div>

                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-60px" }}
                        variants={staggerContainer}
                        className="grid md:grid-cols-2 gap-8"
                    >
                        {TESTIMONIALS.map((t, i) => (
                            <motion.div 
                                key={i} 
                                variants={revealVariants}
                                className="bg-white/[0.02] border border-white/10 rounded-2xl p-8 flex flex-col justify-between hover:border-white/15 transition-colors duration-300"
                            >
                                <div>
                                    <div className="flex gap-1 mb-5">
                                        {Array.from({ length: t.stars }).map((_, j) => (
                                            <Star key={j} className="w-4 h-4 fill-purple-400 text-purple-400" />
                                        ))}
                                    </div>
                                    <p className="text-gray-300 text-base leading-relaxed mb-6 italic">"{t.text}"</p>
                                </div>
                                <div className="flex items-center gap-3 border-t border-white/10 pt-5">
                                    <div className="w-10 h-10 rounded-full bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-300 font-bold text-sm select-none">
                                        {t.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div>
                                        <p className="font-bold text-white text-sm">{t.name}</p>
                                        <p className="text-gray-500 text-xs">{t.role}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* FAQ */}
            <section id="faq" className="py-24 px-6 bg-[#0e0e0e] border-y border-white/[0.06]">
                <div className="max-w-4xl mx-auto grid md:grid-cols-[1fr_1.6fr] gap-16">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        <motion.p variants={revealVariants} className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-3">Common Questions</motion.p>
                        <motion.h2 variants={revealVariants} className="text-3xl font-black tracking-tight leading-tight mb-6">Navigating Your Platform Needs With Clarity.</motion.h2>
                        <motion.div variants={revealVariants}>
                            <Link href={route('register')} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 font-semibold text-sm transition-colors group">
                                Get Free Access <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                            </Link>
                        </motion.div>
                    </motion.div>
                    
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={revealVariants}
                    >
                        {FAQS.map((f, i) => <FaqItem key={i} {...f} />)}
                    </motion.div>
                </div>
            </section>

            {/* CONTACT */}
            <section id="contact" className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-4">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={staggerContainer}
                        >
                            <motion.p variants={revealVariants} className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-3">Contact Us</motion.p>
                            <motion.h2 variants={revealVariants} className="text-3xl md:text-4xl font-black tracking-tight mb-4">Get in Touch with MSIRMS</motion.h2>
                            <motion.p variants={revealVariants} className="text-gray-400 max-w-xl mx-auto">Have questions about the platform or onboarding? We'd love to hear from you.</motion.p>
                        </motion.div>
                    </div>

                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.7, ease: premiumEase }}
                        className="mt-14 max-w-2xl mx-auto bg-white/[0.02] border border-white/10 rounded-3xl p-8 md:p-12 shadow-xl"
                    >
                        <h3 className="text-xl font-bold mb-8 text-center">Request a Free Consultation</h3>
                        <div className="space-y-4">
                            {[['Full Name', 'text'], ['Email Address', 'email'], ['Phone Number', 'tel'], ['Company Name', 'text']].map(([label, type]) => (
                                <div key={label}>
                                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">{label}</label>
                                    <input type={type} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 transition-colors duration-200" placeholder={label} />
                                </div>
                            ))}
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Message</label>
                                <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 transition-colors duration-200 resize-none" placeholder="Tell us about your business..." />
                            </div>
                            <button className="w-full py-4 rounded-xl bg-purple-600 hover:bg-purple-500 font-bold text-base transition-colors mt-2 shadow-md shadow-purple-600/10">Send Message</button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="bg-[#050505] border-t border-white/[0.07] pt-16 pb-8 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-10 mb-12">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center">
                                    <Building2 className="w-4 h-4 text-white" />
                                </div>
                                <span className="text-base font-bold">MSIRMS</span>
                            </div>
                            <p className="text-gray-500 text-sm leading-relaxed mb-5">The operating system for micro and small industry. Built in India, for India.</p>
                            <div className="flex gap-3">
                                {[Phone, Mail, MapPin].map((Icon, i) => (
                                    <div key={i} className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center hover:border-purple-500/30 cursor-pointer transition-colors duration-200">
                                        <Icon className="w-4 h-4 text-gray-400" />
                                    </div>
                                ))}
                            </div>
                        </div>
                        {[
                            { title: 'Contact Info', links: ['+91 800 555 1234', 'hello@msirms.in', 'Ludhiana, Punjab'] },
                            { title: 'Quick Links', links: ['Services', 'Case Studies', 'Documentation'] },
                            { title: 'Company', links: ['About Us', 'Careers', 'Blog', 'Privacy Policy'] },
                        ].map(col => (
                            <div key={col.title}>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">{col.title}</p>
                                <ul className="space-y-2.5">
                                    {col.links.map(l => (
                                        <li key={l}><a href="#" className="text-gray-500 text-sm hover:text-white transition-colors duration-200">{l}</a></li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <div className="border-t border-white/[0.07] pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <p className="text-gray-600 text-xs">© MSIRMS LLC 2025. All rights reserved.</p>
                        <p className="text-gray-600 text-xs">Terms & Conditions · Privacy Policy</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}