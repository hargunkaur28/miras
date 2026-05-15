import { Head, Link, useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { 
    User, 
    Mail, 
    Lock, 
    ShieldCheck, 
    ArrowRight,
    Briefcase
} from 'lucide-react';
import { motion } from 'framer-motion';

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
        <GuestLayout>
            <Head title="Establish Organization" />

            <form onSubmit={submit} className="space-y-5">
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">
                        Principal Identity
                    </label>
                    <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-primary transition-colors" />
                        <input 
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="Full Legal Name"
                            className="w-full pl-12 pr-4 py-4 bg-white/[0.03] border border-white/5 rounded-2xl text-sm text-white placeholder:text-gray-700 focus:ring-primary/20 focus:border-primary/50 transition-all outline-none"
                            autoComplete="name"
                            required
                        />
                    </div>
                    {errors.name && <p className="text-[10px] text-rose-500 font-bold ml-1">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">
                        Corporate Communication
                    </label>
                    <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-primary transition-colors" />
                        <input 
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="Official Email Address"
                            className="w-full pl-12 pr-4 py-4 bg-white/[0.03] border border-white/5 rounded-2xl text-sm text-white placeholder:text-gray-700 focus:ring-primary/20 focus:border-primary/50 transition-all outline-none"
                            autoComplete="username"
                            required
                        />
                    </div>
                    {errors.email && <p className="text-[10px] text-rose-500 font-bold ml-1">{errors.email}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">
                            Access Key
                        </label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-primary transition-colors" />
                            <input 
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="Security Key"
                                className="w-full pl-12 pr-4 py-4 bg-white/[0.03] border border-white/5 rounded-2xl text-sm text-white placeholder:text-gray-700 focus:ring-primary/20 focus:border-primary/50 transition-all outline-none"
                                autoComplete="new-password"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">
                            Verification
                        </label>
                        <div className="relative group">
                            <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-primary transition-colors" />
                            <input 
                                type="password"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                placeholder="Repeat Key"
                                className="w-full pl-12 pr-4 py-4 bg-white/[0.03] border border-white/5 rounded-2xl text-sm text-white placeholder:text-gray-700 focus:ring-primary/20 focus:border-primary/50 transition-all outline-none"
                                autoComplete="new-password"
                                required
                            />
                        </div>
                    </div>
                </div>
                {(errors.password || errors.password_confirmation) && (
                    <p className="text-[10px] text-rose-500 font-bold ml-1">
                        {errors.password || errors.password_confirmation}
                    </p>
                )}

                <div className="pt-4">
                    <button 
                        type="submit" 
                        disabled={processing}
                        className="w-full py-4 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 disabled:opacity-50 group"
                    >
                        Initialize Organization
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                <div className="pt-4 text-center">
                    <Link href={route('login')} className="text-[10px] font-black uppercase tracking-widest text-gray-600 hover:text-white transition-colors">
                        Existing Partner? Return to Portal
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}

