"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  CalendarIcon,
  MapPin,
  FileText,
  User,
  Target,
  Lightbulb,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import Link from "next/link";

const eventCategories = [
  "Workshop",
  "Conference",
  "Networking",
  "Competition",
  "Summit",
  "Seminar",
  "Panel Discussion",
  "Hackathon",
  "Demo Day",
  "Training",
];

const eventFormats = [
  { id: "in-person", label: "In-Person" },
  { id: "virtual", label: "Virtual/Online" },
  { id: "hybrid", label: "Hybrid (In-Person + Virtual)" },
];

const audienceSizes = [
  "Under 50",
  "50-100",
  "100-200",
  "200-500",
  "500-1000",
  "1000+",
];

export default function EventProposalPage() {
  const [formData, setFormData] = useState({
    // Event Details
    eventTitle: "",
    eventDescription: "",
    eventCategory: "",
    eventFormat: "",
    expectedAttendees: "",
    eventDate: undefined as Date | undefined,
    eventTime: "",
    duration: "",

    // Location Details
    venue: "",
    address: "",
    city: "Freetown",

    // Organizer Details
    organizerName: "",
    organizerEmail: "",
    organizerPhone: "",
    organization: "",
    organizerBio: "",

    // Event Specifics
    objectives: "",
    targetAudience: "",
    agenda: "",
    speakers: "",
    requirements: "",
    budget: "",
    sponsorship: "",

    // Additional Info
    previousExperience: "",
    marketingPlan: "",
    specialRequests: "",

    // Agreements
    termsAccepted: false,
    dataProcessingAccepted: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-600">
              Proposal Submitted!
            </CardTitle>
            <CardDescription>
              Thank you for your event proposal. We'll review it and get back to
              you within 3-5 business days.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                You'll receive a confirmation email shortly with your proposal
                reference number.
              </p>
              <div className="flex gap-3">
                <Link href="/events" className="flex-1">
                  <Button variant="outline" className="w-full">
                    View Events
                  </Button>
                </Link>
                <Button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                      eventTitle: "",
                      eventDescription: "",
                      eventCategory: "",
                      eventFormat: "",
                      expectedAttendees: "",
                      eventDate: undefined,
                      eventTime: "",
                      duration: "",
                      venue: "",
                      address: "",
                      city: "Freetown",
                      organizerName: "",
                      organizerEmail: "",
                      organizerPhone: "",
                      organization: "",
                      organizerBio: "",
                      objectives: "",
                      targetAudience: "",
                      agenda: "",
                      speakers: "",
                      requirements: "",
                      budget: "",
                      sponsorship: "",
                      previousExperience: "",
                      marketingPlan: "",
                      specialRequests: "",
                      termsAccepted: false,
                      dataProcessingAccepted: false,
                    });
                  }}
                  className="flex-1"
                >
                  Submit Another
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-800">
      {/* Header */}
      <div className="bg-white border-b dark:bg-slate-800">
        <div className="px-4 py-6 mx-auto sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/events">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Events
              </Button>
            </Link>
          </div>
          <div>
            <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-slate-200">
              Submit Event Proposal
            </h1>
            <p className="text-gray-600 dark:text-slate-200">
              Share your event idea with Sierra Leone's startup community. Fill
              out the form below to get started.
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 py-8 mx-auto sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Event Details Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                Event Details
              </CardTitle>
              <CardDescription>
                Tell us about your event idea and what you want to achieve.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="md:col-span-2">
                  <Label htmlFor="eventTitle">Event Title *</Label>
                  <Input
                    id="eventTitle"
                    placeholder="e.g., Sierra Leone Fintech Innovation Summit"
                    value={formData.eventTitle}
                    onChange={(e) =>
                      handleInputChange("eventTitle", e.target.value)
                    }
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="eventCategory">Event Category *</Label>
                  <Select
                    value={formData.eventCategory}
                    onValueChange={(value) =>
                      handleInputChange("eventCategory", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {eventCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="expectedAttendees">
                    Expected Attendees *
                  </Label>
                  <Select
                    value={formData.expectedAttendees}
                    onValueChange={(value) =>
                      handleInputChange("expectedAttendees", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select range" />
                    </SelectTrigger>
                    <SelectContent>
                      {audienceSizes.map((size) => (
                        <SelectItem key={size} value={size}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="eventDescription">Event Description *</Label>
                  <Textarea
                    id="eventDescription"
                    placeholder="Describe your event, its purpose, and what attendees will gain..."
                    value={formData.eventDescription}
                    onChange={(e) =>
                      handleInputChange("eventDescription", e.target.value)
                    }
                    rows={4}
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <Label>Event Format *</Label>
                  <RadioGroup
                    value={formData.eventFormat}
                    onValueChange={(value) =>
                      handleInputChange("eventFormat", value)
                    }
                    className="flex flex-wrap gap-6 mt-2"
                  >
                    {eventFormats.map((format) => (
                      <div
                        key={format.id}
                        className="flex items-center space-x-2"
                      >
                        <RadioGroupItem value={format.id} id={format.id} />
                        <Label htmlFor={format.id}>{format.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Date & Location Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Date & Location
              </CardTitle>
              <CardDescription>
                When and where do you plan to host your event?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div>
                  <Label>Preferred Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.eventDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="w-4 h-4 mr-2" />
                        {formData.eventDate
                          ? format(formData.eventDate, "PPP")
                          : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.eventDate}
                        onSelect={(date) =>
                          handleInputChange("eventDate", date)
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <Label htmlFor="eventTime">Start Time *</Label>
                  <Input
                    id="eventTime"
                    type="time"
                    value={formData.eventTime}
                    onChange={(e) =>
                      handleInputChange("eventTime", e.target.value)
                    }
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="duration">Duration *</Label>
                  <Select
                    value={formData.duration}
                    onValueChange={(value) =>
                      handleInputChange("duration", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-2 hours">1-2 hours</SelectItem>
                      <SelectItem value="Half day">
                        Half day (3-4 hours)
                      </SelectItem>
                      <SelectItem value="Full day">
                        Full day (6-8 hours)
                      </SelectItem>
                      <SelectItem value="2 days">2 days</SelectItem>
                      <SelectItem value="3+ days">3+ days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="venue">Venue Name</Label>
                  <Input
                    id="venue"
                    placeholder="e.g., Freetown Convention Center"
                    value={formData.venue}
                    onChange={(e) => handleInputChange("venue", e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="city">City *</Label>
                  <Select
                    value={formData.city}
                    onValueChange={(value) => handleInputChange("city", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Freetown">Freetown</SelectItem>
                      <SelectItem value="Bo">Bo</SelectItem>
                      <SelectItem value="Kenema">Kenema</SelectItem>
                      <SelectItem value="Makeni">Makeni</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-3">
                  <Label htmlFor="address">Full Address</Label>
                  <Input
                    id="address"
                    placeholder="Complete venue address"
                    value={formData.address}
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Organizer Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Organizer Information
              </CardTitle>
              <CardDescription>
                Tell us about yourself and your organization.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <Label htmlFor="organizerName">Full Name *</Label>
                  <Input
                    id="organizerName"
                    placeholder="Your full name"
                    value={formData.organizerName}
                    onChange={(e) =>
                      handleInputChange("organizerName", e.target.value)
                    }
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="organizerEmail">Email Address *</Label>
                  <Input
                    id="organizerEmail"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.organizerEmail}
                    onChange={(e) =>
                      handleInputChange("organizerEmail", e.target.value)
                    }
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="organizerPhone">Phone Number *</Label>
                  <Input
                    id="organizerPhone"
                    placeholder="+232 XX XXX XXXX"
                    value={formData.organizerPhone}
                    onChange={(e) =>
                      handleInputChange("organizerPhone", e.target.value)
                    }
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="organization">Organization/Company</Label>
                  <Input
                    id="organization"
                    placeholder="Your organization name"
                    value={formData.organization}
                    onChange={(e) =>
                      handleInputChange("organization", e.target.value)
                    }
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="organizerBio">Brief Bio</Label>
                  <Textarea
                    id="organizerBio"
                    placeholder="Tell us about your background and experience..."
                    value={formData.organizerBio}
                    onChange={(e) =>
                      handleInputChange("organizerBio", e.target.value)
                    }
                    rows={3}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Event Specifics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Event Specifics
              </CardTitle>
              <CardDescription>
                Provide more details about your event structure and goals.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="objectives">Event Objectives *</Label>
                <Textarea
                  id="objectives"
                  placeholder="What are the main goals and objectives of your event?"
                  value={formData.objectives}
                  onChange={(e) =>
                    handleInputChange("objectives", e.target.value)
                  }
                  rows={3}
                  required
                />
              </div>

              <div>
                <Label htmlFor="targetAudience">Target Audience *</Label>
                <Textarea
                  id="targetAudience"
                  placeholder="Who is your ideal attendee? (e.g., early-stage entrepreneurs, investors, students)"
                  value={formData.targetAudience}
                  onChange={(e) =>
                    handleInputChange("targetAudience", e.target.value)
                  }
                  rows={2}
                  required
                />
              </div>

              <div>
                <Label htmlFor="agenda">Proposed Agenda</Label>
                <Textarea
                  id="agenda"
                  placeholder="Outline your event schedule, sessions, and activities..."
                  value={formData.agenda}
                  onChange={(e) => handleInputChange("agenda", e.target.value)}
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="speakers">Speakers/Facilitators</Label>
                <Textarea
                  id="speakers"
                  placeholder="List confirmed or potential speakers and their backgrounds..."
                  value={formData.speakers}
                  onChange={(e) =>
                    handleInputChange("speakers", e.target.value)
                  }
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <Label htmlFor="budget">Estimated Budget</Label>
                  <Input
                    id="budget"
                    placeholder="e.g., Le 5,000,000"
                    value={formData.budget}
                    onChange={(e) =>
                      handleInputChange("budget", e.target.value)
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="sponsorship">Sponsorship Needs</Label>
                  <Select
                    value={formData.sponsorship}
                    onValueChange={(value) =>
                      handleInputChange("sponsorship", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">
                        No sponsorship needed
                      </SelectItem>
                      <SelectItem value="partial">
                        Partial sponsorship
                      </SelectItem>
                      <SelectItem value="full">
                        Full sponsorship required
                      </SelectItem>
                      <SelectItem value="seeking">
                        Actively seeking sponsors
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Additional Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="previousExperience">
                  Previous Event Experience
                </Label>
                <Textarea
                  id="previousExperience"
                  placeholder="Describe any previous events you've organized or been involved with..."
                  value={formData.previousExperience}
                  onChange={(e) =>
                    handleInputChange("previousExperience", e.target.value)
                  }
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="marketingPlan">
                  Marketing & Promotion Plan
                </Label>
                <Textarea
                  id="marketingPlan"
                  placeholder="How do you plan to promote and market your event?"
                  value={formData.marketingPlan}
                  onChange={(e) =>
                    handleInputChange("marketingPlan", e.target.value)
                  }
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="specialRequests">
                  Special Requirements or Requests
                </Label>
                <Textarea
                  id="specialRequests"
                  placeholder="Any special equipment, accessibility needs, or other requirements..."
                  value={formData.specialRequests}
                  onChange={(e) =>
                    handleInputChange("specialRequests", e.target.value)
                  }
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          {/* Terms and Conditions */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.termsAccepted}
                    onCheckedChange={(checked) =>
                      handleInputChange("termsAccepted", checked)
                    }
                  />
                  <Label htmlFor="terms" className="text-sm leading-5">
                    I agree to the StartUp-SL event hosting terms and
                    conditions, and understand that my proposal will be reviewed
                    by the platform team. *
                  </Label>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="dataProcessing"
                    checked={formData.dataProcessingAccepted}
                    onCheckedChange={(checked) =>
                      handleInputChange("dataProcessingAccepted", checked)
                    }
                  />
                  <Label htmlFor="dataProcessing" className="text-sm leading-5">
                    I consent to the processing of my personal data for the
                    purpose of event proposal review and communication. *
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button
              type="submit"
              size="lg"
              disabled={
                isSubmitting ||
                !formData.termsAccepted ||
                !formData.dataProcessingAccepted
              }
              className="min-w-32"
            >
              {isSubmitting ? "Submitting..." : "Submit Proposal"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
