// Mock data for Proximity app

export const currentUser = {
  id: 'u0',
  name: 'Alex',
  avatar: 'A',
  year: '2nd Year',
  degree: 'Computer Science',
  interests: ['Coffee', 'Gaming', 'Music', 'Study Groups'],
  socialBattery: 'medium', // low | medium | high
  openToTalk: true,
};

export const contextFeed = [
  {
    id: 'c1',
    type: 'event',
    title: 'CS Study Session',
    location: 'Main Library – Room 3B',
    time: 'Now · 14 people here',
    distance: '5 min walk',
    vibe: 'quiet',
    tags: ['Study', 'CS', 'Group'],
    attendees: [
      { id: 'u1', name: 'Riya', avatar: 'R', degree: 'Computer Science', openToTalk: true },
      { id: 'u2', name: 'Tom', avatar: 'T', degree: 'Computer Science', openToTalk: false },
      { id: 'u3', name: 'Leila', avatar: 'L', degree: 'Computer Science', openToTalk: true },
    ],
    mutualCount: 3,
    description: 'Informal study group for CS students. Drop in anytime, no RSVP needed.',
    accessibility: 'Accessible entrance via north door',
    credibility: 'Organised by CS Society',
  },
  {
    id: 'c2',
    type: 'spot',
    title: 'UG Café',
    location: 'Student Union, Ground Floor',
    time: 'Open until 18:00 · Quiet right now',
    distance: '2 min walk',
    vibe: 'social',
    tags: ['Coffee', 'Casual', 'Drop-in'],
    attendees: [
      { id: 'u4', name: 'James', avatar: 'J', degree: 'Business', openToTalk: true },
      { id: 'u5', name: 'Priya', avatar: 'P', degree: 'Engineering', openToTalk: true },
    ],
    mutualCount: 1,
    description: 'Popular hangout spot. Grab a coffee and see who\'s around.',
    accessibility: 'Wheelchair accessible',
    credibility: 'Campus venue',
  },
  {
    id: 'c3',
    type: 'event',
    title: 'Board Game Night',
    location: 'Guild of Students – Room 101',
    time: 'Tonight 19:00 · 6 signed up',
    distance: '8 min walk',
    vibe: 'social',
    tags: ['Games', 'Social', 'Evening'],
    attendees: [
      { id: 'u6', name: 'Sara', avatar: 'S', degree: 'Psychology', openToTalk: true },
      { id: 'u7', name: 'Omar', avatar: 'O', degree: 'Law', openToTalk: true },
      { id: 'u8', name: 'Mei', avatar: 'M', degree: 'Art & Design', openToTalk: true },
    ],
    mutualCount: 2,
    description: 'Casual board game evening, all welcome. Beginners friendly.',
    accessibility: 'Lift available',
    credibility: 'Organised by Student Union',
  },
  {
    id: 'c4',
    type: 'event',
    title: 'Lunch Break Yoga',
    location: 'Sports Centre – Studio 2',
    time: 'Today 13:00 · 8 spots left',
    distance: '10 min walk',
    vibe: 'quiet',
    tags: ['Wellness', 'Exercise', 'Midday'],
    attendees: [
      { id: 'u9', name: 'Zara', avatar: 'Z', degree: 'Medicine', openToTalk: false },
    ],
    mutualCount: 0,
    description: 'Free drop-in yoga session, no experience required.',
    accessibility: 'Accessible',
    credibility: 'Sports Centre',
  },
];

export const connections = [
  {
    id: 'u1',
    name: 'Riya',
    avatar: 'R',
    degree: 'Computer Science',
    year: '2nd Year',
    sharedContext: 'Met at CS Study Session · 2 days ago',
    status: 'acquaintance',
    openToTalk: true,
    sharedInterests: ['Study Groups', 'Coffee'],
    lastSeen: 'Library, 30 min ago',
  },
  {
    id: 'u4',
    name: 'James',
    avatar: 'J',
    degree: 'Business',
    year: '3rd Year',
    sharedContext: 'Both at UG Café yesterday',
    status: 'acquaintance',
    openToTalk: true,
    sharedInterests: ['Coffee'],
    lastSeen: 'UG Café, today',
  },
  {
    id: 'u6',
    name: 'Sara',
    avatar: 'S',
    degree: 'Psychology',
    year: '2nd Year',
    sharedContext: 'Board Game Night last week',
    status: 'friend',
    openToTalk: true,
    sharedInterests: ['Gaming', 'Coffee'],
    lastSeen: 'Guild, yesterday',
  },
];

export const messages = [
  {
    id: 'm1',
    userId: 'u1',
    name: 'Riya',
    avatar: 'R',
    preview: 'Are you heading to the study session later?',
    time: '14:32',
    unread: true,
    context: 'CS Study Session',
  },
  {
    id: 'm2',
    userId: 'u6',
    name: 'Sara',
    avatar: 'S',
    preview: 'Was great meeting you at board games! 🎲',
    time: 'Yesterday',
    unread: false,
    context: 'Board Game Night',
  },
  {
    id: 'm3',
    userId: 'u4',
    name: 'James',
    avatar: 'J',
    preview: 'Same spot tomorrow for coffee?',
    time: 'Mon',
    unread: false,
    context: 'UG Café',
  },
];

export const softInviteTemplates = [
  { id: 't1', text: 'Heading there now if you want to join', tone: 'casual' },
  { id: 't2', text: 'Saved you a spot if you\'re coming!', tone: 'warm' },
  { id: 't3', text: 'Just found a good table, come by if you\'re free', tone: 'low-pressure' },
  { id: 't4', text: 'I\'ll be there around {time} if you want to meet', tone: 'flexible' },
];

export const batteryLevels = {
  low: {
    label: 'Low Battery',
    description: 'You\'ll see fewer suggestions and quieter spaces',
    color: '#E76F51',
    icon: 'battery', // BatteryLowIcon
    recommendations: ['Quiet spots', 'One-on-one only'],
  },
  medium: {
    label: 'Moderate Energy',
    description: 'A balanced mix of events and quiet spots',
    color: '#F4A261',
    icon: 'bolt', // BoltIcon
    recommendations: ['Small groups', 'Drop-in events'],
  },
  high: {
    label: 'Fully Charged',
    description: 'You\'re open to anything - social events included',
    color: '#52B788',
    icon: 'auto_awesome', // AutoAwesomeIcon
    recommendations: ['All events', 'Group socials', 'New connections'],
  },
};

export const vibeFilters = ['All', 'Quiet', 'Social', 'Study', 'Coffee', 'Evening'];
