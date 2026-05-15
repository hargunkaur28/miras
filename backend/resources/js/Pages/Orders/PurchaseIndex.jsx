import { Head, Link, useForm, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function PurchaseIndex({ orders }) {
    const handleDelete = (id) => {
        if (confirm('Are you sure?')) {
            router.delete(route('purchase-orders.destroy', id));
        }
    };

    const poList = orders?.data || orders || [];

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        try {
            const date = new Date(dateString);
            if (isNaN(date)) return dateString;
            return date.toLocaleDateString();
        } catch {
            return dateString;
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Purchase Orders" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">Purchase Orders</h2>
                            <Link href={route('purchase-orders.create')} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">New PO</Link>
                        </div>
                        <table className="w-full text-sm">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 text-left">PO #</th>
                                    <th className="px-4 py-2 text-left">Supplier</th>
                                    <th className="px-4 py-2 text-left">Status</th>
                                    <th className="px-4 py-2 text-left">Total</th>
                                    <th className="px-4 py-2 text-left">Date</th>
                                    <th className="px-4 py-2 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {poList.map(po => (
                                    <tr key={po.id} className="border-t hover:bg-gray-50">
                                        <td className="px-4 py-2 font-bold">{po.po_number}</td>
                                        <td className="px-4 py-2">{po.supplier?.name}</td>
                                        <td className="px-4 py-2"><span className={`px-2 py-1 rounded text-xs font-bold ${po.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : po.status === 'delivered' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>{po.status}</span></td>
                                        <td className="px-4 py-2">${po.total_amount}</td>
                                        <td className="px-4 py-2">{formatDate(po.order_date)}</td>
                                        <td className="px-4 py-2">
                                            <Link href={route('purchase-orders.edit', po.id)} className="text-blue-600 hover:underline mr-4">Edit</Link>
                                            <button onClick={() => handleDelete(po.id)} className="text-red-600 hover:underline">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
