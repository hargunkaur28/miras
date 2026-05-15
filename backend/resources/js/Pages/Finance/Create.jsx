import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { 
    ArrowLeft, 
    Save, 
    TrendingUp, 
    TrendingDown, 
    Tag, 
    IndianRupee, 
    Calendar,
    FileText,
    Plus
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

const inputClasses = "w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white placeholder:text-gray-600 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all appearance-none";

export default function FinanceCreate() {
    const { data, setData, post, errors, processing } = useForm({
        type: 'income',
        category: '',
        amount: '',
        description: '',
        entry_date: new Date().toISOString().split('T')[0],
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('finance.store'));
    };

    return (
        <AuthenticatedLayout header="Financial Entry Injection">
            <Head title="Add Finance Entry" />
            
            <div className="max-w-4xl mx-auto">
                <Link 
                    href={route('finance.index')} 
                    className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-8 group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Ledger
                </Link>

                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass-card rounded-[2.5rem] overflow-hidden"
                >
                    <div className="p-8 md:p-12">
                        <div className="flex items-center gap-4 mb-10">
                            <div className="w-16 h-16 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                                <Plus className="text-primary w-8 h-8" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white">Record Transaction</h2>
                                <p className="text-gray-500 text-sm">Inject a new financial delta into the organizational ecosystem.</p>
                            </div>
                        </div>

                        <form onSubmit={submit} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <InputGroup label="Transaction Type" icon={data.type === 'income' ? TrendingUp : TrendingDown} error={errors.type}>
                                    <select 
                                        value={data.type} 
                                        onChange={e => setData('type', e.target.value)} 
                                        className={inputClasses}
                                    >
                                        <option value="income" className="bg-[#16161a]">Income (Credit)</option>
                                        <option value="expense" className="bg-[#16161a]">Expense (Debit)</option>
                                    </select>
                                </InputGroup>

                                <InputGroup label="Classification" icon={Tag} error={errors.category}>
                                    <input 
                                        type="text" 
                                        placeholder="e.g. Service Revenue, Utility Bill"
                                        value={data.category} 
                                        onChange={e => setData('category', e.target.value)} 
                                        className={inputClasses} 
                                    />
                                </InputGroup>

                                <InputGroup label="Valuation (₹)" icon={IndianRupee} error={errors.amount}>
                                    <input 
                                        type="number" 
                                        step="0.01" 
                                        placeholder="0.00"
                                        value={data.amount} 
                                        onChange={e => setData('amount', e.target.value)} 
                                        className={inputClasses} 
                                    />
                                </InputGroup>

                                <InputGroup label="Transaction Date" icon={Calendar} error={errors.entry_date}>
                                    <input 
                                        type="date" 
                                        value={data.entry_date}
                                        onChange={e => setData('entry_date', e.target.value)}
                                        className={`${inputClasses} [color-scheme:dark]`} 
                                    />
                                </InputGroup>
                            </div>

                            <InputGroup label="Delta Description" icon={FileText} error={errors.description}>
                                <textarea 
                                    value={data.description} 
                                    onChange={e => setData('description', e.target.value)} 
                                    className={`${inputClasses} min-h-[120px] resize-none`}
                                    placeholder="Provide context for this financial movement..."
                                />
                            </InputGroup>

                            <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row gap-4">
                                <button 
                                    type="submit" 
                                    disabled={processing} 
                                    className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white rounded-2xl hover:bg-primary/90 transition-all font-black shadow-2xl shadow-primary/20 disabled:opacity-50"
                                >
                                    <Save className="w-5 h-5" />
                                    Commit Record
                                </button>
                                <Link 
                                    href={route('finance.index')} 
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
