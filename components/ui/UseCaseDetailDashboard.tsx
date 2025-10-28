"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Eye, Mic, Globe, FileText, Cpu, TrendingUp, TrendingDown,
  Users, AlertTriangle, Activity, BarChart3, Clock, MapPin, Shield
} from "lucide-react";
import { UseCase } from "@/types";
import { cn } from "@/lib/utils";
import usecasesData from "@/content/usecases.json";

interface UseCaseDetailDashboardProps {
  usecase: UseCase | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectUseCase: (usecase: UseCase) => void;
}

// Signal stream definitions
const SIGNAL_STREAMS = [
  { id: "Visual", label: "Visual Intelligence", icon: Eye, color: "from-blue-500 to-cyan-500" },
  { id: "Audio", label: "Audio Intelligence", icon: Mic, color: "from-purple-500 to-indigo-500" },
  { id: "Social Media", label: "Social Intelligence", icon: Globe, color: "from-teal-500 to-cyan-500" },
  { id: "Text", label: "Text Intelligence", icon: FileText, color: "from-amber-500 to-yellow-500" },
  { id: "Sensors (IoT, GIS)", label: "Sensor Intelligence", icon: Cpu, color: "from-green-500 to-emerald-500" },
];

// Comprehensive metrics data for all use cases
const getDummyMetrics = (usecaseId: string) => {
  const metricsMap: Record<string, any> = {
    // VISUAL USE CASES
    "visual-fight-aggression": {
      liveAlert: { location: "Stadium Section A", cameraId: "CAM-A-045", timestamp: "2 mins ago", severity: "high" },
      primaryMetric: { label: "Incident Type", value: "23", trend: "-18.2%", graphData: [35, 28, 31, 25, 29, 26, 23] },
      flowRate: { label: "Incident Rate", current: "Physical: 45%", previous: "Verbal: 30%" },
      utilization: { value: 92, label: "Camera Feeds" },
      riskLevel: { value: 68, label: "Danger Level", status: "High" },
      topEntryPoints: [
        { name: "Section A", percentage: "12 incidents" },
        { name: "Main Gate", percentage: "15 incidents" },
        { name: "Section B", percentage: "8 incidents" },
      ],
      flowCapacity: { current: "147/min", max: "200/min", percentage: 74 },
      alerts: [
        { type: "warning", message: "Aggressive behavior detected in Section A" },
        { type: "success", message: "Security response time improved" },
      ],
      patternAnalysis: [
        { type: "warning", message: "Physical altercations spike during halftime periods" },
        { type: "info", message: "Section A shows 3x higher incident rate than other areas" },
        { type: "success", message: "Security response time averaging 45 seconds" },
      ],
      predictiveAnalysis: [
        { type: "warning", message: "High-risk period expected in next 30 minutes" },
        { type: "info", message: "Crowd density increasing near Section A exits" },
        { type: "success", message: "Additional security deployment recommended" },
      ],
      videoFeeds: [
        { id: 1, label: "Stadium Section A", timestamp: "Live", image: "https://images.unsplash.com/photo-1527871369852-eb58cb2b54e2?w=400" },
        { id: 2, label: "Main Concourse", timestamp: "Live", image: "https://images.unsplash.com/photo-1508355991726-dc1ec2c0c2c5?w=400" },
        { id: 3, label: "Entrance Gate", timestamp: "Live", image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400" },
        { id: 4, label: "Stadium Overview", timestamp: "Live", image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400" },
      ],
    },
    "visual-weapon-detection": {
      liveAlert: { location: "Security Gate 2", cameraId: "CAM-SEC-012", timestamp: "5 mins ago", severity: "high" },
      primaryMetric: { label: "Weapon Type Detected", value: "60", trend: "+5.3%", graphData: [45, 50, 52, 55, 58, 59, 60] },
      flowRate: { label: "Detection Rate", current: "Gun: 12", previous: "Knife: 28" },
      utilization: { value: 98, label: "Camera Feeds" },
      riskLevel: { value: 75, label: "Threat Level", status: "High" },
      topEntryPoints: [
        { name: "Gate 1", percentage: "8 detections" },
        { name: "Gate 2", percentage: "12 detections" },
        { name: "Staff Entry", percentage: "3 detections" },
      ],
      flowCapacity: { current: "520/hr", max: "600/hr", percentage: 87 },
      alerts: [
        { type: "warning", message: "Weapon detected at Gate 2" },
        { type: "info", message: "Security team dispatched" },
      ],
      patternAnalysis: [
        { type: "warning", message: "Gate 2 shows highest weapon detection frequency" },
        { type: "info", message: "Concealed weapons detected primarily during peak hours" },
        { type: "success", message: "False positive rate reduced to 2.5%" },
      ],
      predictiveAnalysis: [
        { type: "warning", message: "Expected surge in checkpoint traffic in 1 hour" },
        { type: "info", message: "Recommend additional screening personnel at Gate 2" },
        { type: "success", message: "System calibration optimal for next 72 hours" },
      ],
      videoFeeds: [
        { id: 1, label: "Security Gate 1", timestamp: "Live", image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400" },
        { id: 2, label: "Security Gate 2", timestamp: "Live", image: "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=400" },
        { id: 3, label: "Baggage Scanner Area", timestamp: "Live", image: "https://images.unsplash.com/photo-1554072675-66db59dba46f?w=400" },
        { id: 4, label: "Terminal Overview", timestamp: "Live", image: "https://images.unsplash.com/photo-1526913299589-f35a3ddeb7ae?w=400" },
      ],
    },
    "visual-crowd-management": {
      primaryMetric: { label: "Total Footfall", value: "85.00 L+", trend: "+7.51%", graphData: [65, 70, 68, 75, 80, 78, 85] },
      flowRate: { label: "Flow Rate", current: "3,250/hr", previous: "2,840/hr" },
      utilization: { value: 85, label: "Goal Utilization" },
      riskLevel: { value: 65, label: "Risk Level", status: "Medium" },
      topEntryPoints: [
        { name: "Main East Entry", percentage: "32%" },
        { name: "Exit Gate Entry", percentage: "28%" },
        { name: "Management Zone", percentage: "18%" },
      ],
      flowCapacity: { current: "1203/min", max: "1500/min", percentage: 80 },
      alerts: [
        { type: "warning", message: "High foot rate at Main Gate" },
        { type: "info", message: "Approaching capacity at North Entrance" },
        { type: "success", message: "Optimal flow at South Entry" },
      ],
      patternAnalysis: [
        { type: "info", message: "Peak congestion between 11 AM - 1 PM" },
        { type: "warning", message: "Bottleneck forming near Main East Entry" },
        { type: "success", message: "Exit flow patterns show efficient dispersal" },
      ],
      predictiveAnalysis: [
        { type: "warning", message: "Crowd density may reach 90% in next 2 hours" },
        { type: "info", message: "Suggest opening alternate entry points" },
        { type: "success", message: "No stampede risk detected" },
      ],
      videoFeeds: [
        { id: 1, label: "Crowd Analysis", timestamp: "Live", image: "/images/usecases/Real-Time crowd-management/Crowd Analysis.mov", videoUrl: "/images/usecases/Real-Time crowd-management/Crowd Analysis.mov" },
        { id: 2, label: "Feed 1", timestamp: "Live", image: "/images/usecases/Real-Time crowd-management/feed1.png" },
        { id: 3, label: "Feed 2", timestamp: "Live", image: "/images/usecases/Real-Time crowd-management/feed2.png" },
        { id: 4, label: "Feed 3", timestamp: "Live", image: "/images/usecases/Real-Time crowd-management/feed3.png" },
      ],
    },
    "visual-traffic-violation": {
      primaryMetric: { label: "Violations Detected", value: "1,847", trend: "+15.2%", graphData: [1200, 1350, 1450, 1580, 1650, 1720, 1847] },
      flowRate: { label: "Violation Rate", current: "77/hr", previous: "67/hr" },
      utilization: { value: 94, label: "System Uptime" },
      riskLevel: { value: 58, label: "Compliance Rate", status: "Medium" },
      topEntryPoints: [
        { name: "MG Road Junction", percentage: "35%" },
        { name: "Silk Board Signal", percentage: "28%" },
        { name: "Outer Ring Road", percentage: "22%" },
      ],
      flowCapacity: { current: "77/hr", max: "100/hr", percentage: 77 },
      alerts: [
        { type: "warning", message: "High violation rate at MG Road" },
        { type: "info", message: "Speed limit violations increased" },
      ],
      patternAnalysis:       [
              {
                      "type": "warning",
                      "message": "Red light violations peak during rush hours (8-9 AM)"
              },
              {
                      "type": "info",
                      "message": "Most violations occur at MG Road intersection"
              },
              {
                      "type": "success",
                      "message": "ANPR accuracy improved to 98.5%"
              }
      ],
      predictiveAnalysis:       [
              {
                      "type": "warning",
                      "message": "Expected 20% increase in violations during evening rush"
              },
              {
                      "type": "info",
                      "message": "Traffic signal timing optimization recommended"
              },
              {
                      "type": "success",
                      "message": "Automated fine generation processing smoothly"
              }
      ],
      videoFeeds: [
        { id: 1, label: "MG Road Junction", timestamp: "Live", image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400" },
        { id: 2, label: "Silk Board Signal", timestamp: "Live", image: "https://images.unsplash.com/photo-1519003300449-424ad0405076?w=400" },
        { id: 3, label: "Outer Ring Road", timestamp: "Live", image: "https://images.unsplash.com/photo-1502790671504-542ad42d5189?w=400" },
        { id: 4, label: "Traffic Overview", timestamp: "Live", image: "https://images.unsplash.com/photo-1461956592993-0f4ed3c38be8?w=400" },
      ],
    },
    "visual-accident-detection": {
      primaryMetric: { label: "Road Incidents", value: "342", trend: "-8.4%", graphData: [420, 395, 380, 365, 355, 348, 342] },
      flowRate: { label: "Detection Rate", current: "14/hr", previous: "15/hr" },
      utilization: { value: 88, label: "Coverage Rate" },
      riskLevel: { value: 42, label: "Severity Index", status: "Medium" },
      topEntryPoints: [
        { name: "Highway Mile 45", percentage: "32%" },
        { name: "City Bypass", percentage: "28%" },
        { name: "Main Street", percentage: "24%" },
      ],
      flowCapacity: { current: "14/hr", max: "20/hr", percentage: 70 },
      alerts: [
        { type: "warning", message: "Accident detected at Highway Mile 45" },
        { type: "info", message: "Road defect reported on City Bypass" },
      ],
      patternAnalysis:       [
              {
                      "type": "warning",
                      "message": "Highway Zone 3 shows highest accident frequency"
              },
              {
                      "type": "info",
                      "message": "Pothole-related incidents increased by 15%"
              },
              {
                      "type": "success",
                      "message": "Average detection time reduced to 8 seconds"
              }
      ],
      predictiveAnalysis:       [
              {
                      "type": "warning",
                      "message": "High accident risk predicted for monsoon season"
              },
              {
                      "type": "info",
                      "message": "Road maintenance required in identified hotspots"
              },
              {
                      "type": "success",
                      "message": "Emergency response coordination improving"
              }
      ],
      videoFeeds: [
        { id: 1, label: "Highway Mile 45", timestamp: "Live", image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400" },
        { id: 2, label: "City Bypass", timestamp: "Live", image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400" },
        { id: 3, label: "Main Street", timestamp: "Live", image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400" },
        { id: 4, label: "Road Overview", timestamp: "Live", image: "https://images.unsplash.com/photo-1502489597346-dad15683d4c2?w=400" },
      ],
    },
    "visual-ppe-compliance": {
      primaryMetric: { label: "Safety Checks", value: "8,942", trend: "+12.8%", graphData: [7200, 7500, 7800, 8100, 8400, 8650, 8942] },
      flowRate: { label: "Compliance Rate", current: "373/hr", previous: "331/hr" },
      utilization: { value: 96, label: "Compliance Rate" },
      riskLevel: { value: 18, label: "Violation Rate", status: "Low" },
      topEntryPoints: [
        { name: "Assembly Line A", percentage: "42%" },
        { name: "Warehouse Zone", percentage: "31%" },
        { name: "Loading Dock", percentage: "19%" },
      ],
      flowCapacity: { current: "373/hr", max: "400/hr", percentage: 93 },
      alerts: [
        { type: "success", message: "Compliance rate improved to 96%" },
        { type: "info", message: "Minor PPE violations in Zone B" },
      ],
      patternAnalysis:       [
              {
                      "type": "warning",
                      "message": "Helmet compliance drops to 78% during shift changes"
              },
              {
                      "type": "info",
                      "message": "Production Line 2 shows lowest PPE adherence"
              },
              {
                      "type": "success",
                      "message": "Overall compliance improved by 12% this month"
              }
      ],
      predictiveAnalysis:       [
              {
                      "type": "warning",
                      "message": "High-risk period during next shift change (3 PM)"
              },
              {
                      "type": "info",
                      "message": "Recommend additional safety briefings for Line 2 staff"
              },
              {
                      "type": "success",
                      "message": "Target 95% compliance achievable within 2 weeks"
              }
      ],
      videoFeeds: [
        { id: 1, label: "Assembly Line A", timestamp: "Live", image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400" },
        { id: 2, label: "Warehouse Zone", timestamp: "Live", image: "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=400" },
        { id: 3, label: "Loading Dock", timestamp: "Live", image: "https://images.unsplash.com/photo-1581093577421-f561a654a353?w=400" },
        { id: 4, label: "Factory Overview", timestamp: "Live", image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400" },
      ],
    },
    "visual-retail-customer-behavior": {
      primaryMetric: { label: "Daily Footfall", value: "24,580", trend: "+9.3%", graphData: [18000, 19500, 21000, 22500, 23000, 23800, 24580] },
      flowRate: { label: "Customer Flow Rate", current: "1,024/hr", previous: "937/hr" },
      utilization: { value: 73, label: "Store Occupancy" },
      riskLevel: { value: 52, label: "Queue Length", status: "Medium" },
      topEntryPoints: [
        { name: "Main Entrance", percentage: "48%" },
        { name: "Mall Connector", percentage: "32%" },
        { name: "Parking Entrance", percentage: "20%" },
      ],
      flowCapacity: { current: "1024/hr", max: "1500/hr", percentage: 68 },
      alerts: [
        { type: "warning", message: "Long queue at checkout counters" },
        { type: "info", message: "High dwell time in electronics section" },
      ],
      patternAnalysis:       [
              {
                      "type": "info",
                      "message": "Peak footfall between 6 PM - 8 PM on weekends"
              },
              {
                      "type": "success",
                      "message": "Electronics section shows highest dwell time (8.5 min)"
              },
              {
                      "type": "info",
                      "message": "Checkout queue length averaging 5.2 customers"
              }
      ],
      predictiveAnalysis:       [
              {
                      "type": "warning",
                      "message": "Expected surge in footfall during next 2 hours"
              },
              {
                      "type": "info",
                      "message": "Suggest opening 2 additional checkout counters"
              },
              {
                      "type": "success",
                      "message": "Customer engagement patterns trending positively"
              }
      ],
      videoFeeds: [
        { id: 1, label: "Main Entrance", timestamp: "Live", image: "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=400" },
        { id: 2, label: "Electronics Section", timestamp: "Live", image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400" },
        { id: 3, label: "Checkout Area", timestamp: "Live", image: "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?w=400" },
        { id: 4, label: "Store Overview", timestamp: "Live", image: "https://images.unsplash.com/photo-1588117305388-c2631a279f82?w=400" },
      ],
    },
    "visual-quality-defect": {
      primaryMetric: { label: "Items Inspected", value: "145,230", trend: "+22.1%", graphData: [100000, 110000, 120000, 128000, 135000, 140000, 145230] },
      flowRate: { label: "Inspection Rate", current: "6,051/hr", previous: "4,958/hr" },
      utilization: { value: 99.2, label: "Quality Score" },
      riskLevel: { value: 0.8, label: "Defect Rate", status: "Low" },
      topEntryPoints: [
        { name: "Production Line 1", percentage: "45%" },
        { name: "Production Line 2", percentage: "35%" },
        { name: "Packaging Station", percentage: "20%" },
      ],
      flowCapacity: { current: "6051/hr", max: "7000/hr", percentage: 86 },
      alerts: [
        { type: "success", message: "Defect rate below target" },
        { type: "info", message: "Minor quality variations on Line 2" },
      ],
      patternAnalysis: [
        { type: "success", message: "Defect clustering on Line 2 between 2-4 PM" },
        { type: "info", message: "Most common defect: Surface scratches (42%)" },
        { type: "info", message: "Quality scores highest during morning shift" },
      ],
      predictiveAnalysis: [
        { type: "warning", message: "Line 2 may require calibration in 12 hours" },
        { type: "success", message: "Expected to meet daily quality targets" },
        { type: "info", message: "Inspection camera maintenance due in 3 days" },
      ],
      videoFeeds: [
        { id: 1, label: "Production Line 1", timestamp: "Live", image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400" },
        { id: 2, label: "Production Line 2", timestamp: "Live", image: "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=400" },
        { id: 3, label: "Quality Inspection", timestamp: "Live", image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400" },
        { id: 4, label: "Packaging Station", timestamp: "Live", image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=400" },
      ],
    },
    "visual-warehouse-automation": {
      primaryMetric: { label: "Inventory Items", value: "124,580", trend: "+3.2%", graphData: [115000, 117000, 119000, 121000, 122500, 123800, 124580] },
      flowRate: { label: "Processing Rate", current: "285/hr", previous: "276/hr" },
      utilization: { value: 78, label: "Storage Capacity" },
      riskLevel: { value: 12, label: "Stock Discrepancy", status: "Low" },
      topEntryPoints: [
        { name: "Warehouse Section A", percentage: "38%" },
        { name: "Warehouse Section B", percentage: "32%" },
        { name: "Loading Bay", percentage: "22%" },
      ],
      flowCapacity: { current: "285/hr", max: "350/hr", percentage: 81 },
      alerts: [
        { type: "success", message: "Inventory accuracy at 99.2%" },
        { type: "info", message: "Stock replenishment needed in Section C" },
      ],
      patternAnalysis:       [
              {
                      "type": "success",
                      "message": "Barcode scan accuracy at 99.7%"
              },
              {
                      "type": "info",
                      "message": "Zone A shows 25% faster loading efficiency"
              },
              {
                      "type": "info",
                      "message": "Drone-assisted inventory checks reduce time by 40%"
              }
      ],
      predictiveAnalysis:       [
              {
                      "type": "info",
                      "message": "Expected shipment volume increase of 18% tomorrow"
              },
              {
                      "type": "success",
                      "message": "Current capacity sufficient for projected demand"
              },
              {
                      "type": "warning",
                      "message": "Drone battery maintenance due in 5 days"
              }
      ],
      videoFeeds: [
        { id: 1, label: "Warehouse Section A", timestamp: "Live", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400" },
        { id: 2, label: "Warehouse Section B", timestamp: "Live", image: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=400" },
        { id: 3, label: "Loading Bay", timestamp: "Live", image: "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=400" },
        { id: 4, label: "Warehouse Overview", timestamp: "Live", image: "https://images.unsplash.com/photo-1605902394069-ff2ae2430e62?w=400" },
      ],
    },
    "visual-wildfire-detection": {
      primaryMetric: { label: "Monitoring Coverage", value: "2,450 km²", trend: "+18.5%", graphData: [1800, 1950, 2050, 2150, 2250, 2350, 2450] },
      flowRate: { label: "Detection Rate", current: "24 scans/hr", previous: "20 scans/hr" },
      utilization: { value: 95, label: "Sensor Network" },
      riskLevel: { value: 35, label: "Fire Risk Index", status: "Medium" },
      topEntryPoints: [
        { name: "Forest Zone A", percentage: "42%" },
        { name: "Hill Region B", percentage: "31%" },
        { name: "Valley Area C", percentage: "19%" },
      ],
      flowCapacity: { current: "24/hr", max: "30/hr", percentage: 80 },
      alerts: [
        { type: "warning", message: "Elevated temperatures in Zone A" },
        { type: "info", message: "Dry conditions increasing fire risk" },
      ],
      patternAnalysis:       [
              {
                      "type": "info",
                      "message": "Smoke detection accuracy 96% in daylight conditions"
              },
              {
                      "type": "success",
                      "message": "Average alert time improved to 4 minutes"
              },
              {
                      "type": "warning",
                      "message": "Zone 3 cameras show reduced visibility due to fog"
              }
      ],
      predictiveAnalysis:       [
              {
                      "type": "warning",
                      "message": "High fire risk conditions expected next 48 hours"
              },
              {
                      "type": "info",
                      "message": "Wind patterns favor rapid fire spread from northeast"
              },
              {
                      "type": "success",
                      "message": "Emergency response teams on standby"
              }
      ],
      videoFeeds: [
        { id: 1, label: "Wildfire Detection Zone 1", timestamp: "Live", image: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=400", videoUrl: "/images/usecases/Wildfire-and-Smoke Detection/Wildfire-and-Smoke Detection_1.mp4" },
        { id: 2, label: "Wildfire Detection Zone 2", timestamp: "Live", image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400", videoUrl: "/images/usecases/Wildfire-and-Smoke Detection/Wildfire-and-Smoke Detection_2.mp4" },
        { id: 3, label: "Valley Area C", timestamp: "Live", image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400" },
        { id: 4, label: "Forest Overview", timestamp: "Live", image: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=400" },
      ],
    },
    "visual-intrusion-perimeter": {
      primaryMetric: { label: "Security Events", value: "847", trend: "-12.4%", graphData: [1100, 1050, 980, 920, 890, 865, 847] },
      flowRate: { label: "Detection Rate", current: "35/hr", previous: "40/hr" },
      utilization: { value: 99, label: "Perimeter Coverage" },
      riskLevel: { value: 28, label: "Threat Level", status: "Low" },
      topEntryPoints: [
        { name: "North Perimeter", percentage: "38%" },
        { name: "East Boundary", percentage: "32%" },
        { name: "Main Gate", percentage: "22%" },
      ],
      flowCapacity: { current: "35/hr", max: "50/hr", percentage: 70 },
      alerts: [
        { type: "success", message: "Perimeter secure, no breaches" },
        { type: "info", message: "Routine patrol activity detected" },
      ],
      patternAnalysis:       [
              {
                      "type": "info",
                      "message": "Most intrusion attempts occur between 2-4 AM"
              },
              {
                      "type": "success",
                      "message": "Virtual fence detection accuracy at 99.2%"
              },
              {
                      "type": "warning",
                      "message": "Northwest perimeter shows 3x more alerts"
              }
      ],
      predictiveAnalysis:       [
              {
                      "type": "info",
                      "message": "Historical patterns suggest increased activity tonight"
              },
              {
                      "type": "warning",
                      "message": "Weather conditions may affect sensor accuracy"
              },
              {
                      "type": "success",
                      "message": "Security patrol routes optimized for coverage"
              }
      ],
      videoFeeds: [
        { id: 1, label: "North Perimeter", timestamp: "Live", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd61?w=400" },
        { id: 2, label: "East Boundary", timestamp: "Live", image: "https://images.unsplash.com/photo-1478860409698-8707f313ee8b?w=400" },
        { id: 3, label: "Main Gate", timestamp: "Live", image: "https://images.unsplash.com/photo-1569235186275-626cb53b83ce?w=400" },
        { id: 4, label: "Campus Overview", timestamp: "Live", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400" },
      ],
    },
    "visual-teacher-monitoring": {
      primaryMetric: { label: "Teaching Hours", value: "8,240", trend: "+5.7%", graphData: [7200, 7400, 7600, 7800, 8000, 8100, 8240] },
      flowRate: { label: "Attendance Rate", current: "343/day", previous: "324/day" },
      utilization: { value: 92, label: "Attendance Rate" },
      riskLevel: { value: 8, label: "Compliance Gap", status: "Low" },
      topEntryPoints: [
        { name: "Building A Classrooms", percentage: "42%" },
        { name: "Building B Classrooms", percentage: "35%" },
        { name: "Cafeteria/Kitchen", percentage: "15%" },
      ],
      flowCapacity: { current: "343/day", max: "400/day", percentage: 86 },
      alerts: [
        { type: "success", message: "Attendance compliance at 92%" },
        { type: "info", message: "Mid-day meal quality checks completed" },
      ],
      patternAnalysis:       [
              {
                      "type": "success",
                      "message": "Teacher attendance improved to 94% this month"
              },
              {
                      "type": "info",
                      "message": "Average classroom time: 42 minutes per session"
              },
              {
                      "type": "warning",
                      "message": "School 12 shows below-average attendance patterns"
              }
      ],
      predictiveAnalysis:       [
              {
                      "type": "info",
                      "message": "Expected attendance rate of 96% next week"
              },
              {
                      "type": "success",
                      "message": "Meal quality compliance on track to meet targets"
              },
              {
                      "type": "warning",
                      "message": "Recommend additional monitoring for School 12"
              }
      ],
      videoFeeds: [
        { id: 1, label: "Building A - Room 101", timestamp: "Live", image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400" },
        { id: 2, label: "Building B - Room 205", timestamp: "Live", image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400" },
        { id: 3, label: "School Cafeteria", timestamp: "Live", image: "https://images.unsplash.com/photo-1567521464027-f127ff144326?w=400" },
        { id: 4, label: "School Overview", timestamp: "Live", image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400" },
      ],
    },
    "visual-elevator-analytics": {
      primaryMetric: { label: "Daily Trips", value: "12,450", trend: "+8.2%", graphData: [10000, 10500, 11000, 11500, 12000, 12200, 12450] },
      flowRate: { label: "Usage Rate", current: "519/hr", previous: "480/hr" },
      utilization: { value: 68, label: "System Efficiency" },
      riskLevel: { value: 15, label: "Wait Time Index", status: "Low" },
      topEntryPoints: [
        { name: "Lobby to Floor 10-15", percentage: "35%" },
        { name: "Lobby to Floor 5-9", percentage: "28%" },
        { name: "Parking to Lobby", percentage: "22%" },
      ],
      flowCapacity: { current: "519/hr", max: "750/hr", percentage: 69 },
      alerts: [
        { type: "success", message: "Average wait time reduced to 32 seconds" },
        { type: "info", message: "Peak hour traffic on Elevator Bank A" },
      ],
      patternAnalysis:       [
              {
                      "type": "info",
                      "message": "Peak usage during 9-10 AM and 5-6 PM"
              },
              {
                      "type": "success",
                      "message": "Average wait time reduced to 28 seconds"
              },
              {
                      "type": "info",
                      "message": "Floors 15-20 show highest demand patterns"
              }
      ],
      predictiveAnalysis:       [
              {
                      "type": "warning",
                      "message": "Expected capacity strain during lunch hours"
              },
              {
                      "type": "info",
                      "message": "Floor demand prediction suggests activating Elevator 4"
              },
              {
                      "type": "success",
                      "message": "No emergency incidents predicted next 24 hours"
              }
      ],
      videoFeeds: [
        { id: 1, label: "Elevator Analytics 1", timestamp: "Live", image: "https://images.unsplash.com/photo-1569235186275-626cb53b83ce?w=400", videoUrl: "/images/usecases/Elevator - Analytics/Elevator-Analytics_1.mp4" },
        { id: 2, label: "Elevator Analytics 2", timestamp: "Live", image: "https://images.unsplash.com/photo-1554984750-efaf3a5a14fc?w=400", videoUrl: "/images/usecases/Elevator - Analytics/Elevator - Analytics_2.mp4" },
        { id: 3, label: "Elevator Analytics 3", timestamp: "Live", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400", videoUrl: "/images/usecases/Elevator - Analytics/Elevator Analytics_3.mp4" },
        { id: 4, label: "Building Interior", timestamp: "Live", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400" },
      ],
    },
    // AUDIO USE CASES
    "audio-aggression-stress": {
      primaryMetric: { label: "Calls Analyzed", value: "4,820", trend: "+6.8%", graphData: [4000, 4200, 4400, 4500, 4600, 4700, 4820] },
      flowRate: { label: "Detection Rate", current: "201/hr", previous: "188/hr" },
      utilization: { value: 94, label: "Detection Accuracy" },
      riskLevel: { value: 42, label: "High Stress Calls", status: "Medium" },
      topEntryPoints: [
        { name: "Emergency Line 1", percentage: "38%" },
        { name: "Emergency Line 2", percentage: "32%" },
        { name: "Emergency Line 3", percentage: "22%" },
      ],
      flowCapacity: { current: "201/hr", max: "250/hr", percentage: 80 },
      alerts: [
        { type: "warning", message: "High stress levels detected in 42% of calls" },
        { type: "info", message: "Peak call volume during evening hours" },
      ],
      patternAnalysis:       [
              {
                      "type": "warning",
                      "message": "Stress levels spike during peak call volumes"
              },
              {
                      "type": "info",
                      "message": "Average aggression detection time: 12 seconds"
              },
              {
                      "type": "success",
                      "message": "Call prioritization accuracy improved by 18%"
              }
      ],
      predictiveAnalysis:       [
              {
                      "type": "warning",
                      "message": "High-stress calls expected during evening hours"
              },
              {
                      "type": "info",
                      "message": "Recommend additional operator support for next shift"
              },
              {
                      "type": "success",
                      "message": "De-escalation protocols effective in 87% of cases"
              }
      ],
      videoFeeds: [
        { id: 1, label: "Call Center Line 1", timestamp: "Live", image: "https://images.unsplash.com/photo-1516534775068-ba3e7458af70?w=400" },
        { id: 2, label: "Call Center Line 2", timestamp: "Live", image: "https://images.unsplash.com/photo-1579165466991-467135ad3110?w=400" },
        { id: 3, label: "Operator Station", timestamp: "Live", image: "https://images.unsplash.com/photo-1591370874773-6702e8f12fd8?w=400" },
        { id: 4, label: "Control Room", timestamp: "Live", image: "https://images.unsplash.com/photo-1583468961261-dbb0c4a229ec?w=400" },
      ],
    },
    "audio-emergency-call-triage": {
      primaryMetric: { label: "Emergency Calls", value: "8,945", trend: "+12.3%", graphData: [7000, 7500, 7800, 8200, 8500, 8700, 8945] },
      flowRate: { label: "Processing Rate", current: "373/hr", previous: "332/hr" },
      utilization: { value: 97, label: "Triage Accuracy" },
      riskLevel: { value: 68, label: "Critical Calls", status: "High" },
      topEntryPoints: [
        { name: "Medical Emergency", percentage: "45%" },
        { name: "Fire Emergency", percentage: "28%" },
        { name: "Police Emergency", percentage: "19%" },
      ],
      flowCapacity: { current: "373/hr", max: "450/hr", percentage: 83 },
      alerts: [
        { type: "warning", message: "High volume of medical emergencies" },
        { type: "info", message: "Response times optimized by 18%" },
      ],
      patternAnalysis:       [
              {
                      "type": "success",
                      "message": "Call transcription accuracy at 97.5%"
              },
              {
                      "type": "info",
                      "message": "Medical emergencies routed 8 seconds faster on average"
              },
              {
                      "type": "warning",
                      "message": "Keyword detection accuracy drops with background noise"
              }
      ],
      predictiveAnalysis:       [
              {
                      "type": "info",
                      "message": "Expected call volume increase of 15% during evening"
              },
              {
                      "type": "success",
                      "message": "System capacity adequate for projected demand"
              },
              {
                      "type": "warning",
                      "message": "Recommend standby dispatch units during peak hours"
              }
      ],
      videoFeeds: [
        { id: 1, label: "Emergency Dispatch", timestamp: "Live", image: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=400" },
        { id: 2, label: "Call Center Operations", timestamp: "Live", image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400" },
        { id: 3, label: "Control Console", timestamp: "Live", image: "https://images.unsplash.com/photo-1593642532400-2682810df593?w=400" },
        { id: 4, label: "Command Center", timestamp: "Live", image: "https://images.unsplash.com/photo-1551522435-a13afa10f103?w=400" },
      ],
    },
    "audio-noise-pollution": {
      primaryMetric: { label: "Noise Readings", value: "45,820", trend: "-3.2%", graphData: [48000, 47500, 47000, 46500, 46200, 46000, 45820] },
      flowRate: { label: "Monitoring Rate", current: "1,909/hr", previous: "1,975/hr" },
      utilization: { value: 88, label: "Sensor Coverage" },
      riskLevel: { value: 55, label: "Violation Rate", status: "Medium" },
      topEntryPoints: [
        { name: "Downtown Area", percentage: "42%" },
        { name: "Industrial Zone", percentage: "31%" },
        { name: "Residential Area", percentage: "19%" },
      ],
      flowCapacity: { current: "1909/hr", max: "2500/hr", percentage: 76 },
      alerts: [
        { type: "warning", message: "Noise levels exceeding limits in Industrial Zone" },
        { type: "success", message: "Overall noise pollution reduced by 3.2%" },
      ],
      patternAnalysis:       [
              {
                      "type": "warning",
                      "message": "Zone 5 consistently exceeds noise limits during evenings"
              },
              {
                      "type": "info",
                      "message": "Construction sites are primary noise sources (68%)"
              },
              {
                      "type": "success",
                      "message": "Compliance improved by 22% after enforcement"
              }
      ],
      predictiveAnalysis:       [
              {
                      "type": "warning",
                      "message": "Festival season expected to increase noise levels"
              },
              {
                      "type": "info",
                      "message": "Recommend enhanced monitoring in residential zones"
              },
              {
                      "type": "success",
                      "message": "Long-term trend shows gradual improvement"
              }
      ],
      videoFeeds: [
        { id: 1, label: "Downtown Sensor", timestamp: "Live", image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400" },
        { id: 2, label: "Industrial Zone", timestamp: "Live", image: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=400" },
        { id: 3, label: "Residential Monitor", timestamp: "Live", image: "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?w=400" },
        { id: 4, label: "City Map View", timestamp: "Live", image: "https://images.unsplash.com/photo-1524813686514-a57563d77965?w=400" },
      ],
    },
    "audio-patient-distress": {
      primaryMetric: { label: "Distress Events", value: "342", trend: "-15.8%", graphData: [480, 450, 420, 390, 370, 355, 342] },
      flowRate: { label: "Detection Rate", current: "14/hr", previous: "17/hr" },
      utilization: { value: 96, label: "Detection Accuracy" },
      riskLevel: { value: 38, label: "Critical Cases", status: "Medium" },
      topEntryPoints: [
        { name: "Emergency Ward", percentage: "42%" },
        { name: "ICU Floor", percentage: "31%" },
        { name: "General Ward", percentage: "19%" },
      ],
      flowCapacity: { current: "14/hr", max: "20/hr", percentage: 70 },
      alerts: [
        { type: "success", message: "Response time improved to 45 seconds" },
        { type: "info", message: "Distress incidents reduced by 15.8%" },
      ],
      patternAnalysis:       [
              {
                      "type": "success",
                      "message": "Distress detection accuracy improved to 94.5%"
              },
              {
                      "type": "info",
                      "message": "Average alert response time: 35 seconds"
              },
              {
                      "type": "warning",
                      "message": "Cry analysis accuracy reduced in noisy environments"
              }
      ],
      predictiveAnalysis:       [
              {
                      "type": "info",
                      "message": "Expected increase in emergency calls during night hours"
              },
              {
                      "type": "success",
                      "message": "Respiratory pattern analysis showing 89% accuracy"
              },
              {
                      "type": "warning",
                      "message": "System recalibration recommended in 2 weeks"
              }
      ],
      videoFeeds: [
        { id: 1, label: "Emergency Ward", timestamp: "Live", image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400" },
        { id: 2, label: "ICU Monitoring", timestamp: "Live", image: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=400" },
        { id: 3, label: "General Ward", timestamp: "Live", image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=400" },
        { id: 4, label: "Hospital Overview", timestamp: "Live", image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400" },
      ],
    },
    "audio-code-word-detection": {
      primaryMetric: { label: "Monitored Channels", value: "1,247", trend: "+8.5%", graphData: [1000, 1050, 1100, 1150, 1200, 1220, 1247] },
      flowRate: { label: "Detection Rate", current: "52/hr", previous: "48/hr" },
      utilization: { value: 99, label: "Detection Accuracy" },
      riskLevel: { value: 25, label: "Alert Level", status: "Low" },
      topEntryPoints: [
        { name: "Communication Channel A", percentage: "38%" },
        { name: "Communication Channel B", percentage: "32%" },
        { name: "Communication Channel C", percentage: "22%" },
      ],
      flowCapacity: { current: "52/hr", max: "75/hr", percentage: 69 },
      alerts: [
        { type: "info", message: "Routine monitoring - no critical alerts" },
        { type: "success", message: "System accuracy at 99%" },
      ],
      patternAnalysis:       [
              {
                      "type": "warning",
                      "message": "Code word usage increased by 12% this month"
              },
              {
                      "type": "success",
                      "message": "Detection accuracy at 96.8% across all channels"
              },
              {
                      "type": "info",
                      "message": "Most detections occur in Zone 3 communications"
              }
      ],
      predictiveAnalysis:       [
              {
                      "type": "warning",
                      "message": "Pattern suggests coordinated activity in next 48 hours"
              },
              {
                      "type": "info",
                      "message": "Recommend increased monitoring of identified channels"
              },
              {
                      "type": "success",
                      "message": "Threat correlation algorithm showing improved accuracy"
              }
      ],
      videoFeeds: [
        { id: 1, label: "Monitoring Station 1", timestamp: "Live", image: "https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=400" },
        { id: 2, label: "Monitoring Station 2", timestamp: "Live", image: "https://images.unsplash.com/photo-1551522435-a13afa10f103?w=400" },
        { id: 3, label: "Analysis Console", timestamp: "Live", image: "https://images.unsplash.com/photo-1593642532400-2682810df593?w=400" },
        { id: 4, label: "Control Center", timestamp: "Live", image: "https://images.unsplash.com/photo-1583468961261-dbb0c4a229ec?w=400" },
      ],
    },
    // SOCIAL MEDIA USE CASES
    "social-osint-investigations": {
      primaryMetric: { label: "Profiles Analyzed", value: "124,580", trend: "+18.4%", graphData: [90000, 95000, 102000, 110000, 115000, 120000, 124580] },
      flowRate: { label: "Processing Rate", current: "5,191/hr", previous: "4,384/hr" },
      utilization: { value: 92, label: "Network Coverage" },
      riskLevel: { value: 48, label: "Priority Cases", status: "Medium" },
      topEntryPoints: [
        { name: "Platform: Twitter", percentage: "42%" },
        { name: "Platform: Facebook", percentage: "31%" },
        { name: "Platform: Instagram", percentage: "19%" },
      ],
      flowCapacity: { current: "5191/hr", max: "6000/hr", percentage: 87 },
      alerts: [
        { type: "warning", message: "Suspicious network activity detected" },
        { type: "info", message: "New associates identified in Case #4521" },
      ],
      patternAnalysis:       [
              {
                      "type": "info",
                      "message": "Social network analysis identifies 47 new connections"
              },
              {
                      "type": "success",
                      "message": "Suspect tracking accuracy improved to 91%"
              },
              {
                      "type": "warning",
                      "message": "Encrypted channel usage increased by 18%"
              }
      ],
      predictiveAnalysis:       [
              {
                      "type": "warning",
                      "message": "Suspect network expansion predicted in next 7 days"
              },
              {
                      "type": "info",
                      "message": "Key associate meeting likely within 72 hours"
              },
              {
                      "type": "success",
                      "message": "Intelligence correlation improving with new data"
              }
      ],
      videoFeeds: [
        { id: 1, label: "Investigation Dashboard", timestamp: "Live", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400" },
        { id: 2, label: "Network Analysis", timestamp: "Live", image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400" },
        { id: 3, label: "Data Monitoring", timestamp: "Live", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400" },
        { id: 4, label: "Command Center", timestamp: "Live", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400" },
      ],
    },
    "social-crisis-disaster": {
      primaryMetric: { label: "Events Detected", value: "1,847", trend: "+24.5%", graphData: [1200, 1300, 1450, 1600, 1700, 1770, 1847] },
      flowRate: { label: "Detection Rate", current: "77/hr", previous: "62/hr" },
      utilization: { value: 89, label: "Coverage Rate" },
      riskLevel: { value: 58, label: "Critical Events", status: "Medium" },
      topEntryPoints: [
        { name: "Natural Disasters", percentage: "38%" },
        { name: "Fire Incidents", percentage: "32%" },
        { name: "Traffic Accidents", percentage: "22%" },
      ],
      flowCapacity: { current: "77/hr", max: "100/hr", percentage: 77 },
      alerts: [
        { type: "warning", message: "Flash flood reports in multiple locations" },
        { type: "info", message: "Early detection rate improved by 24%" },
      ],
      patternAnalysis:       [
              {
                      "type": "success",
                      "message": "Crisis detection 15 minutes faster than official reports"
              },
              {
                      "type": "info",
                      "message": "Geolocation accuracy at 94% for emergency events"
              },
              {
                      "type": "warning",
                      "message": "False positive rate increases during viral events"
              }
      ],
      predictiveAnalysis:       [
              {
                      "type": "warning",
                      "message": "Weather patterns suggest flood risk in next 24 hours"
              },
              {
                      "type": "info",
                      "message": "Social media activity indicating gathering in Zone 4"
              },
              {
                      "type": "success",
                      "message": "Emergency response coordination protocols ready"
              }
      ],
      videoFeeds: [
        { id: 1, label: "Event Map - Region 1", timestamp: "Live", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400" },
        { id: 2, label: "Social Media Feed", timestamp: "Live", image: "https://images.unsplash.com/photo-1555421689-491a97ff2040?w=400" },
        { id: 3, label: "Alert Dashboard", timestamp: "Live", image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400" },
        { id: 4, label: "Command Center", timestamp: "Live", image: "https://images.unsplash.com/photo-1583468961261-dbb0c4a229ec?w=400" },
      ],
    },
    "social-public-sentiment": {
      primaryMetric: { label: "Posts Analyzed", value: "842K", trend: "+15.7%", graphData: [620, 680, 720, 760, 800, 820, 842] },
      flowRate: { label: "Analysis Rate", current: "35,083/hr", previous: "30,325/hr" },
      utilization: { value: 78, label: "Sentiment Positive" },
      riskLevel: { value: 22, label: "Negative Sentiment", status: "Low" },
      topEntryPoints: [
        { name: "Policy Discussions", percentage: "42%" },
        { name: "Public Services", percentage: "31%" },
        { name: "Infrastructure", percentage: "19%" },
      ],
      flowCapacity: { current: "35083/hr", max: "50000/hr", percentage: 70 },
      alerts: [
        { type: "success", message: "Overall sentiment trending positive" },
        { type: "info", message: "New policy discussion gaining traction" },
      ],
      patternAnalysis:       [
              {
                      "type": "info",
                      "message": "Overall sentiment score: 68% positive this week"
              },
              {
                      "type": "warning",
                      "message": "Negative sentiment spike regarding Policy X"
              },
              {
                      "type": "success",
                      "message": "Sentiment tracking accuracy improved to 89%"
              }
      ],
      predictiveAnalysis:       [
              {
                      "type": "info",
                      "message": "Sentiment expected to improve after policy clarification"
              },
              {
                      "type": "warning",
                      "message": "Potential negative trend if concerns not addressed"
              },
              {
                      "type": "success",
                      "message": "Public response to recent initiative trending positive"
              }
      ],
      videoFeeds: [
        { id: 1, label: "Sentiment Dashboard", timestamp: "Live", image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=400" },
        { id: 2, label: "Topic Analysis", timestamp: "Live", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400" },
        { id: 3, label: "Trend Monitor", timestamp: "Live", image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400" },
        { id: 4, label: "Analytics Overview", timestamp: "Live", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400" },
      ],
    },
    "social-civic-issues": {
      primaryMetric: { label: "Issues Identified", value: "4,247", trend: "+28.3%", graphData: [2800, 3100, 3400, 3700, 3900, 4050, 4247] },
      flowRate: { label: "Detection Rate", current: "177/hr", previous: "138/hr" },
      utilization: { value: 85, label: "Resolution Rate" },
      riskLevel: { value: 42, label: "Critical Issues", status: "Medium" },
      topEntryPoints: [
        { name: "Water Supply", percentage: "35%" },
        { name: "Road Maintenance", percentage: "28%" },
        { name: "Power Outages", percentage: "22%" },
      ],
      flowCapacity: { current: "177/hr", max: "250/hr", percentage: 71 },
      alerts: [
        { type: "warning", message: "Spike in water supply complaints" },
        { type: "info", message: "Average resolution time: 3.2 days" },
      ],
      patternAnalysis:       [
              {
                      "type": "warning",
                      "message": "Water logging complaints increased 45% this week"
              },
              {
                      "type": "info",
                      "message": "Zone 7 shows highest unreported issues (28 complaints)"
              },
              {
                      "type": "success",
                      "message": "Issue detection 3 days faster than formal reporting"
              }
      ],
      predictiveAnalysis:       [
              {
                      "type": "warning",
                      "message": "Monsoon season expected to increase civic complaints"
              },
              {
                      "type": "info",
                      "message": "Recommend proactive maintenance in identified zones"
              },
              {
                      "type": "success",
                      "message": "Response time improving with early detection"
              }
      ],
      videoFeeds: [
        { id: 1, label: "Issue Map - Zone 1", timestamp: "Live", image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400" },
        { id: 2, label: "Complaint Dashboard", timestamp: "Live", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400" },
        { id: 3, label: "Priority Tracker", timestamp: "Live", image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400" },
        { id: 4, label: "Operations Center", timestamp: "Live", image: "https://images.unsplash.com/photo-1524813686514-a57563d77965?w=400" },
      ],
    },
    "social-counter-misinformation": {
      primaryMetric: { label: "Posts Monitored", value: "542K", trend: "+19.4%", graphData: [380, 420, 450, 480, 510, 525, 542] },
      flowRate: { label: "Detection Rate", current: "22,583/hr", previous: "18,917/hr" },
      utilization: { value: 94, label: "Detection Accuracy" },
      riskLevel: { value: 35, label: "Misinformation Rate", status: "Medium" },
      topEntryPoints: [
        { name: "Health Rumors", percentage: "38%" },
        { name: "Political Misinformation", percentage: "32%" },
        { name: "Safety Alerts", percentage: "22%" },
      ],
      flowCapacity: { current: "22583/hr", max: "30000/hr", percentage: 75 },
      alerts: [
        { type: "warning", message: "Viral misinformation detected - response needed" },
        { type: "info", message: "Fact-check published for trending rumor" },
      ],
      patternAnalysis:       [
              {
                      "type": "warning",
                      "message": "Misinformation spread rate increased by 23%"
              },
              {
                      "type": "info",
                      "message": "Most viral false narratives originate from 5 key accounts"
              },
              {
                      "type": "success",
                      "message": "Rumor detection accuracy at 92.5%"
              }
      ],
      predictiveAnalysis:       [
              {
                      "type": "warning",
                      "message": "High likelihood of coordinated misinformation campaign"
              },
              {
                      "type": "info",
                      "message": "Recommend preemptive fact-checking resources"
              },
              {
                      "type": "success",
                      "message": "Counter-narrative strategy showing positive results"
              }
      ],
      videoFeeds: [
        { id: 1, label: "Rumor Tracker", timestamp: "Live", image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400" },
        { id: 2, label: "Spread Analysis", timestamp: "Live", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400" },
        { id: 3, label: "Fact-Check Dashboard", timestamp: "Live", image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400" },
        { id: 4, label: "Response Center", timestamp: "Live", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400" },
      ],
    },
    "social-brand-reputation": {
      primaryMetric: { label: "Brand Mentions", value: "124K", trend: "+12.8%", graphData: [95, 102, 108, 113, 118, 121, 124] },
      flowRate: { label: "Monitoring Rate", current: "5,167/hr", previous: "4,583/hr" },
      utilization: { value: 82, label: "Positive Sentiment" },
      riskLevel: { value: 18, label: "Negative Mentions", status: "Low" },
      topEntryPoints: [
        { name: "Product Reviews", percentage: "45%" },
        { name: "Customer Service", percentage: "28%" },
        { name: "Competitor Mentions", percentage: "19%" },
      ],
      flowCapacity: { current: "5167/hr", max: "7000/hr", percentage: 74 },
      alerts: [
        { type: "success", message: "Brand sentiment improved to 82%" },
        { type: "info", message: "Product launch generating positive buzz" },
      ],
      patternAnalysis:       [
              {
                      "type": "success",
                      "message": "Brand sentiment improved to 72% positive mentions"
              },
              {
                      "type": "info",
                      "message": "Customer service issues down 18% this month"
              },
              {
                      "type": "warning",
                      "message": "Competitor Brand Y gaining social media traction"
              }
      ],
      predictiveAnalysis:       [
              {
                      "type": "info",
                      "message": "Product launch expected to boost sentiment by 15%"
              },
              {
                      "type": "warning",
                      "message": "Monitor competitor activity during campaign period"
              },
              {
                      "type": "success",
                      "message": "Crisis management protocols effective and ready"
              }
      ],
      videoFeeds: [
        { id: 1, label: "Sentiment Analysis", timestamp: "Live", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400" },
        { id: 2, label: "Mention Timeline", timestamp: "Live", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400" },
        { id: 3, label: "Competitor Tracking", timestamp: "Live", image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400" },
        { id: 4, label: "Marketing Dashboard", timestamp: "Live", image: "https://images.unsplash.com/photo-1557838923-2985c318be48?w=400" },
      ],
    },
    "social-supply-disruptions": {
      primaryMetric: { label: "Supply Events", value: "1,847", trend: "+15.2%", graphData: [1400, 1500, 1600, 1700, 1750, 1800, 1847] },
      flowRate: { label: "Monitoring Rate", current: "77/hr", previous: "67/hr" },
      utilization: { value: 88, label: "Coverage Rate" },
      riskLevel: { value: 52, label: "Disruption Impact", status: "Medium" },
      topEntryPoints: [
        { name: "Port Delays", percentage: "38%" },
        { name: "Weather Events", percentage: "32%" },
        { name: "Labor Disputes", percentage: "22%" },
      ],
      flowCapacity: { current: "77/hr", max: "100/hr", percentage: 77 },
      alerts: [
        { type: "warning", message: "Major port strike affecting shipments" },
        { type: "info", message: "Alternative route recommendations available" },
      ],
      patternAnalysis:       [
              {
                      "type": "warning",
                      "message": "Port strike detected 48 hours before official announcement"
              },
              {
                      "type": "info",
                      "message": "Asia-Pacific routes show highest disruption risk"
              },
              {
                      "type": "success",
                      "message": "Early warning system accuracy at 87%"
              }
      ],
      predictiveAnalysis:       [
              {
                      "type": "warning",
                      "message": "Severe weather may disrupt shipping routes next week"
              },
              {
                      "type": "info",
                      "message": "Recommend rerouting shipments through alternate ports"
              },
              {
                      "type": "success",
                      "message": "Inventory buffers adequate for projected delays"
              }
      ],
      videoFeeds: [
        { id: 1, label: "Supply Chain Map", timestamp: "Live", image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=400" },
        { id: 2, label: "Disruption Monitor", timestamp: "Live", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400" },
        { id: 3, label: "Route Analysis", timestamp: "Live", image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400" },
        { id: 4, label: "Logistics Center", timestamp: "Live", image: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=400" },
      ],
    },
    // TEXT USE CASES
    "text-judicial-intelligence": {
      primaryMetric: { label: "Documents Indexed", value: "842K", trend: "+22.4%", graphData: [580, 640, 700, 750, 790, 815, 842] },
      flowRate: { label: "Query Rate", current: "35,083/hr", previous: "28,667/hr" },
      utilization: { value: 96, label: "Search Accuracy" },
      riskLevel: { value: 4, label: "Query Failure Rate", status: "Low" },
      topEntryPoints: [
        { name: "Legal Documents", percentage: "42%" },
        { name: "Case Files", percentage: "31%" },
        { name: "Research Papers", percentage: "19%" },
      ],
      flowCapacity: { current: "35083/hr", max: "50000/hr", percentage: 70 },
      alerts: [
        { type: "success", message: "Average query response time: 1.2 seconds" },
        { type: "info", message: "New legal database integrated" },
      ],
      patternAnalysis:       [
              {
                      "type": "success",
                      "message": "Document search accuracy improved to 96%"
              },
              {
                      "type": "info",
                      "message": "Most queries related to civil litigation precedents"
              },
              {
                      "type": "info",
                      "message": "Average query response time: 2.4 seconds"
              }
      ],
      predictiveAnalysis:       [
              {
                      "type": "info",
                      "message": "Expected query volume increase during court sessions"
              },
              {
                      "type": "success",
                      "message": "System capacity adequate for peak usage"
              },
              {
                      "type": "info",
                      "message": "Knowledge base update recommended in 2 weeks"
              }
      ],
      videoFeeds: [
        { id: 1, label: "Query Dashboard", timestamp: "Live", image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400" },
        { id: 2, label: "Document Index", timestamp: "Live", image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400" },
        { id: 3, label: "Search Analytics", timestamp: "Live", image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400" },
        { id: 4, label: "Knowledge Hub", timestamp: "Live", image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400" },
      ],
    },
    "text-citizen-grievance": {
      primaryMetric: { label: "Complaints Processed", value: "24,580", trend: "+18.7%", graphData: [18000, 19500, 21000, 22000, 23000, 23800, 24580] },
      flowRate: { label: "Processing Rate", current: "1,024/hr", previous: "863/hr" },
      utilization: { value: 91, label: "Auto-routing Success" },
      riskLevel: { value: 28, label: "Pending Cases", status: "Low" },
      topEntryPoints: [
        { name: "Water & Sanitation", percentage: "38%" },
        { name: "Roads & Transport", percentage: "32%" },
        { name: "Electricity", percentage: "22%" },
      ],
      flowCapacity: { current: "1024/hr", max: "1500/hr", percentage: 68 },
      alerts: [
        { type: "info", message: "Average resolution time reduced to 2.8 days" },
        { type: "success", message: "Auto-routing accuracy at 91%" },
      ],
      patternAnalysis:       [
              {
                      "type": "success",
                      "message": "Auto-categorization accuracy at 94.5%"
              },
              {
                      "type": "info",
                      "message": "Waste management complaints comprise 38% of total"
              },
              {
                      "type": "warning",
                      "message": "Response time for water issues exceeds target by 12%"
              }
      ],
      predictiveAnalysis:       [
              {
                      "type": "warning",
                      "message": "Expected surge in complaints during monsoon season"
              },
              {
                      "type": "info",
                      "message": "Recommend additional staff for waste management dept"
              },
              {
                      "type": "success",
                      "message": "Overall resolution rate trending upward"
              }
      ],
      videoFeeds: [
        { id: 1, label: "Complaint Dashboard", timestamp: "Live", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400" },
        { id: 2, label: "Department Routing", timestamp: "Live", image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400" },
        { id: 3, label: "Resolution Tracker", timestamp: "Live", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400" },
        { id: 4, label: "City Operations", timestamp: "Live", image: "https://images.unsplash.com/photo-1524813686514-a57563d77965?w=400" },
      ],
    },
    "text-document-extraction": {
      primaryMetric: { label: "Documents Processed", value: "145K", trend: "+24.8%", graphData: [95000, 105000, 115000, 125000, 135000, 140000, 145000] },
      flowRate: { label: "Processing Rate", current: "6,042/hr", previous: "4,842/hr" },
      utilization: { value: 98.5, label: "Extraction Accuracy" },
      riskLevel: { value: 1.5, label: "Error Rate", status: "Low" },
      topEntryPoints: [
        { name: "ID Verification", percentage: "42%" },
        { name: "Invoice Processing", percentage: "31%" },
        { name: "Contract Scanning", percentage: "19%" },
      ],
      flowCapacity: { current: "6042/hr", max: "8000/hr", percentage: 76 },
      alerts: [
        { type: "success", message: "Extraction accuracy improved to 98.5%" },
        { type: "info", message: "Processing time reduced by 35%" },
      ],
      patternAnalysis:       [
              {
                      "type": "success",
                      "message": "OCR accuracy improved to 98.7% for printed documents"
              },
              {
                      "type": "info",
                      "message": "Passport verification taking average 3.2 seconds"
              },
              {
                      "type": "warning",
                      "message": "Handwritten document accuracy at 87%, needs improvement"
              }
      ],
      predictiveAnalysis:       [
              {
                      "type": "info",
                      "message": "Expected 25% increase in document processing next quarter"
              },
              {
                      "type": "success",
                      "message": "System scaling to meet projected demand"
              },
              {
                      "type": "warning",
                      "message": "Training required for new document types"
              }
      ],
      videoFeeds: [
        { id: 1, label: "Document Scanner", timestamp: "Live", image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400" },
        { id: 2, label: "OCR Processing", timestamp: "Live", image: "https://images.unsplash.com/photo-1568234928966-359c35dd8327?w=400" },
        { id: 3, label: "Verification Queue", timestamp: "Live", image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400" },
        { id: 4, label: "Processing Center", timestamp: "Live", image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400" },
      ],
    },
    "text-contract-legal-analysis": {
      primaryMetric: { label: "Contracts Analyzed", value: "8,420", trend: "+32.5%", graphData: [5200, 5800, 6400, 7000, 7600, 8000, 8420] },
      flowRate: { label: "Analysis Rate", current: "351/hr", previous: "265/hr" },
      utilization: { value: 97, label: "Analysis Accuracy" },
      riskLevel: { value: 12, label: "High Risk Clauses", status: "Low" },
      topEntryPoints: [
        { name: "Vendor Contracts", percentage: "42%" },
        { name: "Employment Agreements", percentage: "31%" },
        { name: "Service Contracts", percentage: "19%" },
      ],
      flowCapacity: { current: "351/hr", max: "500/hr", percentage: 70 },
      alerts: [
        { type: "warning", message: "3 high-risk contracts flagged for review" },
        { type: "success", message: "Review time reduced by 65%" },
      ],
      patternAnalysis:       [
              {
                      "type": "success",
                      "message": "Clause extraction accuracy at 96.2%"
              },
              {
                      "type": "info",
                      "message": "Risk assessment reducing manual review time by 65%"
              },
              {
                      "type": "warning",
                      "message": "Complex multi-party contracts require manual verification"
              }
      ],
      predictiveAnalysis:       [
              {
                      "type": "info",
                      "message": "Expected document volume increase during fiscal year-end"
              },
              {
                      "type": "success",
                      "message": "AI model training improving edge case handling"
              },
              {
                      "type": "warning",
                      "message": "Recommend legal expert review for high-value contracts"
              }
      ],
      videoFeeds: [
        { id: 1, label: "Contract Queue", timestamp: "Live", image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400" },
        { id: 2, label: "Risk Assessment", timestamp: "Live", image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400" },
        { id: 3, label: "Clause Analysis", timestamp: "Live", image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400" },
        { id: 4, label: "Legal Dashboard", timestamp: "Live", image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400" },
      ],
    },
    "text-accounting-processing": {
      primaryMetric: { label: "Transactions Processed", value: "542K", trend: "+28.3%", graphData: [350, 390, 430, 470, 500, 520, 542] },
      flowRate: { label: "Processing Rate", current: "22,583/hr", previous: "17,600/hr" },
      utilization: { value: 99.2, label: "Accuracy Rate" },
      riskLevel: { value: 0.8, label: "Error Rate", status: "Low" },
      topEntryPoints: [
        { name: "Invoice Processing", percentage: "48%" },
        { name: "Receipt Scanning", percentage: "32%" },
        { name: "Expense Reports", percentage: "20%" },
      ],
      flowCapacity: { current: "22583/hr", max: "30000/hr", percentage: 75 },
      alerts: [
        { type: "success", message: "Error rate at all-time low of 0.8%" },
        { type: "info", message: "Month-end closing 40% faster" },
      ],
      patternAnalysis:       [
              {
                      "type": "success",
                      "message": "Invoice processing time reduced by 78%"
              },
              {
                      "type": "info",
                      "message": "Discrepancy detection rate at 99.1%"
              },
              {
                      "type": "warning",
                      "message": "Handwritten receipts show 12% higher error rate"
              }
      ],
      predictiveAnalysis:       [
              {
                      "type": "info",
                      "message": "Month-end processing expected to complete 2 days early"
              },
              {
                      "type": "success",
                      "message": "Automated reconciliation on track for quarterly targets"
              },
              {
                      "type": "warning",
                      "message": "Manual review queue may build up during tax season"
              }
      ],
      videoFeeds: [
        { id: 1, label: "Invoice Queue", timestamp: "Live", image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400" },
        { id: 2, label: "OCR Processing", timestamp: "Live", image: "https://images.unsplash.com/photo-1568234928966-359c35dd8327?w=400" },
        { id: 3, label: "Reconciliation Dashboard", timestamp: "Live", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400" },
        { id: 4, label: "Finance Operations", timestamp: "Live", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400" },
      ],
    },
    "text-compliance-risk": {
      primaryMetric: { label: "Communications Scanned", value: "1.2M", trend: "+15.8%", graphData: [850, 920, 980, 1050, 1100, 1150, 1200] },
      flowRate: { label: "Monitoring Rate", current: "50,000/hr", previous: "43,200/hr" },
      utilization: { value: 94, label: "Detection Accuracy" },
      riskLevel: { value: 8, label: "Risk Incidents", status: "Low" },
      topEntryPoints: [
        { name: "Email Communications", percentage: "52%" },
        { name: "Chat Messages", percentage: "28%" },
        { name: "Document Reviews", percentage: "20%" },
      ],
      flowCapacity: { current: "50000/hr", max: "75000/hr", percentage: 67 },
      alerts: [
        { type: "warning", message: "2 potential compliance issues flagged" },
        { type: "success", message: "Risk detection rate improved by 18%" },
      ],
      patternAnalysis:       [
              {
                      "type": "warning",
                      "message": "Suspicious keyword usage increased by 8% this month"
              },
              {
                      "type": "info",
                      "message": "Most alerts triggered in trading desk communications"
              },
              {
                      "type": "success",
                      "message": "False positive rate reduced to 3.5%"
              }
      ],
      predictiveAnalysis:       [
              {
                      "type": "warning",
                      "message": "Pattern suggests potential compliance breach investigation"
              },
              {
                      "type": "info",
                      "message": "Recommend enhanced monitoring of identified personnel"
              },
              {
                      "type": "success",
                      "message": "Overall compliance trending positively"
              }
      ],
      videoFeeds: [
        { id: 1, label: "Monitoring Dashboard", timestamp: "Live", image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400" },
        { id: 2, label: "Risk Analysis", timestamp: "Live", image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400" },
        { id: 3, label: "Alert Center", timestamp: "Live", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400" },
        { id: 4, label: "Compliance Operations", timestamp: "Live", image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400" },
      ],
    },
    "text-emergency-sms": {
      primaryMetric: { label: "SMS Analyzed", value: "12,450", trend: "+19.2%", graphData: [8500, 9200, 9900, 10500, 11200, 11800, 12450] },
      flowRate: { label: "Processing Rate", current: "519/hr", previous: "435/hr" },
      utilization: { value: 96, label: "Location Extraction" },
      riskLevel: { value: 62, label: "Critical Incidents", status: "High" },
      topEntryPoints: [
        { name: "Fire Emergency", percentage: "38%" },
        { name: "Medical Emergency", percentage: "32%" },
        { name: "Police Emergency", percentage: "22%" },
      ],
      flowCapacity: { current: "519/hr", max: "750/hr", percentage: 69 },
      alerts: [
        { type: "warning", message: "High volume of fire emergencies in Zone 3" },
        { type: "success", message: "Location accuracy improved to 96%" },
      ],
      patternAnalysis:       [
              {
                      "type": "success",
                      "message": "Location extraction accuracy at 96.8%"
              },
              {
                      "type": "info",
                      "message": "Average categorization time: 1.8 seconds"
              },
              {
                      "type": "warning",
                      "message": "Ambiguous location descriptions require manual review"
              }
      ],
      predictiveAnalysis:       [
              {
                      "type": "info",
                      "message": "Expected SMS volume increase during evening hours"
              },
              {
                      "type": "success",
                      "message": "Priority routing accuracy showing improvement"
              },
              {
                      "type": "warning",
                      "message": "System load testing recommended before holiday season"
              }
      ],
      videoFeeds: [
        { id: 1, label: "SMS Processing", timestamp: "Live", image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400" },
        { id: 2, label: "Location Map", timestamp: "Live", image: "https://images.unsplash.com/photo-1524813686514-a57563d77965?w=400" },
        { id: 3, label: "Priority Queue", timestamp: "Live", image: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=400" },
        { id: 4, label: "Dispatch Center", timestamp: "Live", image: "https://images.unsplash.com/photo-1593642532400-2682810df593?w=400" },
      ],
    },
    // SENSOR USE CASES
    "sensor-air-water-quality": {
      primaryMetric: { label: "Sensor Readings", value: "842K", trend: "+12.4%", graphData: [680, 720, 750, 780, 800, 820, 842] },
      flowRate: { label: "Monitoring Rate", current: "35,083/hr", previous: "31,222/hr" },
      utilization: { value: 92, label: "Sensor Uptime" },
      riskLevel: { value: 42, label: "Pollution Level", status: "Medium" },
      topEntryPoints: [
        { name: "Industrial Zone", percentage: "42%" },
        { name: "Residential Area", percentage: "31%" },
        { name: "Commercial District", percentage: "19%" },
      ],
      flowCapacity: { current: "35083/hr", max: "50000/hr", percentage: 70 },
      alerts: [
        { type: "warning", message: "AQI exceeding safe levels in Industrial Zone" },
        { type: "info", message: "Water quality stable across all sectors" },
      ],
      patternAnalysis:       [
              {
                      "type": "warning",
                      "message": "PM2.5 levels exceed safe limits in 3 industrial zones"
              },
              {
                      "type": "info",
                      "message": "Water quality scores improved by 12% this quarter"
              },
              {
                      "type": "success",
                      "message": "Sensor network uptime at 99.2%"
              }
      ],
      predictiveAnalysis:       [
              {
                      "type": "warning",
                      "message": "Air quality expected to worsen during next 48 hours"
              },
              {
                      "type": "info",
                      "message": "Recommend public health advisories for sensitive groups"
              },
              {
                      "type": "success",
                      "message": "Long-term trends show environmental improvement"
              }
      ],
      videoFeeds: [
        { id: 1, label: "Industrial Zone Sensor", timestamp: "Live", image: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=400" },
        { id: 2, label: "Residential Monitor", timestamp: "Live", image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400" },
        { id: 3, label: "Commercial District", timestamp: "Live", image: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=400" },
        { id: 4, label: "City Quality Map", timestamp: "Live", image: "https://images.unsplash.com/photo-1524813686514-a57563d77965?w=400" },
      ],
    },
    "sensor-waste-management": {
      primaryMetric: { label: "Smart Bins Monitored", value: "4,820", trend: "+8.5%", graphData: [4000, 4200, 4350, 4500, 4600, 4700, 4820] },
      flowRate: { label: "Collection Rate", current: "201 fills/hr", previous: "185 fills/hr" },
      utilization: { value: 68, label: "Average Fill Level" },
      riskLevel: { value: 22, label: "Overflow Risk", status: "Low" },
      topEntryPoints: [
        { name: "Downtown Route", percentage: "38%" },
        { name: "Residential Route", percentage: "32%" },
        { name: "Industrial Route", percentage: "22%" },
      ],
      flowCapacity: { current: "201/hr", max: "300/hr", percentage: 67 },
      alerts: [
        { type: "warning", message: "12 bins above 85% capacity - priority collection" },
        { type: "success", message: "Route efficiency improved by 24%" },
      ],
      patternAnalysis:       [
              {
                      "type": "success",
                      "message": "Route optimization reduced fuel costs by 18%"
              },
              {
                      "type": "info",
                      "message": "Zone 4 bins filling 25% faster than average"
              },
              {
                      "type": "warning",
                      "message": "12 sensors require battery replacement this week"
              }
      ],
      predictiveAnalysis:       [
              {
                      "type": "warning",
                      "message": "Holiday season expected to increase waste by 30%"
              },
              {
                      "type": "info",
                      "message": "Recommend additional collection runs in high-volume zones"
              },
              {
                      "type": "success",
                      "message": "Smart routing saving 2.5 hours per day"
              }
      ],
      videoFeeds: [
        { id: 1, label: "Smart Waste Management 1", timestamp: "Live", image: "/images/usecases/Smart-Waste-Management/Smart-Waste-Managament-1.png" },
        { id: 2, label: "Smart Waste Management 2", timestamp: "Live", image: "/images/usecases/Smart-Waste-Management/Smart-Waste-Managament-2.png" },
        { id: 3, label: "Smart Waste Management 3", timestamp: "Live", image: "/images/usecases/Smart-Waste-Management/Smart-Waste-Managament-3.png" },
        { id: 4, label: "Route Map", timestamp: "Live", image: "https://images.unsplash.com/photo-1524813686514-a57563d77965?w=400" },
      ],
    },
    "sensor-utility-management": {
      primaryMetric: { label: "Smart Meters", value: "124K", trend: "+15.2%", graphData: [95, 102, 108, 113, 118, 121, 124] },
      flowRate: { label: "Monitoring Rate", current: "5,167/hr", previous: "4,488/hr" },
      utilization: { value: 88, label: "Network Efficiency" },
      riskLevel: { value: 12, label: "Leak Detection", status: "Low" },
      topEntryPoints: [
        { name: "Zone A Distribution", percentage: "38%" },
        { name: "Zone B Distribution", percentage: "32%" },
        { name: "Zone C Distribution", percentage: "22%" },
      ],
      flowCapacity: { current: "5167/hr", max: "7000/hr", percentage: 74 },
      alerts: [
        { type: "warning", message: "Water leak detected in Zone A" },
        { type: "success", message: "Power distribution optimized - 8% savings" },
      ],
      patternAnalysis:       [
              {
                      "type": "warning",
                      "message": "Water leak detected in Zone 7, estimated loss 500L/hr"
              },
              {
                      "type": "success",
                      "message": "Leak detection time improved to average 15 minutes"
              },
              {
                      "type": "info",
                      "message": "Power consumption patterns normal across all sectors"
              }
      ],
      predictiveAnalysis:       [
              {
                      "type": "warning",
                      "message": "Pipe section in Zone 3 showing stress indicators"
              },
              {
                      "type": "info",
                      "message": "Recommend preventive maintenance within 7 days"
              },
              {
                      "type": "success",
                      "message": "Overall utility efficiency up 8% this quarter"
              }
      ],
      videoFeeds: [
        { id: 1, label: "Zone A Monitoring", timestamp: "Live", image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400" },
        { id: 2, label: "Zone B Monitoring", timestamp: "Live", image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400" },
        { id: 3, label: "Distribution Network", timestamp: "Live", image: "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=400" },
        { id: 4, label: "Control Center", timestamp: "Live", image: "https://images.unsplash.com/photo-1524813686514-a57563d77965?w=400" },
      ],
    },
    "sensor-building-energy": {
      primaryMetric: { label: "Energy Consumption", value: "2.4 MWh", trend: "-12.8%", graphData: [3.2, 3.0, 2.8, 2.7, 2.6, 2.5, 2.4] },
      flowRate: { label: "Monitoring Rate", current: "100 kW", previous: "115 kW" },
      utilization: { value: 72, label: "Building Occupancy" },
      riskLevel: { value: 28, label: "Waste Index", status: "Low" },
      topEntryPoints: [
        { name: "HVAC System", percentage: "52%" },
        { name: "Lighting", percentage: "28%" },
        { name: "Office Equipment", percentage: "20%" },
      ],
      flowCapacity: { current: "100 kW", max: "150 kW", percentage: 67 },
      alerts: [
        { type: "success", message: "Energy consumption reduced by 12.8%" },
        { type: "info", message: "HVAC optimization saved $8,400 this month" },
      ],
      patternAnalysis:       [
              {
                      "type": "success",
                      "message": "Energy consumption reduced by 15% with smart controls"
              },
              {
                      "type": "info",
                      "message": "Floors 8-12 show highest occupancy variability"
              },
              {
                      "type": "warning",
                      "message": "HVAC system in Zone B running 18% over optimal"
              }
      ],
      predictiveAnalysis:       [
              {
                      "type": "info",
                      "message": "Expected 22% energy savings this month vs baseline"
              },
              {
                      "type": "success",
                      "message": "Occupancy prediction accuracy improving weekly"
              },
              {
                      "type": "warning",
                      "message": "HVAC maintenance recommended for optimal efficiency"
              }
      ],
      videoFeeds: [
        { id: 1, label: "Building Floor 1-5", timestamp: "Live", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400" },
        { id: 2, label: "Building Floor 6-10", timestamp: "Live", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400" },
        { id: 3, label: "HVAC Control", timestamp: "Live", image: "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=400" },
        { id: 4, label: "Energy Dashboard", timestamp: "Live", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400" },
      ],
    },
    // ADDITIONAL VISUAL USE CASES
    "visual-vehicle-classification": {
      primaryMetric: { label: "Vehicles Classified", value: "542K", trend: "+18.2%", graphData: [380, 420, 460, 490, 510, 525, 542] },
      flowRate: { label: "Classification Rate", current: "22,583/hr", previous: "19,100/hr" },
      utilization: { value: 97, label: "Classification Accuracy" },
      riskLevel: { value: 3, label: "Error Rate", status: "Low" },
      topEntryPoints: [
        { name: "Highway Junction 1", percentage: "42%" },
        { name: "City Entry Point", percentage: "31%" },
        { name: "Toll Plaza", percentage: "19%" },
      ],
      flowCapacity: { current: "22583/hr", max: "30000/hr", percentage: 75 },
      alerts: [
        { type: "success", message: "Classification accuracy at 97%" },
        { type: "info", message: "Heavy vehicle traffic increased by 12%" },
      ],
      patternAnalysis:       [
              {
                      "type": "success",
                      "message": "Vehicle classification accuracy at 97.8%"
              },
              {
                      "type": "info",
                      "message": "Heavy vehicles comprise 23% of total traffic flow"
              },
              {
                      "type": "warning",
                      "message": "Motorcycle detection accuracy drops in low light"
              }
      ],
      predictiveAnalysis:       [
              {
                      "type": "info",
                      "message": "Expected 18% increase in heavy vehicle traffic tomorrow"
              },
              {
                      "type": "warning",
                      "message": "Recommend lane restrictions during peak hours"
              },
              {
                      "type": "success",
                      "message": "Traffic pattern analysis improving route planning"
              }
      ],
      videoFeeds: [
        { id: 1, label: "Vehicle Classification All Types", timestamp: "Live", image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400", videoUrl: "/images/usecases/Vehicle Class Classification/Vehicle Class Classification_All types.mp4" },
        { id: 2, label: "Thermal Camera Classification", timestamp: "Live", image: "https://images.unsplash.com/photo-1519003300449-424ad0405076?w=400", videoUrl: "/images/usecases/Vehicle Class Classification/Vehicle Classification_Thermal Camera.mp4" },
        { id: 3, label: "Toll Plaza", timestamp: "Live", image: "https://images.unsplash.com/photo-1502790671504-542ad42d5189?w=400" },
        { id: 4, label: "Traffic Overview", timestamp: "Live", image: "https://images.unsplash.com/photo-1461956592993-0f4ed3c38be8?w=400" },
      ],
    },
    "visual-traffic-congestion": {
      primaryMetric: { label: "Traffic Flow", value: "124K veh/hr", trend: "+8.5%", graphData: [100, 105, 110, 115, 119, 122, 124] },
      flowRate: { label: "Flow Rate", current: "124,000/hr", previous: "114,400/hr" },
      utilization: { value: 78, label: "Road Capacity" },
      riskLevel: { value: 58, label: "Congestion Level", status: "Medium" },
      topEntryPoints: [
        { name: "MG Road Corridor", percentage: "38%" },
        { name: "ORR Junction", percentage: "32%" },
        { name: "City Center", percentage: "22%" },
      ],
      flowCapacity: { current: "124000/hr", max: "160000/hr", percentage: 78 },
      alerts: [
        { type: "warning", message: "Heavy congestion on MG Road" },
        { type: "info", message: "Signal timing optimized for peak hours" },
      ],
      patternAnalysis:       [
              {
                      "type": "warning",
                      "message": "MG Road shows consistent congestion during 8-10 AM"
              },
              {
                      "type": "info",
                      "message": "Signal optimization reduced avg wait time by 22%"
              },
              {
                      "type": "success",
                      "message": "Overall traffic flow improved 15% this month"
              }
      ],
      predictiveAnalysis:       [
              {
                      "type": "warning",
                      "message": "Heavy congestion expected on ORR in next 2 hours"
              },
              {
                      "type": "info",
                      "message": "Recommend activating alternate route advisories"
              },
              {
                      "type": "success",
                      "message": "AI-powered signal timing showing promising results"
              }
      ],
      videoFeeds: [
        { id: 1, label: "MG Road Corridor", timestamp: "Live", image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400" },
        { id: 2, label: "ORR Junction", timestamp: "Live", image: "https://images.unsplash.com/photo-1519003300449-424ad0405076?w=400" },
        { id: 3, label: "City Center", timestamp: "Live", image: "https://images.unsplash.com/photo-1502790671504-542ad42d5189?w=400" },
        { id: 4, label: "Traffic Map", timestamp: "Live", image: "https://images.unsplash.com/photo-1524813686514-a57563d77965?w=400" },
      ],
    },
    "visual-object-detection": {
      primaryMetric: { label: "Objects Tracked", value: "842K", trend: "+15.7%", graphData: [620, 680, 720, 760, 800, 820, 842] },
      flowRate: { label: "Detection Rate", current: "35,083/hr", previous: "30,325/hr" },
      utilization: { value: 96, label: "Detection Accuracy" },
      riskLevel: { value: 8, label: "False Positive Rate", status: "Low" },
      topEntryPoints: [
        { name: "Campus Zone A", percentage: "42%" },
        { name: "Campus Zone B", percentage: "31%" },
        { name: "Perimeter", percentage: "19%" },
      ],
      flowCapacity: { current: "35083/hr", max: "50000/hr", percentage: 70 },
      alerts: [
        { type: "success", message: "Detection system operating optimally" },
        { type: "info", message: "Package delivery detected at Gate 3" },
      ],
      patternAnalysis: [
        { type: "info", message: "Peak object movement during 9 AM - 11 AM" },
        { type: "success", message: "Consistent detection patterns across all zones" },
        { type: "info", message: "Vehicle-to-person ratio: 3:7 in Zone A" },
      ],
      predictiveAnalysis: [
        { type: "warning", message: "Expected 15% increase in foot traffic by 3 PM" },
        { type: "info", message: "System capacity adequate for next 6 hours" },
        { type: "success", message: "No maintenance required within 48 hours" },
      ],
      videoFeeds: [
        { id: 1, label: "Object Detection Bottle", timestamp: "Live", image: "/images/usecases/Object - detection/Object - Detection-1.jpeg", videoUrl: "/images/usecases/Object - detection/Object Detection_Bottle.mp4" },
        { id: 2, label: "Object Detection Phone", timestamp: "Live", image: "/images/usecases/Object - detection/Object - Detection-1.jpeg", videoUrl: "/images/usecases/Object - detection/Object Detection_Phone.mp4" },
        { id: 3, label: "Contraband Detection", timestamp: "Live", image: "/images/usecases/Object - detection/Object - Detection-1.jpeg", videoUrl: "/images/usecases/Object - detection/Contraband Detection_Odisha.mp4" },
        { id: 4, label: "Campus Overview", timestamp: "Live", image: "/images/usecases/Object - detection/Object - Detection-1.jpeg" },
      ],
    },
    "visual-contraband-prison": {
      primaryMetric: { label: "Security Scans", value: "12,450", trend: "+5.8%", graphData: [10500, 11000, 11500, 11800, 12100, 12300, 12450] },
      flowRate: { label: "Detection Rate", current: "519/hr", previous: "491/hr" },
      utilization: { value: 99, label: "Detection Accuracy" },
      riskLevel: { value: 15, label: "Threat Level", status: "Low" },
      topEntryPoints: [
        { name: "Visitor Entry", percentage: "42%" },
        { name: "Cell Block A", percentage: "31%" },
        { name: "Common Areas", percentage: "19%" },
      ],
      flowCapacity: { current: "519/hr", max: "750/hr", percentage: 69 },
      alerts: [
        { type: "success", message: "No contraband detected in past 24 hours" },
        { type: "info", message: "Enhanced screening at visitor entry" },
      ],
      patternAnalysis:       [
              {
                      "type": "warning",
                      "message": "Cell Block C shows 3x higher contraband detection rate"
              },
              {
                      "type": "success",
                      "message": "Detection system accuracy improved to 94.5%"
              },
              {
                      "type": "info",
                      "message": "Most contraband attempts during visitor hours"
              }
      ],
      predictiveAnalysis:       [
              {
                      "type": "warning",
                      "message": "Pattern suggests coordinated smuggling attempt tomorrow"
              },
              {
                      "type": "info",
                      "message": "Recommend enhanced screening of visitor entries"
              },
              {
                      "type": "success",
                      "message": "Overall security incidents down 28% this quarter"
              }
      ],
      videoFeeds: [
        { id: 1, label: "Visitor Entry", timestamp: "Live", image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400" },
        { id: 2, label: "Cell Block A", timestamp: "Live", image: "https://images.unsplash.com/photo-1568515387631-8b650bbcdb90?w=400" },
        { id: 3, label: "Common Area", timestamp: "Live", image: "https://images.unsplash.com/photo-1551817958-11e0f7bbea4c?w=400" },
        { id: 4, label: "Security Overview", timestamp: "Live", image: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=400" },
      ],
    },
    "visual-traffic-flow": {
      primaryMetric: { label: "Flow Monitoring", value: "842K veh", trend: "+12.4%", graphData: [680, 720, 750, 780, 800, 820, 842] },
      flowRate: { label: "Flow Rate", current: "35,083/hr", previous: "31,222/hr" },
      utilization: { value: 72, label: "Road Efficiency" },
      riskLevel: { value: 48, label: "Congestion Index", status: "Medium" },
      topEntryPoints: [
        { name: "Arterial Road 1", percentage: "38%" },
        { name: "Arterial Road 2", percentage: "32%" },
        { name: "Connector Highway", percentage: "22%" },
      ],
      flowCapacity: { current: "35083/hr", max: "50000/hr", percentage: 70 },
      alerts: [
        { type: "warning", message: "Slow traffic on Arterial Road 1" },
        { type: "info", message: "Average speed: 45 km/h" },
      ],
      patternAnalysis:       [
              {
                      "type": "info",
                      "message": "Peak flow rate: 124,000 vehicles/hour on MG Road"
              },
              {
                      "type": "success",
                      "message": "Flow monitoring accuracy at 98.2%"
              },
              {
                      "type": "warning",
                      "message": "Bottleneck detected at City Center junction"
              }
      ],
      predictiveAnalysis:       [
              {
                      "type": "warning",
                      "message": "Congestion likely to reach 85% capacity by 6 PM"
              },
              {
                      "type": "info",
                      "message": "Recommend rerouting suggestions to commuters"
              },
              {
                      "type": "success",
                      "message": "Historical data improving prediction accuracy"
              }
      ],
      videoFeeds: [
        { id: 1, label: "Flyover", timestamp: "Live", image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400", videoUrl: "/images/usecases/Traffic Flow Monitoring/Flyover.mp4" },
        { id: 2, label: "Mekri Circle", timestamp: "Live", image: "https://images.unsplash.com/photo-1519003300449-424ad0405076?w=400", videoUrl: "/images/usecases/Traffic Flow Monitoring/Mekri Circle.mp4" },
        { id: 3, label: "Palace Guttahalli", timestamp: "Live", image: "https://images.unsplash.com/photo-1502790671504-542ad42d5189?w=400", videoUrl: "/images/usecases/Traffic Flow Monitoring/Palace Guttahalli.mp4" },
        { id: 4, label: "Speed Monitoring", timestamp: "Live", image: "https://images.unsplash.com/photo-1524813686514-a57563d77965?w=400", videoUrl: "/images/usecases/Traffic Flow Monitoring/Speed Monitoring - 1.mp4" },
      ],
    },
    "visual-facial-recognition": {
      primaryMetric: { label: "Face Scans", value: "124K", trend: "+18.5%", graphData: [90, 98, 105, 112, 118, 121, 124] },
      flowRate: { label: "Recognition Rate", current: "5,167/hr", previous: "4,361/hr" },
      utilization: { value: 98, label: "Match Accuracy" },
      riskLevel: { value: 12, label: "Watch List Alerts", status: "Low" },
      topEntryPoints: [
        { name: "Terminal Entry", percentage: "48%" },
        { name: "Security Checkpoint", percentage: "32%" },
        { name: "Access Control Gate", percentage: "20%" },
      ],
      flowCapacity: { current: "5167/hr", max: "7500/hr", percentage: 69 },
      alerts: [
        { type: "success", message: "No watch list matches in past 24 hours" },
        { type: "info", message: "System accuracy at 98%" },
      ],
      patternAnalysis:       [
              {
                      "type": "success",
                      "message": "Facial recognition accuracy at 99.1% in good lighting"
              },
              {
                      "type": "info",
                      "message": "Average identification time: 0.8 seconds"
              },
              {
                      "type": "warning",
                      "message": "Mask-wearing reduces accuracy to 89%"
              }
      ],
      predictiveAnalysis:       [
              {
                      "type": "info",
                      "message": "Expected increase in border crossing traffic tomorrow"
              },
              {
                      "type": "success",
                      "message": "Watch list matching accuracy continuously improving"
              },
              {
                      "type": "warning",
                      "message": "System update recommended for enhanced mask detection"
              }
      ],
      videoFeeds: [
        { id: 1, label: "Suspects", timestamp: "Live", image: "/images/usecases/Facial Recognition/Supsect.png" },
        { id: 2, label: "Temple Staff", timestamp: "Live", image: "/images/usecases/Facial Recognition/Temple Staff.png" },
        { id: 3, label: "Watchlist", timestamp: "Live", image: "/images/usecases/Facial Recognition/Watchlist.png" },
        { id: 4, label: "Terminal Overview", timestamp: "Live", image: "https://images.unsplash.com/photo-1526913299589-f35a3ddeb7ae?w=400" },
      ],
    },
    "sensors-fleet-tracking": {
      primaryMetric: { label: "Active Vehicles", value: "2,847", trend: "+12.3%", graphData: [2100, 2250, 2400, 2550, 2650, 2750, 2847] },
      flowRate: { label: "Tracking Updates", current: "118,625/hr", previous: "105,830/hr" },
      utilization: { value: 97, label: "GPS Uptime" },
      riskLevel: { value: 18, label: "Route Deviation", status: "Low" },
      topEntryPoints: [
        { name: "City Buses", percentage: "42%" },
        { name: "Emergency Vehicles", percentage: "28%" },
        { name: "Logistics Fleet", percentage: "22%" },
      ],
      flowCapacity: { current: "2847 vehicles", max: "3500 vehicles", percentage: 81 },
      alerts: [
        { type: "warning", message: "Ambulance AMB-12 exceeding speed limit on MG Road" },
        { type: "info", message: "Bus route optimization saved 18% fuel this week" },
        { type: "success", message: "Fleet-wide GPS accuracy at 98.7%" },
      ],
      patternAnalysis: [
        { type: "success", message: "Emergency response time improved by 23% with GPS routing" },
        { type: "info", message: "Peak traffic congestion patterns identified on 12 routes" },
        { type: "warning", message: "3 vehicles require GPS hardware maintenance" },
      ],
      predictiveAnalysis: [
        { type: "info", message: "Traffic buildup expected on Highway 8 in next 45 minutes" },
        { type: "success", message: "Alternative routes available for 85% of fleet" },
        { type: "warning", message: "Battery replacement needed on 8 GPS trackers within 10 days" },
      ],
      videoFeeds: [
        { id: 1, label: "Fleet Control Center", timestamp: "Live", image: "https://images.unsplash.com/photo-1494412519320-aa613dfb7738?w=400" },
        { id: 2, label: "City Bus Network", timestamp: "Live", image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400" },
        { id: 3, label: "Emergency Dispatch", timestamp: "Live", image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400" },
        { id: 4, label: "Logistics Hub", timestamp: "Live", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400" },
      ],
    },
    "sensors-indoor-tracking": {
      primaryMetric: { label: "Tracked Assets", value: "12,845", trend: "+18.7%", graphData: [9500, 10200, 10800, 11400, 11900, 12400, 12845] },
      flowRate: { label: "Position Updates", current: "535,458/hr", previous: "451,200/hr" },
      utilization: { value: 94, label: "Sensor Coverage" },
      riskLevel: { value: 12, label: "Location Gaps", status: "Low" },
      topEntryPoints: [
        { name: "Hospital Floor 3", percentage: "38%" },
        { name: "Warehouse Zone A", percentage: "32%" },
        { name: "Manufacturing Plant", percentage: "22%" },
      ],
      flowCapacity: { current: "12845 assets", max: "15000 assets", percentage: 86 },
      alerts: [
        { type: "warning", message: "Critical medical equipment moved outside designated zone" },
        { type: "success", message: "Asset recovery time reduced by 67% with RTLS" },
        { type: "info", message: "Position accuracy maintained at 8cm average" },
      ],
      patternAnalysis: [
        { type: "success", message: "Equipment utilization improved by 42% with tracking insights" },
        { type: "info", message: "Heatmap analysis reveals optimal asset placement zones" },
        { type: "warning", message: "Zone 4 shows 15% higher asset dwell time than average" },
      ],
      predictiveAnalysis: [
        { type: "info", message: "Peak equipment demand expected in Zone 2 during 2-4 PM" },
        { type: "success", message: "Asset redistribution can improve efficiency by 28%" },
        { type: "warning", message: "12 BLE beacons require battery replacement this month" },
      ],
      videoFeeds: [
        { id: 1, label: "Indoor Asset Tracking 1", timestamp: "Live", image: "/images/usecases/Indoor Asset and People Tracking/Indoor Asset and People Tracking_1.jpeg" },
        { id: 2, label: "Indoor Asset Tracking 2", timestamp: "Live", image: "/images/usecases/Indoor Asset and People Tracking/Indoor Asset and People Tracking_2.jpeg" },
        { id: 3, label: "Manufacturing Zone", timestamp: "Live", image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400" },
        { id: 4, label: "Position Heatmap", timestamp: "Live", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400" },
      ],
    },
  };

  return metricsMap[usecaseId] || {
    liveAlert: { location: "System Monitor", cameraId: "SYS-001", timestamp: "Live", severity: "low" },
    primaryMetric: { label: "Total Events", value: "1,247", trend: "+12.3%", graphData: [45, 52, 48, 58, 62, 59, 65] },
    flowRate: { current: "125/hr", previous: "98/hr" },
    utilization: { value: 72, label: "System Utilization" },
    riskLevel: { value: 35, label: "Alert Level", status: "Low" },
    topEntryPoints: [
      { name: "Primary Zone", percentage: "45%" },
      { name: "Secondary Area", percentage: "32%" },
      { name: "Peripheral Region", percentage: "23%" },
    ],
    flowCapacity: { current: "85/min", max: "120/min", percentage: 71 },
    alerts: [
      { type: "info", message: "System operating normally" },
      { type: "success", message: "All sensors online" },
    ],
    videoFeeds: [
      { id: 1, label: "Camera Feed 1", timestamp: "Live", image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=400" },
      { id: 2, label: "Camera Feed 2", timestamp: "Live", image: "https://images.unsplash.com/photo-1551817958-11e0f7bbea4c?w=400" },
      { id: 3, label: "Camera Feed 3", timestamp: "Live", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400" },
      { id: 4, label: "Camera Feed 4", timestamp: "Live", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400" },
    ],
  };
};

export default function UseCaseDetailDashboard({
  usecase,
  isOpen,
  onClose,
  onSelectUseCase,
}: UseCaseDetailDashboardProps) {
  const [selectedStream, setSelectedStream] = useState<string | null>(null);
  const [selectedFeed, setSelectedFeed] = useState<number>(0);
  const [collapsedStreams, setCollapsedStreams] = useState<Set<string>>(new Set());
  const [allUseCases, setAllUseCases] = useState<UseCase[]>([]);

  // Load all use cases from API
  useEffect(() => {
    const fetchUseCases = async () => {
      try {
        const response = await fetch('/api/usecases');
        const result = await response.json();
        setAllUseCases(result.data || []);
      } catch (error) {
        console.error('Failed to load use cases:', error);
        // Fallback to imported data
        setAllUseCases(usecasesData.usecases as UseCase[]);
      }
    };

    if (isOpen) {
      fetchUseCases();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!usecase) return null;

  const metrics = getDummyMetrics(usecase.id);

  // Group use cases by signal stream
  const groupedUseCases = SIGNAL_STREAMS.map(stream => ({
    ...stream,
    cases: allUseCases.filter(uc => uc.input === stream.id),
  }));

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50"
          />

          {/* Dashboard */}
          <div className="fixed inset-0 z-50 overflow-hidden">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="h-full w-full bg-black"
            >
              {/* Header */}
              <div className="sticky top-0 z-10 bg-gradient-to-b from-black to-black/80 backdrop-blur-xl border-b border-white/10 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-white">{usecase.title}</h1>
                    <p className="text-sm text-slate-400 mt-1">Command Center / {usecase.input} Analytics</p>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                    aria-label="Close dashboard"
                  >
                    <X className="w-6 h-6 text-white" />
                  </button>
                </div>
              </div>

              {/* Main Layout: Left Sidebar + Right Content */}
              <div className="flex h-[calc(100vh-80px)]">
                {/* LEFT SIDEBAR - Signal Streams & Use Cases */}
                <div className="w-64 bg-gradient-to-b from-slate-900/50 to-black border-r border-white/10 overflow-y-auto">
                  <div className="p-4 space-y-1">
                    {groupedUseCases.map((stream) => {
                      const Icon = stream.icon;
                      const isCollapsed = collapsedStreams.has(stream.id);

                      return (
                        <div key={stream.id} className="space-y-1">
                          {/* Stream Header */}
                          <button
                            onClick={() => {
                              const newCollapsed = new Set(collapsedStreams);
                              if (isCollapsed) {
                                newCollapsed.delete(stream.id);
                              } else {
                                newCollapsed.add(stream.id);
                              }
                              setCollapsedStreams(newCollapsed);
                            }}
                            className="w-full px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors flex items-center gap-2 group"
                          >
                            <Icon className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                            <span className="text-xs font-semibold text-slate-400 group-hover:text-white transition-colors uppercase tracking-wide">
                              {stream.label}
                            </span>
                          </button>

                          {/* Use Cases List */}
                          <AnimatePresence>
                            {!isCollapsed && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="space-y-0.5 pl-2"
                              >
                                {stream.cases.map((uc) => (
                                  <button
                                    key={uc.id}
                                    onClick={() => onSelectUseCase(uc)}
                                    className={cn(
                                      "w-full px-3 py-2 rounded-lg text-left text-xs transition-all",
                                      uc.id === usecase.id
                                        ? `bg-gradient-to-r ${stream.color} text-white font-semibold shadow-lg`
                                        : "text-slate-400 hover:text-white hover:bg-white/5"
                                    )}
                                    style={{
                                      boxShadow: uc.id === usecase.id ? '0 0 20px rgba(59, 130, 246, 0.3)' : 'none'
                                    }}
                                  >
                                    {uc.title}
                                  </button>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* RIGHT CONTENT - Metrics Dashboard */}
                <div className="flex-1 overflow-y-auto bg-black p-6">
                  {/* Top Metrics Row */}
                  <div className="grid grid-cols-4 gap-6 mb-6">
                    {/* KPI 1 - Primary Metric */}
                    <div className="col-span-1 bg-gradient-to-br from-slate-900/80 to-slate-900/40 border border-white/10 rounded-xl p-4">
                      <div className="text-xs text-slate-400 mb-2">{metrics.primaryMetric.label}</div>
                      <div className="text-3xl font-bold text-white mb-3">{metrics.primaryMetric.value}</div>
                      {/* Mini Line Chart */}
                      <div className="h-12 flex items-end gap-1">
                        {metrics.primaryMetric.graphData.map((value: number, idx: number) => (
                          <div
                            key={idx}
                            className="flex-1 bg-gradient-to-t from-cyan-500 to-blue-500 rounded-t"
                            style={{ height: `${(value / Math.max(...metrics.primaryMetric.graphData)) * 100}%` }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Flow Rate / Detection Rate / Inspection Rate - Dynamic Label */}
                    <div className="col-span-1 bg-gradient-to-br from-slate-900/80 to-slate-900/40 border border-white/10 rounded-xl p-4">
                      <div className="text-xs text-slate-400 mb-2">{metrics.flowRate.label || "Flow Rate"}</div>
                      <div className="text-2xl font-bold text-white">{metrics.flowRate.current}</div>
                      <div className="text-sm text-slate-500 mt-1">{metrics.flowRate.previous}</div>
                      <div className="flex items-center gap-1 mt-2 text-xs text-emerald-400">
                        <TrendingUp className="w-3 h-3" />
                        <span>{metrics.primaryMetric.trend}</span>
                      </div>
                    </div>

                    {/* Goal Utilization */}
                    <div className="col-span-1 bg-gradient-to-br from-slate-900/80 to-slate-900/40 border border-white/10 rounded-xl p-4 flex flex-col items-center justify-center">
                      <div className="text-xs text-slate-400 mb-3">{metrics.utilization.label}</div>
                      <div className="relative w-20 h-20">
                        {/* Circular Progress */}
                        <svg className="transform -rotate-90 w-20 h-20">
                          <circle
                            cx="40"
                            cy="40"
                            r="32"
                            stroke="rgba(59, 130, 246, 0.2)"
                            strokeWidth="6"
                            fill="none"
                          />
                          <circle
                            cx="40"
                            cy="40"
                            r="32"
                            stroke="url(#blue-gradient)"
                            strokeWidth="6"
                            fill="none"
                            strokeDasharray={`${2 * Math.PI * 32}`}
                            strokeDashoffset={`${2 * Math.PI * 32 * (1 - metrics.utilization.value / 100)}`}
                            strokeLinecap="round"
                          />
                          <defs>
                            <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#3b82f6" />
                              <stop offset="100%" stopColor="#06b6d4" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-lg font-bold text-white">{metrics.utilization.value}%</span>
                        </div>
                      </div>
                    </div>

                    {/* Risk Level */}
                    <div className="col-span-1 bg-gradient-to-br from-slate-900/80 to-slate-900/40 border border-white/10 rounded-xl p-4">
                      <div className="text-xs text-slate-400 mb-4">{metrics.riskLevel.label}</div>
                      <div className="h-8 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-500"
                          style={{ width: `${metrics.riskLevel.value}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xs text-slate-500">Low</span>
                        <span className="text-xs font-semibold text-white">{metrics.riskLevel.status}</span>
                        <span className="text-xs text-slate-500">High</span>
                      </div>
                    </div>
                  </div>

                  {/* Live Alert Box */}
                  {metrics.liveAlert && (
                    <div className="mb-6 bg-gradient-to-br from-red-900/40 to-orange-900/20 border-2 border-red-500/50 rounded-xl p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                          </div>
                          <span className="text-sm font-bold text-red-400 uppercase tracking-wide">Live Alert</span>
                        </div>
                        <span className="text-xs text-slate-400">{metrics.liveAlert.timestamp}</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-red-400" />
                          <span className="text-sm text-white font-medium">{metrics.liveAlert.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Eye className="w-4 h-4 text-cyan-400" />
                          <span className="text-sm text-slate-300">Camera: {metrics.liveAlert.cameraId}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-orange-400" />
                          <span className={`text-sm font-semibold uppercase ${
                            metrics.liveAlert.severity === 'high' ? 'text-red-400' :
                            metrics.liveAlert.severity === 'medium' ? 'text-orange-400' :
                            'text-yellow-400'
                          }`}>
                            {metrics.liveAlert.severity} Priority
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Middle Section - Video Feeds & Metrics */}
                  <div className="grid grid-cols-3 gap-6 mb-6">
                    {/* Show Google Map with Traffic for Traffic Congestion, Video Feeds for others */}
                    <div className="col-span-2 space-y-3">
                      <div className="text-sm text-slate-400 mb-3">
                        {usecase.id === "visual-traffic-congestion" ? "Live Traffic Map - Bengaluru" : "Data Monitoring"}
                      </div>

                      {usecase.id === "visual-traffic-congestion" ? (
                        /* Google Map with Traffic Layer for Traffic Congestion - Centered on MG Road */
                        <div className="relative rounded-lg overflow-hidden border border-white/10 h-[600px]">
                          <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15552.547266101043!2d77.5846!3d12.9716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15db5f0c0329%3A0x884e5e1e7cb5b094!2sMG%20Road%2C%20Bengaluru!5e0!3m2!1sen!2sin!4v1730000000000!5m2!1sen!2sin&layer=t"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="rounded-lg"
                          />
                          <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                              <span className="text-sm text-white font-semibold">Live Traffic View</span>
                            </div>
                            <div className="text-xs text-slate-300 mt-1">MG Road & ORR • Bengaluru</div>
                          </div>
                          <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm px-3 py-2 rounded-lg border border-white/20">
                            <div className="flex items-center gap-3 text-xs">
                              <div className="flex items-center gap-1">
                                <div className="w-3 h-1 bg-green-500 rounded" />
                                <span className="text-slate-300">Light</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <div className="w-3 h-1 bg-orange-500 rounded" />
                                <span className="text-slate-300">Moderate</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <div className="w-3 h-1 bg-red-500 rounded" />
                                <span className="text-slate-300">Heavy</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        /* Default Video Feeds for other use cases */
                        <>
                          {/* Top Row - 4 Small Images */}
                          <div className="grid grid-cols-4 gap-3">
                            {metrics.videoFeeds.slice(0, 4).map((feed: any, idx: number) => (
                              <motion.div
                                key={feed.id}
                                onClick={() => setSelectedFeed(idx)}
                                whileHover={{ scale: 1.05 }}
                                className={`relative aspect-video rounded-lg overflow-hidden border ${
                                  selectedFeed === idx ? 'border-cyan-500 ring-2 ring-cyan-500/50' : 'border-white/10'
                                } group cursor-pointer transition-all`}
                              >
                                {feed.videoUrl ? (
                                  <video
                                    src={feed.videoUrl}
                                    className="w-full h-full object-cover"
                                    muted
                                    preload="auto"
                                    playsInline
                                    poster={feed.image}
                                    onLoadedData={(e) => {
                                      // Set the first frame as thumbnail by seeking to 1 second
                                      e.currentTarget.currentTime = 1;
                                    }}
                                    onCanPlay={(e) => {
                                      // Ensure we're showing the first frame
                                      e.currentTarget.currentTime = 1;
                                    }}
                                    onError={(e) => {
                                      console.error('Video failed to load:', feed.videoUrl);
                                      // Fallback to image if video fails to load
                                      e.currentTarget.style.display = 'none';
                                      const img = e.currentTarget.nextElementSibling as HTMLElement;
                                      if (img) img.style.display = 'block';
                                    }}
                                  />
                                ) : null}
                                <img
                                  src={feed.image}
                                  alt={feed.label}
                                  className="w-full h-full object-cover absolute inset-0"
                                  style={{ display: feed.videoUrl ? 'none' : 'block' }}
                                  onError={(e) => {
                                    // If image fails to load and it's a video, show video
                                    if (feed.videoUrl) {
                                      e.currentTarget.style.display = 'none';
                                      const video = e.currentTarget.previousElementSibling as HTMLElement;
                                      if (video) video.style.display = 'block';
                                    }
                                  }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                <div className="absolute bottom-1 left-1 right-1">
                                  <div className="text-xs font-semibold text-white truncate">{feed.label}</div>
                                  <div className="flex items-center gap-1">
                                    <div className="w-1 h-1 rounded-full bg-red-500 animate-pulse" />
                                    <span className="text-xs text-slate-300">{feed.timestamp}</span>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>

                          {/* Bottom Row - 1 Large Image/Video */}
                          <div className="relative aspect-video rounded-lg overflow-hidden border border-white/10">
                            {metrics.videoFeeds[selectedFeed]?.videoUrl ? (
                              <video
                                src={metrics.videoFeeds[selectedFeed].videoUrl}
                                className="w-full h-full object-cover"
                                controls
                                autoPlay
                                muted
                                loop
                                onError={(e) => {
                                  // Fallback to image if video fails to load
                                  e.currentTarget.style.display = 'none';
                                  const img = e.currentTarget.nextElementSibling;
                                  if (img) img.style.display = 'block';
                                }}
                              />
                            ) : null}
                            <img
                              src={metrics.videoFeeds[selectedFeed]?.image || metrics.videoFeeds[0].image}
                              alt={metrics.videoFeeds[selectedFeed]?.label || metrics.videoFeeds[0].label}
                              className="w-full h-full object-cover"
                              style={{ display: metrics.videoFeeds[selectedFeed]?.videoUrl ? 'none' : 'block' }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                            <div className="absolute bottom-4 left-4 right-4">
                              <div className="text-lg font-bold text-white mb-1">
                                {metrics.videoFeeds[selectedFeed]?.label || metrics.videoFeeds[0].label}
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                <span className="text-sm text-slate-300">
                                  {metrics.videoFeeds[selectedFeed]?.timestamp || metrics.videoFeeds[0].timestamp}
                                </span>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Right Side - Active Alerts */}
                    <div className="col-span-1 space-y-4">
                      {/* Active Alerts Section */}
                      <div className="bg-gradient-to-br from-slate-900/80 to-slate-900/40 border border-white/10 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-4">
                          <AlertTriangle className="w-5 h-5 text-blue-400" />
                          <h3 className="text-sm font-semibold text-white">Active Alerts</h3>
                        </div>
                        <div className="space-y-3">
                          {metrics.alerts.map((alert: any, idx: number) => (
                            <div
                              key={idx}
                              className={`p-3 rounded-lg border ${
                                alert.type === 'warning'
                                  ? 'bg-orange-500/10 border-orange-500/30'
                                  : alert.type === 'success'
                                  ? 'bg-emerald-500/10 border-emerald-500/30'
                                  : 'bg-blue-500/10 border-blue-500/30'
                              }`}
                            >
                              <div className="flex items-start gap-2">
                                {alert.type === 'warning' && <AlertTriangle className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />}
                                {alert.type === 'success' && <Shield className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />}
                                {alert.type === 'info' && <Activity className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />}
                                <p className="text-xs text-slate-200 leading-relaxed">{alert.message}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Pattern Analysis Section */}
                      {metrics.patternAnalysis && (
                        <div className="bg-gradient-to-br from-slate-900/80 to-slate-900/40 border border-white/10 rounded-xl p-4">
                          <div className="flex items-center gap-2 mb-4">
                            <BarChart3 className="w-5 h-5 text-purple-400" />
                            <h3 className="text-sm font-semibold text-white">Pattern Analysis</h3>
                          </div>
                          <div className="space-y-3">
                            {metrics.patternAnalysis.map((item: any, idx: number) => (
                              <div
                                key={idx}
                                className={`p-3 rounded-lg border ${
                                  item.type === 'warning'
                                    ? 'bg-orange-500/10 border-orange-500/30'
                                    : item.type === 'success'
                                    ? 'bg-emerald-500/10 border-emerald-500/30'
                                    : 'bg-purple-500/10 border-purple-500/30'
                                }`}
                              >
                                <div className="flex items-start gap-2">
                                  {item.type === 'warning' && <AlertTriangle className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />}
                                  {item.type === 'success' && <Shield className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />}
                                  {item.type === 'info' && <BarChart3 className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />}
                                  <p className="text-xs text-slate-200 leading-relaxed">{item.message}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Predictive Analysis Section */}
                      {metrics.predictiveAnalysis && (
                        <div className="bg-gradient-to-br from-slate-900/80 to-slate-900/40 border border-white/10 rounded-xl p-4">
                          <div className="flex items-center gap-2 mb-4">
                            <Clock className="w-5 h-5 text-cyan-400" />
                            <h3 className="text-sm font-semibold text-white">Predictive Analysis</h3>
                          </div>
                          <div className="space-y-3">
                            {metrics.predictiveAnalysis.map((item: any, idx: number) => (
                              <div
                                key={idx}
                                className={`p-3 rounded-lg border ${
                                  item.type === 'warning'
                                    ? 'bg-orange-500/10 border-orange-500/30'
                                    : item.type === 'success'
                                    ? 'bg-emerald-500/10 border-emerald-500/30'
                                    : 'bg-cyan-500/10 border-cyan-500/30'
                                }`}
                              >
                                <div className="flex items-start gap-2">
                                  {item.type === 'warning' && <AlertTriangle className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />}
                                  {item.type === 'success' && <Shield className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />}
                                  {item.type === 'info' && <Clock className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />}
                                  <p className="text-xs text-slate-200 leading-relaxed">{item.message}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
