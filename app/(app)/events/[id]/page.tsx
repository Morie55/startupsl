"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ArrowLeft,
  Share2,
  Heart,
  User,
  Mail,
  Phone,
  Globe,
  CheckCircle,
  Star,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

// Mock data - in a real app, this would come from an API
const eventData = {
  1: {
    id: 1,
    title: "Sierra Leone Startup Pitch Competition 2024",
    description:
      "Join us for the biggest startup pitch competition in Sierra Leone. Entrepreneurs will compete for funding and mentorship opportunities from leading investors and industry experts.",
    longDescription:
      "The Sierra Leone Startup Pitch Competition 2024 is the premier event for entrepreneurs looking to showcase their innovative ideas and secure funding. This year's competition features three categories: Early Stage, Growth Stage, and Social Impact. Winners will receive cash prizes, mentorship opportunities, and access to our exclusive investor network.",
    date: "2024-02-15",
    time: "09:00 AM",
    endTime: "05:00 PM",
    location: "Freetown Convention Center",
    address: "15 Siaka Stevens Street, Freetown, Sierra Leone",
    category: "Competition",
    attendees: 250,
    price: "Free",
    status: "upcoming",
    image: "/placeholder.svg?height=400&width=800",
    organizer: {
      name: "StartUp-SL Team",
      email: "events@startup-sl.com",
      phone: "+232 76 123 456",
      website: "https://startup-sl.com",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    speakers: [
      {
        name: "Dr. Amara Kamara",
        title: "CEO, Innovation Hub SL",
        bio: "Leading entrepreneur and investor with 15+ years in tech innovation.",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      {
        name: "Sarah Johnson",
        title: "Managing Partner, West Africa Ventures",
        bio: "International investor focused on African startups and fintech.",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      {
        name: "Mohamed Sesay",
        title: "Founder, TechSL",
        bio: "Serial entrepreneur and mentor to emerging startups in Sierra Leone.",
        avatar: "/placeholder.svg?height=100&width=100",
      },
    ],
    agenda: [
      {
        time: "09:00 AM",
        title: "Registration & Networking",
        description: "Welcome coffee and networking",
      },
      {
        time: "10:00 AM",
        title: "Opening Ceremony",
        description: "Welcome remarks and competition overview",
      },
      {
        time: "10:30 AM",
        title: "Pitch Session 1",
        description: "Early Stage Startups (10 companies)",
      },
      {
        time: "12:00 PM",
        title: "Lunch Break",
        description: "Networking lunch with investors",
      },
      {
        time: "01:00 PM",
        title: "Pitch Session 2",
        description: "Growth Stage Startups (8 companies)",
      },
      {
        time: "02:30 PM",
        title: "Panel Discussion",
        description: "Future of Startups in Sierra Leone",
      },
      {
        time: "03:30 PM",
        title: "Final Pitches",
        description: "Top 5 finalists present",
      },
      {
        time: "04:30 PM",
        title: "Awards Ceremony",
        description: "Winner announcement and prizes",
      },
      {
        time: "05:00 PM",
        title: "Closing Reception",
        description: "Celebration and networking",
      },
    ],
    requirements: [
      "Valid ID for registration",
      "Business cards for networking",
      "Laptop/tablet for digital materials",
      "Professional attire recommended",
    ],
    prizes: [
      {
        place: "1st Place",
        amount: "Le 50,000,000",
        description: "Plus 6 months mentorship",
      },
      {
        place: "2nd Place",
        amount: "Le 25,000,000",
        description: "Plus 3 months mentorship",
      },
      {
        place: "3rd Place",
        amount: "Le 10,000,000",
        description: "Plus 1 month mentorship",
      },
    ],
    sponsors: [
      "Innovation Hub SL",
      "West Africa Ventures",
      "Sierra Leone Commercial Bank",
      "Orange SL",
    ],
    registrationDeadline: "2024-02-10",
    maxAttendees: 300,
    currentRegistrations: 187,
  },
  // Add more events as needed
};

export default function EventDetailPage() {
  const params = useParams();
  const eventId = params.id as string;
  const event = eventData[eventId as keyof typeof eventData];
  const [isLiked, setIsLiked] = useState(false);

  if (!event) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <h1 className="mb-2 text-2xl font-bold text-gray-900">
            Event Not Found
          </h1>
          <p className="mb-4 text-gray-600">
            The event you're looking for doesn't exist.
          </p>
          <Link href="/events">
            <Button>Back to Events</Button>
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const isUpcoming = event.status === "upcoming";
  const registrationOpen = new Date(event.registrationDeadline) > new Date();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl px-4 py-6 mx-auto sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/events">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Events
              </Button>
            </Link>
            <div className="flex items-center gap-2 ml-auto">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsLiked(!isLiked)}
                className={isLiked ? "text-red-500" : ""}
              >
                <Heart
                  className={`h-4 w-4 mr-2 ${isLiked ? "fill-current" : ""}`}
                />
                {isLiked ? "Liked" : "Like"}
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <Badge className="mb-3">{event.category}</Badge>
                <h1 className="mb-4 text-4xl font-bold text-gray-900">
                  {event.title}
                </h1>
                <p className="text-xl leading-relaxed text-gray-600">
                  {event.longDescription}
                </p>
              </div>

              {/* Event Image */}
              <div className="mb-8 overflow-hidden bg-gray-200 rounded-lg aspect-video">
                <img
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Registration Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-green-600">
                    {event.price}
                  </CardTitle>
                  <CardDescription>
                    {event.currentRegistrations} of {event.maxAttendees}{" "}
                    registered
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-2 bg-green-600 rounded-full"
                      style={{
                        width: `${
                          (event.currentRegistrations / event.maxAttendees) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-3" />
                      {formatDate(event.date)}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-3" />
                      {event.time} - {event.endTime}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-3" />
                      <div>
                        <div>{event.location}</div>
                        <div className="text-xs text-gray-500">
                          {event.address}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-3" />
                      Up to {event.maxAttendees} attendees
                    </div>
                  </div>

                  {isUpcoming && registrationOpen ? (
                    <Link
                      href={`/events/${event.id}/register`}
                      className="block w-full"
                    >
                      <Button className="w-full" size="lg">
                        Register Now
                      </Button>
                    </Link>
                  ) : isUpcoming ? (
                    <Button disabled className="w-full" size="lg">
                      Registration Closed
                    </Button>
                  ) : (
                    <Button disabled className="w-full" size="lg">
                      Event Completed
                    </Button>
                  )}

                  {isUpcoming && (
                    <p className="text-xs text-center text-gray-500">
                      Registration closes on{" "}
                      {formatDate(event.registrationDeadline)}
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Organizer Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Event Organizer</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start space-x-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage
                        src={event.organizer.avatar || "/placeholder.svg"}
                      />
                      <AvatarFallback>
                        <User className="w-6 h-6" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-semibold">{event.organizer.name}</h4>
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center text-sm text-gray-600">
                          <Mail className="w-3 h-3 mr-2" />
                          {event.organizer.email}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Phone className="w-3 h-3 mr-2" />
                          {event.organizer.phone}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Globe className="w-3 h-3 mr-2" />
                          <a
                            href={event.organizer.website}
                            className="hover:underline"
                          >
                            Website
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Tabs */}
      <div className="max-w-6xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="agenda">Agenda</TabsTrigger>
            <TabsTrigger value="speakers">Speakers</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>About This Event</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="leading-relaxed text-gray-600">
                    {event.description}
                  </p>
                </CardContent>
              </Card>

              {event.prizes && (
                <Card>
                  <CardHeader>
                    <CardTitle>Prizes & Awards</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {event.prizes.map((prize, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-3"
                        >
                          <div className="flex-shrink-0">
                            <Star className="w-5 h-5 text-yellow-500" />
                          </div>
                          <div>
                            <div className="font-semibold">{prize.place}</div>
                            <div className="font-bold text-green-600">
                              {prize.amount}
                            </div>
                            <div className="text-sm text-gray-600">
                              {prize.description}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <CardTitle>What to Bring</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {event.requirements.map((req, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <CheckCircle className="flex-shrink-0 w-4 h-4 text-green-500" />
                        <span className="text-gray-600">{req}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sponsors</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {event.sponsors.map((sponsor, index) => (
                      <div
                        key={index}
                        className="p-4 text-center rounded-lg bg-gray-50"
                      >
                        <div className="text-sm font-medium text-gray-900">
                          {sponsor}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="agenda" className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Event Schedule</CardTitle>
                <CardDescription>Full day agenda and timeline</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {event.agenda.map((item, index) => (
                    <div key={index} className="flex space-x-4">
                      <div className="flex-shrink-0 w-20 text-sm font-medium text-gray-900">
                        {item.time}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">
                          {item.title}
                        </h4>
                        <p className="mt-1 text-sm text-gray-600">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="speakers" className="mt-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {event.speakers.map((speaker, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <Avatar className="w-20 h-20 mx-auto mb-4">
                        <AvatarImage
                          src={speaker.avatar || "/placeholder.svg"}
                        />
                        <AvatarFallback>
                          <User className="w-10 h-10" />
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="text-lg font-semibold">{speaker.name}</h3>
                      <p className="mb-3 text-sm text-gray-600">
                        {speaker.title}
                      </p>
                      <p className="text-sm text-gray-700">{speaker.bio}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="details" className="mt-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Location Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold">Venue</h4>
                      <p className="text-gray-600">{event.location}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Address</h4>
                      <p className="text-gray-600">{event.address}</p>
                    </div>
                    <div className="bg-gray-200 rounded-lg aspect-video">
                      <div className="flex items-center justify-center w-full h-full text-gray-500">
                        Map View (Integration needed)
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Important Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold">Registration Deadline</h4>
                      <p className="text-gray-600">
                        {formatDate(event.registrationDeadline)}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Capacity</h4>
                      <p className="text-gray-600">
                        {event.maxAttendees} attendees maximum
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Event Type</h4>
                      <p className="text-gray-600">{event.category}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Cost</h4>
                      <p className="text-gray-600">{event.price}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
