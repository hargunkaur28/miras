import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function PurchaseCreate({ suppliers }) {
    const { data, setData, post, errors, processing } = useForm({
        supplier_id: '', po_number: '', status: 'pending', total_amount: '', order_date: new Date().toISOString().split('T')[0], expected_delivery_date: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('purchase-orders.store'));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Add Purchase Order" />
            <div className="py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h2 className="text-2xl font-bold mb-6">Create Purchase Order</h2>
                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <label className="block text-gray-700 font-bold mb-2">Supplier</label>
                                <select value={data.supplier_id} onChange={e => setData('supplier_id', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded">
                                    <option value="">Select Supplier</option>
                                    {suppliers?.map(sup => (
                                        <option key={sup.id} value={sup.id}>{sup.name}</option>
                                    ))}
                                </select>
                                {errors.supplier_id && <div className="text-red-600 text-sm">{errors.supplier_id}</div>}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 font-bold mb-2">PO Number</label>
                                    <input type="text" value={data.po_number} onChange={e => setData('po_number', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded" />
                                    {errors.po_number && <div className="text-red-600 text-sm">{errors.po_number}</div>}
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-bold mb-2">Status</label>
                                    <select value={data.status} onChange={e => setData('status', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded">
                                        <option>pending</option>
                                        <option>confirmed</option>
                                        <option>delivered</option>
                                        <option>cancelled</option>
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 font-bold mb-2">Order Date</label>
                                    <input type="date" value={data.order_date} onChange={e => setData('order_date', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded" />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-bold mb-2">Expected Delivery</label>
                                    <input type="date" value={data.expected_delivery_date} onChange={e => setData('expected_delivery_date', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-gray-700 font-bold mb-2">Total Amount</label>
                                <input type="number" step="0.01" value={data.total_amount} onChange={e => setData('total_amount', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded" />
                                {errors.total_amount && <div className="text-red-600 text-sm">{errors.total_amount}</div>}
                            </div>
                            <div className="flex gap-4 pt-4">
                                <button type="submit" disabled={processing} className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50">Create</button>
                                <Link href={route('purchase-orders.index')} className="px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">Cancel</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
