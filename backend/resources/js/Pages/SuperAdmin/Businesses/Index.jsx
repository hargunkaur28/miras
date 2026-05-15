import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { 
    Plus, 
    Edit2, 
    Trash2, 
    Building2, 
    Mail, 
    CheckCircle2, 
    XCircle,
    Search,
    ArrowUpDown,
    Users,
    Power
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function BusinessesIndex({ businesses }) {
    const handleDelete = (id) => {
        if (confirm('Are you sure you want to remove this business entity? This action is destructive.')) {
            router.delete(route('super-admin.businesses.destroy', id));
        }
    };

    const toggleStatus = (id) => {
        router.post(route('super-admin.businesses.toggle-status', id));
    };

    return (
        <AuthenticatedLayout header="Global Business Ecosystem">
            <Head title="Manage Businesses" />

            <div className="space-y-6">
                {/* Header Actions */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="relative w-full md:w-96 group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-primary transition-colors" />
                        <input 
                            type="text" 
                            placeholder="Search businesses by name, email or slug..." 
                            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm focus:ring-primary focus:border-primary transition-all placeholder:text-gray-600"
                        />
                    </div>
                    <Link 
                        href={route('super-admin.businesses.create')} 
                        className="flex items-center gap-2 px-6 py-2 rounded-xl bg-primary text-white hover:bg-primary/90 transition-all text-sm font-bold shadow-lg shadow-primary/20 w-full md:w-auto justify-center"
                    >
                        <Plus className="w-4 h-4" />
                        Register New Business
                    </Link>
                </div>

                {/* Table Section */}
                <div className="glass-card rounded-3xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-white/[0.02] border-b border-white/5">
                                    <th className="px-6 py-5 text-xs font-bold text-gray-500 uppercase tracking-widest">Business Entity</th>
                                    <th className="px-6 py-5 text-xs font-bold text-gray-500 uppercase tracking-widest">Global Status</th>
                                    <th className="px-6 py-5 text-xs font-bold text-gray-500 uppercase tracking-widest">User Base</th>
                                    <th className="px-6 py-5 text-xs font-bold text-gray-500 uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {businesses?.data?.map((business) => (
                                    <tr key={business.id} className="group hover:bg-white/[0.02] transition-colors">
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                                    <Building2 className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-white group-hover:text-primary transition-colors">{business.name}</p>
                                                    <div className="flex items-center gap-1.5 text-xs text-gray-600">
                                                        <Mail className="w-3 h-3" />
                                                        {business.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-2">
                                                {business.is_active ? (
                                                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-black uppercase tracking-widest">
                                                        <CheckCircle2 className="w-3 h-3" />
                                                        Active
                                                    </span>
                                                ) : (
                                                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[10px] font-black uppercase tracking-widest">
                                                        <XCircle className="w-3 h-3" />
                                                        Suspended
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                                <Users className="w-4 h-4 text-gray-600" />
                                                <span className="font-bold text-white">{business.users_count || 0}</span>
                                                <span className="text-xs text-gray-600">Registered Users</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button 
                                                    onClick={() => toggleStatus(business.id)}
                                                    className={`p-2 rounded-lg bg-white/5 transition-all border border-transparent ${
                                                        business.is_active 
                                                        ? 'text-gray-500 hover:text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/20' 
                                                        : 'text-gray-500 hover:text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/20'
                                                    }`}
                                                    title={business.is_active ? 'Suspend Business' : 'Activate Business'}
                                                >
                                                    <Power className="w-4 h-4" />
                                                </button>
                                                <Link 
                                                    href={route('super-admin.businesses.edit', business.id)}
                                                    className="p-2 rounded-lg bg-white/5 text-gray-500 hover:text-white hover:bg-primary/20 hover:border-primary/20 border border-transparent transition-all"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </Link>
                                                <button 
                                                    onClick={() => handleDelete(business.id)}
                                                    className="p-2 rounded-lg bg-white/5 text-gray-500 hover:text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/20 border border-transparent transition-all"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination */}
                {businesses?.links && (
                    <div className="flex justify-center gap-2 mt-8">
                        {businesses.links.map((link, idx) => (
                            <Link
                                key={idx}
                                href={link.url || '#'}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border ${
                                    link.active 
                                    ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' 
                                    : 'bg-white/5 text-gray-500 border-white/5 hover:text-white hover:bg-white/10'
                                } ${!link.url && 'opacity-30 cursor-not-allowed'}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
