// "use client";

// import { BarChart3, Filter, TrendingUp } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { SectorCard } from "@/components/sector-card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// export function SectorsPage() {
//   return (
//     <div className="flex flex-col w-full gap-6 p-6 md:gap-8 md:p-8">
//       <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight">Sectors</h1>
//           <p className="text-muted-foreground">
//             Explore different sectors in the startup ecosystem
//           </p>
//         </div>
//         <div className="flex items-center gap-2">
//           <Button variant="outline" size="sm">
//             <Filter className="w-4 h-4 mr-2" />
//             Filter
//           </Button>
//           <Button variant="outline" size="sm">
//             <TrendingUp className="w-4 h-4 mr-2" />
//             Sort
//           </Button>
//         </div>
//       </div>

//       <Tabs defaultValue="all" className="w-full">
//         <TabsList>
//           <TabsTrigger value="all">All Sectors</TabsTrigger>
//           <TabsTrigger value="trending">Trending</TabsTrigger>
//           <TabsTrigger value="emerging">Emerging</TabsTrigger>
//         </TabsList>
//         <TabsContent value="all" className="mt-4">
//           <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//             <SectorCard title="Technology" count={156} color="bg-blue-500" />
//             <SectorCard title="Healthcare" count={87} color="bg-green-500" />
//             <SectorCard title="Finance" count={124} color="bg-purple-500" />
//             <SectorCard title="Education" count={93} color="bg-amber-500" />
//             <SectorCard
//               title="Agriculture"
//               count={142}
//               color="bg-emerald-500"
//             />
//             <SectorCard title="Energy" count={68} color="bg-red-500" />
//             <SectorCard title="Retail" count={112} color="bg-indigo-500" />
//             <SectorCard
//               title="Transportation"
//               count={52}
//               color="bg-orange-500"
//             />
//             <SectorCard title="Manufacturing" count={78} color="bg-cyan-500" />
//             <SectorCard title="Media" count={64} color="bg-pink-500" />
//             <SectorCard title="Real Estate" count={45} color="bg-lime-500" />
//             <SectorCard title="Tourism" count={38} color="bg-teal-500" />
//           </div>
//         </TabsContent>
//         <TabsContent value="trending" className="mt-4">
//           <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//             <SectorCard title="Technology" count={156} color="bg-blue-500" />
//             <SectorCard title="Finance" count={124} color="bg-purple-500" />
//             <SectorCard
//               title="Agriculture"
//               count={142}
//               color="bg-emerald-500"
//             />
//             <SectorCard title="Healthcare" count={87} color="bg-green-500" />
//           </div>
//         </TabsContent>
//         <TabsContent value="emerging" className="mt-4">
//           <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//             <SectorCard title="Energy" count={68} color="bg-red-500" />
//             <SectorCard title="Tourism" count={38} color="bg-teal-500" />
//             <SectorCard title="Real Estate" count={45} color="bg-lime-500" />
//           </div>
//         </TabsContent>
//       </Tabs>

//       <Card>
//         <CardHeader>
//           <CardTitle>Sector Growth Analysis</CardTitle>
//           <CardDescription>Year-over-year growth by sector</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="h-[300px] w-full bg-muted/25 rounded-md flex items-center justify-center text-muted-foreground">
//             <BarChart3 className="w-5 h-5 mr-2" />
//             Sector growth chart visualization
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { Filter, TrendingUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SectorCard } from "@/components/sector-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SectorGrowthChart from "@/components/sector-growth-chart";
import { sectorsData } from "@/data/sectors";

export function SectorsPage() {
  const [sortBy, setSortBy] = useState<"name" | "count">("count");
  const [filterBy, setFilterBy] = useState<"all" | "high" | "medium" | "low">(
    "all"
  );
  const [activeTab, setActiveTab] = useState<"all" | "trending" | "emerging">(
    "all"
  );
  const [chartData, setChartData] = useState<any[]>([]);
  const [displayedSectors, setDisplayedSectors] = useState<string[]>([]);

  // Generate realistic company counts and flags
  const sectorsWithCounts = sectorsData.map((sector) => ({
    ...sector,
    count: Math.floor(Math.random() * 150) + 10, // Random count between 10-160
    isTrending: [
      "Fintech",
      "AI",
      "Biotech",
      "Health Tech",
      "Manufacturing Tech",
      "Edtech",
    ].includes(sector.title),
    isEmerging: [
      "Circular Economy",
      "Environment and Sustainability",
      "Fempreneur",
      "Assistive",
      "Agtech",
    ].includes(sector.title),
  }));

  // Apply filters to sectors
  const getFilteredSectors = (sectors: typeof sectorsWithCounts) => {
    return sectors.filter((sector) => {
      if (filterBy === "high") return sector.count > 100;
      if (filterBy === "medium")
        return sector.count >= 50 && sector.count <= 100;
      if (filterBy === "low") return sector.count < 50;
      return true;
    });
  };

  // Sort sectors
  const getSortedSectors = (sectors: typeof sectorsWithCounts) => {
    return [...sectors].sort((a, b) => {
      if (sortBy === "name") return a.title.localeCompare(b.title);
      return b.count - a.count;
    });
  };

  // Get sectors based on current tab, filter, and sort
  const getDisplayedSectors = () => {
    let sectorsList = sectorsWithCounts;

    // Filter by tab first
    if (activeTab === "trending") {
      sectorsList = sectorsList.filter((s) => s.isTrending);
    } else if (activeTab === "emerging") {
      sectorsList = sectorsList.filter((s) => s.isEmerging);
    }

    // Apply count filters
    sectorsList = getFilteredSectors(sectorsList);

    // Apply sorting
    sectorsList = getSortedSectors(sectorsList);

    return sectorsList;
  };

  // Generate growth data for all sectors
  const generateGrowthData = (sectors: typeof sectorsWithCounts) => {
    const years = ["2020", "2021", "2022", "2023", "2024"];
    const sectorTitles = sectors.map((s) => s.title);

    return years.map((year) => {
      const yearData: Record<string, string | number> = { year };

      // Add data for each sector in the correct order (matching the display order)
      sectors.forEach((sector) => {
        const isTrending = sector.isTrending;
        const isEmerging = sector.isEmerging;

        // Generate realistic growth rates
        const baseGrowth = isTrending ? 20 : isEmerging ? 25 : 10;
        const yearFactor = Number.parseInt(year) - 2019; // 1 for 2020, 2 for 2021, etc.
        const randomFactor = Math.random() * 10 - 5; // -5 to +5

        // Growth increases over time, with some randomness
        yearData[sector.title] = +(
          baseGrowth +
          yearFactor * 2 +
          randomFactor
        ).toFixed(1);
      });

      return yearData;
    });
  };

  // Update displayed sectors and chart data when tab, filter, or sort changes
  useEffect(() => {
    const currentSectors = getDisplayedSectors();
    const sectorTitles = currentSectors.map((s) => s.title);
    setDisplayedSectors(sectorTitles);

    // Generate growth data for the displayed sectors in the correct order
    const newChartData = generateGrowthData(currentSectors);
    setChartData(newChartData);
  }, [activeTab, filterBy, sortBy]);

  const handleSort = () => {
    setSortBy(sortBy === "name" ? "count" : "name");
  };

  const handleFilter = () => {
    const filters = ["all", "high", "medium", "low"] as const;
    const currentIndex = filters.indexOf(filterBy);
    const nextIndex = (currentIndex + 1) % filters.length;
    setFilterBy(filters[nextIndex]);
  };

  const getFilterLabel = () => {
    switch (filterBy) {
      case "high":
        return "High (100+)";
      case "medium":
        return "Medium (50-100)";
      case "low":
        return "Low (<50)";
      default:
        return "All";
    }
  };

  // Get the current sectors to display based on tab and filters
  const currentSectors = getDisplayedSectors();
  const trendingSectors = sectorsWithCounts.filter((s) => s.isTrending);
  const emergingSectors = sectorsWithCounts.filter((s) => s.isEmerging);

  return (
    <div className="flex flex-col w-full gap-6 p-6 md:gap-8 md:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sectors</h1>
          <p className="text-muted-foreground">
            Explore different sectors in the startup ecosystem
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleFilter}>
            <Filter className="w-4 h-4 mr-2" />
            Filter: {getFilterLabel()}
          </Button>
          <Button variant="outline" size="sm" onClick={handleSort}>
            <TrendingUp className="w-4 h-4 mr-2" />
            Sort: {sortBy === "name" ? "Name" : "Count"}
          </Button>
        </div>
      </div>

      <Tabs
        defaultValue="all"
        className="w-full"
        onValueChange={(value) =>
          setActiveTab(value as "all" | "trending" | "emerging")
        }
      >
        <TabsList>
          <TabsTrigger value="all">
            All Sectors ({getFilteredSectors(sectorsWithCounts).length})
          </TabsTrigger>
          <TabsTrigger value="trending">
            Trending ({getFilteredSectors(trendingSectors).length})
          </TabsTrigger>
          <TabsTrigger value="emerging">
            Emerging ({getFilteredSectors(emergingSectors).length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {getFilteredSectors(getSortedSectors(sectorsWithCounts)).map(
              (sector) => (
                <SectorCard
                  key={sector.title}
                  title={sector.title}
                  count={sector.count}
                  color={sector.color}
                  isTrending={sector.isTrending}
                  isEmerging={sector.isEmerging}
                />
              )
            )}
          </div>
        </TabsContent>

        <TabsContent value="trending" className="mt-4">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {getFilteredSectors(getSortedSectors(trendingSectors)).map(
              (sector) => (
                <SectorCard
                  key={sector.title}
                  title={sector.title}
                  count={sector.count}
                  color={sector.color}
                  isTrending={sector.isTrending}
                  isEmerging={sector.isEmerging}
                />
              )
            )}
          </div>
        </TabsContent>

        <TabsContent value="emerging" className="mt-4">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {getFilteredSectors(getSortedSectors(emergingSectors)).map(
              (sector) => (
                <SectorCard
                  key={sector.title}
                  title={sector.title}
                  count={sector.count}
                  color={sector.color}
                  isTrending={sector.isTrending}
                  isEmerging={sector.isEmerging}
                />
              )
            )}
          </div>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Sector Growth Analysis</CardTitle>
          <CardDescription>
            Year-over-year growth by{" "}
            {activeTab === "all"
              ? "all sectors"
              : activeTab === "trending"
              ? "trending sectors"
              : "emerging sectors"}
            {filterBy !== "all" &&
              ` (${getFilterLabel().toLowerCase()} company count)`}
            {sortBy === "name"
              ? " - sorted by name"
              : " - sorted by company count"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full">
            {displayedSectors.length > 0 ? (
              <SectorGrowthChart data={chartData} sectors={displayedSectors} />
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                No sectors match the current filters
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
