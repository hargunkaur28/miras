import Dropdown from '@/Components/Dropdown';
import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { 
    LayoutDashboard, 
    Package, 
    Users, 
    Truck, 
    ShoppingCart, 
    Users2, 
    Wallet, 
    Building2, 
    Menu, 
    X, 
    LogOut, 
    User as UserIcon,
    ChevronRight,
    Bell,
    Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import NotificationBell from '@/Components/NotificationBell';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navigation = [
        { name: 'Dashboard', href: route('dashboard'), icon: LayoutDashboard, active: route().current('dashboard') },
        ...(user.role === 'super_admin' ? [
            { name: 'Businesses', href: route('super-admin.businesses.index'), icon: Building2, active: route().current('super-admin.businesses.*') }
        ] : []),
        { name: 'Inventory', href: route('inventory.index'), icon: Package, active: route().current('inventory.*') },
        { name: 'Employees', href: route('employees.index'), icon: Users, active: route().current('employees.*') },
        { name: 'Departments', href: route('departments.index'), icon: Building2, active: route().current('departments.*') },
        { name: 'Suppliers', href: route('suppliers.index'), icon: Truck, active: route().current('suppliers.*') },
        { name: 'Purchase Orders', href: route('purchase-orders.index'), icon: ShoppingCart, active: route().current('purchase-orders.*') },
        { name: 'Customers', href: route('customers.index'), icon: Users2, active: route().current('customers.*') },
        { name: 'Sales Orders', href: route('sales-orders.index'), icon: ShoppingCart, active: route().current('sales-orders.*') },
        { name: 'Finance', href: route('finance.index'), icon: Wallet, active: route().current('finance.*') },
    ];

    return (
        <div className="min-h-screen bg-black flex">
            {/* Sidebar */}
            <aside 
                className={`${
                    isSidebarOpen ? 'w-64' : 'w-20'
                } transition-all duration-300 ease-in-out border-r border-white/10 bg-black flex flex-col fixed h-full z-50`}
            >
                <div className="p-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#F9F9F9] flex items-center justify-center shadow-lg shadow-white/10">
                        <Building2 className="text-black w-5 h-5" />
                    </div>
                    {isSidebarOpen && (
                        <motion.span 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-2xl font-serif font-bold text-white tracking-tight"
                        >
                            MSIRMS
                        </motion.span>
                    )}
                </div>

                <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-3 rounded-full transition-all group ${
                                item.active 
                                ? 'bg-[#F9F9F9] text-black shadow-[0_0_20px_rgba(255,255,255,0.1)]' 
                                : 'text-gray-400 hover:bg-white/10 hover:text-white'
                            }`}
                        >
                            <item.icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${item.active ? 'text-black' : ''}`} />
                            {isSidebarOpen && (
                                <motion.span 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="font-medium text-sm"
                                >
                                    {item.name}
                                </motion.span>
                            )}
                            {item.active && isSidebarOpen && (
                                <motion.div layoutId="activeNav" className="ml-auto w-1.5 h-1.5 rounded-full bg-black shadow-[0_0_10px_rgba(0,0,0,0.5)]" />
                            )}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-white/10">
                    <div className={`flex items-center gap-3 p-2 rounded-full bg-white/5 ${!isSidebarOpen && 'justify-center'}`}>
                        <div className="w-8 h-8 rounded-full bg-[#F9F9F9] flex items-center justify-center text-black font-bold">
                            {user.name.charAt(0)}
                        </div>
                        {isSidebarOpen && (
                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-semibold text-white truncate">{user.name}</p>
                                <p className="text-[10px] text-gray-500 truncate">{user.role?.toUpperCase()}</p>
                            </div>
                        )}
                        {isSidebarOpen && (
                            <Link method="post" href={route('logout')} as="button" className="text-gray-500 hover:text-red-400 transition-colors">
                                <LogOut className="w-4 h-4" />
                            </Link>
                        )}
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
                {/* Header */}
                <header className={`sticky top-0 z-40 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'}`}>
                    <div className="flex h-20 items-center justify-between px-8">
                        <div className="flex items-center gap-4">
                            <button 
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                className="p-2 rounded-full bg-white/5 text-gray-400 hover:text-white transition-colors border border-white/10"
                            >
                                {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                            </button>
                            <div className="hidden md:flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-400 focus-within:text-white focus-within:border-white/50 transition-all">
                                <Search className="w-4 h-4" />
                                <input type="text" placeholder="Search resources..." className="bg-transparent border-none focus:ring-0 text-sm w-64 placeholder:text-gray-500" />
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <NotificationBell />
                            
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button className="flex items-center gap-2 p-1 pr-3 rounded-full bg-white/5 hover:bg-white/10 transition-all border border-white/10 group">
                                        <div className="w-8 h-8 rounded-full bg-[#F9F9F9] flex items-center justify-center text-black text-xs font-bold">
                                            {user.name.charAt(0)}
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-white transition-transform group-hover:rotate-90" />
                                    </button>
                                </Dropdown.Trigger>
                                <Dropdown.Content align="right" width="48" contentClasses="bg-black border border-white/10">
                                    <Dropdown.Link href={route('profile.edit')} className="text-gray-300 hover:bg-white/5">Profile</Dropdown.Link>
                                    <Dropdown.Link href={route('logout')} method="post" as="button" className="text-gray-300 hover:bg-white/5">Log Out</Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <main className="flex-1 p-8">
                    {header && (
                        <div className="mb-8">
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex flex-col gap-1"
                            >
                                <h1 className="text-4xl font-serif font-bold text-white tracking-tight">{header}</h1>
                                <p className="text-gray-400 text-sm mt-1">Manage your resources and monitor industry health.</p>
                            </motion.div>
                        </div>
                    )}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        {children}
                    </motion.div>
                </main>

                <footer className="p-8 text-center text-gray-500 text-xs border-t border-white/10">
                    &copy; {new Date().getFullYear()} MSIRMS - Micro/Small Industry Resource Management System. Built with &hearts;
                </footer>
            </div>
        </div>
    );
}

