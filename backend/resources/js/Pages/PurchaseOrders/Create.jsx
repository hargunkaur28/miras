import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { 
    Truck, 
    ArrowLeft, 
    Save, 
    Briefcase, 
    Calendar, 
    IndianRupee,
    Clock,
    Hash,
    Package
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function PurchaseOrdersCreate({ suppliers }) {
    const { data, setData, post, errors, processing } = useForm({
        supplier_id: '', 
        po_number: `PO-${Math.floor(1000 + Math.random() * 9000)}`, 
        status: 'pending', 
        total_amount: '', 
        ordered_at: new Date().toISOString().split('T')[0],
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('purchase-orders.store'));
    };

    return (
        <AuthenticatedLayout header="Procurement Initialization">
            <Head title="Create Purchase Order" />

            <div className="max-w-4xl mx-auto space-y-6">
                <div className="flex justify-between items-center">
                    <Link 
                        href={route('purchase-orders.index')}
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Log
                    </Link>
                </div>

                <div className="glass-card rounded-3xl p-8 relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                                <Package className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white tracking-tight">New Supply Commitment</h2>
                                <p className="text-gray-500 text-sm">Initiate a formal procurement request with an external vendor.</p>
                            </div>
                        </div>

                        <form onSubmit={submit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-400 flex items-center gap-2">
                                        Supplier Partner
                                        <Briefcase className="w-3 h-3 text-gray-600" />
                                    </label>
                                    <select 
                                        value={data.supplier_id} 
                                        onChange={e => setData('supplier_id', e.target.value)}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm focus:ring-primary focus:border-primary transition-all text-white appearance-none"
                                    >
                                        <option value="" className="bg-[#16161a]">Select Supplier</option>
                                        {suppliers?.map(sup => (
                                            <option key={sup.id} value={sup.id} className="bg-[#16161a]">{sup.name}</option>
                                        ))}
                                    </select>
                                    {errors.supplier_id && <p className="text-xs text-rose-500 font-bold">{errors.supplier_id}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-400 flex items-center gap-2">
                                        PO Reference
                                        <Hash className="w-3 h-3 text-gray-600" />
                                    </label>
                                    <input 
                                        type="text" 
                                        value={data.po_number} 
                                        onChange={e => setData('po_number', e.target.value)}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm focus:ring-primary focus:border-primary transition-all text-white placeholder:text-gray-700 font-mono"
                                    />
                                    {errors.po_number && <p className="text-xs text-rose-500 font-bold">{errors.po_number}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-400 flex items-center gap-2">
                                        Current Status
                                        <Clock className="w-3 h-3 text-gray-600" />
                                    </label>
                                    <select 
                                        value={data.status} 
                                        onChange={e => setData('status', e.target.value)}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm focus:ring-primary focus:border-primary transition-all text-white appearance-none"
                                    >
                                        <option value="pending" className="bg-[#16161a]">Pending</option>
                                        <option value="confirmed" className="bg-[#16161a]">Confirmed</option>
                                        <option value="delivered" className="bg-[#16161a]">Delivered</option>
                                        <option value="cancelled" className="bg-[#16161a]">Cancelled</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-400 flex items-center gap-2">
                                        Ordered On
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
                                        Estimated Valuation (₹)
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
                                    href={route('purchase-orders.index')}
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
                                    Register Commitment
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
