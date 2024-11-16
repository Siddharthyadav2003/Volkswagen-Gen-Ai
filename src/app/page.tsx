'use client';

import { useState, useEffect } from 'react';
import CarLoader from '@/components/preloader/car-loader';
import AuthScreen from '@/components/auth/auth-screen';
import MapDisplay from '@/components/features/navigation/map-display';
import VehicleStatus from '@/components/features/monitoring/vehicle-status';
import Controls from '@/components/features/controls/controls';
import QuickControls from '@/components/features/controls/quick-controls';
import WeatherDisplay from '@/components/features/weather/weather-display';
import DriverMonitoring from '@/components/features/driver/driver-monitoring';
import MoodDetection from '@/components/features/driver/mood-detection';
import VoiceAssistant from '@/components/features/voice/voice-assistant';
import CollisionAvoidance from '@/components/features/monitoring/collision-avoidance';
import VehicleSecurity from '@/components/features/security/vehicle-security';
import SmartHomeIntegration from '@/components/features/smart-home/smart-home-integration';
import FamilyAlerts from '@/components/features/safety/family-alerts';
import BiometricAuth from '@/components/features/security/biometric-auth';
import GestureControl from '@/components/features/controls/gesture-control';
import { Card } from '@/components/ui/card';
import { MapPin, Navigation, Radio } from 'lucide-react';

export default function Home() {
 const [loading, setLoading] = useState(true);
 const [authenticated, setAuthenticated] = useState(false);

 useEffect(() => {
   setTimeout(() => {
     setLoading(false);
   }, 2000);
 }, []);

 if (loading) return <CarLoader />;
 if (!authenticated) return <AuthScreen onAuthenticate={() => setAuthenticated(true)} />;

 return (
   <main className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
     <div className="container-custom">
       <div className="grid-layout">
         {/* Left Column */}
         <div className="sidebar">
           <div className="component-grid">
             <QuickControls />
             <Controls />
             <VehicleSecurity />
             <VehicleStatus 
               batteryLevel={82}
               temperature={24}
               speed={65}
               range={285}
               alerts={[
                 "Tire pressure low - Front right",
                 "Service due in 500km"
               ]}
             />
           </div>
         </div>

         {/* Middle Column */}
         <div className="main-content">
           <Card className="flex-1 p-4">
             {/* Navigation Header */}
             <div className="mb-4 flex-between">
               <h1 className="text-2xl font-bold">Vehicle Navigation</h1>
               <div className="flex items-center gap-2">
                 <span className="text-sm text-gray-500">Live GPS</span>
                 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
               </div>
             </div>

             {/* Map Container */}
             <div className="relative h-[300px] rounded-lg overflow-hidden">
               <MapDisplay />
             </div>

             {/* Collision Avoidance */}
             <div className="mt-4">
               <Card className="p-4 bg-gray-800/50">
                 <CollisionAvoidance distances={{ front: 11.7, left: 0.3, right: 3.2 }} />
               </Card>
             </div>

             {/* Split into two columns */}
             <div className="grid grid-cols-2 gap-4 mt-4">
               {/* Left Column Features */}
               <div className="space-y-4">
                 <FamilyAlerts />
                 <DriverMonitoring />
                 <MoodDetection />
                 <Card className="p-4">
                   <h2 className="mb-4 text-lg font-semibold">Media Controls</h2>
                   <div className="p-3 rounded-lg bg-purple-900/20">
                     <div className="flex items-center gap-3">
                       <Radio className="text-purple-500" />
                       <div>
                         <p className="font-medium">Now Playing</p>
                         <p className="text-sm text-gray-400">Favorite Playlist</p>
                       </div>
                     </div>
                   </div>
                 </Card>
               </div>

               {/* Right Column Features */}
               <div className="space-y-4">
                 <WeatherDisplay />
                 <SmartHomeIntegration />
               </div>
             </div>
           </Card>
         </div>

         {/* Right Column */}
         <div className="sidebar">
           <div className="component-grid">
             <BiometricAuth />
             <VoiceAssistant />
             <GestureControl />
             {/* Trip Information */}
             <Card className="p-4 bg-gray-800/50">
               <h3 className="mb-4 text-lg font-semibold">Trip Information</h3>
               <div className="grid grid-cols-3 gap-4">
                 <div className="p-3 text-center rounded-lg bg-gray-900/50">
                   <p className="text-sm text-gray-400">ETA</p>
                   <p className="font-semibold">25 mins</p>
                 </div>
                 <div className="p-3 text-center rounded-lg bg-gray-900/50">
                   <p className="text-sm text-gray-400">Distance</p>
                   <p className="font-semibold">15.5 km</p>
                 </div>
                 <div className="p-3 text-center rounded-lg bg-gray-900/50">
                   <p className="text-sm text-gray-400">Traffic</p>
                   <p className="font-semibold text-green-500">Light</p>
                 </div>
               </div>
             </Card>
             {/* Route Options */}
             <Card className="p-4 bg-gray-800/50">
               <h2 className="mb-4 text-lg font-semibold">Route Options</h2>
               <div className="space-y-3">
                 <div className="p-3 rounded-lg bg-blue-900/20">
                   <div className="flex items-center gap-3">
                     <Navigation className="text-blue-500" />
                     <div>
                       <p className="font-medium">Fastest Route</p>
                       <p className="text-sm text-gray-400">25 mins</p>
                     </div>
                   </div>
                 </div>
                 <div className="p-3 rounded-lg bg-gray-900/50">
                   <div className="flex items-center gap-3">
                     <MapPin className="text-gray-400" />
                     <div>
                       <p className="font-medium">Alternate Route</p>
                       <p className="text-sm text-gray-400">32 mins</p>
                     </div>
                   </div>
                 </div>
               </div>
             </Card>
           </div>
         </div>
       </div>
     </div>
   </main>
 );
}