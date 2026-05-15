import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { 
    ArrowLeft, 
    Save, 
    Package, 
    Tag, 
    Hash, 
    Layers, 
    Database, 
    AlertTriangle, 
    IndianRupee,
    Box,
    Edit3
} from 'lucide-react';
import { motion } from 'framer-motion';

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

const inputClasses = "w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white placeholder:text-gray-600 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all";

export default function InventoryEdit({ item }) {
    const { data, setData, patch, errors, processing } = useForm({
        name: item.name || '',
        sku: item.sku || '',
        category: item.category || '',
        unit: item.unit || '',
        quantity: item.quantity || 0,
        reorder_level: item.reorder_level || 10,
        cost_price: item.cost_price || 0,
        sell_price: item.sell_price || 0,
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('inventory.update', item.id));
    };

    return (
        <AuthenticatedLayout header={`Edit Asset: ${item.sku}`}>
            <Head title={`Edit ${item.name}`} />
            
            <div className="max-w-4xl mx-auto">
                <Link 
                    href={route('inventory.index')} 
                    className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-8 group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Registry
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
                                <h2 className="text-2xl font-bold text-white">Modify Asset</h2>
                                <p className="text-gray-500 text-sm">Update the parameters for {item.name} in the central repository.</p>
                            </div>
                        </div>

                        <form onSubmit={submit} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <InputGroup label="Asset Name" icon={Package} error={errors.name}>
                                    <input 
                                        type="text" 
                                        value={data.name} 
                                        onChange={e => setData('name', e.target.value)} 
                                        className={inputClasses} 
                                    />
                                </InputGroup>

                                <InputGroup label="SKU / Serial (Read Only)" icon={Hash}>
                                    <input 
                                        type="text" 
                                        value={data.sku} 
                                        readOnly 
                                        className={`${inputClasses} bg-white/[0.02] text-gray-500 cursor-not-allowed`} 
                                    />
                                </InputGroup>

                                <InputGroup label="Category" icon={Tag} error={errors.category}>
                                    <input 
                                        type="text" 
                                        value={data.category} 
                                        onChange={e => setData('category', e.target.value)} 
                                        className={inputClasses} 
                                    />
                                </InputGroup>

                                <InputGroup label="Measurement Unit" icon={Layers} error={errors.unit}>
                                    <input 
                                        type="text" 
                                        value={data.unit} 
                                        onChange={e => setData('unit', e.target.value)} 
                                        className={inputClasses} 
                                    />
                                </InputGroup>

                                <InputGroup label="Current Quantity" icon={Database} error={errors.quantity}>
                                    <input 
                                        type="number" 
                                        value={data.quantity} 
                                        onChange={e => setData('quantity', e.target.value)} 
                                        className={inputClasses} 
                                    />
                                </InputGroup>

                                <InputGroup label="Reorder Threshold" icon={AlertTriangle} error={errors.reorder_level}>
                                    <input 
                                        type="number" 
                                        value={data.reorder_level} 
                                        onChange={e => setData('reorder_level', e.target.value)} 
                                        className={inputClasses} 
                                    />
                                </InputGroup>

                                <InputGroup label="Acquisition Cost (₹)" icon={IndianRupee} error={errors.cost_price}>
                                    <input 
                                        type="number" 
                                        step="0.01" 
                                        value={data.cost_price} 
                                        onChange={e => setData('cost_price', e.target.value)} 
                                        className={inputClasses} 
                                    />
                                </InputGroup>

                                <InputGroup label="Market Price (₹)" icon={IndianRupee} error={errors.sell_price}>
                                    <input 
                                        type="number" 
                                        step="0.01" 
                                        value={data.sell_price} 
                                        onChange={e => setData('sell_price', e.target.value)} 
                                        className={inputClasses} 
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
                                    Save Changes
                                </button>
                                <Link 
                                    href={route('inventory.index')} 
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
