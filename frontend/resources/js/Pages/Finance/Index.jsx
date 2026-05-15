import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { 
    Plus, 
    Edit2, 
    Trash2, 
    TrendingUp, 
    TrendingDown, 
    Calendar, 
    Tag, 
    IndianRupee,
    Search,
    FileText,
    Download
} from 'lucide-react';
import { motion } from 'framer-motion';
import { exportToCSV } from '@/Utils/export';
import ImportButton from '@/Components/ImportButton';

export default function FinanceIndex({ entries }) {
    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this financial record?')) {
            router.delete(route('finance.destroy', id));
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <AuthenticatedLayout header="Financial Ledger">
            <Head title="Finance" />

            <div className="space-y-6">
                {/* Header Actions */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="relative w-full md:w-96 group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-primary transition-colors" />
                        <input 
                            type="text" 
                            placeholder="Search transactions..." 
                            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm focus:ring-primary focus:border-primary transition-all placeholder:text-gray-600"
                        />
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <ImportButton route={route('finance.import')} />
                        <button 
                            onClick={() => exportToCSV(entries.data, 'finance_export')}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white transition-all text-sm font-medium"
                        >
                            <Download className="w-4 h-4" />
                            Export CSV
                        </button>
                        <Link 
                            href={route('finance.create')} 
                            className="flex items-center gap-2 px-6 py-2 rounded-xl bg-primary text-white hover:bg-primary/90 transition-all text-sm font-bold shadow-lg shadow-primary/20 w-full md:w-auto justify-center"
                        >
                            <Plus className="w-4 h-4" />
                            Record Transaction
                        </Link>
                    </div>
                </div>

                {/* Table Section */}
                <div className="glass-card rounded-3xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-white/[0.02] border-b border-white/5">
                                    <th className="px-6 py-5 text-xs font-bold text-gray-500 uppercase tracking-widest">Transaction Date</th>
                                    <th className="px-6 py-5 text-xs font-bold text-gray-500 uppercase tracking-widest">Type / Category</th>
                                    <th className="px-6 py-5 text-xs font-bold text-gray-500 uppercase tracking-widest">Valuation</th>
                                    <th className="px-6 py-5 text-xs font-bold text-gray-500 uppercase tracking-widest">Notes</th>
                                    <th className="px-6 py-5 text-xs font-bold text-gray-500 uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {entries?.data?.map((entry) => (
                                    <tr key={entry.id} className="group hover:bg-white/[0.02] transition-colors">
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400">
                                                    <Calendar className="w-4 h-4" />
                                                </div>
                                                <span className="text-sm font-bold text-white group-hover:text-primary transition-colors">
                                                    {formatDate(entry.entry_date)}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className={`p-2 rounded-lg ${
                                                    entry.type === 'income' 
                                                    ? 'bg-emerald-500/10 text-emerald-500' 
                                                    : 'bg-rose-500/10 text-rose-500'
                                                }`}>
                                                    {entry.type === 'income' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                                                </div>
                                                <div>
                                                    <p className="text-xs font-black uppercase tracking-widest text-gray-600">{entry.type}</p>
                                                    <p className="text-sm font-bold text-gray-300">{entry.category}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-1 text-sm font-black tracking-tight">
                                                <span className={entry.type === 'income' ? 'text-emerald-400' : 'text-rose-400'}>
                                                    {entry.type === 'income' ? '+' : '-'}
                                                </span>
                                                <span className="text-white">₹{parseFloat(entry.amount).toLocaleString()}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <p className="text-sm text-gray-500 line-clamp-1 max-w-xs">{entry.description || 'No description provided.'}</p>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <div className="flex justify-end gap-2">
                                                <Link 
                                                    href={route('finance.edit', entry.id)}
                                                    className="p-2 rounded-lg bg-white/5 text-gray-500 hover:text-white hover:bg-primary/20 hover:border-primary/20 border border-transparent transition-all"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </Link>
                                                <button 
                                                    onClick={() => handleDelete(entry.id)}
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
                {entries?.links && (
                    <div className="flex justify-center gap-2 mt-8">
                        {entries.links.map((link, idx) => (
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

