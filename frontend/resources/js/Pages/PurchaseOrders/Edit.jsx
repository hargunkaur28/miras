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
    Info,
    CheckCircle2,
    Package
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function PurchaseOrdersEdit({ purchaseOrder, suppliers }) {
    const { data, setData, patch, errors, processing } = useForm({
        supplier_id: purchaseOrder.supplier_id, 
        po_number: purchaseOrder.po_number, 
        status: purchaseOrder.status, 
        total_amount: purchaseOrder.total_amount, 
        order_date: purchaseOrder.order_date,
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('purchase-orders.update', purchaseOrder.id));
    };

    return (
        <AuthenticatedLayout header={`Procurement Adjustment: ${purchaseOrder.po_number}`}>
            <Head title={`Edit ${purchaseOrder.po_number}`} />

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

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="glass-card rounded-3xl p-8 relative overflow-hidden">
                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                                        <Package className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-white tracking-tight">PO Adjustment</h2>
                                        <p className="text-gray-500 text-sm">Update vendor commitment and fulfillment status.</p>
                                    </div>
                                </div>

                                <form onSubmit={submit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-400 flex items-center gap-2">
                                                Supplier Partner
                                            </label>
                                            <select 
                                                value={data.supplier_id} 
                                                onChange={e => setData('supplier_id', e.target.value)}
                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm focus:ring-primary focus:border-primary transition-all text-white appearance-none"
                                            >
                                                {suppliers?.map(sup => (
                                                    <option key={sup.id} value={sup.id} className="bg-[#16161a]">{sup.name}</option>
                                                ))}
                                            </select>
                                            {errors.supplier_id && <p className="text-xs text-rose-500 font-bold">{errors.supplier_id}</p>}
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-400 flex items-center gap-2">
                                                PO Reference
                                            </label>
                                            <input 
                                                type="text" 
                                                value={data.po_number} 
                                                readOnly
                                                className="w-full px-4 py-3 bg-white/[0.02] border border-white/5 rounded-xl text-sm text-gray-500 cursor-not-allowed font-mono"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-400 flex items-center gap-2">
                                                Delivery Status
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
                                                Commitment Value (₹)
                                            </label>
                                            <div className="relative group">
                                                <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-primary transition-colors" />
                                                <input 
                                                    type="number" 
                                                    step="0.01" 
                                                    value={data.total_amount} 
                                                    onChange={e => setData('total_amount', e.target.value)}
                                                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm focus:ring-primary focus:border-primary transition-all text-white"
                                                />
                                            </div>
                                            {errors.total_amount && <p className="text-xs text-rose-500 font-bold">{errors.total_amount}</p>}
                                        </div>
                                    </div>

                                    <div className="flex justify-end gap-3 pt-6 border-t border-white/5">
                                        <Link 
                                            href={route('purchase-orders.index')}
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
                                            Update Commitment
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="glass-card rounded-3xl p-6 border-l-4 border-emerald-500/50">
                            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                                <Truck className="w-4 h-4 text-emerald-400" />
                                Logistic Status
                            </h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-gray-500 font-bold uppercase">Placed On</span>
                                    <span className="text-white font-black">{new Date(purchaseOrder.order_date).toLocaleDateString()}</span>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-gray-500 font-bold uppercase">Current Phase</span>
                                    <span className="px-2 py-0.5 rounded bg-primary/10 text-primary font-black uppercase text-[10px] tracking-widest">{purchaseOrder.status}</span>
                                </div>
                            </div>
                        </div>

                        <div className="glass-card rounded-3xl p-6 bg-white/[0.02] border border-white/5">
                            <h3 className="text-xs font-black text-gray-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                                <Info className="w-3 h-3" />
                                Procurement Note
                            </h3>
                            <p className="text-[11px] text-gray-600 leading-relaxed">
                                Ensure all line items are verified against the physical delivery before marking the status as "Delivered". This action will update inventory stock levels.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
