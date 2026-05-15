import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function SalesEdit({ order, customers }) {
    const { data, setData, patch, errors, processing } = useForm({
        customer_id: order.customer_id || '', so_number: order.so_number || '', status: order.status || 'pending', total_amount: order.total_amount || '', order_date: order.order_date || '',
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('sales-orders.update', order.id));
    };

    return (
        <AuthenticatedLayout>
            <Head title={`Edit SO: ${order.so_number}`} />
            <div className="py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h2 className="text-2xl font-bold mb-6">Edit Sales Order</h2>
                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <label className="block text-gray-700 font-bold mb-2">Customer</label>
                                <select value={data.customer_id} onChange={e => setData('customer_id', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded">
                                    <option value="">Select Customer</option>
                                    {customers?.map(cust => (
                                        <option key={cust.id} value={cust.id}>{cust.name}</option>
                                    ))}
                                </select>
                                {errors.customer_id && <div className="text-red-600 text-sm">{errors.customer_id}</div>}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 font-bold mb-2">SO Number</label>
                                    <input type="text" value={data.so_number} onChange={e => setData('so_number', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded" />
                                    {errors.so_number && <div className="text-red-600 text-sm">{errors.so_number}</div>}
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
                                    <label className="block text-gray-700 font-bold mb-2">Total Amount</label>
                                    <input type="number" step="0.01" value={data.total_amount} onChange={e => setData('total_amount', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded" />
                                </div>
                            </div>
                            <div className="flex gap-4 pt-4">
                                <button type="submit" disabled={processing} className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50">Update</button>
                                <Link href={route('sales-orders.index')} className="px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">Cancel</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
