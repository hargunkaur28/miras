import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { 
    Users, 
    ShoppingCart, 
    Truck, 
    Package, 
    TrendingUp, 
    AlertCircle, 
    Clock, 
    IndianRupee,
    ArrowUpRight,
    ArrowDownRight,
    Briefcase,
    Building2,
    CheckCircle2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

export default function Dashboard({ stats, monthlyData, isSuperAdmin }) {
    // Process monthlyData for Recharts
    const safeMonthlyData = Array.isArray(monthlyData) ? monthlyData : Object.values(monthlyData || {});
    const chartData = safeMonthlyData.reduce((acc, curr) => {
        const month = curr.month;
        const existing = acc.find(a => a.month === month);
        if (existing) {
            existing[curr.type] = Number(curr.total);
        } else {
            acc.push({
                month,
                income: curr.type === 'income' ? Number(curr.total) : 0,
                expense: curr.type === 'expense' ? Number(curr.total) : 0,
            });
        }
        return acc;
    }, []).sort((a, b) => (a.month || '').localeCompare(b.month || ''));

    const StatCard = ({ label, value, icon: Icon, color, trend }) => {
        const colors = {
            purple: 'from-white/10 to-transparent border-white/10 text-white',
            blue: 'from-white/10 to-transparent border-white/10 text-white',
            green: 'from-white/10 to-transparent border-white/10 text-white',
            orange: 'from-white/10 to-transparent border-white/10 text-white',
            red: 'from-white/10 to-transparent border-white/10 text-white',
        };

        return (
            <motion.div 
                whileHover={{ y: -5 }}
                className={`glass-card p-6 rounded-3xl bg-gradient-to-br ${colors[color]} relative overflow-hidden group`}
            >
                <div className="flex justify-between items-start relative z-10">
                    <div className="space-y-4">
                        <div className={`p-3 rounded-2xl bg-white/5 border border-white/10 w-fit group-hover:scale-110 transition-transform`}>
                            <Icon className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm font-medium">{label}</p>
                            <h3 className="text-2xl font-bold text-white mt-1">
                                {typeof value === 'number' ? value.toLocaleString() : value}
                            </h3>
                        </div>
                    </div>
                    {trend && (
                        <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full bg-white/[0.05] border border-white/10 ${trend > 0 ? 'text-white' : 'text-gray-400'}`}>
                            {trend > 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                            {Math.abs(trend)}%
                        </div>
                    )}
                </div>
                <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Icon size={120} />
                </div>
            </motion.div>
        );
    };

    return (
        <AuthenticatedLayout header={isSuperAdmin ? "Global Platform Control" : "Industrial Analytics Dashboard"}>
            <Head title="Dashboard" />

            <div className="space-y-8">
                {/* KPI Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {isSuperAdmin ? (
                        <>
                            <StatCard label="Total Businesses" value={stats.total_businesses} icon={Building2} color="purple" trend={15} />
                            <StatCard label="Platform Workforce" value={stats.total_employees} icon={Users} color="blue" trend={12} />
                            <StatCard label="Global Partners" value={stats.total_suppliers} icon={Truck} color="orange" />
                            <StatCard label="Total Valuation" value={`₹${(stats.total_revenue / 1000000).toFixed(1)}M`} icon={IndianRupee} color="green" trend={5} />
                        </>
                    ) : (
                        <>
                            <StatCard label="Total Workforce" value={stats.total_employees} icon={Users} color="purple" trend={12} />
                            <StatCard label="Active Customers" value={stats.total_customers} icon={Briefcase} color="blue" trend={8} />
                            <StatCard label="Supply Network" value={stats.total_suppliers} icon={Truck} color="orange" />
                            <StatCard label="Inventory Items" value={stats.total_inventory_items} icon={Package} color="green" />
                        </>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Financial Overview */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="glass-card rounded-3xl p-8 relative overflow-hidden">
                            <div className="flex justify-between items-center mb-8 relative z-10">
                                <div>
                                    <h3 className="text-3xl font-serif font-bold text-white">{isSuperAdmin ? "Global Revenue Stream" : "Business Revenue Stream"}</h3>
                                    <p className="text-gray-400 text-sm mt-1">Monthly financial performance summary</p>
                                </div>
                                <div className="p-3 rounded-full bg-[#F9F9F9] text-black">
                                    <TrendingUp className="w-6 h-6" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                                <div className="space-y-2 p-6 rounded-2xl bg-white/5 border border-white/5">
                                    <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">{isSuperAdmin ? "Total Revenue" : "Monthly Income"}</p>
                                    <p className="text-2xl font-bold text-white">₹{Number(isSuperAdmin ? stats.total_revenue : stats.monthly_income || 0).toLocaleString()}</p>
                                    <div className={`flex items-center gap-1 text-xs ${stats.revenue_trend >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                                        {stats.revenue_trend >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                        <span>{Math.abs(stats.revenue_trend)}% from last month</span>
                                    </div>
                                </div>
                                <div className="space-y-2 p-6 rounded-2xl bg-white/5 border border-white/5">
                                    <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Operational Cost</p>
                                    <p className="text-2xl font-bold text-white">₹{Number(stats.total_expenses || 0).toLocaleString()}</p>
                                    <div className={`flex items-center gap-1 text-xs ${stats.expense_trend <= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                                        {stats.expense_trend <= 0 ? <ArrowDownRight className="w-3 h-3" /> : <ArrowUpRight className="w-3 h-3" />}
                                        <span>{Math.abs(stats.expense_trend)}% from last month</span>
                                    </div>
                                </div>
                                <div className="space-y-2 p-6 rounded-2xl bg-white/5 border border-white/5">
                                    <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">{isSuperAdmin ? "Active Entities" : "Total Revenue"}</p>
                                    <p className="text-2xl font-bold text-white">{isSuperAdmin ? stats.active_businesses : `₹${Number(stats.total_revenue || 0).toLocaleString()}`}</p>
                                    <div className="flex items-center gap-1 text-emerald-400 text-xs">
                                        <ArrowUpRight className="w-3 h-3" />
                                        <span>{isSuperAdmin ? "Live ecosystem" : "Total lifetime gain"}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full -mr-32 -mt-32" />
                            
                            {/* Chart Area */}
                            <div className="mt-12 h-64 w-full relative z-10">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={chartData}>
                                        <defs>
                                            <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                                                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                            </linearGradient>
                                            <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                                                <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                                        <XAxis 
                                            dataKey="month" 
                                            stroke="#6b7280" 
                                            fontSize={10}
                                            tickLine={false}
                                            axisLine={false}
                                            tickFormatter={(str) => {
                                                const [year, month] = str.split('-');
                                                const date = new Date(year, month - 1);
                                                return date.toLocaleString('default', { month: 'short' });
                                            }}
                                        />
                                        <YAxis 
                                            stroke="#6b7280" 
                                            fontSize={10}
                                            tickLine={false}
                                            axisLine={false}
                                            tickFormatter={(val) => `₹${val > 999 ? (val/1000).toFixed(0) + 'k' : val}`}
                                        />
                                        <Tooltip 
                                            contentStyle={{ 
                                                backgroundColor: '#111111', 
                                                border: '1px solid #ffffff10',
                                                borderRadius: '12px',
                                                fontSize: '12px'
                                            }}
                                            itemStyle={{ color: '#fff' }}
                                        />
                                        <Area 
                                            type="monotone" 
                                            dataKey="income" 
                                            stroke="#10b981" 
                                            fillOpacity={1} 
                                            fill="url(#colorIncome)" 
                                            strokeWidth={3}
                                        />
                                        <Area 
                                            type="monotone" 
                                            dataKey="expense" 
                                            stroke="#f43f5e" 
                                            fillOpacity={1} 
                                            fill="url(#colorExpense)" 
                                            strokeWidth={3}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Recent Activity Table */}
                        <div className="glass-card rounded-3xl p-8">
                            <h3 className="text-2xl font-serif font-bold text-white mb-6">{isSuperAdmin ? "Platform-Wide Activity" : "Recent Transactions"}</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="text-gray-500 text-xs uppercase tracking-wider border-b border-white/5">
                                            <th className="px-4 py-4 text-left font-bold">Month</th>
                                            <th className="px-4 py-4 text-left font-bold">Type</th>
                                            <th className="px-4 py-4 text-right font-bold">Volume</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {monthlyData.map((row, idx) => (
                                            <tr key={idx} className="group hover:bg-white/5 transition-colors">
                                                <td className="px-4 py-4 text-sm text-gray-300 font-medium">{row.month}</td>
                                                <td className="px-4 py-4">
                                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                                                        row.type === 'income' 
                                                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                                                        : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                                                    }`}>
                                                        {row.type}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-4 text-sm text-right font-bold text-white">
                                                    ₹{Number(row.total || 0).toLocaleString()}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Side Column */}
                    <div className="space-y-6">
                        <div className={`glass-card rounded-3xl p-8 border-l-4 ${isSuperAdmin ? 'border-white' : 'border-gray-500'}`}>
                            <div className="flex items-center gap-3 mb-6">
                                {isSuperAdmin ? <CheckCircle2 className="text-white w-5 h-5" /> : <AlertCircle className="text-gray-400 w-5 h-5" />}
                                <h3 className="text-2xl font-serif font-bold text-white">{isSuperAdmin ? "Ecosystem Health" : "Critical Alerts"}</h3>
                            </div>
                            <div className="space-y-4">
                                {isSuperAdmin ? (
                                    <>
                                        <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-between group">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                                                    <Building2 className="text-primary w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-white">Active Nodes</p>
                                                    <p className="text-xs text-primary/60">{stats.active_businesses} online</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-between group">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                                                    <Users className="text-blue-400 w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-white">Total Users</p>
                                                    <p className="text-xs text-blue-300/60">Across all businesses</p>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-between group cursor-pointer hover:bg-rose-500/20 transition-all">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-rose-500/20 flex items-center justify-center">
                                                    <Package className="text-rose-400 w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-white">Low Stock</p>
                                                    <p className="text-xs text-rose-300/60">{stats.low_stock_items} items need reorder</p>
                                                </div>
                                            </div>
                                            <ArrowUpRight className="w-4 h-4 text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="glass-card rounded-3xl p-8">
                            <h3 className="text-2xl font-serif font-bold text-white mb-6">System Health</h3>
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs">
                                        <span className="text-gray-500 font-bold uppercase">Resource Utilization</span>
                                        <span className="text-primary font-bold">84%</span>
                                    </div>
                                    <div className="h-2 rounded-full bg-white/5 overflow-hidden border border-white/5">
                                        <motion.div initial={{ width: 0 }} animate={{ width: '84%' }} className="h-full bg-gradient-to-r from-primary to-blue-500" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs">
                                        <span className="text-gray-500 font-bold uppercase">Database Sync</span>
                                        <span className="text-emerald-400 font-bold text-[10px] tracking-widest px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 uppercase">Live</span>
                                    </div>
                                    <div className="h-1 rounded-full bg-white/5 overflow-hidden border border-white/5">
                                        <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 shadow-[0_0_10px_rgba(16,185,129,0.3)]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

