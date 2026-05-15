import { Head, Link, useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { 
    Mail, 
    Lock, 
    ArrowRight, 
    Eye, 
    EyeOff,
    CheckSquare,
    Square
} from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Login({ status, canResetPassword }) {
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Access Portal" />

            {status && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-bold">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">
                        Authorization Identity
                    </label>
                    <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-primary transition-colors" />
                        <input 
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="Email Address"
                            className="w-full pl-12 pr-4 py-4 bg-white/[0.03] border border-white/5 rounded-2xl text-sm text-white placeholder:text-gray-700 focus:ring-primary/20 focus:border-primary/50 transition-all outline-none"
                            autoComplete="username"
                        />
                    </div>
                    {errors.email && <p className="text-[10px] text-rose-500 font-bold ml-1">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between items-center px-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                            Secure Access Key
                        </label>
                        {canResetPassword && (
                            <Link href={route('password.request')} className="text-[10px] font-black uppercase tracking-widest text-primary hover:text-white transition-colors">
                                Recovery?
                            </Link>
                        )}
                    </div>
                    <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-primary transition-colors" />
                        <input 
                            type={showPassword ? 'text' : 'password'}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="Password"
                            className="w-full pl-12 pr-12 py-4 bg-white/[0.03] border border-white/5 rounded-2xl text-sm text-white placeholder:text-gray-700 focus:ring-primary/20 focus:border-primary/50 transition-all outline-none"
                            autoComplete="current-password"
                        />
                        <button 
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white transition-colors"
                        >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    </div>
                    {errors.password && <p className="text-[10px] text-rose-500 font-bold ml-1">{errors.password}</p>}
                </div>

                <div className="flex items-center justify-between px-1">
                    <button 
                        type="button"
                        onClick={() => setData('remember', !data.remember)}
                        className="flex items-center gap-2 group cursor-pointer"
                    >
                        {data.remember ? (
                            <CheckSquare className="w-4 h-4 text-primary" />
                        ) : (
                            <Square className="w-4 h-4 text-gray-700 group-hover:text-gray-500 transition-colors" />
                        )}
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 group-hover:text-gray-300 transition-colors">
                            Persistent Session
                        </span>
                    </button>
                </div>

                <button 
                    type="submit" 
                    disabled={processing}
                    className="w-full py-4 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 disabled:opacity-50 group"
                >
                    Establish Connection
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <div className="pt-2 text-center">
                    <Link href={route('register')} className="text-[10px] font-black uppercase tracking-widest text-gray-600 hover:text-white transition-colors">
                        New Organization? Register Entity
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}

