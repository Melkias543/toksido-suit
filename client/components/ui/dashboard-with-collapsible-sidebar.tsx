"use client";
import React from "react";
import {
  DollarSign,
  ShoppingCart,
  Users,
  TrendingUp,
  Activity,
  Package,
  Bell,
  Moon,
  Sun,
  User,
  ArrowUpRight,
} from "lucide-react";

type Props = {
  isDark: boolean;
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
};

const CentralDashboard = ({ isDark, setIsDark }: Props) => {
  return (
    <div className="flex-1 w-full bg-gray-50 dark:bg-gray-950 p-4 md:p-8 overflow-y-auto transition-colors duration-300">
      {/* --- TOP HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-gray-100 tracking-tight">
            Dashboard{" "}
            <span className="text-blue-600 dark:text-blue-500">Overview</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
            Real-time analytics and system status for your store.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsDark(!isDark)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-all shadow-sm"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button className="relative h-10 w-10 flex items-center justify-center rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400">
            <Bell size={18} />
            <span className="absolute top-2.5 right-2.5 h-2 w-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-900"></span>
          </button>

          <div className="h-10 w-px bg-gray-200 dark:bg-gray-800 mx-1 hidden md:block"></div>

          <button className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
            <span className="text-xs font-bold text-gray-700 dark:text-gray-300 ml-2 hidden sm:block">
              Admin
            </span>
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-500 to-emerald-400 flex items-center justify-center text-white font-bold text-xs">
              AD
            </div>
          </button>
        </div>
      </div>

      {/* --- STATS GRID --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard
          title="Revenue"
          value="ETB 84,200"
          trend="+12.5%"
          Icon={DollarSign}
          color="blue"
        />
        <StatCard
          title="Active Users"
          value="1,240"
          trend="+4.2%"
          Icon={Users}
          color="emerald"
        />
        <StatCard
          title="Sales Count"
          value="456"
          trend="+8.1%"
          Icon={ShoppingCart}
          color="purple"
        />
        <StatCard
          title="Stock Items"
          value="89"
          trend="Stable"
          Icon={Package}
          color="orange"
        />
      </div>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-black text-gray-900 dark:text-gray-100">
                Recent Activity
              </h3>
              <button className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">
                View History
              </button>
            </div>

            <div className="space-y-4">
              <ActivityRow
                icon={DollarSign}
                label="Order #8829"
                desc="Customer paid ETB 4,500"
                time="2m ago"
                color="emerald"
              />
              <ActivityRow
                icon={User}
                label="New Member"
                desc="Tolosa B. joined the platform"
                time="15m ago"
                color="blue"
              />
              <ActivityRow
                icon={Package}
                label="Inventory Alert"
                desc="Habesha Suit stock is low (2 left)"
                time="1h ago"
                color="orange"
              />
              <ActivityRow
                icon={Activity}
                label="Server Health"
                desc="Automatic backup completed successfully"
                time="3h ago"
                color="purple"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
            <h3 className="text-lg font-black text-gray-900 dark:text-gray-100 mb-6">
              Monthly Targets
            </h3>
            <div className="space-y-6">
              <ProgressItem label="Sales Goal" value={72} color="bg-blue-500" />
              <ProgressItem
                label="User Growth"
                value={45}
                color="bg-emerald-500"
              />
              <ProgressItem
                label="Return Rate"
                value={12}
                color="bg-rose-500"
              />
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-6 text-white shadow-lg shadow-blue-500/20">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-md">
                <TrendingUp size={20} />
              </div>
              <ArrowUpRight size={20} className="opacity-50" />
            </div>
            <h4 className="font-bold text-lg mb-1">Growth Report</h4>
            <p className="text-blue-100 text-xs mb-4">
              Your store traffic increased by 24% this week.
            </p>
            <button className="w-full py-2 bg-white text-blue-700 rounded-xl font-bold text-xs hover:bg-blue-50 transition-colors">
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- TYPES IMPROVED ONLY ---
type StatCardProps = {
  title: string;
  value: string;
  trend: string;
  Icon: React.ComponentType<{ size?: number }>;
  color: "blue" | "emerald" | "purple" | "orange";
};

const StatCard = ({ title, value, trend, Icon, color }: StatCardProps) => {
  const colorMap = {
    blue: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20",
    emerald:
      "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20",
    purple:
      "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20",
    orange:
      "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20",
  } as const;

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm group hover:border-blue-500/30 transition-all">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2.5 rounded-2xl ${colorMap[color]}`}>
          <Icon size={20} />
        </div>
        <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-1 rounded-lg">
          {trend}
        </span>
      </div>
      <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
        {title}
      </p>
      <p className="text-2xl font-black text-gray-900 dark:text-gray-100 mt-1">
        {value}
      </p>
    </div>
  );
};

// derive keys from object instead of wrong type usage
const activityColorMap = {
  blue: "text-blue-600 bg-blue-50 dark:bg-blue-900/20",
  emerald: "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20",
  orange: "text-orange-600 bg-orange-50 dark:bg-orange-900/20",
  purple: "text-purple-600 bg-purple-50 dark:bg-purple-900/20",
} as const;

type ActivityRowProps = {
  icon: React.ComponentType<{ size?: number }>;
  label: string;
  desc: string;
  time: string;
  color: keyof typeof activityColorMap;
};

const ActivityRow = ({
  icon: Icon,
  label,
  desc,
  time,
  color,
}: ActivityRowProps) => {
  return (
    <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-700">
      <div className={`p-2 rounded-xl ${activityColorMap[color]}`}>
        <Icon size={16} />
      </div>
      <div className="flex-1">
        <p className="text-sm font-bold text-gray-900 dark:text-gray-100">
          {label}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{desc}</p>
      </div>
      <span className="text-[10px] font-bold text-gray-400 uppercase">
        {time}
      </span>
    </div>
  );
};

type ProgressItemProps = {
  label: string;
  value: number;
  color: string; // keeps your original usage intact (bg-*)
};

const ProgressItem = ({ label, value, color }: ProgressItemProps) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center">
      <span className="text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-tighter">
        {label}
      </span>
      <span className="text-xs font-black text-gray-900 dark:text-gray-100">
        {value}%
      </span>
    </div>
    <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
      <div
        className={`h-full ${color} rounded-full`}
        style={{ width: `${value}%` }}
      />
    </div>
  </div>
);

export default CentralDashboard;
