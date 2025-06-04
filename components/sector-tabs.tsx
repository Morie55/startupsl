"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface SectorTabsProps {
  onFilterChange?: (filter: string) => void;
}

export default function SectorTabs({ onFilterChange }: SectorTabsProps) {
  const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    { id: "all", label: "All Sectors" },
    { id: "tech", label: "Technology" },
    { id: "traditional", label: "Traditional" },
    { id: "emerging", label: "Emerging" },
  ];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onFilterChange?.(tabId);
  };

  return (
    <div className="inline-flex items-center p-1 bg-gray-900 rounded-lg">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleTabChange(tab.id)}
          className={cn(
            "px-4 py-2 text-sm font-medium rounded-md transition-colors",
            activeTab === tab.id
              ? "bg-gray-800 text-white"
              : "text-gray-400 hover:text-white"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
