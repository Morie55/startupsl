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

import { useState } from "react";
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

  // Mock company counts for your sectors (replace with actual database data)
  const sectorsWithCounts = sectorsData.map((sector, index) => ({
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

  // Sort sectors
  const sortedSectors = [...sectorsWithCounts].sort((a, b) => {
    if (sortBy === "name") return a.title.localeCompare(b.title);
    return b.count - a.count;
  });

  // Filter sectors
  const filteredSectors = sortedSectors.filter((sector) => {
    if (filterBy === "high") return sector.count > 100;
    if (filterBy === "medium") return sector.count >= 50 && sector.count <= 100;
    if (filterBy === "low") return sector.count < 50;
    return true;
  });

  const trendingSectors = sortedSectors.filter((sector) => sector.isTrending);
  const emergingSectors = sortedSectors.filter((sector) => sector.isEmerging);

  // Mock growth data for the chart
  const growthData = [
    {
      year: "2020",
      Fintech: 12.5,
      AI: 25.3,
      Healthcare: 8.7,
      Biotech: 18.2,
      Edtech: 15.6,
      Agtech: 22.1,
      "Health Tech": 19.8,
      "Manufacturing Tech": 16.4,
      Ecommerce: 11.3,
      Retail: 6.9,
    },
    {
      year: "2021",
      Fintech: 18.7,
      AI: 32.1,
      Healthcare: 12.4,
      Biotech: 24.6,
      Edtech: 28.9,
      Agtech: 19.5,
      "Health Tech": 26.3,
      "Manufacturing Tech": 21.7,
      Ecommerce: 15.8,
      Retail: 9.2,
    },
    {
      year: "2022",
      Fintech: 15.2,
      AI: 28.9,
      Healthcare: 10.1,
      Biotech: 21.3,
      Edtech: 12.7,
      Agtech: 25.8,
      "Health Tech": 23.1,
      "Manufacturing Tech": 18.9,
      Ecommerce: 13.6,
      Retail: 7.4,
    },
    {
      year: "2023",
      Fintech: 22.4,
      AI: 35.7,
      Healthcare: 14.8,
      Biotech: 27.9,
      Edtech: 19.3,
      Agtech: 28.2,
      "Health Tech": 31.5,
      "Manufacturing Tech": 24.6,
      Ecommerce: 17.2,
      Retail: 11.8,
    },
    {
      year: "2024",
      Fintech: 19.8,
      AI: 41.2,
      Healthcare: 16.5,
      Biotech: 32.1,
      Edtech: 22.7,
      Agtech: 31.4,
      "Health Tech": 28.9,
      "Manufacturing Tech": 27.3,
      Ecommerce: 19.6,
      Retail: 13.5,
    },
  ];

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

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">
            All Sectors ({filteredSectors.length})
          </TabsTrigger>
          <TabsTrigger value="trending">
            Trending ({trendingSectors.length})
          </TabsTrigger>
          <TabsTrigger value="emerging">
            Emerging ({emergingSectors.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredSectors.map((sector) => (
              <SectorCard
                key={sector.title}
                title={sector.title}
                count={sector.count}
                color={sector.color}
                isTrending={sector.isTrending}
                isEmerging={sector.isEmerging}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trending" className="mt-4">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {trendingSectors.map((sector) => (
              <SectorCard
                key={sector.title}
                title={sector.title}
                count={sector.count}
                color={sector.color}
                isTrending={sector.isTrending}
                isEmerging={sector.isEmerging}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="emerging" className="mt-4">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {emergingSectors.map((sector) => (
              <SectorCard
                key={sector.title}
                title={sector.title}
                count={sector.count}
                color={sector.color}
                isTrending={sector.isTrending}
                isEmerging={sector.isEmerging}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Sector Growth Analysis</CardTitle>
          <CardDescription>
            Year-over-year growth by sector (Top 10 performing sectors)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full">
            <SectorGrowthChart data={growthData} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
