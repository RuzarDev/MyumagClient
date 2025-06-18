// Mock data for the dashboard
export const salesData = {
  "2024-04-01": {
    dailyStats: {
      revenue: 164090.00,
      profit: 89976.56,
      visitors: 84,
      averageCheck: 1953.45,
      revenueChange: "+8%",
      profitChange: "+6%",
      visitorsChange: "-1%",
      averageCheckChange: "+5%"
    },
    hourlyData: [
      500000, 300000, 100000, 50000, 30000, 20000, 50000,
      250000, 350000, 400000, 450000, 380000, 420000,
      400000, 450000, 500000, 550000, 520000, 500000,
      650000, 700000, 750000, 680000, 550000
    ],
    weekdayData: [
      { day: 'Пн', value: 1500000 },
      { day: 'Вт', value: 1800000 },
      { day: 'Ср', value: 1650000 },
      { day: 'Чт', value: 2000000 },
      { day: 'Пт', value: 2250000 },
      { day: 'Сб', value: 1800000 },
      { day: 'Вс', value: 1700000 }
    ]
  },
  "2024-05-01": {
    dailyStats: {
      revenue: 175090.00,
      profit: 95976.56,
      visitors: 92,
      averageCheck: 2053.45,
      revenueChange: "+10%",
      profitChange: "+8%",
      visitorsChange: "+5%",
      averageCheckChange: "+7%"
    },
    hourlyData: [
      550000, 350000, 150000, 70000, 40000, 30000, 60000,
      270000, 370000, 420000, 470000, 400000, 440000,
      420000, 470000, 520000, 570000, 540000, 520000,
      670000, 720000, 770000, 700000, 570000
    ],
    weekdayData: [
      { day: 'Пн', value: 1600000 },
      { day: 'Вт', value: 1900000 },
      { day: 'Ср', value: 1750000 },
      { day: 'Чт', value: 2100000 },
      { day: 'Пт', value: 2350000 },
      { day: 'Сб', value: 1900000 },
      { day: 'Вс', value: 1800000 }
    ]
  }
};

export const popularProducts = [
  { name: "Капучино (Капучино m)", orders: 341 },
  { name: "Ice-Латте (Сироп, Молоко)", orders: 257 },
  { name: "Латте (Сироп, Латте М)", orders: 252 },
  { name: "Самса", orders: 238 },
  { name: "Латте (Латте М)", orders: 220 },
  { name: "Большой макаронс", orders: 201 },
  { name: "Круассан с курицей", orders: 201 },
  { name: "Капучино (Капучино m, Сироп)", orders: 198 }
];