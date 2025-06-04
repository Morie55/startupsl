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
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Users,
  CreditCard,
  Shield,
  CheckCircle,
  User,
  Building,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

// Mock event data (same as in the detail page)
const eventData = {
  1: {
    id: 1,
    title: "Sierra Leone Startup Pitch Competition 2024",
    date: "2024-02-15",
    time: "09:00 AM",
    endTime: "05:00 PM",
    location: "Freetown Convention Center",
    address: "15 Siaka Stevens Street, Freetown, Sierra Leone",
    category: "Competition",
    price: "Free",
    maxAttendees: 300,
    currentRegistrations: 187,
    registrationDeadline: "2024-02-10",
  },
};

const dietaryOptions = [
  "No dietary restrictions",
  "Vegetarian",
  "Vegan",
  "Halal",
  "Gluten-free",
  "Dairy-free",
  "Other (please specify)",
];

const tshirtSizes = ["XS", "S", "M", "L", "XL", "XXL"];

const hearAboutOptions = [
  "StartUp-SL website",
  "Social media",
  "Email newsletter",
  "Friend/colleague",
  "Partner organization",
  "Search engine",
  "Other",
];

export default function EventRegistrationPage() {
  const params = useParams();
  const eventId = params.id as string;
  const event = eventData[eventId as keyof typeof eventData];

  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",

    // Professional Information
    jobTitle: "",
    company: "",
    industry: "",
    experience: "",
    linkedinProfile: "",

    // Event Specific
    attendanceReason: "",
    expectations: "",
    networkingInterests: "",
    dietaryRestrictions: "",
    dietaryOther: "",
    tshirtSize: "",
    accessibilityNeeds: "",

    // Marketing
    hearAbout: "",
    marketingConsent: false,
    photoConsent: false,

    // Emergency Contact
    emergencyName: "",
    emergencyPhone: "",
    emergencyRelation: "",

    // Payment (for paid events)
    paymentMethod: "",

    // Agreements
    termsAccepted: false,
    codeOfConductAccepted: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

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
    setIsRegistered(true);
  };

  if (!event) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <h1 className="mb-2 text-2xl font-bold text-gray-900">
            Event Not Found
          </h1>
          <p className="mb-4 text-gray-600">
            The event you're trying to register for doesn't exist.
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

  if (isRegistered) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50">
        <Card className="w-full max-w-lg text-center">
          <CardHeader>
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-600">
              Registration Successful!
            </CardTitle>
            <CardDescription>
              You're all set for {event.title}. We'll send you a confirmation
              email shortly.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-gray-50">
                <h3 className="mb-2 font-semibold">Event Details</h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {formatDate(event.date)}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    {event.time} - {event.endTime}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    {event.location}
                  </div>
                </div>
              </div>

              <div className="text-sm text-gray-600">
                <p>
                  <strong>What's next?</strong>
                </p>
                <ul className="mt-2 space-y-1 list-disc list-inside">
                  <li>Check your email for confirmation and event details</li>
                  <li>Add the event to your calendar</li>
                  <li>Prepare your business cards for networking</li>
                  <li>Follow us on social media for updates</li>
                </ul>
              </div>

              <div className="flex gap-3">
                <Link href={`/events/${event.id}`} className="flex-1">
                  <Button variant="outline" className="w-full">
                    View Event
                  </Button>
                </Link>
                <Link href="/events" className="flex-1">
                  <Button className="w-full">Browse More Events</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl px-4 py-6 mx-auto sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-6">
            <Link href={`/events/${event.id}`}>
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Event
              </Button>
            </Link>
          </div>

          <div>
            <Badge className="mb-3">{event.category}</Badge>
            <h1 className="mb-2 text-3xl font-bold text-gray-900">
              Register for Event
            </h1>
            <h2 className="mb-4 text-xl text-gray-600">{event.title}</h2>

            {/* Event Summary */}
            <div className="p-4 rounded-lg bg-gray-50">
              <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-4">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                  {formatDate(event.date)}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-gray-500" />
                  {event.time} - {event.endTime}
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                  {event.location}
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2 text-gray-500" />
                  {event.currentRegistrations}/{event.maxAttendees} registered
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Personal Information
              </CardTitle>
              <CardDescription>
                Please provide your basic information for registration.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    placeholder="Your first name"
                    value={formData.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    placeholder="Your last name"
                    value={formData.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    placeholder="+232 XX XXX XXXX"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) =>
                      handleInputChange("dateOfBirth", e.target.value)
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Professional Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="w-5 h-5" />
                Professional Information
              </CardTitle>
              <CardDescription>
                Help us understand your professional background.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <Label htmlFor="jobTitle">Job Title</Label>
                  <Input
                    id="jobTitle"
                    placeholder="e.g., Software Developer"
                    value={formData.jobTitle}
                    onChange={(e) =>
                      handleInputChange("jobTitle", e.target.value)
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="company">Company/Organization</Label>
                  <Input
                    id="company"
                    placeholder="Your company name"
                    value={formData.company}
                    onChange={(e) =>
                      handleInputChange("company", e.target.value)
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="industry">Industry</Label>
                  <Select
                    value={formData.industry}
                    onValueChange={(value) =>
                      handleInputChange("industry", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="agriculture">Agriculture</SelectItem>
                      <SelectItem value="manufacturing">
                        Manufacturing
                      </SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="consulting">Consulting</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="experience">Years of Experience</Label>
                  <Select
                    value={formData.experience}
                    onValueChange={(value) =>
                      handleInputChange("experience", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-1">0-1 years</SelectItem>
                      <SelectItem value="2-5">2-5 years</SelectItem>
                      <SelectItem value="6-10">6-10 years</SelectItem>
                      <SelectItem value="11-15">11-15 years</SelectItem>
                      <SelectItem value="15+">15+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="linkedinProfile">
                    LinkedIn Profile (Optional)
                  </Label>
                  <Input
                    id="linkedinProfile"
                    placeholder="https://linkedin.com/in/yourprofile"
                    value={formData.linkedinProfile}
                    onChange={(e) =>
                      handleInputChange("linkedinProfile", e.target.value)
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Event Specific Information */}
          <Card>
            <CardHeader>
              <CardTitle>Event Participation</CardTitle>
              <CardDescription>
                Tell us about your interest in this event.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="attendanceReason">
                  Why are you attending this event? *
                </Label>
                <Textarea
                  id="attendanceReason"
                  placeholder="Share your motivation for attending..."
                  value={formData.attendanceReason}
                  onChange={(e) =>
                    handleInputChange("attendanceReason", e.target.value)
                  }
                  rows={3}
                  required
                />
              </div>

              <div>
                <Label htmlFor="expectations">
                  What do you hope to gain from this event?
                </Label>
                <Textarea
                  id="expectations"
                  placeholder="Your expectations and goals..."
                  value={formData.expectations}
                  onChange={(e) =>
                    handleInputChange("expectations", e.target.value)
                  }
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="networkingInterests">
                  Networking Interests
                </Label>
                <Textarea
                  id="networkingInterests"
                  placeholder="What type of people would you like to connect with?"
                  value={formData.networkingInterests}
                  onChange={(e) =>
                    handleInputChange("networkingInterests", e.target.value)
                  }
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="hearAbout">
                  How did you hear about this event?
                </Label>
                <Select
                  value={formData.hearAbout}
                  onValueChange={(value) =>
                    handleInputChange("hearAbout", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    {hearAboutOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Special Requirements */}
          <Card>
            <CardHeader>
              <CardTitle>Special Requirements</CardTitle>
              <CardDescription>
                Help us make the event comfortable for you.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <Label htmlFor="dietaryRestrictions">
                    Dietary Restrictions
                  </Label>
                  <Select
                    value={formData.dietaryRestrictions}
                    onValueChange={(value) =>
                      handleInputChange("dietaryRestrictions", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select dietary needs" />
                    </SelectTrigger>
                    <SelectContent>
                      {dietaryOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="tshirtSize">
                    T-Shirt Size (if applicable)
                  </Label>
                  <Select
                    value={formData.tshirtSize}
                    onValueChange={(value) =>
                      handleInputChange("tshirtSize", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      {tshirtSizes.map((size) => (
                        <SelectItem key={size} value={size}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {formData.dietaryRestrictions === "Other (please specify)" && (
                  <div className="md:col-span-2">
                    <Label htmlFor="dietaryOther">
                      Please specify your dietary requirements
                    </Label>
                    <Input
                      id="dietaryOther"
                      placeholder="Describe your dietary needs"
                      value={formData.dietaryOther}
                      onChange={(e) =>
                        handleInputChange("dietaryOther", e.target.value)
                      }
                    />
                  </div>
                )}

                <div className="md:col-span-2">
                  <Label htmlFor="accessibilityNeeds">
                    Accessibility Requirements
                  </Label>
                  <Textarea
                    id="accessibilityNeeds"
                    placeholder="Any accessibility accommodations needed..."
                    value={formData.accessibilityNeeds}
                    onChange={(e) =>
                      handleInputChange("accessibilityNeeds", e.target.value)
                    }
                    rows={2}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Contact */}
          <Card>
            <CardHeader>
              <CardTitle>Emergency Contact</CardTitle>
              <CardDescription>
                In case of emergency during the event.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div>
                  <Label htmlFor="emergencyName">Contact Name *</Label>
                  <Input
                    id="emergencyName"
                    placeholder="Emergency contact name"
                    value={formData.emergencyName}
                    onChange={(e) =>
                      handleInputChange("emergencyName", e.target.value)
                    }
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="emergencyPhone">Contact Phone *</Label>
                  <Input
                    id="emergencyPhone"
                    placeholder="+232 XX XXX XXXX"
                    value={formData.emergencyPhone}
                    onChange={(e) =>
                      handleInputChange("emergencyPhone", e.target.value)
                    }
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="emergencyRelation">Relationship *</Label>
                  <Select
                    value={formData.emergencyRelation}
                    onValueChange={(value) =>
                      handleInputChange("emergencyRelation", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select relationship" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="spouse">Spouse</SelectItem>
                      <SelectItem value="parent">Parent</SelectItem>
                      <SelectItem value="sibling">Sibling</SelectItem>
                      <SelectItem value="friend">Friend</SelectItem>
                      <SelectItem value="colleague">Colleague</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
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
                    I agree to the event terms and conditions, and understand
                    the event policies including cancellation and refund
                    policies. *
                  </Label>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="codeOfConduct"
                    checked={formData.codeOfConductAccepted}
                    onCheckedChange={(checked) =>
                      handleInputChange("codeOfConductAccepted", checked)
                    }
                  />
                  <Label htmlFor="codeOfConduct" className="text-sm leading-5">
                    I agree to abide by the StartUp-SL code of conduct and
                    maintain professional behavior throughout the event. *
                  </Label>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="marketingConsent"
                    checked={formData.marketingConsent}
                    onCheckedChange={(checked) =>
                      handleInputChange("marketingConsent", checked)
                    }
                  />
                  <Label
                    htmlFor="marketingConsent"
                    className="text-sm leading-5"
                  >
                    I consent to receiving marketing communications about future
                    events and opportunities.
                  </Label>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="photoConsent"
                    checked={formData.photoConsent}
                    onCheckedChange={(checked) =>
                      handleInputChange("photoConsent", checked)
                    }
                  />
                  <Label htmlFor="photoConsent" className="text-sm leading-5">
                    I consent to being photographed/recorded during the event
                    for promotional purposes.
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Registration Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Registration Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Event Registration</span>
                  <span className="font-semibold text-green-600">
                    {event.price}
                  </span>
                </div>
                <Separator />
                <div className="flex items-center justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-green-600">{event.price}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Shield className="w-4 h-4" />
                  <span>
                    Your information is secure and will only be used for event
                    purposes.
                  </span>
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
                !formData.codeOfConductAccepted
              }
              className="min-w-40"
            >
              {isSubmitting ? "Registering..." : "Complete Registration"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
