import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { 
    Plus, 
    Edit2, 
    Trash2, 
    User, 
    Mail, 
    Briefcase, 
    IndianRupee,
    ArrowUpDown,
    Search,
    MapPin
} from 'lucide-react';
import { motion } from 'framer-motion';
import { exportToCSV } from '@/Utils/export';
import { Download } from 'lucide-react';
import ImportButton from '@/Components/ImportButton';

export default function EmployeesIndex({ employees }) {
    const handleDelete = (id) => {
        if (confirm('Are you sure you want to remove this employee from the system?')) {
            router.delete(route('employees.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout header="Workforce Directory">
            <Head title="Employees" />

            <div className="space-y-6">
                {/* Header Actions */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="relative w-full md:w-96 group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-primary transition-colors" />
                        <input 
                            type="text" 
                            placeholder="Search by name, email or role..." 
                            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm focus:ring-primary focus:border-primary transition-all placeholder:text-gray-600"
                        />
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <ImportButton route={route('employees.import')} />
                        <button 
                            onClick={() => exportToCSV(employees.data, 'employees_export')}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white transition-all text-sm font-medium"
                        >
                            <Download className="w-4 h-4" />
                            Export CSV
                        </button>
                        <Link 
                            href={route('employees.create')} 
                            className="flex items-center gap-2 px-6 py-2 rounded-xl bg-primary text-white hover:bg-primary/90 transition-all text-sm font-bold shadow-lg shadow-primary/20 w-full md:w-auto justify-center"
                        >
                            <Plus className="w-4 h-4" />
                            Onboard Employee
                        </Link>
                    </div>
                </div>

                {/* Table Section */}
                <div className="glass-card rounded-3xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-white/[0.02] border-b border-white/5">
                                    <th className="px-6 py-5 text-xs font-bold text-gray-500 uppercase tracking-widest">Employee</th>
                                    <th className="px-6 py-5 text-xs font-bold text-gray-500 uppercase tracking-widest">Department</th>
                                    <th className="px-6 py-5 text-xs font-bold text-gray-500 uppercase tracking-widest">Designation</th>
                                    <th className="px-6 py-5 text-xs font-bold text-gray-500 uppercase tracking-widest text-right">Compensation</th>
                                    <th className="px-6 py-5 text-xs font-bold text-gray-500 uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {employees?.data?.map((emp) => (
                                    <tr key={emp.id} className="group hover:bg-white/[0.02] transition-colors">
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary/20 to-blue-500/20 border border-white/10 flex items-center justify-center text-primary font-bold">
                                                    {emp.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-white group-hover:text-primary transition-colors">{emp.name}</p>
                                                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                                        <Mail className="w-3 h-3" />
                                                        {emp.email}
                                                    </div>
                                                    <div className="flex items-center gap-1.5 text-[10px] text-gray-600 mt-1">
                                                        <MapPin className="w-2.5 h-2.5 text-primary/40" />
                                                        {emp.city && emp.state ? `${emp.city}, ${emp.state}` : 'Location Unset'}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-2">
                                                <Briefcase className="w-3 h-3 text-gray-600" />
                                                <span className="text-sm text-gray-300 font-medium">
                                                    {emp.department?.name || 'Floating'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                                                emp.role?.toLowerCase() === 'admin' 
                                                ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' 
                                                : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                            }`}>
                                                {emp.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <p className="text-sm font-bold text-white">₹{parseFloat(emp.salary).toLocaleString()}</p>
                                            <p className="text-[10px] text-gray-600 font-medium uppercase tracking-tight">Per Annum</p>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <div className="flex justify-end gap-2">
                                                <Link 
                                                    href={route('employees.edit', emp.id)}
                                                    className="p-2 rounded-lg bg-white/5 text-gray-500 hover:text-white hover:bg-primary/20 hover:border-primary/20 border border-transparent transition-all"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </Link>
                                                <button 
                                                    onClick={() => handleDelete(emp.id)}
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
                {employees?.links && (
                    <div className="flex justify-center gap-2 mt-8">
                        {employees.links.map((link, idx) => (
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

