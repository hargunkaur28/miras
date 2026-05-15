import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { 
    Users, 
    ArrowLeft, 
    Save, 
    User, 
    Mail, 
    Phone, 
    Briefcase, 
    Building2, 
    IndianRupee, 
    Calendar,
    Edit3,
    MapPin,
    Globe,
    Flag
} from 'lucide-react';
import { motion } from 'framer-motion';
import { locationData } from '@/Constants/locationData';
import { useEffect, useState } from 'react';

const InputGroup = ({ label, icon: Icon, error, children }) => (
    <div className="space-y-2">
        <label className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">
            {Icon && <Icon className="w-3 h-3" />}
            {label}
        </label>
        {children}
        {error && (
            <motion.p 
                initial={{ opacity: 0, x: -10 }} 
                animate={{ opacity: 1, x: 0 }} 
                className="text-rose-400 text-xs font-medium ml-1"
            >
                {error}
            </motion.p>
        )}
    </div>
);

const inputClasses = "w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white placeholder:text-gray-600 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all appearance-none";

export default function EmployeesEdit({ employee, departments }) {
    const { data, setData, patch, errors, processing } = useForm({
        name: employee.name || '',
        email: employee.email || '',
        phone: employee.phone || '',
        address: employee.address || '',
        city: employee.city || '',
        state: employee.state || '',
        country: employee.country || 'India',
        department_id: employee.department_id || '',
        role: employee.role || 'Staff',
        salary: employee.salary || '',
        joined_at: employee.joined_at ? new Date(employee.joined_at).toISOString().split('T')[0] : '',
    });

    const [availableCities, setAvailableCities] = useState([]);

    useEffect(() => {
        if (data.state) {
            setAvailableCities(locationData[data.state] || []);
        } else {
            setAvailableCities([]);
        }
    }, [data.state]);

    const submit = (e) => {
        e.preventDefault();
        patch(route('employees.update', employee.id));
    };

    return (
        <AuthenticatedLayout header={`Modify Personnel: ${employee.name}`}>
            <Head title={`Edit ${employee.name}`} />
            
            <div className="max-w-4xl mx-auto">
                <Link 
                    href={route('employees.index')} 
                    className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-8 group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Workforce
                </Link>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card rounded-[2.5rem] overflow-hidden"
                >
                    <div className="p-8 md:p-12">
                        <div className="flex items-center gap-4 mb-10">
                            <div className="w-16 h-16 rounded-3xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                                <Edit3 className="text-amber-500 w-8 h-8" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white">Refine Professional Profile</h2>
                                <p className="text-gray-500 text-sm">Adjust the organizational data for this professional asset.</p>
                            </div>
                        </div>

                        <form onSubmit={submit} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <InputGroup label="Full Name" icon={User} error={errors.name}>
                                    <input 
                                        type="text" 
                                        value={data.name} 
                                        onChange={e => setData('name', e.target.value)} 
                                        className={inputClasses} 
                                    />
                                </InputGroup>

                                <InputGroup label="Email Address" icon={Mail} error={errors.email}>
                                    <input 
                                        type="email" 
                                        value={data.email} 
                                        onChange={e => setData('email', e.target.value)} 
                                        className={inputClasses} 
                                    />
                                </InputGroup>

                                <InputGroup label="Contact Number" icon={Phone} error={errors.phone}>
                                    <input 
                                        type="tel" 
                                        placeholder="+91 XXXXX XXXXX"
                                        value={data.phone} 
                                        onChange={e => setData('phone', e.target.value)} 
                                        className={inputClasses} 
                                    />
                                </InputGroup>

                                <InputGroup label="Primary Department" icon={Building2} error={errors.department_id}>
                                    <select 
                                        value={data.department_id} 
                                        onChange={e => setData('department_id', e.target.value)} 
                                        className={inputClasses}
                                    >
                                        <option value="" className="bg-[#16161a]">Select Node</option>
                                        {departments?.map(dept => (
                                            <option key={dept.id} value={dept.id} className="bg-[#16161a]">{dept.name}</option>
                                        ))}
                                    </select>
                                </InputGroup>

                                <InputGroup label="Operational Role" icon={Briefcase} error={errors.role}>
                                    <select 
                                        value={data.role} 
                                        onChange={e => setData('role', e.target.value)} 
                                        className={inputClasses}
                                    >
                                        <option value="Manager" className="bg-[#16161a]">Manager</option>
                                        <option value="Supervisor" className="bg-[#16161a]">Supervisor</option>
                                        <option value="Staff" className="bg-[#16161a]">Staff</option>
                                        <option value="Intern" className="bg-[#16161a]">Intern</option>
                                    </select>
                                </InputGroup>

                                <InputGroup label="Annual Remuneration (₹)" icon={IndianRupee} error={errors.salary}>
                                    <input 
                                        type="number" 
                                        step="0.01"
                                        value={data.salary} 
                                        onChange={e => setData('salary', e.target.value)} 
                                        className={inputClasses} 
                                    />
                                </InputGroup>
                            </div>

                            <div className="space-y-6">
                                <InputGroup label="Residential Address" icon={MapPin} error={errors.address}>
                                    <input 
                                        type="text" 
                                        value={data.address} 
                                        onChange={e => setData('address', e.target.value)} 
                                        className={inputClasses} 
                                    />
                                </InputGroup>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <InputGroup label="State" icon={Flag} error={errors.state}>
                                        <select 
                                            value={data.state} 
                                            onChange={e => {
                                                setData(d => ({ ...d, state: e.target.value, city: '' }));
                                            }} 
                                            className={inputClasses}
                                        >
                                            <option value="" className="bg-[#16161a]">Select State</option>
                                            {Object.keys(locationData).map(state => (
                                                <option key={state} value={state} className="bg-[#16161a]">{state}</option>
                                            ))}
                                        </select>
                                    </InputGroup>

                                    <InputGroup label="City" icon={Globe} error={errors.city}>
                                        <select 
                                            value={data.city} 
                                            onChange={e => setData('city', e.target.value)} 
                                            className={inputClasses}
                                            disabled={!data.state}
                                        >
                                            <option value="" className="bg-[#16161a]">Select City</option>
                                            {availableCities.map(city => (
                                                <option key={city} value={city} className="bg-[#16161a]">{city}</option>
                                            ))}
                                        </select>
                                    </InputGroup>

                                    <InputGroup label="Country" icon={Globe} error={errors.country}>
                                        <input 
                                            type="text" 
                                            value={data.country} 
                                            onChange={e => setData('country', e.target.value)} 
                                            className={inputClasses} 
                                        />
                                    </InputGroup>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <InputGroup label="Commencement Date" icon={Calendar} error={errors.joined_at}>
                                    <input 
                                        type="date" 
                                        value={data.joined_at} 
                                        onChange={e => setData('joined_at', e.target.value)} 
                                        className={`${inputClasses} [color-scheme:dark]`} 
                                    />
                                </InputGroup>
                            </div>

                            <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row gap-4">
                                <button 
                                    type="submit" 
                                    disabled={processing} 
                                    className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white rounded-2xl hover:bg-primary/90 transition-all font-black shadow-2xl shadow-primary/20 disabled:opacity-50"
                                >
                                    <Save className="w-5 h-5" />
                                    Synchronize Records
                                </button>
                                <Link 
                                    href={route('employees.index')} 
                                    className="px-8 py-4 bg-white/5 text-gray-400 rounded-2xl hover:text-white hover:bg-white/10 transition-all font-bold text-center"
                                >
                                    Cancel
                                </Link>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </div>
        </AuthenticatedLayout>
    );
}
