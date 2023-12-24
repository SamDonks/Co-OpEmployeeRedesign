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
  const { searchParams } = new URL(request.url);
  const year = searchParams.get('year');
  const month = searchParams.get('month');

  if (!year || !month) {
    return new Response(JSON.stringify({ error: "Year and month are required" }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const currentYear = new Date().getFullYear().toString();
  const currentMonth = (new Date().getMonth() + 1).toString();

  // Check if the requested year and month are valid
  if (+year < +currentYear || (+year === +currentYear && +month < +currentMonth)) {
    return new Response(JSON.stringify({ error: "Invalid request for past months" }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Check if the requested date is not too far in the future
  const maxFutureMonths = 1; // Adjust this value based on your requirements
  const requestedDate = new Date(`${year}-${month}-01`);
  const currentDate = new Date();
  currentDate.setMonth(currentDate.getMonth() + maxFutureMonths);

  if (requestedDate > currentDate) {
    return new Response(JSON.stringify({ error: "Invalid request for future months" }), {
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

  // Get shifts for the specified month and the next month
  let nextMonth = parseInt(month) + 1;
  let nextYear = year;

  if (nextMonth > 12) {
    nextMonth = 1;
    nextYear = (parseInt(year) + 1).toString();
  }
  const shiftsForMonth = shiftsData[year][month];
  const shiftsForNextMonth = shiftsData[year][nextMonth.toString()];

  if (!shiftsForMonth || !shiftsForNextMonth) {
    return new Response(JSON.stringify({ error: 'Shifts data not found for the specified month or the next month.' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const response = {
    shifts: {
      [year]: {
        [month]: shiftsForMonth,
      },
    },
  };

  if (shiftsForNextMonth) {
    if (!response.shifts[nextYear]) {
      response.shifts[nextYear] = {};
    }
    response.shifts[nextYear][nextMonth] = shiftsForNextMonth;
  }

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}