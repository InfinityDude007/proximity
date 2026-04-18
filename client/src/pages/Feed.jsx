import { useState } from 'react';
import {
  Box, Typography, Chip, Stack, Card, CardContent,
  Avatar, AvatarGroup, IconButton, Divider, Badge,
  Button, Fade, Collapse,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import TuneIcon from '@mui/icons-material/Tune';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { contextFeed, batteryLevels, vibeFilters, currentUser } from '../data/mockData';

const vibeColor = {
  quiet: { bg: '#EEF2FF', text: '#4F46E5' },
  social: { bg: '#FFF7ED', text: '#C2410C' },
};

function ContextCard({ event, onSelect }) {
  const vibe = vibeColor[event.vibe] || vibeColor.social;

  return (
    <Card
      onClick={() => onSelect(event)}
      sx={{
        cursor: 'pointer',
        mb: 2,
        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0px 8px 24px rgba(45,106,79,0.12)',
        },
      }}
    >
      <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
        {/* Header row */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
              <Chip
                label={event.vibe === 'quiet' ? '🤫 Quiet' : '🎉 Social'}
                size="small"
                sx={{
                  bgcolor: vibe.bg,
                  color: vibe.text,
                  fontWeight: 600,
                  fontSize: '0.72rem',
                  height: 22,
                }}
              />
              {event.mutualCount > 0 && (
                <Chip
                  label={`${event.mutualCount} mutual${event.mutualCount > 1 ? 's' : ''}`}
                  size="small"
                  sx={{ bgcolor: '#F0FAF4', color: 'primary.dark', fontWeight: 600, fontSize: '0.72rem', height: 22 }}
                />
              )}
            </Box>
            <Typography variant="h6" sx={{ fontSize: '1.05rem', fontWeight: 700, lineHeight: 1.3 }}>
              {event.title}
            </Typography>
          </Box>
        </Box>

        {/* Meta */}
        <Stack spacing={0.6} sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
            <LocationOnIcon sx={{ fontSize: 15, color: 'text.secondary' }} />
            <Typography variant="caption" color="text.secondary">{event.location}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
            <AccessTimeIcon sx={{ fontSize: 15, color: 'text.secondary' }} />
            <Typography variant="caption" color="text.secondary">{event.time}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
            <DirectionsWalkIcon sx={{ fontSize: 15, color: 'text.secondary' }} />
            <Typography variant="caption" color="text.secondary">{event.distance}</Typography>
          </Box>
        </Stack>

        <Divider sx={{ mb: 2 }} />

        {/* Who's there */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <AvatarGroup
              max={3}
              sx={{
                '& .MuiAvatar-root': {
                  width: 30,
                  height: 30,
                  fontSize: '0.75rem',
                  border: '2px solid white',
                },
              }}
            >
              {event.attendees.map(a => (
                <Avatar
                  key={a.id}
                  sx={{
                    bgcolor: a.openToTalk ? 'primary.main' : '#9CA3AF',
                  }}
                >
                  {a.avatar}
                </Avatar>
              ))}
            </AvatarGroup>
            <Box>
              <Typography variant="caption" fontWeight={600} display="block">
                {event.attendees.filter(a => a.openToTalk).length} open to chat
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <FiberManualRecordIcon sx={{ fontSize: 8, color: '#52B788' }} />
                <Typography variant="caption" color="text.secondary">active now</Typography>
              </Box>
            </Box>
          </Box>
          <Button
            variant="outlined"
            size="small"
            color="primary"
            sx={{
              borderRadius: 50,
              px: 2,
              py: 0.6,
              fontSize: '0.78rem',
              borderWidth: 1.5,
            }}
          >
            View →
          </Button>
        </Box>

        {/* Tags */}
        <Box sx={{ mt: 2, display: 'flex', gap: 0.8, flexWrap: 'wrap' }}>
          {event.tags.map(tag => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              variant="outlined"
              sx={{
                height: 20,
                fontSize: '0.7rem',
                borderColor: '#E8E4DE',
                color: 'text.secondary',
              }}
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}

export default function FeedPage({ socialBattery, onSelectEvent }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const battery = batteryLevels[socialBattery];

  const filtered = activeFilter === 'All'
    ? contextFeed
    : contextFeed.filter(e =>
        e.vibe === activeFilter.toLowerCase() ||
        e.tags.some(t => t.toLowerCase() === activeFilter.toLowerCase())
      );

  return (
    <Box sx={{ px: 2.5, pt: 4, pb: 2 }}>
      {/* Top bar */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
        <Box>
          <Typography variant="h4" sx={{ fontSize: '1.5rem', fontWeight: 700 }}>
            Around you
          </Typography>
          <Typography variant="body2" color="text.secondary">
            University of Birmingham Dubai
          </Typography>
        </Box>
        <IconButton size="small" sx={{ bgcolor: 'white', border: '1px solid', borderColor: 'divider' }}>
          <NotificationsNoneIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* Battery status bar */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          bgcolor: 'white',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 3,
          p: 1.5,
          mb: 3,
        }}
      >
        <Typography sx={{ fontSize: '1.3rem' }}>{battery.emoji}</Typography>
        <Box sx={{ flex: 1 }}>
          <Typography variant="caption" fontWeight={600} display="block" sx={{ lineHeight: 1.3 }}>
            {battery.label}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {battery.description}
          </Typography>
        </Box>
        <Chip
          label="Change"
          size="small"
          variant="outlined"
          sx={{ fontSize: '0.7rem', height: 22 }}
        />
      </Box>

      {/* Filters */}
      <Box sx={{ display: 'flex', gap: 1, overflowX: 'auto', pb: 1, mb: 3, '&::-webkit-scrollbar': { display: 'none' } }}>
        {vibeFilters.map(f => (
          <Chip
            key={f}
            label={f}
            onClick={() => setActiveFilter(f)}
            sx={{
              whiteSpace: 'nowrap',
              flexShrink: 0,
              bgcolor: activeFilter === f ? 'primary.main' : 'white',
              color: activeFilter === f ? 'white' : 'text.secondary',
              border: '1px solid',
              borderColor: activeFilter === f ? 'primary.main' : 'divider',
              fontWeight: activeFilter === f ? 600 : 400,
              cursor: 'pointer',
              '&:hover': { bgcolor: activeFilter === f ? 'primary.dark' : '#F0FAF4' },
            }}
          />
        ))}
      </Box>

      {/* Feed */}
      <Typography variant="overline" color="text.secondary" sx={{ mb: 1.5, display: 'block', letterSpacing: '0.08em' }}>
        {filtered.length} places right now
      </Typography>

      {filtered.map(event => (
        <Fade in key={event.id} timeout={300}>
          <Box>
            <ContextCard event={event} onSelect={onSelectEvent} />
          </Box>
        </Fade>
      ))}

      {filtered.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 6 }}>
          <Typography sx={{ fontSize: '2.5rem', mb: 1 }}>🍃</Typography>
          <Typography color="text.secondary">Nothing matching that filter right now</Typography>
        </Box>
      )}
    </Box>
  );
}
