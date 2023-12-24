'use client';

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PopoverTrigger, PopoverContent, Popover } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CardContent, Card } from "@/components/ui/card";
import { useState, useEffect, useRef } from "react";

export default function Component() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [shifts, setShifts] = useState([]);
    const isMounted = useRef(true);
      
      
    const fetchData = async (date) => {
        try {
          const year = date.getFullYear().toString();
          const month = (date.getMonth() + 1).toString();
      
          // Fetch data from API
          const response = await fetch(`/api/getshift?year=${year}&month=${month}`);
          const data = await response.json();
      
          // Set shifts in the state only if the component is still mounted
          if (isMounted.current) {
            setShifts(data.shifts[year][month] || []);
          }
        } catch (error) {
          console.error('Error fetching shifts:', error);
          // Handle errors as needed
        }
      };
      


      
      
    const daysInMonth = getDaysInMonth(selectedDate.getFullYear(), selectedDate.getMonth());

    const dayNumbers = Array.from({ length: daysInMonth }, (_, index) => index + 1);



    function getDaysInMonth(year, month) {
        return new Date(year, month + 1, 0).getDate();
    }

    const handlePrevMonth = () => {
        const prevMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1);
        setSelectedDate(prevMonth);
      };
      
      const handleNextMonth = () => {
        const nextMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1);
        setSelectedDate(nextMonth);
      };
      useEffect(() => {
        fetchData(selectedDate);
      }, [selectedDate]);
      
      

      const formattedMonth = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(selectedDate);
        const currentMonth = new Date().getMonth();
        const nextMonth = (currentMonth + 1) % 12; // Get the next month, considering it might go from 11 to 0
        const monthAfterNext = (currentMonth + 2) % 12; // Get the second month after the current month
        const isCurrentMonth = currentMonth === selectedDate.getMonth();
        const disablePrevMonth = isCurrentMonth;

        // Check if the next month is in the same year, or if it's next year and the monthAfterNext is not reached
        const disableNextMonth =
        selectedDate.getFullYear() > new Date().getFullYear() ||
        (selectedDate.getFullYear() === new Date().getFullYear() && nextMonth === monthAfterNext);





  return (
    <div className="flex flex-col w-full">
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
          <Link className="text-gray-500 dark:text-gray-400" href="/dashboard">
            Dashboard
          </Link>
          <Link className="text-gray-500 dark:text-gray-400" href="#">
            Holidays
          </Link>
          <Link className="font-bold" href="/shifts">
            Shifts
          </Link>
        </nav>
      </header>
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-6 md:gap-8 md:p-8">
        <div className="flex justify-between">
        <button disabled={disablePrevMonth} onClick={handlePrevMonth} className="inline-flex items-center rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-[240px] justify-start text-left font-normal">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                strokeLinejoin="round"
                className="mr-1 h-4 w-4 -translate-x-1"
                >
                <path d="m12 19-7-7 7-7"></path>
                <path d="M19 12H5"></path>
                </svg>
                Previous Month
            </button>
            <button disabled={disableNextMonth} onClick={handleNextMonth} className="inline-flex items-center rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-[240px] justify-start text-left font-normal">
                Next Month
                <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                strokeLinejoin="round"
                className="ml-1 h-4 w-4 -translate-x-1"
                >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
                </svg>
        </button>
        </div>
        <Card>
        <div className="col-span-7 flex justify-center mb-4">
      <div className="text-md font-semibold">
        {formattedMonth} {selectedDate.getFullYear()}
      </div>
    </div>
          <CardContent className="grid grid-cols-7 grid-rows-6 gap-6">
            {/* Weekday headers */}
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <div key={day} className="text-md font-semibold">
                {day}
              </div>
            ))}
            {/* Boxes for each day */}
            {dayNumbers.map((day) => {
                const shiftForDay = shifts.find((shift) => shift.date === day);

                console.log('Day:', day);
                console.log('Shift for Day:', shiftForDay);

                return (
                    <div key={day} className="border rounded p-4">
                    <div className="text-sm font-semibold">{day}</div>
                    {shiftForDay ? (
                        <div className="flex justify-between items-center">
                        <p className="text-xs">Start: {shiftForDay.start}</p>
                        <p className="text-xs">End: {shiftForDay.end}</p>
                        </div>
                    ) : null}
                    {/* Additional content for each day */}
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
                        className="w-4 h-4"
                    >
                        <circle cx="12" cy="12" r="4"></circle>
                        {/* Additional SVG paths */}
                    </svg>
                    </div>
                );
                })}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

interface ArrowLeftIconProps {
  className?: string;
}

function ArrowLeftIcon({ className, ...props }: ArrowLeftIconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}

interface ArrowRightIconProps {
  className?: string;
}

function ArrowRightIcon({ className, ...props }: ArrowRightIconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

interface CalendarDaysIconProps {
  className?: string;
}

function CalendarDaysIcon({ className, ...props }: CalendarDaysIconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </svg>
  );
}

interface SunIconProps {
  className?: string;
}

function SunIcon({ className, ...props }: SunIconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}
