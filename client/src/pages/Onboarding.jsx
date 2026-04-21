import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Chip,
  Stack,
  LinearProgress,
  Fade,
  Grid,
  TextField,
  useTheme,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import BoltIcon from '@mui/icons-material/Bolt';
import PeopleIcon from '@mui/icons-material/People';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import NaturePeopleIcon from '@mui/icons-material/NaturePeople';
import PaletteIcon from '@mui/icons-material/Palette';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import FlightIcon from '@mui/icons-material/Flight';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import MovieIcon from '@mui/icons-material/Movie';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import Battery1BarIcon from '@mui/icons-material/Battery1Bar';
import Battery4BarIcon from '@mui/icons-material/Battery4Bar';
import BatteryFullIcon from '@mui/icons-material/BatteryFull';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import proximityLogo from '../assets/proximity-logo.png';
import proximityLogoDark from '../assets/proximity-logo-dark.png';

const steps = [
  {
    key: 'welcome',
    title: 'Find your people,\nnaturally.',
    subtitle: 'Proximity connects you to students around you through shared spaces, not awkward profiles.',
    type: 'splash',
  },
  {
    key: 'battery',
    title: 'How social are you feeling today?',
    subtitle: 'We tailor your feed to match your energy. You can change this anytime.',
    type: 'battery',
  },
  {
    key: 'interests',
    title: 'What are you into?',
    subtitle: 'Pick a few things you enjoy. This helps surface relevant events and people.',
    type: 'interests',
  },
  {
    key: 'ready',
    title: "You're all set",
    subtitle: 'No pressure to connect with anyone. Just explore what is happening around you.',
    type: 'ready',
  },
];

const interestOptions = [
  { label: 'Coffee', icon: <LocalCafeIcon fontSize="small" /> },
  { label: 'Study Groups', icon: <MenuBookIcon fontSize="small" /> },
  { label: 'Music', icon: <MusicNoteIcon fontSize="small" /> },
  { label: 'Gaming', icon: <SportsEsportsIcon fontSize="small" /> },
  { label: 'Fitness', icon: <FitnessCenterIcon fontSize="small" /> },
  { label: 'Outdoors', icon: <NaturePeopleIcon fontSize="small" /> },
  { label: 'Socials', icon: <PeopleIcon fontSize="small" /> },
  { label: 'Startups', icon: <BoltIcon fontSize="small" /> },
  { label: 'Art', icon: <PaletteIcon fontSize="small" /> },
  { label: 'Photography', icon: <CameraAltIcon fontSize="small" /> },
  { label: 'Cooking', icon: <RestaurantIcon fontSize="small" /> },
  { label: 'Travel', icon: <FlightIcon fontSize="small" /> },
  { label: 'Books', icon: <LibraryBooksIcon fontSize="small" /> },
  { label: 'Movies', icon: <MovieIcon fontSize="small" /> },
  { label: 'Sports', icon: <SportsSoccerIcon fontSize="small" /> },
  { label: 'Volunteering', icon: <VolunteerActivismIcon fontSize="small" /> },
];

const batteryOptions = [
  { value: 'low', icon: <Battery1BarIcon fontSize="large" />, label: 'Running low', desc: 'Show me quiet spaces and one-on-one options' },
  { value: 'medium', icon: <Battery4BarIcon fontSize="large" />, label: 'Moderate', desc: 'A balanced mix of social and quiet' },
  { value: 'high', icon: <BatteryFullIcon fontSize="large" />, label: 'Fully charged', desc: "Show me everything - I'm ready to meet people" },
];

export default function OnboardingPage({ onComplete }) {
  const [step, setStep] = useState(0);
  const [battery, setBattery] = useState('medium');
  const [interests, setInterests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const current = steps[step];
  const progress = (step / (steps.length - 1)) * 100;

  const toggleInterest = (label) => {
    setInterests((prev) => (prev.includes(label) ? prev.filter((i) => i !== label) : [...prev, label]));
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        display: 'grid',
        placeItems: 'center',
        px: { xs: 2, md: 4 },
        py: { xs: 2, md: 4 },
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 1280,
          borderRadius: { xs: 0, md: 6 },
          overflow: 'hidden',
          border: { xs: 'none', md: '1px solid' },
          borderColor: 'divider',
          bgcolor: 'background.paper',
          boxShadow: { xs: 'none', md: '0 28px 60px rgba(45,106,79,0.08)' },
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '1.02fr 0.98fr' },
        }}
      >
        <Box sx={{ p: { xs: 3, md: 5 } }}>
          {step > 0 && step < steps.length - 1 && <LinearProgress variant="determinate" value={progress} sx={{ mb: 4, bgcolor: 'divider', '& .MuiLinearProgress-bar': { background: isDark ? 'linear-gradient(90deg, #6E5CE6, #8B7CF6)' : 'linear-gradient(90deg, #2D6A4F, #52B788)' } }} />}

          <Fade in key={step} timeout={300}>
            <Box>
              {current.type === 'splash' && (
                <Box sx={{ minHeight: { lg: 560 }, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <Box component="img" src={isDark ? proximityLogoDark : proximityLogo} alt="Proximity logo" sx={{ width: { xs: 220, md: 400 }, height: 'auto', mb: 4 }} />
                  <Typography variant="h2" sx={{ fontSize: { xs: '2.35rem', md: '3.6rem' }, lineHeight: 1.02, mb: 2.2, whiteSpace: 'pre-line', maxWidth: 520 }}>
                    {current.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 560 }}>
                    {current.subtitle}
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {['No forced interactions', 'Context-first', 'Low pressure'].map((tag) => (
                      <Chip key={tag} label={tag} size="small" sx={{ bgcolor: isDark ? alpha('#8B7CF6', 0.15) : '#E8F5E9', color: isDark ? 'primary.light' : 'primary.dark', fontWeight: 600 }} />
                    ))}
                  </Stack>
                </Box>
              )}

              {current.type === 'battery' && (
                <Box>
                  <Typography variant="h3" sx={{ fontSize: { xs: '2rem', md: '2.7rem' }, lineHeight: 1.08, mb: 1.2 }}>{current.title}</Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 3.5, maxWidth: 640 }}>{current.subtitle}</Typography>
                  <Stack spacing={1.6}>
                    {batteryOptions.map((option) => (
                      <Box
                        key={option.value}
                        onClick={() => setBattery(option.value)}
                        sx={{
                          border: '2px solid',
                          borderColor: battery === option.value ? 'primary.main' : 'divider',
                          borderRadius: 4,
                          p: 2.25,
                          cursor: 'pointer',
                          bgcolor: battery === option.value ? (isDark ? alpha('#8B7CF6', 0.15) : '#F0FAF4') : 'background.paper',
                          transition: 'all 0.18s ease',
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Box sx={{ color: 'primary.main' }}>{option.icon}</Box>
                          <Box>
                            <Typography variant="subtitle1" fontWeight={800}>{option.label}</Typography>
                            <Typography variant="body2" color="text.secondary">{option.desc}</Typography>
                          </Box>
                        </Box>
                      </Box>
                    ))}
                  </Stack>
                </Box>
              )}

              {current.type === 'interests' && (
                <Box>
                  <Typography variant="h3" sx={{ fontSize: { xs: '2rem', md: '2.7rem' }, lineHeight: 1.08, mb: 1.2 }}>{current.title}</Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 3.5, maxWidth: 640 }}>{current.subtitle}</Typography>
                  <TextField
                    fullWidth
                    placeholder="Search interests..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{ mb: 2 }}
                  />
                  <Grid container spacing={1.4}>
                    {interestOptions
                      .filter(({ label }) => label.toLowerCase().includes(searchTerm.toLowerCase()))
                      .map(({ label, icon }) => (
                      <Grid item xs={12} sm={6} key={label}>
                        <Chip
                          icon={icon}
                          label={label}
                          onClick={() => toggleInterest(label)}
                          sx={{
                            width: '100%',
                            justifyContent: 'flex-start',
                            px: 1.5,
                            py: 3,
                            fontSize: '0.96rem',
                            bgcolor: interests.includes(label) ? 'primary.main' : 'background.paper',
                            color: interests.includes(label) ? 'white' : 'text.primary',
                            border: '2px solid',
                            borderColor: interests.includes(label) ? 'primary.main' : 'divider',
                            '& .MuiChip-icon': { color: interests.includes(label) ? 'white' : 'primary.main' },
                          }}
                        />
                      </Grid>
                    ))}
                  </Grid>
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
                    {interests.length} selected - you can update this anytime.
                  </Typography>
                </Box>
              )}

              {current.type === 'ready' && (
                <Box sx={{ minHeight: { lg: 560 }, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <CheckCircleIcon sx={{ fontSize: '5rem', mb: 1.5, color: 'primary.main' }} />
                  <Typography variant="h3" sx={{ fontSize: { xs: '2rem', md: '2.8rem' }, mb: 1.4 }}>{current.title}</Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 3.5, maxWidth: 560 }}>{current.subtitle}</Typography>
                  <Box sx={{ bgcolor: 'action.hover', borderRadius: 4, p: 2.2, maxWidth: 580 }}>
                    <Typography variant="body2" color="text.secondary">
                      You’ll start with {batteryOptions.find((option) => option.value === battery)?.label.toLowerCase()} energy and {interests.length || 0} selected interest{interests.length === 1 ? '' : 's'}.
                    </Typography>
                  </Box>
                </Box>
              )}
            </Box>
          </Fade>

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between', gap: 1.5 }}>
            <Button disabled={step === 0} variant="text" color="inherit" onClick={() => setStep((s) => Math.max(0, s - 1))}>
              Back
            </Button>
            <Button variant="contained" onClick={() => (step === steps.length - 1 ? onComplete(battery, interests) : setStep((s) => Math.min(steps.length - 1, s + 1)))}>
              {step === steps.length - 1 ? 'Enter Proximity' : 'Continue'}
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            display: { xs: 'none', lg: 'block' },
            background: isDark
              ? 'linear-gradient(165deg, #1a1040 0%, #2d1f6e 48%, #6E5CE6 100%)'
              : 'linear-gradient(165deg, #1B4332 0%, #2D6A4F 48%, #52B788 100%)',
            color: 'white',
            p: 5,
            position: 'relative',
          }}
        >
          <Typography variant="overline" sx={{ letterSpacing: '0.18em', opacity: 0.8 }}>Campus connection, redesigned</Typography>
          <Typography variant="h3" sx={{ fontSize: '2.4rem', lineHeight: 1.08, mt: 1.4, mb: 2 }}>
            A calmer way to discover people nearby.
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.82)', maxWidth: 480, mb: 3 }}>
            Instead of pushing users through a tiny mobile-style funnel, this version uses a spacious desktop layout with stronger hierarchy and room for context.
          </Typography>

          <Stack spacing={1.5}>
            {[
              'Context-first discovery rather than profile browsing',
              'Low-pressure openers instead of cold DMs',
              'Responsive layout that actually uses browser width',
            ].map((item) => (
              <Box key={item} sx={{ p: 2, borderRadius: 4, bgcolor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
                <Typography variant="body1">{item}</Typography>
              </Box>
            ))}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
