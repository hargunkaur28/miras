import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { 
    Users, 
    ArrowLeft, 
    Save, 
    User, 
    Mail, 
    Phone, 
    MapPin, 
    Globe, 
    Edit3,
    Building2,
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

export default function CustomersEdit({ customer }) {
    const { data, setData, patch, errors, processing } = useForm({
        name: customer.name || '', 
        contact_person: customer.contact_person || '', 
        email: customer.email || '', 
        phone: customer.phone || '', 
        address: customer.address || '', 
        city: customer.city || '', 
        state: customer.state || '',
        country: customer.country || 'India',
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
        patch(route('customers.update', customer.id));
    };

    return (
        <AuthenticatedLayout header={`Modify Profile: ${customer.name}`}>
            <Head title={`Edit ${customer.name}`} />
            
            <div className="max-w-4xl mx-auto">
                <Link 
                    href={route('customers.index')} 
                    className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-8 group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Clients
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
                                <h2 className="text-2xl font-bold text-white">Refine Client Data</h2>
                                <p className="text-gray-500 text-sm">Update the strategic parameters for this customer relationship.</p>
                            </div>
                        </div>

                        <form onSubmit={submit} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <InputGroup label="Entity Name" icon={Building2} error={errors.name}>
                                    <input 
                                        type="text" 
                                        value={data.name} 
                                        onChange={e => setData('name', e.target.value)} 
                                        className={inputClasses} 
                                    />
                                </InputGroup>

                                <InputGroup label="Key Contact Name" icon={User} error={errors.contact_person}>
                                    <input 
                                        type="text" 
                                        value={data.contact_person} 
                                        onChange={e => setData('contact_person', e.target.value)} 
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

                                <InputGroup label="Primary Phone" icon={Phone} error={errors.phone}>
                                    <input 
                                        type="tel" 
                                        placeholder="+91 XXXXX XXXXX"
                                        value={data.phone} 
                                        onChange={e => setData('phone', e.target.value)} 
                                        className={inputClasses} 
                                    />
                                </InputGroup>
                            </div>

                            <div className="space-y-6">
                                <InputGroup label="Corporate Address" icon={MapPin} error={errors.address}>
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

                                    <InputGroup label="Operational City" icon={Globe} error={errors.city}>
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

                                    <InputGroup label="Sovereign State / Country" icon={Globe} error={errors.country}>
                                        <input 
                                            type="text" 
                                            value={data.country} 
                                            onChange={e => setData('country', e.target.value)} 
                                            className={inputClasses} 
                                        />
                                    </InputGroup>
                                </div>
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
                                    href={route('customers.index')} 
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
