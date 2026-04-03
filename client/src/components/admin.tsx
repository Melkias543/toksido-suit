"use client";
import CentralDashboard from "@/components/ui/dashboard-with-collapsible-sidebar";
import React, { useState } from "react";

const AdminAllInOne = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showForm, setShowForm] = useState(false);

  const handleTabChange = (tabId:any) => {
    setActiveTab(tabId);
    setShowForm(false);
  };

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      {/* ✅ CLEAN SIDEBAR */}

      <main className="flex-1 p-4 md:p-10">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <h1 className="text-3xl font-black text-slate-900 capitalize">
            {activeTab}{" "}
            <span className="text-emerald-500 text-sm font-normal">
              Management
            </span>
          </h1>

          {(activeTab === "products" || activeTab === "categories") && (
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-emerald-600 shadow-xl transition active:scale-95"
            >
              {showForm ? "✕ Close" : `+ New ${activeTab.slice(0, -1)}`}
            </button>
          )}
        </div>

     

        {/* FORM */}
        {showForm && (
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-emerald-100 mb-10">
            <h2 className="text-xl font-black mb-6">
              Add New {activeTab.slice(0, -1)}
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <FormInput label="English" placeholder="Suit..." />
              <FormInput label="Amharic" placeholder="ባህላዊ..." isAmharic />
              <FormInput label="Oromo" placeholder="Uffata..." />
            </div>

            <div className="mt-6 flex gap-4">
              <button className="bg-emerald-600 text-white px-8 py-2 rounded-xl font-bold">
                Save
              </button>
              <button onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </div>
        )}

        {/* TABLE */}
        {!showForm && activeTab !== "dashboard" && (
          <div className="bg-white rounded-3xl shadow border overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="p-4 text-xs text-slate-400">Details</th>
                  <th className="p-4 text-xs text-slate-400">Languages</th>
                  <th className="p-4 text-xs text-center text-slate-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-bold">Sample Item</td>
                  <td className="p-4">
                    <span className="bg-emerald-100 px-2 py-1 rounded text-xs">
                      EN
                    </span>
                  </td>
                  <td className="p-4 text-center">✎ ✕</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

// ✅ ADDED (REQUIRED)

const StatCard = ({ title, value, color }) => (
  <div className={`bg-white p-6 rounded-3xl shadow-sm border-l-4 ${color}`}>
    <p className="text-xs text-slate-400 mb-1">{title}</p>
    <p className="text-2xl font-bold text-slate-900">{value}</p>
  </div>
);

const FormInput = ({ label, placeholder, isAmharic }) => (
  <div>
    <label className="text-xs text-slate-500 block mb-2">{label}</label>
    <input
      className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none ${
        isAmharic ? "font-serif text-lg" : ""
      }`}
      placeholder={placeholder}
    />
  </div>
);

export default AdminAllInOne;
