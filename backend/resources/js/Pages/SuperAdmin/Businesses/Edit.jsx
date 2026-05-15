import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { 
    Building2, 
    ArrowLeft, 
    Save, 
    X,
    ShieldCheck,
    Mail,
    Info,
    History,
    Users
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function BusinessEdit({ business }) {
    const { data, setData, patch, processing, errors } = useForm({
        name: business.name,
        email: business.email,
        is_active: business.is_active,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route('super-admin.businesses.update', business.id));
    };

    return (
        <AuthenticatedLayout header={`Configure: ${business.name}`}>
            <Head title={`Edit ${business.name}`} />

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

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Form */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="glass-card rounded-3xl p-8">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                                    <Building2 className="w-6 h-6" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-white tracking-tight">Entity Configuration</h2>
                                    <p className="text-gray-500 text-sm">Update core parameters for this business entity.</p>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-400 flex items-center gap-2">
                                            Entity Name
                                        </label>
                                        <div className="relative group">
                                            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-primary transition-colors" />
                                            <input 
                                                type="text" 
                                                value={data.name}
                                                onChange={e => setData('name', e.target.value)}
                                                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm focus:ring-primary focus:border-primary transition-all text-white"
                                            />
                                        </div>
                                        {errors.name && <p className="text-xs text-rose-500 font-bold">{errors.name}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-400 flex items-center gap-2">
                                            Primary Business Email
                                        </label>
                                        <div className="relative group">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-primary transition-colors" />
                                            <input 
                                                type="email" 
                                                value={data.email}
                                                onChange={e => setData('email', e.target.value)}
                                                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm focus:ring-primary focus:border-primary transition-all text-white"
                                            />
                                        </div>
                                        {errors.email && <p className="text-xs text-rose-500 font-bold">{errors.email}</p>}
                                    </div>
                                </div>

                                <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-primary/10 text-primary border border-primary/20">
                                                <ShieldCheck className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-white">System Status</p>
                                                <p className="text-xs text-gray-600">Active status governs access for all users in this business.</p>
                                            </div>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input 
                                                type="checkbox" 
                                                className="sr-only peer"
                                                checked={data.is_active}
                                                onChange={e => setData('is_active', e.target.checked)}
                                            />
                                            <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-400 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                        </label>
                                    </div>
                                </div>

                                <div className="flex justify-end gap-3 pt-6 border-t border-white/5">
                                    <Link 
                                        href={route('super-admin.businesses.index')}
                                        className="px-6 py-2 rounded-xl text-sm font-bold text-gray-500 hover:text-white hover:bg-white/5 transition-all"
                                    >
                                        Discard Changes
                                    </Link>
                                    <button 
                                        type="submit" 
                                        disabled={processing}
                                        className="flex items-center gap-2 px-8 py-2 rounded-xl bg-primary text-white hover:bg-primary/90 transition-all text-sm font-bold shadow-lg shadow-primary/20 disabled:opacity-50"
                                    >
                                        <Save className="w-4 h-4" />
                                        Commit Updates
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Stats Sidebar */}
                    <div className="space-y-6">
                        <div className="glass-card rounded-3xl p-6 border-l-4 border-primary/50">
                            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                                <History className="w-4 h-4 text-primary" />
                                Quick Metrics
                            </h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-gray-500 font-bold uppercase">Created On</span>
                                    <span className="text-white font-black">{new Date(business.created_at).toLocaleDateString()}</span>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-gray-500 font-bold uppercase">Internal Slug</span>
                                    <span className="text-white font-black">{business.slug}</span>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-gray-500 font-bold uppercase">Entity ID</span>
                                    <span className="text-white font-black">#BUS-{business.id.toString().padStart(4, '0')}</span>
                                </div>
                            </div>
                        </div>

                        <div className="glass-card rounded-3xl p-6 bg-primary/5 border border-primary/10">
                            <div className="flex items-center gap-3 mb-4 text-primary">
                                <Info className="w-4 h-4" />
                                <h3 className="text-sm font-bold uppercase tracking-widest">Platform Note</h3>
                            </div>
                            <p className="text-xs text-gray-400 leading-relaxed">
                                Updating the entity name will regenerate the internal slug, which might affect legacy reporting references. Proceed with caution.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
