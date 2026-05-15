import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { 
    Building2, 
    ArrowLeft, 
    Save, 
    X,
    ShieldCheck,
    Mail,
    Info
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function BusinessCreate() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        is_active: true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('super-admin.businesses.store'));
    };

    return (
        <AuthenticatedLayout header="Onboard New Business">
            <Head title="Register Business" />

            <div className="max-w-4xl mx-auto space-y-6">
                <div className="flex justify-between items-center">
                    <Link 
                        href={route('super-admin.businesses.index')}
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Ecosystem
                    </Link>
                </div>

                <div className="glass-card rounded-3xl p-8 relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-full bg-[#F9F9F9] flex items-center justify-center text-black shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                                <Building2 className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-serif font-bold text-white tracking-tight">Business Registration</h2>
                                <p className="text-gray-400 text-sm mt-1">Initialize a new isolated business entity on MSIRMS.</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-400 flex items-center gap-2">
                                        Entity Name
                                        <Info className="w-3 h-3 text-gray-600" />
                                    </label>
                                    <div className="relative group">
                                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-white transition-colors" />
                                        <input 
                                            type="text" 
                                            value={data.name}
                                            onChange={e => setData('name', e.target.value)}
                                            placeholder="e.g. Acme Manufacturing Ltd."
                                            className="w-full pl-11 pr-4 py-3 bg-white/[0.02] border border-white/10 rounded-full text-sm focus:ring-white focus:border-white transition-all text-white placeholder:text-gray-600"
                                        />
                                    </div>
                                    {errors.name && <p className="text-xs text-rose-500 font-bold">{errors.name}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-400 flex items-center gap-2">
                                        Primary Business Email
                                        <Mail className="w-3 h-3 text-gray-600" />
                                    </label>
                                    <div className="relative group">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-white transition-colors" />
                                        <input 
                                            type="email" 
                                            value={data.email}
                                            onChange={e => setData('email', e.target.value)}
                                            placeholder="billing@acme.com"
                                            className="w-full pl-11 pr-4 py-3 bg-white/[0.02] border border-white/10 rounded-full text-sm focus:ring-white focus:border-white transition-all text-white placeholder:text-gray-600"
                                        />
                                    </div>
                                    {errors.email && <p className="text-xs text-rose-500 font-bold">{errors.email}</p>}
                                </div>
                            </div>

                            <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 rounded-full bg-white/10 text-white border border-white/20">
                                            <ShieldCheck className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-white">Status Authorization</p>
                                            <p className="text-xs text-gray-400">Activate this business entity immediately upon creation.</p>
                                        </div>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input 
                                            type="checkbox" 
                                            className="sr-only peer"
                                            checked={data.is_active}
                                            onChange={e => setData('is_active', e.target.checked)}
                                        />
                                        <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-400 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#F9F9F9]"></div>
                                    </label>
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-6 border-t border-white/10">
                                <Link 
                                    href={route('super-admin.businesses.index')}
                                    className="px-6 py-3 rounded-full text-sm font-bold text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                                >
                                    Cancel
                                </Link>
                                <button 
                                    type="submit" 
                                    disabled={processing}
                                    className="flex items-center gap-2 px-8 py-3 rounded-full bg-[#F9F9F9] text-black hover:bg-white transition-all text-sm font-bold shadow-[0_0_20px_rgba(255,255,255,0.1)] disabled:opacity-50"
                                >
                                    <Save className="w-4 h-4" />
                                    Initialize Business
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* BG Accents */}
                    <div className="absolute -top-32 -right-32 w-64 h-64 bg-white/[0.03] blur-[120px] rounded-full pointer-events-none" />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
