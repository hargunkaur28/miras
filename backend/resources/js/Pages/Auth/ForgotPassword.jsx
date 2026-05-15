import { Head, useForm, Link } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Mail, ArrowLeft, Send } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Access Recovery" />

            <div className="mb-8 text-sm text-gray-500 leading-relaxed font-medium">
                Identity verification required. Provide your registered email address to receive a secure access restoration key.
            </div>

            {status && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-bold">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">
                        Registered Communication
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

                <button 
                    type="submit" 
                    disabled={processing}
                    className="w-full py-4 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 disabled:opacity-50 group"
                >
                    Dispatch Recovery Key
                    <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>

                <div className="pt-2 text-center">
                    <Link href={route('login')} className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-600 hover:text-white transition-colors group">
                        <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                        Return to Authentication
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}

