"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CalendarClock, Clock, Scissors, Star, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
<div className="flex flex-col items-center justify-center min-h-screen">
<h1>não tem tela de apresentação nesse carai, clica ai corno</h1>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button size="lg" className="bg-stone-600 hover:bg-stone-700">
                Entrar como Cliente
              </Button>
            </Link>
          </div>
          </div>
  );
}