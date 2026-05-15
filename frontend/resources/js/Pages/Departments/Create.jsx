import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { 
    Building2, 
    ArrowLeft, 
    Save, 
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

const inputClasses = "w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white placeholder:text-gray-600 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all";

export default function DepartmentsCreate() {
    const { data, setData, post, errors, processing } = useForm({
        name: '',
        description: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('departments.store'));
    };

    return (
        <AuthenticatedLayout header="Organizational Expansion">
            <Head title="Create Department" />
            
            <div className="max-w-4xl mx-auto">
                <Link 
                    href={route('departments.index')} 
                    className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-8 group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Departments
                </Link>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card rounded-[2.5rem] overflow-hidden"
                >
                    <div className="p-8 md:p-12">
                        <div className="flex items-center gap-4 mb-10">
                            <div className="w-16 h-16 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                                <Plus className="text-primary w-8 h-8" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white">New Department</h2>
                                <p className="text-gray-500 text-sm">Define a new functional unit within your industry hierarchy.</p>
                            </div>
                        </div>

                        <form onSubmit={submit} className="space-y-8">
                            <div className="space-y-6">
                                <InputGroup label="Department Name" icon={Building2} error={errors.name}>
                                    <input 
                                        type="text" 
                                        placeholder="e.g. Quality Assurance"
                                        value={data.name} 
                                        onChange={e => setData('name', e.target.value)} 
                                        className={inputClasses} 
                                    />
                                </InputGroup>

                                <InputGroup label="Core Description" icon={FileText} error={errors.description}>
                                    <textarea 
                                        placeholder="Define the primary responsibilities of this department..."
                                        value={data.description} 
                                        onChange={e => setData('description', e.target.value)} 
                                        className={`${inputClasses} min-h-[120px] resize-none`}
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
                                    Establish Department
                                </button>
                                <Link 
                                    href={route('departments.index')} 
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
