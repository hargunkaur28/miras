import { Head, Link, useForm, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function SalesIndex({ orders }) {
    const handleDelete = (id) => {
        if (confirm('Are you sure?')) {
            router.delete(route('sales-orders.destroy', id));
        }
    };

    const soList = orders?.data || orders || [];

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
            <Head title="Sales Orders" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">Sales Orders</h2>
                            <Link href={route('sales-orders.create')} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">New SO</Link>
                        </div>
                        <table className="w-full text-sm">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 text-left">SO #</th>
                                    <th className="px-4 py-2 text-left">Customer</th>
                                    <th className="px-4 py-2 text-left">Status</th>
                                    <th className="px-4 py-2 text-left">Total</th>
                                    <th className="px-4 py-2 text-left">Date</th>
                                    <th className="px-4 py-2 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {soList.map(so => (
                                    <tr key={so.id} className="border-t hover:bg-gray-50">
                                        <td className="px-4 py-2 font-bold">{so.so_number}</td>
                                        <td className="px-4 py-2">{so.customer?.name}</td>
                                        <td className="px-4 py-2"><span className={`px-2 py-1 rounded text-xs font-bold ${so.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : so.status === 'delivered' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>{so.status}</span></td>
                                        <td className="px-4 py-2">${so.total_amount}</td>
                                        <td className="px-4 py-2">{formatDate(so.order_date)}</td>
                                        <td className="px-4 py-2">
                                            <Link href={route('sales-orders.edit', so.id)} className="text-blue-600 hover:underline mr-4">Edit</Link>
                                            <button onClick={() => handleDelete(so.id)} className="text-red-600 hover:underline">Delete</button>
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
