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
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import proximityLogo from '../assets/proximity-logo.png';
import proximityLogoDark from '../assets/proximity-logo-dark.png';
import {
  getAvailabilityMeta,
  getSocialBatteryMeta,
  renderAvailabilityIcon,
  renderSocialBatteryIcon,
  SOCIAL_BATTERY_ORDER,
} from '../data/preferencesUi';

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

const batteryOptions = SOCIAL_BATTERY_ORDER.map((value) => {
  const meta = getSocialBatteryMeta(value);

  return {
    value,
    icon: renderSocialBatteryIcon(value, { fontSize: 'large' }),
    label: meta.label,
    desc: meta.description,
    color: meta.color,
  };
});

export default function OnboardingPage({ onComplete }) {
  const [step, setStep] = useState(0);
  const [battery, setBattery] = useState('medium');
  const [interests, setInterests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const current = steps[step];
  const progress = (step / (steps.length - 1)) * 100;
  const selectedBattery = getSocialBatteryMeta(battery);
  const defaultAvailability = getAvailabilityMeta('open_to_connect');

  const toggleInterest = (label) => {
    setInterests((prev) => (prev.includes(label) ? prev.filter((i) => i !== label) : [...prev, label]));
  };

  const goNext = () =>
    step === steps.length - 1
      ? onComplete(battery, interests)
      : setStep((s) => Math.min(steps.length - 1, s + 1));

  const goBack = () => setStep((s) => Math.max(0, s - 1));

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
        <Box sx={{ p: { xs: 3, md: 5 }, display: 'flex', flexDirection: 'column' }}>
          {step > 0 && step < steps.length - 1 && <LinearProgress variant="determinate" value={progress} sx={{ mb: 4, bgcolor: 'divider', '& .MuiLinearProgress-bar': { background: isDark ? 'linear-gradient(90deg, #6E5CE6, #8B7CF6)' : 'linear-gradient(90deg, #2D6A4F, #52B788)' } }} />}

          <Fade in key={step} timeout={300}>
            <Box sx={{ flex: 1 }}>
              {current.type === 'splash' && (
                <Box sx={{ minHeight: { lg: 520 }, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <Box component="img" src={isDark ? proximityLogoDark : proximityLogo} alt="Proximity logo" sx={{ width: { xs: 200, md: 380 }, height: 'auto', mb: 4 }} />
                  <Typography variant="h2" sx={{ fontSize: { xs: '2.35rem', md: '3.6rem' }, lineHeight: 1.02, mb: 2.2, whiteSpace: 'pre-line', maxWidth: 520 }}>
                    {current.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 520 }}>
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
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 3.5, maxWidth: 560 }}>{current.subtitle}</Typography>
                  <Stack spacing={1.5}>
                    {batteryOptions.map((option) => (
                      <Box
                        key={option.value}
                        onClick={() => setBattery(option.value)}
                        sx={{
                          border: '2px solid',
                          borderColor: battery === option.value ? option.color : 'divider',
                          borderRadius: 4,
                          p: 2.25,
                          cursor: 'pointer',
                          bgcolor: battery === option.value ? alpha(option.color, isDark ? 0.18 : 0.1) : 'background.paper',
                          transition: 'all 0.18s ease',
                          minHeight: 80,
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <Box
                          sx={{
                            width: 40,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: option.color,
                            flexShrink: 0,
                          }}
                        >
                          {option.icon}
                        </Box>
                        <Box sx={{ ml: 2 }}>
                          <Typography variant="subtitle1" fontWeight={800}>{option.label}</Typography>
                          <Typography variant="body2" color="text.secondary">{option.desc}</Typography>
                        </Box>
                      </Box>
                    ))}
                  </Stack>
                </Box>
              )}

              {current.type === 'interests' && (
                <Box>
                  <Typography variant="h3" sx={{ fontSize: { xs: '2rem', md: '2.7rem' }, lineHeight: 1.08, mb: 1.2 }}>{current.title}</Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 3.5, maxWidth: 560 }}>{current.subtitle}</Typography>
                  <TextField
                    fullWidth
                    placeholder="Search interests..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{ mb: 2 }}
                  />
                  <Grid container spacing={1.25}>
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
                            py: 2.75,
                            fontSize: '0.95rem',
                            bgcolor: interests.includes(label) ? 'primary.main' : 'background.paper',
                            color: interests.includes(label) ? 'white' : 'text.primary',
                            border: '2px solid',
                            borderColor: interests.includes(label) ? 'primary.main' : 'divider',
                            borderRadius: 2,
                            '& .MuiChip-icon': { color: interests.includes(label) ? 'white' : 'primary.main' },
                            transition: 'all 0.15s ease',
                          }}
                        />
                      </Grid>
                    ))}
                  </Grid>
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
                    {interests.length} selected — you can update this anytime.
                  </Typography>
                </Box>
              )}

              {current.type === 'ready' && (
                <Box sx={{ minHeight: { lg: 520 }, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <CheckCircleIcon sx={{ fontSize: '5rem', mb: 2, color: 'primary.main' }} />
                  <Typography variant="h3" sx={{ fontSize: { xs: '2rem', md: '2.8rem' }, mb: 1.5, maxWidth: 520 }}>{current.title}</Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 3.5, maxWidth: 520 }}>{current.subtitle}</Typography>
                  <Box sx={{ bgcolor: 'action.hover', borderRadius: 4, p: 2.25, maxWidth: 520 }}>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} sx={{ mb: 1.4 }}>
                      <Chip
                        icon={renderSocialBatteryIcon(battery, { fontSize: 'small' })}
                        label={selectedBattery.label}
                        size="small"
                        sx={{
                          bgcolor: alpha(selectedBattery.color, isDark ? 0.18 : 0.1),
                          color: selectedBattery.color,
                          fontWeight: 700,
                        }}
                      />
                      <Chip
                        icon={renderAvailabilityIcon('open_to_connect', { fontSize: 'small' })}
                        label={defaultAvailability.label}
                        size="small"
                        sx={{
                          bgcolor: alpha(defaultAvailability.color, isDark ? 0.18 : 0.1),
                          color: defaultAvailability.color,
                          fontWeight: 700,
                        }}
                      />
                    </Stack>
                    <Typography variant="body2" color="text.secondary">
                      You’ll start with {selectedBattery.label.toLowerCase()}, default to {defaultAvailability.label.toLowerCase()}, and have {interests.length || 0} selected interest{interests.length === 1 ? '' : 's'}.
                    </Typography>
                  </Box>
                </Box>
              )}
            </Box>
          </Fade>

          <Box sx={{ mt: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1.5 }}>
            <Button disabled={step === 0} variant="text" color="inherit" onClick={goBack} sx={{ minWidth: 80 }}>
              Back
            </Button>
            <Button variant="contained" onClick={goNext} sx={{ minWidth: 140 }}>
              {step === steps.length - 1 ? 'Enter Proximity' : 'Continue'}
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            display: { xs: 'none', lg: 'flex' },
            flexDirection: 'column',
            justifyContent: 'center',
            background: isDark
              ? 'linear-gradient(165deg, #1a1040 0%, #2d1f6e 48%, #6E5CE6 100%)'
              : 'linear-gradient(165deg, #1B4332 0%, #2D6A4F 48%, #52B788 100%)',
            color: 'white',
            p: 5,
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
