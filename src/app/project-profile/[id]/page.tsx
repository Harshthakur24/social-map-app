"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Target,
  Calendar,
  Award,
  Briefcase,
  Heart,
  MessageSquare,
  Layers,
} from "lucide-react";

interface ProjectData {
  _id: string;
  firstName: string;
  lastName: string;
  title: string;
  objective: string;
  category: string;
  duration: {
    startDate: string;
    endDate: string;
  };
  description: string;
  supportItems: Array<{
    item: string;
    quantity: string;
    byWhen: string;
    dropLocation: string;
  }>;
  otherSupport: string;
  pictureOfSuccess?: {
    url: string;
  };
}

interface RelatedProject {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  progress: number;
}

export default function ProjectDetails({ params }: { params: { id: string } }) {
  const [projectData, setProjectData] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const relatedProjects = [
    {
      id: "1",
      title: "Digital Literacy Program",
      description: "Empowering communities through technology education",
      image: "/api/placeholder/400/320",
      category: "Education",
      progress: 60,
    },
    {
      id: "2",
      title: "Youth Mentorship Initiative",
      description: "Connecting students with professional mentors",
      image: "/api/placeholder/400/320",
      category: "Human Development",
      progress: 45,
    },
  ];

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const response = await fetch(`/api/projects/${params.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch project data");
        }
        const data = await response.json();
        setProjectData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchProjectData();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error || !projectData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Profile Header */}
      <div className="relative">
        <div className="h-48 overflow-hidden">
          <Image
            width={1200}
            height={300}
            src="/api/placeholder/1200/300"
            alt="Profile Banner"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative bg-white shadow-sm p-6 flex flex-col md:flex-row items-center gap-6">
          <div className="absolute -top-12 left-1/2 md:left-6 transform -translate-x-1/2 md:translate-x-0">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-blue-100 border-4 border-white flex items-center justify-center shadow-lg">
              <span className="text-3xl font-bold text-blue-600">
                {projectData.firstName[0]}
                {projectData.lastName[0]}
              </span>
            </div>
          </div>

          <div className="flex-1 text-center md:text-left mt-12 md:mt-0 md:ml-40">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              {projectData.firstName} {projectData.lastName}
            </h1>
            <p className="text-lg text-blue-600 font-medium mt-1">
              {projectData.title}
            </p>
            <div className="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">
              <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">
                {projectData.category}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Project Details */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="flex items-start gap-4">
                <Target className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <Label className="text-sm text-blue-600">
                    Project Objective
                  </Label>
                  <p className="mt-1 text-gray-700">{projectData.objective}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Calendar className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <Label className="text-sm text-blue-600">Timeline</Label>
                  <p className="mt-1 text-gray-700">
                    Starts {projectData.duration.startDate} | Ends{" "}
                    {projectData.duration.endDate}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Award className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <Label className="text-sm text-blue-600">
                    Project Description
                  </Label>
                  <p className="mt-1 text-gray-700">
                    {projectData.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <Label className="text-lg font-semibold text-gray-900 mb-3">
                The Project Idea in a Picture
              </Label>
              <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
                <Image
                  width={600}
                  height={400}
                  src={
                    projectData.pictureOfSuccess?.url ||
                    "/api/placeholder/600/400"
                  }
                  alt="Project Success Vision"
                  className="w-full h-full object-cover"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Support Section */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-semibold">Support Required</h2>
              </div>
              <div className="text-sm text-blue-600 gap-5 flex flex-row items-center">
                <p>Click Here to Support and Do Your Bit</p>
                <Button className="bg-blue-600">Support Project</Button>
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
              <Label className="text-sm font-bold text-gray-700">Items</Label>
              <Label className="text-sm font-bold text-gray-700">
                Quantity
              </Label>
              <Label className="text-sm font-bold text-gray-700">
                Needed By
              </Label>
              <Label className="text-sm font-bold text-gray-700">
                Drop Location
              </Label>
            </div>

            {projectData.supportItems.map((item, index) => (
              <div
                key={index}
                className="grid md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg"
              >
                <p>{item.item}</p>
                <p>{item.quantity}</p>
                <p>{item.byWhen}</p>
                <p>{item.dropLocation}</p>
              </div>
            ))}

            <div className="mt-6">
              <Label className="text-sm text-blue-600">
                Additional Support Needed
              </Label>
              <p className="mt-2 text-gray-700">{projectData.otherSupport}</p>
            </div>
          </CardContent>
        </Card>

        {/* Related Projects */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Other Projects by {projectData.firstName}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {relatedProjects.map((project) => (
              <Card key={project.id}>
                <CardContent className="p-6 space-y-4">
                  <Image
                    width={400}
                    height={200}
                    src={project.image}
                    alt={project.title}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{project.title}</h3>
                    <p className="text-gray-700 text-sm">
                      {project.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-blue-600">{project.category}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
