import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { 
    Plus, 
    Edit2, 
    Trash2, 
    Search, 
    Filter, 
    MoreHorizontal,
    Package,
    ArrowUpDown,
    Download
} from 'lucide-react';
import { motion } from 'framer-motion';
import { exportToCSV } from '@/Utils/export';
import ImportButton from '@/Components/ImportButton';

export default function InventoryIndex({ items }) {
    const deleteItem = (id) => {
        if (confirm('Are you sure you want to decommission this asset?')) {
            router.delete(route('inventory.destroy', id));
        }
    };

    const getStockStatus = (quantity, reorderLevel) => {
        if (quantity === 0) return { label: 'Out of Stock', color: 'bg-rose-500/10 text-rose-400 border-rose-500/20' };
        if (quantity <= reorderLevel) return { label: 'Low Stock', color: 'bg-amber-500/10 text-amber-400 border-amber-500/20' };
        return { label: 'Healthy', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' };
    };

    return (
        <AuthenticatedLayout header="Inventory Registry">
            <Head title="Inventory" />

            <div className="space-y-6">
                {/* Actions Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="relative flex-1 md:w-80 group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-primary transition-colors" />
                            <input 
                                type="text" 
                                placeholder="Search by SKU, Name or Category..." 
                                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm focus:ring-primary focus:border-primary transition-all placeholder:text-gray-600"
                            />
                        </div>
                        <button className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-all">
                            <Filter className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <ImportButton route={route('inventory.import')} />
                        <button 
                            onClick={() => exportToCSV(items.data, 'inventory_export')}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white transition-all text-sm font-medium"
                        >
                            <Download className="w-4 h-4" />
                            Export CSV
                        </button>
                        <Link 
                            href={route('inventory.create')} 
                            className="flex items-center gap-2 px-6 py-2 rounded-xl bg-primary text-white hover:bg-primary/90 transition-all text-sm font-bold shadow-lg shadow-primary/20"
                        >
                            <Plus className="w-4 h-4" />
                            Provision New Asset
                        </Link>
                    </div>
                </div>

                {/* Table Section */}
                <div className="glass-card rounded-3xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-white/[0.02] border-b border-white/5">
                                    <th className="px-6 py-5 text-xs font-bold text-gray-500 uppercase tracking-widest">
                                        <div className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors">
                                            Asset Details <ArrowUpDown className="w-3 h-3" />
                                        </div>
                                    </th>
                                    <th className="px-6 py-5 text-xs font-bold text-gray-500 uppercase tracking-widest">Category</th>
                                    <th className="px-6 py-5 text-xs font-bold text-gray-500 uppercase tracking-widest">Availability</th>
                                    <th className="px-6 py-5 text-xs font-bold text-gray-500 uppercase tracking-widest">Unit Value</th>
                                    <th className="px-6 py-5 text-xs font-bold text-gray-500 uppercase tracking-widest text-right">Operations</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {items.data.map((item) => {
                                    const status = getStockStatus(item.quantity, item.reorder_level);
                                    return (
                                        <tr key={item.id} className="group hover:bg-white/[0.02] transition-colors">
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-primary transition-colors border border-white/5">
                                                        <Package className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-white group-hover:text-primary transition-colors">{item.name}</p>
                                                        <p className="text-xs text-gray-500 font-mono uppercase tracking-tighter mt-0.5">{item.sku}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className="px-3 py-1 rounded-lg bg-white/5 text-gray-400 text-xs border border-white/5">
                                                    {item.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="space-y-2">
                                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${status.color}`}>
                                                        {status.label}
                                                    </span>
                                                    <p className="text-sm font-bold text-white">
                                                        {item.quantity} <span className="text-gray-500 text-xs font-medium lowercase italic">{item.unit}</span>
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-white">₹{parseFloat(item.sell_price).toLocaleString()}</span>
                                                    <span className="text-[10px] text-gray-600 font-medium tracking-tight">Cost: ₹{parseFloat(item.cost_price).toLocaleString()}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Link 
                                                        href={route('inventory.edit', item.id)}
                                                        className="p-2 rounded-lg bg-white/5 text-gray-500 hover:text-white hover:bg-primary/20 hover:border-primary/20 border border-transparent transition-all"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </Link>
                                                    <button 
                                                        onClick={() => deleteItem(item.id)}
                                                        className="p-2 rounded-lg bg-white/5 text-gray-500 hover:text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/20 border border-transparent transition-all"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination Placeholder */}
                {items.links && (
                    <div className="flex justify-center gap-2 mt-8">
                        {items.links.map((link, idx) => (
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

