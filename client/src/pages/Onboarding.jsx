import { useState } from 'react';
import {
  Box, Typography, Button, Chip, Stack, LinearProgress,
  ToggleButton, ToggleButtonGroup, Fade,
} from '@mui/material';
import BoltIcon from '@mui/icons-material/Bolt';
import PeopleIcon from '@mui/icons-material/People';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import NaturePeopleIcon from '@mui/icons-material/NaturePeople';

const steps = [
  {
    key: 'welcome',
    title: 'Find your people,\nnaturally.',
    subtitle: 'Proximity connects you to students around you — through shared spaces, not awkward profiles.',
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
    title: 'You\'re all set 🌱',
    subtitle: 'No pressure to connect with anyone. Just explore what\'s happening around you.',
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
];

const batteryOptions = [
  { value: 'low', emoji: '🔋', label: 'Running low', desc: 'Show me quiet spaces & one-on-one options' },
  { value: 'medium', emoji: '⚡', label: 'Moderate', desc: 'A balanced mix of social & quiet' },
  { value: 'high', emoji: '✨', label: 'Fully charged', desc: 'Show me everything — I\'m ready to meet people' },
];

export default function OnboardingPage({ onComplete }) {
  const [step, setStep] = useState(0);
  const [battery, setBattery] = useState('medium');
  const [interests, setInterests] = useState([]);

  const current = steps[step];
  const progress = ((step) / (steps.length - 1)) * 100;

  const toggleInterest = (label) => {
    setInterests(prev =>
      prev.includes(label) ? prev.filter(i => i !== label) : [...prev, label]
    );
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#F8F5F0',
        display: 'flex',
        flexDirection: 'column',
        px: 3,
        py: 4,
        maxWidth: 480,
        mx: 'auto',
      }}
    >
      {/* Progress */}
      {step > 0 && step < steps.length - 1 && (
        <Box sx={{ mb: 4 }}>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              bgcolor: '#E8E4DE',
              '& .MuiLinearProgress-bar': {
                background: 'linear-gradient(90deg, #2D6A4F, #52B788)',
              },
            }}
          />
        </Box>
      )}

      <Fade in key={step} timeout={350}>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>

          {/* Splash */}
          {current.type === 'splash' && (
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              {/* Logo area */}
              <Box sx={{ mb: 6, textAlign: 'center' }}>
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '24px',
                    background: 'linear-gradient(135deg, #2D6A4F 0%, #52B788 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 3,
                    boxShadow: '0 12px 32px rgba(45,106,79,0.25)',
                  }}
                >
                  <NaturePeopleIcon sx={{ color: '#fff', fontSize: 40 }} />
                </Box>
                <Typography
                  variant="h6"
                  sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', fontSize: '0.8rem' }}
                >
                  Proximity
                </Typography>
              </Box>
              <Typography
                variant="h2"
                sx={{
                  fontSize: '2.4rem',
                  lineHeight: 1.2,
                  mb: 2.5,
                  whiteSpace: 'pre-line',
                  color: 'text.primary',
                }}
              >
                {current.title}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 5, maxWidth: 320 }}>
                {current.subtitle}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 5 }}>
                {['No forced interactions', 'Context-first', 'Low pressure'].map(tag => (
                  <Chip
                    key={tag}
                    label={tag}
                    size="small"
                    sx={{ bgcolor: '#E8F5E9', color: 'primary.dark', fontWeight: 500 }}
                  />
                ))}
              </Box>
            </Box>
          )}

          {/* Battery */}
          {current.type === 'battery' && (
            <Box>
              <Typography variant="h3" sx={{ fontSize: '1.9rem', lineHeight: 1.25, mb: 1.5 }}>
                {current.title}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                {current.subtitle}
              </Typography>
              <Stack spacing={2}>
                {batteryOptions.map(opt => (
                  <Box
                    key={opt.value}
                    onClick={() => setBattery(opt.value)}
                    sx={{
                      border: '2px solid',
                      borderColor: battery === opt.value ? 'primary.main' : 'divider',
                      borderRadius: 3,
                      p: 2.5,
                      cursor: 'pointer',
                      bgcolor: battery === opt.value ? '#F0FAF4' : 'white',
                      transition: 'all 0.18s ease',
                      '&:hover': { borderColor: 'primary.light' },
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Typography sx={{ fontSize: '1.8rem' }}>{opt.emoji}</Typography>
                      <Box>
                        <Typography variant="subtitle1" fontWeight={600}>{opt.label}</Typography>
                        <Typography variant="body2" color="text.secondary">{opt.desc}</Typography>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Box>
          )}

          {/* Interests */}
          {current.type === 'interests' && (
            <Box>
              <Typography variant="h3" sx={{ fontSize: '1.9rem', lineHeight: 1.25, mb: 1.5 }}>
                {current.title}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                {current.subtitle}
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                {interestOptions.map(({ label, icon }) => (
                  <Chip
                    key={label}
                    icon={icon}
                    label={label}
                    onClick={() => toggleInterest(label)}
                    sx={{
                      py: 2.5,
                      px: 1,
                      fontSize: '0.9rem',
                      bgcolor: interests.includes(label) ? '#2D6A4F' : 'white',
                      color: interests.includes(label) ? 'white' : 'text.primary',
                      border: '2px solid',
                      borderColor: interests.includes(label) ? '#2D6A4F' : '#E8E4DE',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      '& .MuiChip-icon': {
                        color: interests.includes(label) ? 'white' : 'primary.main',
                      },
                      '&:hover': {
                        bgcolor: interests.includes(label) ? '#1B4332' : '#F0FAF4',
                        borderColor: 'primary.main',
                      },
                    }}
                  />
                ))}
              </Box>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
                {interests.length} selected · you can update this anytime
              </Typography>
            </Box>
          )}

          {/* Ready */}
          {current.type === 'ready' && (
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
              <Typography sx={{ fontSize: '4rem', mb: 2 }}>🌱</Typography>
              <Typography variant="h3" sx={{ fontSize: '2rem', mb: 2 }}>
                {current.title}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 5 }}>
                {current.subtitle}
              </Typography>
              <Box
                sx={{
                  bgcolor: 'white',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 3,
                  p: 3,
                  textAlign: 'left',
                  mb: 4,
                }}
              >
                <Typography variant="subtitle2" fontWeight={700} color="primary.main" sx={{ mb: 1 }}>
                  How it works
                </Typography>
                {[
                  'Browse what\'s happening near you on campus',
                  'See who\'s there and whether they\'re open to chat',
                  'Join in with a soft invite — no cold messaging',
                  'Build connections that last beyond one encounter',
                ].map((item, i) => (
                  <Box key={i} sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start', mb: 1 }}>
                    <Typography sx={{ color: 'primary.main', fontWeight: 700, mt: 0.1 }}>
                      {i + 1}.
                    </Typography>
                    <Typography variant="body2" color="text.secondary">{item}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          )}

          {/* CTA */}
          <Box sx={{ mt: 'auto', pt: 3 }}>
            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={() => {
                if (step < steps.length - 1) {
                  setStep(s => s + 1);
                } else {
                  onComplete();
                }
              }}
              sx={{ py: 1.8, fontSize: '1rem' }}
            >
              {current.type === 'splash'
                ? 'Get started'
                : current.type === 'ready'
                ? 'Explore Proximity'
                : 'Continue'}
            </Button>

            {step > 0 && current.type !== 'ready' && (
              <Button
                fullWidth
                sx={{ mt: 1, color: 'text.secondary' }}
                onClick={() => setStep(s => s - 1)}
              >
                Back
              </Button>
            )}
          </Box>
        </Box>
      </Fade>
    </Box>
  );
}
