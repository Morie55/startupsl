"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Search,
  Filter,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

const events = [
  {
    id: 1,
    title: "Sierra Leone Startup Pitch Competition 2024",
    description:
      "Join us for the biggest startup pitch competition in Sierra Leone. Entrepreneurs will compete for funding and mentorship opportunities.",
    date: "2024-02-15",
    time: "09:00 AM",
    location: "Freetown Convention Center",
    category: "Competition",
    attendees: 250,
    price: "Free",
    status: "upcoming",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 2,
    title: "Tech Innovation Workshop",
    description:
      "Learn about the latest technologies and how to implement them in your startup. Featuring industry experts and hands-on sessions.",
    date: "2024-02-20",
    time: "02:00 PM",
    location: "Innovation Hub Freetown",
    category: "Workshop",
    attendees: 80,
    price: "Le 50,000",
    status: "upcoming",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 3,
    title: "Investor Networking Evening",
    description:
      "Connect with local and international investors looking to fund promising startups in Sierra Leone.",
    date: "2024-02-25",
    time: "06:00 PM",
    location: "Radisson Blu Mammy Yoko Hotel",
    category: "Networking",
    attendees: 120,
    price: "Le 75,000",
    status: "upcoming",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 4,
    title: "Women in Tech Summit",
    description:
      "Empowering women entrepreneurs in the tech space. Featuring successful female founders and business leaders.",
    date: "2024-03-08",
    time: "10:00 AM",
    location: "University of Sierra Leone",
    category: "Summit",
    attendees: 200,
    price: "Free",
    status: "upcoming",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 5,
    title: "Digital Marketing Masterclass",
    description:
      "Master the art of digital marketing for your startup. Learn SEO, social media marketing, and content strategy.",
    date: "2024-01-20",
    time: "01:00 PM",
    location: "Online Event",
    category: "Workshop",
    attendees: 150,
    price: "Le 25,000",
    status: "past",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 6,
    title: "Fintech Innovation Conference",
    description:
      "Exploring the future of financial technology in West Africa. Featuring keynote speakers and panel discussions.",
    date: "2024-01-15",
    time: "09:00 AM",
    location: "Bintumani Conference Center",
    category: "Conference",
    attendees: 300,
    price: "Le 100,000",
    status: "past",
    image: "/placeholder.svg?height=200&width=400",
  },
];

const categories = [
  "All",
  "Competition",
  "Workshop",
  "Networking",
  "Summit",
  "Conference",
];

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeTab, setActiveTab] = useState("upcoming");

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || event.category === selectedCategory;
    const matchesTab = event.status === activeTab;

    return matchesSearch && matchesCategory && matchesTab;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-800">
      {/* Header Section */}
      <div className="bg-white border-b dark:bg-slate-800">
        <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-slate-100">
              Startup Events
            </h1>
            <p className="max-w-3xl mx-auto text-xl text-gray-600 dark:text-slate-300">
              Discover networking opportunities, workshops, and competitions
              that will help grow your startup in Sierra Leone's thriving
              ecosystem.
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Search and Filter Section */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
              <Input
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Tabs for Upcoming/Past Events */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
            <TabsTrigger value="past">Past Events</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-6">
            {filteredEvents.length === 0 ? (
              <div className="py-12 text-center">
                <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <h3 className="mb-2 text-lg font-medium text-gray-900">
                  No upcoming events found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search or filter criteria.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredEvents.map((event) => (
                  <Card
                    key={event.id}
                    className="overflow-hidden transition-shadow hover:shadow-lg"
                  >
                    <div className="relative bg-gray-200 aspect-video">
                      <img
                        src={event.image || "/placeholder.svg"}
                        alt={event.title}
                        className="object-cover w-full h-full"
                      />
                      <Badge className="absolute bg-green-500 top-3 right-3 hover:bg-green-600">
                        {event.category}
                      </Badge>
                    </div>
                    <CardHeader>
                      <CardTitle className="line-clamp-2">
                        {event.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-3">
                        {event.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        {formatDate(event.date)}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="w-4 h-4 mr-2" />
                        {event.time}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        {event.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="w-4 h-4 mr-2" />
                        {event.attendees} attendees
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold text-green-600">
                          {event.price}
                        </span>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Link href={`/events/${event.id}`} className="w-full">
                        <Button className="w-full">
                          View Details
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-6">
            {filteredEvents.length === 0 ? (
              <div className="py-12 text-center">
                <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <h3 className="mb-2 text-lg font-medium text-gray-900">
                  No past events found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search or filter criteria.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredEvents.map((event) => (
                  <Card key={event.id} className="overflow-hidden opacity-75">
                    <div className="relative bg-gray-200 aspect-video">
                      <img
                        src={event.image || "/placeholder.svg"}
                        alt={event.title}
                        className="object-cover w-full h-full"
                      />
                      <Badge className="absolute bg-gray-500 top-3 right-3">
                        {event.category}
                      </Badge>
                    </div>
                    <CardHeader>
                      <CardTitle className="line-clamp-2">
                        {event.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-3">
                        {event.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        {formatDate(event.date)}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="w-4 h-4 mr-2" />
                        {event.time}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        {event.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="w-4 h-4 mr-2" />
                        {event.attendees} attended
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Link href={`/events/${event.id}`} className="w-full">
                        <Button variant="outline" className="w-full">
                          View Details
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Call to Action Section */}
        <div className="p-8 mt-16 text-center text-white rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
          <h2 className="mb-4 text-3xl font-bold">Want to Host an Event?</h2>
          <p className="mb-6 text-xl opacity-90">
            Share your expertise with Sierra Leone's startup community
          </p>
          <Link href="/events/proposal">
            <Button size="lg" variant="secondary">
              Submit Event Proposal
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
