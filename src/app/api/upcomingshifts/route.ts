

import { NextResponse } from 'next/server';

// Sample shifts data
const shiftsData = {
    '2023': {
      '1': [
        { date: 1, start: '8:00 AM', end: '4:00 PM' },
        { date: 5, start: '9:00 AM', end: '5:00 PM' },
        // ... other shifts for January
      ],
      '2': [
        { date: 3, start: '1:00 PM', end: '9:00 PM' },
        { date: 15, start: '10:00 AM', end: '6:00 PM' },
        // ... other shifts for February
      ],
      '12': [
        { date: 7, start: '7:00 AM', end: '3:00 PM' },
        { date: 22, start: '12:00 PM', end: '8:00 PM' },
        // ... other shifts for March
      ]
    },
    '2024': {
      '1': [
        { date: 1, start: '8:00 AM', end: '4:00 PM' },
        { date: 5, start: '9:00 AM', end: '5:00 PM' },
        // ... other shifts for January
      ],
      '2': [
        { date: 3, start: '1:00 PM', end: '9:00 PM' },
        { date: 15, start: '10:00 AM', end: '6:00 PM' },
        // ... other shifts for February
      ],
      '5': [
        { date: 7, start: '7:00 AM', end: '3:00 PM' },
        { date: 22, start: '12:00 PM', end: '8:00 PM' },
        // ... other shifts for March
      ]
    }
  };

export async function GET(request: Request) {
  // Extract year and month from the request parameters
  const { searchParams } = new URL(request.url);
  const year = searchParams.get('year');
  const month = searchParams.get('month');

  // Validate year and month
  if (!year || !month) {
    return new Response(JSON.stringify({ error: "Year and month are required" }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Check if shifts data exists for the specified year
  if (!shiftsData[year]) {
    return new Response(JSON.stringify({ error: 'Shifts data not found for the specified year.' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Get shifts for the specified month
  const shiftsForMonth = shiftsData[year][month];

  // Validate shifts for the specified month
  if (!shiftsForMonth) {
    return new Response(JSON.stringify({ error: 'Shifts data not found for the specified month.' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Get the current date
  const currentDate = new Date();

  // Filter shifts for the next three shifts
  const nextThreeShifts = shiftsForMonth
    .filter(shift => new Date(`${year}-${month}-${shift.date}`) >= currentDate)
    .slice(0, 3);

  // Construct the response object
  const response = {
    shifts: {
      [year]: {
        [month]: nextThreeShifts,
      },
    },
  };

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
