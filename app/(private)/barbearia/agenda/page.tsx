"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { useEffect, useState } from "react";

// Mock data
const mockAppointments = [
  {
    id: 1,
    client: "Carlos Silva",
    service: "Corte de Cabelo",
    time: "09:00",
    duration: 30,
    barberId: 1,
  },
  {
    id: 2,
    client: "Roberto Alves",
    service: "Barba",
    time: "10:00",
    duration: 20,
    barberId: 1,
  },
  {
    id: 3,
    client: "João Oliveira",
    service: "Corte e Barba",
    time: "11:00",
    duration: 45,
    barberId: 2,
  },
  {
    id: 4,
    client: "André Costa",
    service: "Corte Premium",
    time: "14:00",
    duration: 40,
    barberId: 1,
  },
  {
    id: 5,
    client: "Paulo Santos",
    service: "Barba Modelada",
    time: "15:30",
    duration: 30,
    barberId: 2,
  }
];

const barbers = [
  { id: 1, name: "Marcos Oliveira" },
  { id: 2, name: "Felipe Santos" }
];

export default function AgendaPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activeView, setActiveView] = useState<"day" | "week">("day");
  
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(currentDate);
    date.setDate(currentDate.getDate() - currentDate.getDay() + i);
    return date;
  });
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', { 
      day: 'numeric', 
      month: 'long',
      year: 'numeric'
    }).format(date);
  };
  
  const formatDay = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', { 
      weekday: 'short',
      day: 'numeric'
    }).format(date);
  };
  
  const goToPrevious = () => {
    const newDate = new Date(currentDate);
    if (activeView === "day") {
      newDate.setDate(currentDate.getDate() - 1);
    } else {
      newDate.setDate(currentDate.getDate() - 7);
    }
    setCurrentDate(newDate);
  };
  
  const goToNext = () => {
    const newDate = new Date(currentDate);
    if (activeView === "day") {
      newDate.setDate(currentDate.getDate() + 1);
    } else {
      newDate.setDate(currentDate.getDate() + 7);
    }
    setCurrentDate(newDate);
  };
  
  const goToToday = () => {
    setCurrentDate(new Date());
  };
  
  const hourSlots = Array.from({ length: 10 }, (_, i) => {
    const hour = i + 9; // Start from 9 AM
    return `${hour.toString().padStart(2, '0')}:00`;
  });

  const getAppointments = (barberId: number, time: string) => {
    return mockAppointments.filter(
      app => app.barberId === barberId && app.time === time
    );
  };
  
  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Agenda</h1>
          <p className="text-gray-500 mt-1">
            {activeView === "day"
              ? formatDate(currentDate)
              : `${formatDate(weekDays[0])} - ${formatDate(weekDays[6])}`}
          </p>
        </div>
        <div className="flex items-center space-x-2 mt-4 md:mt-0">
          <div className="flex items-center space-x-2 bg-white border rounded-md p-1">
            <Button
              variant={activeView === "day" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveView("day")}
            >
              Dia
            </Button>
            <Button
              variant={activeView === "week" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveView("week")}
            >
              Semana
            </Button>
          </div>
          <Button size="icon" variant="outline" onClick={goToPrevious}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="outline" onClick={goToToday}>
            Hoje
          </Button>
          <Button size="icon" variant="outline" onClick={goToNext}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button size="sm" className="bg-stone-600 hover:bg-stone-700">
            <Plus className="h-4 w-4 mr-1" /> Novo
          </Button>
        </div>
      </div>

      {activeView === "day" ? (
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h2 className="font-medium text-gray-700">
              {new Intl.DateTimeFormat('pt-BR', { weekday: 'long' }).format(currentDate)}
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">

              <div className="grid grid-cols-[100px_repeat(auto-fill,minmax(350px,1fr))] border-b">
                <div className="p-3 font-medium text-gray-500">Horário</div>
                {barbers.map(barber => (
                  <div key={barber.id} className="p-3 font-medium text-gray-900 border-l">
                    {barber.name}
                  </div>
                ))}
              </div>
              
              {hourSlots.map((time, index) => (
                <div 
                  key={time} 
                  className={`grid grid-cols-[100px_repeat(auto-fill,minmax(350px,1fr))] ${
                    index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                  }`}
                >
                  <div className="p-3 text-gray-500 border-r border-gray-200">{time}</div>
                  
                  {barbers.map(barber => {
                    const appointments = getAppointments(barber.id, time);
                    return (
                      <div 
                        key={`${barber.id}-${time}`} 
                        className="p-2 border-t border-l min-h-[70px]"
                      >
                        {appointments.map(app => (
                          <Card key={app.id} className="mb-2 bg-stone-50 border-stone-200">
                            <CardContent className="p-3">
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="font-medium text-stone-800">{app.client}</p>
                                  <p className="text-sm text-gray-600">{app.service}</p>
                                </div>
                                <Badge variant="outline" className="text-stone-700 border-stone-300">
                                  {app.duration} min
                                </Badge>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                        
                        {appointments.length === 0 && (
                          <div className="h-full min-h-[50px] border border-dashed border-gray-200 rounded-md flex items-center justify-center text-gray-400 text-sm hover:bg-gray-50 cursor-pointer">
                            <Plus className="h-4 w-4 mr-1" />
                            Agendar
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <div className="min-w-[900px]">

            <div className="grid grid-cols-[80px_repeat(7,1fr)] border-b">
              <div className="p-3 font-medium text-gray-500"></div>
              {weekDays.map((day, index) => (
                <div 
                  key={index}
                  className={`p-3 text-center font-medium ${
                    day.toDateString() === new Date().toDateString() 
                      ? 'bg-stone-50 text-stone-600' 
                      : 'text-gray-900'
                  }`}
                >
                  {formatDay(day)}
                </div>
              ))}
            </div>

            {/* Week view body */}
            {barbers.map(barber => (
              <div key={barber.id}>
                <div className="grid grid-cols-[80px_repeat(7,1fr)] py-2 bg-gray-50">
                  <div className="p-2 font-medium text-gray-700">{barber.name}</div>
                  {weekDays.map((day, index) => (
                    <div 
                      key={index} 
                      className="px-1 py-2 text-center border-l border-gray-200"
                    >
                      <div className="text-sm text-gray-800">
                        {index === 0 || index === 3 ? (
                          <>
                            <Badge className="bg-stone-100 text-stone-800 hover:bg-stone-200 mb-1">
                              3 agendamentos
                            </Badge>
                            <div className="mt-2">
                              <Button variant="outline" size="sm" className="w-full">
                                <Plus className="h-3 w-3 mr-1" /> Agendar
                              </Button>
                            </div>
                          </>
                        ) : (
                          <Button variant="outline" size="sm" className="w-full">
                            <Plus className="h-3 w-3 mr-1" /> Agendar
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <Separator />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}