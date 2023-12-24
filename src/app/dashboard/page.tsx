'use client';

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/xrHhBao5DYK
 */
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton"
import { useState, useEffect } from "react";

export default function Component() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);
  
  return (
    <>
      <header className="flex items-center h-16 px-4 border-b md:px-6">
        <nav className="flex-col hidden gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link className="flex items-center gap-2 text-lg font-semibold md:text-base" href="#">
            <Image
                    src="/assets/coop.png"
                    width={150}
                    height={150}
                    alt="Coop"
              />
            <span className="sr-only">Company Name</span>
          </Link>
          <Link className="font-bold" href="#">
            Dashboard
          </Link>
          <Link className="text-gray-500 dark:text-gray-400" href="#">
            Holidays
          </Link>
          <Link className="text-gray-500 dark:text-gray-400" href="/shifts">
            Shifts
          </Link>
        </nav>
      </header>
      <main className="flex min-h-[calc(100vh-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Upcoming Shifts</CardTitle>
              <CalendarIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Shift Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Monday, 23rd December</TableCell>
                    <TableCell>9:00 AM - 5:00 PM</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Tuesday, 24th December</TableCell>
                    <TableCell>9:00 AM - 5:00 PM</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Wednesday, 25th December</TableCell>
                    <TableCell>OFF</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Request a Holiday</CardTitle>
              <HotelIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <Button variant="outline">
                Request Holiday
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
        <div className="mt-10">
          <Card>
            <CardHeader className="pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Holiday Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>1st January</TableCell>
                    <TableCell>1 day</TableCell>
                    <TableCell>
                      <Badge className="bg-yellow-500">Pending</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>15th - 20th January</TableCell>
                    <TableCell>5 days</TableCell>
                    <TableCell>
                      <Badge className="bg-green-500">Approved</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>5th - 7th February</TableCell>
                    <TableCell>2 days</TableCell>
                    <TableCell>
                      <Badge className="bg-red-500">Rejected</Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}

interface ArrowRightIconProps {
  className?: string;
}

function ArrowRightIcon({ className }: ArrowRightIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

interface CalendarIconProps {
  className?: string;
}

function CalendarIcon({ className }: CalendarIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
}


interface HotelIconProps {
  className?: string;
}

function HotelIcon({ className }: HotelIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z" />
      <path d="m9 16 .348-.24c1.465-1.013 3.84-1.013 5.304 0L15 16" />
      <path d="M8 7h.01" />
      <path d="M16 7h.01" />
      <path d="M12 7h.01" />
      <path d="M12 11h.01" />
      <path d="M16 11h.01" />
      <path d="M8 11h.01" />
      <path d="M10 22v-6.5m4 0V22" />
    </svg>
  );
}

