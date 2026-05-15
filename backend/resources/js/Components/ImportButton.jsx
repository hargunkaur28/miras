import React, { useRef } from 'react';
import { Upload, Loader2, AlertCircle } from 'lucide-react';
import { useForm } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ImportButton({ route: importRoute, label = "Import CSV" }) {
    const fileInput = useRef();
    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        file: null,
    });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('file', file);
        }
    };

    React.useEffect(() => {
        if (data.file) {
            post(importRoute, {
                onSuccess: () => {
                    reset();
                    if (fileInput.current) fileInput.current.value = '';
                },
                onFinish: () => {
                    setData('file', null);
                }
            });
        }
    }, [data.file]);

    return (
        <div className="relative inline-block">
            <input 
                type="file" 
                ref={fileInput}
                onChange={handleFileChange}
                accept=".csv"
                className="hidden"
            />
            
            <button 
                onClick={() => fileInput.current.click()}
                disabled={processing}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-all text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed group"
            >
                {processing ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                    <Upload className="w-4 h-4 group-hover:scale-110 transition-transform" />
                )}
                {label}
            </button>

            {/* Error Tooltip */}
            <AnimatePresence>
                {Object.keys(errors).length > 0 && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 w-72 p-4 glass-card border-rose-500/50 bg-rose-500/10 backdrop-blur-xl rounded-2xl z-50 shadow-2xl"
                    >
                        <div className="flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                            <div className="space-y-1">
                                <p className="text-sm font-bold text-rose-500">Import Failed</p>
                                <div className="text-xs text-rose-300/80 max-h-32 overflow-y-auto custom-scrollbar">
                                    {Object.values(errors).map((err, i) => (
                                        <div key={i} className="mb-1">{err}</div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <button 
                            onClick={clearErrors}
                            className="mt-3 w-full py-1 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-white transition-colors"
                        >
                            Dismiss
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
