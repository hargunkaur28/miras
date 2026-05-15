import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { 
    ShoppingCart, 
    ArrowLeft, 
    Save, 
    User, 
    Calendar, 
    IndianRupee,
    Clock,
    Hash,
    Info
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function SalesOrdersCreate({ customers }) {
    const { data, setData, post, errors, processing } = useForm({
        customer_id: '', 
        so_number: `SO-${Math.floor(1000 + Math.random() * 9000)}`, 
        status: 'pending', 
        total_amount: '', 
        ordered_at: new Date().toISOString().split('T')[0],
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('sales-orders.store'));
    };

    return (
        <AuthenticatedLayout header="Initialize Sales Order">
            <Head title="Create Sales Order" />

            <div className="max-w-4xl mx-auto space-y-6">
                <div className="flex justify-between items-center">
                    <Link 
                        href={route('sales-orders.index')}
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Pipeline
                    </Link>
                </div>

                <div className="glass-card rounded-3xl p-8 relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                                <ShoppingCart className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white tracking-tight">New Sales Transaction</h2>
                                <p className="text-gray-500 text-sm">Register a new customer commitment in the system.</p>
                            </div>
                        </div>

                        <form onSubmit={submit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-400 flex items-center gap-2">
                                        Client Entity
                                        <User className="w-3 h-3 text-gray-600" />
                                    </label>
                                    <select 
                                        value={data.customer_id} 
                                        onChange={e => setData('customer_id', e.target.value)}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm focus:ring-primary focus:border-primary transition-all text-white appearance-none"
                                    >
                                        <option value="" className="bg-[#16161a]">Select Partner</option>
                                        {customers?.map(cust => (
                                            <option key={cust.id} value={cust.id} className="bg-[#16161a]">{cust.name}</option>
                                        ))}
                                    </select>
                                    {errors.customer_id && <p className="text-xs text-rose-500 font-bold">{errors.customer_id}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-400 flex items-center gap-2">
                                        Order Reference
                                        <Hash className="w-3 h-3 text-gray-600" />
                                    </label>
                                    <input 
                                        type="text" 
                                        value={data.so_number} 
                                        onChange={e => setData('so_number', e.target.value)}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm focus:ring-primary focus:border-primary transition-all text-white placeholder:text-gray-700"
                                    />
                                    {errors.so_number && <p className="text-xs text-rose-500 font-bold">{errors.so_number}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-400 flex items-center gap-2">
                                        Pipeline Status
                                        <Clock className="w-3 h-3 text-gray-600" />
                                    </label>
                                    <select 
                                        value={data.status} 
                                        onChange={e => setData('status', e.target.value)}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm focus:ring-primary focus:border-primary transition-all text-white appearance-none"
                                    >
                                        <option value="pending" className="bg-[#16161a]">Pending</option>
                                        <option value="confirmed" className="bg-[#16161a]">Confirmed</option>
                                        <option value="shipped" className="bg-[#16161a]">Shipped</option>
                                        <option value="delivered" className="bg-[#16161a]">Delivered</option>
                                        <option value="cancelled" className="bg-[#16161a]">Cancelled</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-400 flex items-center gap-2">
                                        Transaction Date
                                        <Calendar className="w-3 h-3 text-gray-600" />
                                    </label>
                                    <input 
                                        type="date" 
                                        value={data.ordered_at}
                                        onChange={e => setData('ordered_at', e.target.value)}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm focus:ring-primary focus:border-primary transition-all text-white [color-scheme:dark]"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-400 flex items-center gap-2">
                                        Gross Valuation (₹)
                                        <IndianRupee className="w-3 h-3 text-gray-600" />
                                    </label>
                                    <input 
                                        type="number" 
                                        step="0.01" 
                                        value={data.total_amount} 
                                        onChange={e => setData('total_amount', e.target.value)}
                                        placeholder="0.00"
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm focus:ring-primary focus:border-primary transition-all text-white placeholder:text-gray-700"
                                    />
                                    {errors.total_amount && <p className="text-xs text-rose-500 font-bold">{errors.total_amount}</p>}
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-6 border-t border-white/5">
                                <Link 
                                    href={route('sales-orders.index')}
                                    className="px-6 py-2 rounded-xl text-sm font-bold text-gray-500 hover:text-white hover:bg-white/5 transition-all"
                                >
                                    Cancel
                                </Link>
                                <button 
                                    type="submit" 
                                    disabled={processing}
                                    className="flex items-center gap-2 px-8 py-2 rounded-xl bg-primary text-white hover:bg-primary/90 transition-all text-sm font-bold shadow-lg shadow-primary/20 disabled:opacity-50"
                                >
                                    <Save className="w-4 h-4" />
                                    Commit Order
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
