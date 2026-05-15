import { Head, useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Mail, Lock, ShieldCheck, ArrowRight, Key } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Establish New Access" />

            <div className="mb-8 flex items-center gap-3">
                <div className="p-2 rounded-xl bg-primary/10 border border-primary/20 text-primary">
                    <Key className="w-5 h-5" />
                </div>
                <div>
                    <h2 className="text-lg font-bold text-white tracking-tight">Security Restoration</h2>
                    <p className="text-xs text-gray-500">Establish your new cryptographic access key.</p>
                </div>
            </div>

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
                            required
                        />
                    </div>
                    {errors.email && <p className="text-[10px] text-rose-500 font-bold ml-1">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">
                        New Secure Key
                    </label>
                    <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-primary transition-colors" />
                        <input 
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="New Password"
                            className="w-full pl-12 pr-4 py-4 bg-white/[0.03] border border-white/5 rounded-2xl text-sm text-white placeholder:text-gray-700 focus:ring-primary/20 focus:border-primary/50 transition-all outline-none"
                            autoComplete="new-password"
                            required
                        />
                    </div>
                    {errors.password && <p className="text-[10px] text-rose-500 font-bold ml-1">{errors.password}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">
                        Confirm New Key
                    </label>
                    <div className="relative group">
                        <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-primary transition-colors" />
                        <input 
                            type="password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            placeholder="Confirm New Password"
                            className="w-full pl-12 pr-4 py-4 bg-white/[0.03] border border-white/5 rounded-2xl text-sm text-white placeholder:text-gray-700 focus:ring-primary/20 focus:border-primary/50 transition-all outline-none"
                            autoComplete="new-password"
                            required
                        />
                    </div>
                    {errors.password_confirmation && <p className="text-[10px] text-rose-500 font-bold ml-1">{errors.password_confirmation}</p>}
                </div>

                <button 
                    type="submit" 
                    disabled={processing}
                    className="w-full py-4 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 disabled:opacity-50 group"
                >
                    Update Access Key
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
            </form>
        </GuestLayout>
    );
}

