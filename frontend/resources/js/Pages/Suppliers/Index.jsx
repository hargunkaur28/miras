import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { 
    Plus, 
    Edit2, 
    Trash2, 
    Truck, 
    User, 
    Mail, 
    MapPin,
    Phone,
    Search,
    Globe
} from 'lucide-react';
import { motion } from 'framer-motion';
import { exportToCSV } from '@/Utils/export';
import { Download } from 'lucide-react';
import ImportButton from '@/Components/ImportButton';

export default function SuppliersIndex({ suppliers }) {
    const handleDelete = (id) => {
        if (confirm('Are you sure you want to terminate this supplier relationship?')) {
            router.delete(route('suppliers.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout header="Supply Chain Partners">
            <Head title="Suppliers" />

            <div className="space-y-6">
                {/* Header Actions */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="relative w-full md:w-96 group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-primary transition-colors" />
                        <input 
                            type="text" 
                            placeholder="Search suppliers by name or location..." 
                            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm focus:ring-primary focus:border-primary transition-all placeholder:text-gray-600"
                        />
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <ImportButton route={route('suppliers.import')} />
                        <button 
                            onClick={() => exportToCSV(suppliers.data, 'suppliers_export')}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white transition-all text-sm font-medium"
                        >
                            <Download className="w-4 h-4" />
                            Export CSV
                        </button>
                        <Link 
                            href={route('suppliers.create')} 
                            className="flex items-center gap-2 px-6 py-2 rounded-xl bg-primary text-white hover:bg-primary/90 transition-all text-sm font-bold shadow-lg shadow-primary/20 w-full md:w-auto justify-center"
                        >
                            <Plus className="w-4 h-4" />
                            Add Supplier
                        </Link>
                    </div>
                </div>

                {/* Table Section */}
                <div className="glass-card rounded-3xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-white/[0.02] border-b border-white/5">
                                    <th className="px-6 py-5 text-xs font-bold text-gray-500 uppercase tracking-widest">Partner Entity</th>
                                    <th className="px-6 py-5 text-xs font-bold text-gray-500 uppercase tracking-widest">Primary Contact</th>
                                    <th className="px-6 py-5 text-xs font-bold text-gray-500 uppercase tracking-widest">Operational Base</th>
                                    <th className="px-6 py-5 text-xs font-bold text-gray-500 uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {suppliers?.data?.map((sup) => (
                                    <tr key={sup.id} className="group hover:bg-white/[0.02] transition-colors">
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
                                                    <Truck className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-white group-hover:text-primary transition-colors">{sup.name}</p>
                                                    <div className="flex items-center gap-1.5 text-xs text-gray-600">
                                                        <Globe className="w-3 h-3" />
                                                        ID: SUP-{sup.id.toString().padStart(4, '0')}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2 text-sm text-gray-300 font-medium">
                                                    <User className="w-3 h-3 text-gray-600" />
                                                    {sup.contact_person}
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                                    <Mail className="w-3 h-3" />
                                                    {sup.email}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-2">
                                                <MapPin className="w-3 h-3 text-rose-500/50" />
                                                <span className="text-sm text-gray-400">
                                                    {sup.city}, {sup.state || 'Region'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <div className="flex justify-end gap-2">
                                                <Link 
                                                    href={route('suppliers.edit', sup.id)}
                                                    className="p-2 rounded-lg bg-white/5 text-gray-500 hover:text-white hover:bg-primary/20 hover:border-primary/20 border border-transparent transition-all"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </Link>
                                                <button 
                                                    onClick={() => handleDelete(sup.id)}
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
                {suppliers?.links && (
                    <div className="flex justify-center gap-2 mt-8">
                        {suppliers.links.map((link, idx) => (
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

