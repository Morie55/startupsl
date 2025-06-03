"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  ExternalLink,
  Search,
  Globe,
  Lightbulb,
  Users,
  BookOpen,
  Calendar,
  MessageSquare,
  Briefcase,
  GraduationCap,
  Newspaper,
  Video,
} from "lucide-react";

export default function OtherPlatforms() {
  const platforms = [
    {
      id: 1,
      name: "Salone CrowdFunder",
      description:
        "A crowdfunding platform supporting startup campaigns in Sierra Leone.",
      url: "https://salonecrowdfunder.com/",
      category: "Innovation",
      icon: <Lightbulb className="w-6 h-6" />,
      status: "Active",
      features: ["Startup Incubation", "Mentorship", "Funding Support"],
    },
    {
      id: 2,
      name: "Awansabi",
      description:
        "A community-driven platform for tech enthusiasts and startup founders.",
      url: "http://awansabi.com/",
      category: "Community",
      icon: <Users className="w-6 h-6" />,
      status: "Active",
      features: [
        "Online Courses",
        "Empowerment Programs",
        "Job Certifications",
      ],
    },
    {
      id: 3,
      name: "Inno SL Digital",
      description:
        "The digital learning hub of Innovation SL, offering educational resources and training.",
      url: "https://innosldigital.com/",
      category: "Education",
      icon: <BookOpen className="w-6 h-6" />,
      status: "Active",
      features: ["Online Courses", "Certifications", "Workshops"],
    },
    {
      id: 4,
      name: "Freetown Pitch Night",
      description:
        "A platform for pitching business ideas and connecting with investors and mentors.",
      url: "https://www.freetownpitchnight.com/",
      category: "Events",
      icon: <Calendar className="w-6 h-6" />,
      status: "Active",
      features: ["Pitching", "Social Engagement", "Networking"],
    },
    {
      id: 5,
      name: "Freetown Innovation Week",
      description:
        "An annual event that inspires and empowers innovators across all sectors.",
      url: "https://freetowninnovationweek.com/",
      category: "Community",
      icon: <MessageSquare className="w-6 h-6" />,
      status: "Active",
      features: ["Panel Discussions", "Workshops", "Knowledge Sharing"],
    },
    {
      id: 6,
      name: "Innosl",
      description:
        "The official platform of Innovation SL for job opportunities and career development.",
      url: "https://www.innosl.com/",
      category: "Jobs",
      icon: <Briefcase className="w-6 h-6" />,
      status: "Active",
      features: [
        "Innovation SL Info",
        "Official Web Platform",
        "Career Resources",
      ],
    },
  ];

  const categories = ["Other platforms"];

  return (
    <div className="min-h-scree">
      {/* Header */}
      <div className="border-b ">
        <div className="px-6 py-8">
          <div className="max-w-4xl">
            <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
              Other Platforms
            </h1>
            <p className="mb-6 text-lg text-gray-600 dark:text-white">
              Explore Innovation Salone's ecosystem of platforms and services
              designed to support entrepreneurs, innovators, and the tech
              community in Sierra Leone.
            </p>

            {/* Search */}
            <div className="relative max-w-md">
              <Search className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
              <Input placeholder="Search platforms..." className="pl-10" />
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === "All" ? "default" : "outline"}
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Platforms Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {platforms.map((platform) => (
            <Card
              key={platform.id}
              className="transition-shadow border hover:shadow-xl rounded-xl"
            >
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 text-blue-600 bg-blue-100 rounded-lg">
                      {platform.icon}
                    </div>
                    <div>
                      <CardTitle className="text-lg font-semibold text-gray-800">
                        {platform.name}
                      </CardTitle>
                      <div className="flex items-center mt-1 space-x-2">
                        <Badge
                          variant={
                            platform.status === "Active"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {platform.status}
                        </Badge>
                        <Badge variant="outline">{platform.category}</Badge>
                      </div>
                    </div>
                  </div>
                </div>
                <CardDescription className="mt-3 text-sm text-gray-600">
                  {platform.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div>
                    <h4 className="mb-2 text-sm font-medium text-gray-800">
                      Key Features:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {platform.features.map((feature, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="px-2 py-1 text-xs"
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t">
                    <div className="flex items-center overflow-hidden text-sm text-gray-500">
                      <Globe className="w-4 h-4 mr-1 shrink-0" />
                      <span className="truncate max-w-[160px]">
                        {platform.url}
                      </span>
                    </div>

                    {platform.status === "Active" ? (
                      <Button size="sm" asChild>
                        <a
                          href={platform.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Visit ${platform.name}`}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Visit
                        </a>
                      </Button>
                    ) : (
                      <Button size="sm" disabled>
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Coming Soon
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Join the Innovation Salone Ecosystem</CardTitle>
              <CardDescription>
                Connect with our growing network of platforms and services
                designed to accelerate innovation and entrepreneurship in Sierra
                Leone.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Button>
                  <Users className="w-4 h-4 mr-2" />
                  Join Community
                </Button>
                <Button variant="outline">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Get Support
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
