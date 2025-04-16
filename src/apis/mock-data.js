export const dataset = [
  { date: new Date(1990, 0, 1), OK: 28129, not_OK: 25391 },
  { date: new Date(1991, 0, 1), OK: 28294.264, not_OK: 26769.96 },
  { date: new Date(1992, 0, 1), OK: 28619.805, not_OK: 27385.055 },
  { date: new Date(1993, 0, 1), OK: 28336.16, not_OK: 27250.701 },
  { date: new Date(1994, 0, 1), OK: 28907.977, not_OK: 28140.057 },
  { date: new Date(1995, 0, 1), OK: 29418.863, not_OK: 28868.945 },
  { date: new Date(1996, 0, 1), OK: 29736.645, not_OK: 29349.982 },
  { date: new Date(1997, 0, 1), OK: 30341.807, not_OK: 30186.945 },
  { date: new Date(1998, 0, 1), OK: 31323.078, not_OK: 31129.584 },
  { date: new Date(1999, 0, 1), OK: 32284.611, not_OK: 32087.604 },
  { date: new Date(2000, 0, 1), OK: 33409.68, not_OK: 33367.285 },
  { date: new Date(2001, 0, 1), OK: 33920.098, not_OK: 34260.29 },
  { date: new Date(2002, 0, 1), OK: 34152.773, not_OK: 34590.93 },
  { date: new Date(2003, 0, 1), OK: 34292.03, not_OK: 34716.44 },
  { date: new Date(2004, 0, 1), OK: 35093.824, not_OK: 35528.715 },
  { date: new Date(2005, 0, 1), OK: 35495.465, not_OK: 36205.574 },
  { date: new Date(2006, 0, 1), OK: 36166.16, not_OK: 38014.137 },
  { date: new Date(2007, 0, 1), OK: 36845.684, not_OK: 39752.207 },
  { date: new Date(2008, 0, 1), OK: 36761.793, not_OK: 40715.434 },
  { date: new Date(2009, 0, 1), OK: 35534.926, not_OK: 38962.938 },
  { date: new Date(2010, 0, 1), OK: 36086.727, not_OK: 41109.582 },
  { date: new Date(2011, 0, 1), OK: 36691, not_OK: 43189 },
  { date: new Date(2012, 0, 1), OK: 36571, not_OK: 43320 },
  { date: new Date(2013, 0, 1), OK: 36632, not_OK: 43413 },
  { date: new Date(2014, 0, 1), OK: 36527, not_OK: 43922 },
  { date: new Date(2015, 0, 1), OK: 36827, not_OK: 44293 },
  { date: new Date(2016, 0, 1), OK: 37124, not_OK: 44689 },
  { date: new Date(2017, 0, 1), OK: 37895, not_OK: 45619.785 },
  { date: new Date(2018, 0, 1), OK: 38515.918, not_OK: 46177.617 },
];

export const unhealthyPlants = [
  {
    serialID: "BhK1VSycWMuZyEYRhe6N",
    name: "Test real time",
    temp: "Cold",
    light: "Bright",
    humidity: "Dry",
    moisture: "Dry",
  },
  {
    serialID: "YpfqvbkheLWX3xXgGGFG",
    name: "Smart Plant Pot",
    temp: "OK",
    light: "Bright",
    humidity: "Soggy",
    moisture: "Saturated",
  },
  {
    serialID: "aXU68c15p4qI7jJYyBb7",
    name: "Smart Plant Pot",
    temp: "Cold",
    light: "Dark",
    humidity: "Dry",
    moisture: "Dry",
  },
  {
    serialID: "BFTCHhSX3XlIWS7Stoha",
    name: "Demo Pot",
    temp: "OK",
    light: "OK",
    humidity: "Dry",
    moisture: "Dry",
  },
];

export const listPlans = {
  before: [
    {
      id: 1,
      name: "Plan Before 1",
      type: 'Rose',
      from: 'April 15th 2025, 9:15:35 pm',
      to: 'April 15th 2025, 9:15:35 pm',
      plants: [
        { serialID: "BhK1VSycWMuZyEYRhe6N", name: "Test real time" },
        { serialID: "YpfqvbkheLWX3xXgGGFG", name: "Smart Plant Pot" },
      ],
    },
    {
      id: 2,
      name: "Plan Before 2",
      type: 'Rose',
      from: 'April 15th 2025, 9:15:35 pm',
      to: 'April 15th 2025, 9:15:35 pm',
      plants: [
        { serialID: "aXU68c15p4qI7jJYyBb7", name: "Smart Plant Pot" },
        { serialID: "BFTCHhSX3XlIWS7Stoha", name: "Demo Pot" },
      ],
    },
    {
      id: 3,
      name: "Plan Before 3",
      type: 'Rose',
      from: 'April 15th 2025, 9:15:35 pm',
      to: 'April 15th 2025, 9:15:35 pm',
      plants: [
        { serialID: "BhK1VSycWMuZyEYRhe6N", name: "Test real time" },
        { serialID: "YpfqvbkheLWX3xXgGGFG", name: "Smart Plant Pot" },
      ],
    },
  ],
  after: [
    {
      id: 1,
      name: "Plan After 1",
      type: 'Rose',
      from: 'April 15th 2025, 9:15:35 pm',
      to: 'April 15th 2025, 9:15:35 pm',
      plants: [
        { serialID: "BhK1VSycWMuZyEYRhe6N", name: "Test real time" },
        { serialID: "YpfqvbkheLWX3xXgGGFG", name: "Smart Plant Pot" },
      ],
    },
    {
      id: 2,
      name: "Plan After 2",
      type: 'Rose',
      from: 'April 15th 2025, 9:15:35 pm',
      to: 'April 15th 2025, 9:15:35 pm',
      plants: [
        { serialID: "aXU68c15p4qI7jJYyBb7", name: "Smart Plant Pot" },
        { serialID: "BFTCHhSX3XlIWS7Stoha", name: "Demo Pot" },
      ],
    },
    {
      id: 3,
      name: "Plan After 3",
      type: 'Rose',
      from: 'April 15th 2025, 9:15:35 pm',
      to: 'April 15th 2025, 9:15:35 pm',
      plants: [
        { serialID: "BhK1VSycWMuZyEYRhe6N", name: "Test real time" },
        { serialID: "YpfqvbkheLWX3xXgGGFG", name: "Smart Plant Pot" },
      ],
    },
  ]
}
