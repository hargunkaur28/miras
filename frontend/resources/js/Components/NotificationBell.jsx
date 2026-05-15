import { useState, useRef, useEffect } from 'react';
import { Bell, X, Check, Info, AlertTriangle, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@inertiajs/react';

export default function NotificationBell() {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            title: 'Low Stock Alert',
            message: 'Steel Sheets (Grade A) is below reorder level (5 units left).',
            type: 'warning',
            time: '5 mins ago',
            read: false
        },
        {
            id: 2,
            title: 'New Sales Order',
            message: 'SO-2024-004 has been placed by Advance Tech Corp.',
            type: 'info',
            time: '1 hour ago',
            read: false
        },
        {
            id: 3,
            title: 'Inventory Sync',
            message: 'Cloud backup completed successfully.',
            type: 'success',
            time: '2 hours ago',
            read: true
        }
    ]);

    const dropdownRef = useRef(null);
    const unreadCount = notifications.filter(n => !n.read).length;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const markAsRead = (id) => {
        setNotifications(notifications.map(n => 
            n.id === id ? { ...n, read: true } : n
        ));
    };

    const clearAll = () => {
        setNotifications([]);
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white transition-colors border border-white/5 group"
            >
                <Bell className={`w-5 h-5 ${unreadCount > 0 ? 'animate-swing origin-top' : ''}`} />
                {unreadCount > 0 && (
                    <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary border-2 border-[#0a0a0c]" />
                )}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-3 w-80 bg-[#16161a] border border-white/10 rounded-2xl shadow-2xl z-[100] overflow-hidden"
                    >
                        <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                            <h3 className="font-bold text-white">Notifications</h3>
                            {notifications.length > 0 && (
                                <button 
                                    onClick={clearAll}
                                    className="text-[10px] font-black uppercase text-gray-500 hover:text-white transition-colors"
                                >
                                    Clear All
                                </button>
                            )}
                        </div>

                        <div className="max-h-[400px] overflow-y-auto">
                            {notifications.length > 0 ? (
                                notifications.map((notif) => (
                                    <div 
                                        key={notif.id}
                                        onClick={() => markAsRead(notif.id)}
                                        className={`p-4 border-b border-white/5 hover:bg-white/[0.03] transition-colors cursor-pointer relative group ${!notif.read ? 'bg-primary/5' : ''}`}
                                    >
                                        <div className="flex gap-3">
                                            <div className={`mt-1 p-1.5 rounded-lg ${
                                                notif.type === 'warning' ? 'bg-amber-500/10 text-amber-500' :
                                                notif.type === 'success' ? 'bg-emerald-500/10 text-emerald-500' :
                                                'bg-blue-500/10 text-blue-500'
                                            }`}>
                                                {notif.type === 'warning' && <AlertTriangle className="w-3 h-3" />}
                                                {notif.type === 'success' && <Check className="w-3 h-3" />}
                                                {notif.type === 'info' && <Info className="w-3 h-3" />}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between gap-2">
                                                    <p className={`text-sm font-bold truncate ${!notif.read ? 'text-white' : 'text-gray-400'}`}>
                                                        {notif.title}
                                                    </p>
                                                    <span className="text-[10px] text-gray-600 whitespace-nowrap">{notif.time}</span>
                                                </div>
                                                <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">
                                                    {notif.message}
                                                </p>
                                            </div>
                                        </div>
                                        {!notif.read && (
                                            <div className="absolute right-2 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-primary" />
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div className="p-8 text-center">
                                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-3">
                                        <Bell className="w-5 h-5 text-gray-700" />
                                    </div>
                                    <p className="text-sm text-gray-600 font-medium">All caught up!</p>
                                    <p className="text-xs text-gray-700 mt-1">No new notifications</p>
                                </div>
                            )}
                        </div>

                        {notifications.length > 3 && (
                            <div className="p-3 bg-white/[0.02] text-center border-t border-white/5">
                                <Link className="text-[10px] font-black uppercase text-primary hover:text-primary/80 transition-colors">
                                    View All Activity
                                </Link>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
