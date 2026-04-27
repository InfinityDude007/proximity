import { useMemo, useState } from 'react';
import {
  Box,
  Typography,
  Chip,
  Stack,
  Card,
  CardContent,
  Avatar,
  AvatarGroup,
  IconButton,
  Divider,
  Button,
  Grid,
  Popover,
  useTheme,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import TuneIcon from '@mui/icons-material/Tune';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import ShareLocationIcon from '@mui/icons-material/ShareLocation';
import Groups2Icon from '@mui/icons-material/Groups2';
import SpaIcon from '@mui/icons-material/Spa';
import SchoolIcon from '@mui/icons-material/School';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { batteryLevels, getUniversityMockData, vibeFilters } from '../data/mockData';
import { alpha } from '@mui/material/styles';
import {
  getAvailabilityMeta,
  getNextAvailabilityStatus,
  getPreferenceChipSx,
  renderAvailabilityIcon,
  renderSocialBatteryIcon,
  SOCIAL_BATTERY_ORDER,
} from '../data/preferencesUi';

const vibeColor = {
  quiet: { bg: '#EEF2FF', text: '#4F46E5' },
  social: { bg: '#FFF7ED', text: '#C2410C' },
};

function MetaItem({ icon, text }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
      <Box sx={{ width: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        {icon}
      </Box>
      <Typography variant="body2" color="text.secondary">
        {text}
      </Typography>
    </Box>
  );
}

function PageHero({ universityName, contextCount }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const subtleSurface = alpha(theme.palette.primary.main, isDark ? 0.14 : 0.07);

  return (
    <Box
      sx={{
        mb: 2,
        p: { xs: 2.5, md: 3.5 },
        borderRadius: 2,
        bgcolor: 'background.paper',
        boxShadow: theme.shadows[1],
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        minWidth: '100%',
      }}
    >
      <Chip
        label="Live campus discovery"
        size="small"
        sx={{
          fontWeight: 700,
          bgcolor: subtleSurface,
          color: isDark ? 'primary.light' : 'primary.dark',
          width: 'fit-content',
          py: 2,
          px: 1,
          borderRadius: "20px"
        }}
      />

      <Typography
        variant="h3"
        sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, lineHeight: 1.05 }}
      >
        Discover What's Happening Around You
      </Typography>

      <Typography variant="body1" color="text.secondary">
        Shared places, active people, and low-pressure ways to connect across {universityName}.
      </Typography>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.2}>
        <Chip
          icon={<SchoolIcon />}
          label={universityName}
          variant="outlined"
          sx={{
            bgcolor: subtleSurface,
            borderColor: 'divider',
            p: 1,
            '& .MuiChip-icon': {
              mr: 0.1,
            },
          }}
        />
        <Chip
          label={`${contextCount} nearby contexts`}
          variant="outlined"
          sx={{
            bgcolor: subtleSurface,
            borderColor: 'divider',
            p: 1,
          }}
        />
      </Stack>
    </Box>
  );
}

function ContextCard({ event, onSelect }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const vibe = vibeColor[event.vibe] || vibeColor.social;
  const openCount = event.attendees.filter((a) => a.openToTalk).length;
  const subtleSurface = alpha(theme.palette.primary.main, isDark ? 0.14 : 0.07);
  const successSurface = alpha(theme.palette.success.main, isDark ? 0.18 : 0.1);

  return (
    <Card
      onClick={() => onSelect(event)}
      sx={{
        height: '100%',
        cursor: 'pointer',
        transition: 'transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[4],
          borderColor: alpha(theme.palette.primary.main, 0.35),
        },
      }}
    >
      <CardContent
        sx={{
          py: 2.5,
          px: 3.5,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 0,
        }}
      >
        <Box sx={{ width: '100%', mb: 2 }}>
          <Stack
            direction="row"
            spacing={0.75}
            useFlexGap
            sx={{ alignItems: 'center', mb: 2 }}
          >
            <Chip
                label={event.vibe === 'quiet' ? 'Quiet' : 'Social'}
                size="medium"
                sx={{
                  bgcolor: vibe.bg,
                  color: vibe.text,
                  fontWeight: 800,
                  height: 34,
                  fontSize: '0.9rem',
                  px: 1.5,
                }}
              />

              {event.mutualCount > 0 && (
                <Chip
                  label={`${event.mutualCount} mutual${event.mutualCount > 1 ? 's' : ''} going`}
                  size="medium"
                  sx={{
                    bgcolor: successSurface,
                    color: isDark ? 'text.primary' : 'primary.dark',
                    fontWeight: 800,
                    height: 32,
                    fontSize: '0.85rem',
                    px: 1.25,
                  }}
                />
              )}
          </Stack>

          <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
            {event.title}
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 320, mx: 'auto', mb: 1 }}>
            {event.description}
          </Typography>
        </Box>

        <Stack spacing={1} sx={{ mb: 2.25, width: '100%', alignItems: 'flex-start' }}>
          <MetaItem icon={<LocationOnIcon sx={{ fontSize: 18, color: 'text.secondary' }} />} text={event.location} />
          <MetaItem icon={<AccessTimeIcon sx={{ fontSize: 18, color: 'text.secondary' }} />} text={event.time} />
          <MetaItem icon={<DirectionsWalkIcon sx={{ fontSize: 18, color: 'text.secondary' }} />} text={event.distance} />

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
            <Box sx={{ width: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <LocalOfferIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
            </Box>
            <Stack direction='row' spacing={1} sx={{ justifyContent: 'flex-end' }}>
                {event.tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    size="medium"
                    sx={{
                      color: 'text.secondary',
                      bgcolor: subtleSurface,
                      height: 30,
                      fontSize: '0.8rem',
                      px: 1.2,
                    }}
                  />
                ))}
              </Stack>
          </Box>
        </Stack>

        <Divider sx={{ mb: 3, mt: 1, width: '100%' }} />
        
        <Stack direction='row' sx={{ justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'start',
              width: '100%',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <AvatarGroup
                max={4}
                sx={{
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    fontSize: '0.78rem',
                    border: '2px solid',
                    borderColor: 'background.paper',
                  },
                }}
              >
                {event.attendees.map((a) => (
                  <Avatar key={a.id} sx={{ bgcolor: a.openToTalk ? 'primary.main' : alpha(theme.palette.primary.main) }}>
                    {a.avatar}
                  </Avatar>
                ))}
              </AvatarGroup>

              <Box sx={{ textAlign: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.8 }}>
                  <FiberManualRecordIcon sx={{ fontSize: 14, color: '#2e6a4f' }} />
                  <Typography variant="caption" sx={{ color: "text.secondary", fontSize: '16px' }}>
                    {openCount} open to connect
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          <Button
            variant="outlined"
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(event);
            }}
            sx={{ minWidth: '40%', maxHeight: '70%', px: 2, py: 1 }}
          >
            View Context
          </Button>
        </Stack>

      </CardContent>
    </Card>
  );
}

function QuickStats({ contextFeed }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const subtleSurface = alpha(theme.palette.primary.main, isDark ? 0.14 : 0.07);
  const stats = useMemo(
    () => [
      {
        value: contextFeed.length,
        label:`Live context${contextFeed.length === 1 ? '' : 's'} nearby`,
        icon: <ShareLocationIcon sx={{ fontSize: '28px', color: 'primary.main' }}/>
      },
      {
        value: contextFeed.reduce((sum, event) => sum + event.attendees.length, 0),
        label: `${contextFeed.reduce((sum, event) => sum + event.attendees.length == 1 ? 'Person' : 'People')} visible now`,
        icon: <Groups2Icon sx={{ fontSize: '28px', color: 'primary.main' }}/>
      },
      {
        value: contextFeed.filter((event) => event.vibe === 'quiet').length,
        label: `Quiet option${contextFeed.filter((event) => event.vibe === 'quiet').length === 1 ? '' : 's'}`,
        icon: <SpaIcon sx={{ color: 'primary.main' }}/>
      },
    ],
    [contextFeed],
  );

  return (
    <Card sx={{ height: '100%', mb: 5 }}>
      <CardContent sx={{ py: 2.5, px: 3, }}>
        <Stack direction='row' spacing={2} sx={{ alignItems: 'center', mb: 2 }}>
          <Box
            sx={{
              width: 46,
              height: 46,
              borderRadius: 2,
              bgcolor: subtleSurface,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <AnalyticsIcon sx={{ fontSize: 30, color: 'primary.main' }} />
          </Box>
          <Box>
            <Typography variant="h6" fontWeight={800}>
            Feed Summary
          </Typography>
          </Box>
        </Stack>
        <Stack direction='row' spacing={4} sx={{ width: '100%', justifyContent: 'center'}}>
          {stats.map((stat) => (
            <Box
              key={stat.label}
              sx={{
                p: 1.5,
                borderRadius: 2,
                bgcolor: 'action.hover',
                textAlign: 'center',
                minWidth: '25%'
              }}
            >
              <Stack direction='row' spacing={1} sx={{ alignItems: 'center', justifyContent: 'center' }}>
                {stat.icon}
                <Typography variant="h5" fontWeight={800}>{stat.value}</Typography>
              </Stack>
              <Typography variant="body1" color="text.secondary">{stat.label}</Typography>
            </Box>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}

export default function FeedPage({
  socialBattery,
  setSocialBattery,
  openToTalk,
  setOpenToTalk,
  userInterests,
  onSelectEvent,
  userProfile,
  setTab
}) {
  const [activeFilter, setActiveFilter] = useState('All');
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const battery = batteryLevels[socialBattery];
  const universityName = userProfile?.university || 'your campus';
  const { contextFeed } = useMemo(
    () => getUniversityMockData(userProfile?.university),
    [userProfile?.university],
  );
  const subtleSurface = alpha(theme.palette.primary.main, isDark ? 0.14 : 0.07);
  const successSurface = alpha(theme.palette.success.main, isDark ? 0.18 : 0.1);

  // Filter events based on active filter and user interests
  let filtered = activeFilter === 'All'
    ? [...contextFeed]
    : contextFeed.filter(
        (e) => e.vibe === activeFilter.toLowerCase() || e.tags.some((t) => t.toLowerCase() === activeFilter.toLowerCase()),
      );

  // Filter based on availability
  if (openToTalk !== 'open_to_connect') {
    filtered = filtered.filter(event => event.mutualCount > 0);
  }

  // Filter based on social battery
  if (socialBattery === 'low') {
    filtered = filtered.filter(event => event.vibe === 'quiet' && parseInt(event.distance.split(' ')[0]) < 5);
  } else if (socialBattery === 'medium') {
    filtered = filtered.filter(event => parseInt(event.distance.split(' ')[0]) < 5);
  }

  // If user has interests, prioritize events with matching tags
  if (userInterests.length > 0) {
    filtered = filtered.sort((a, b) => {
      const aHasInterest = a.tags.some((tag) => userInterests.some((interest) => tag.toLowerCase().includes(interest.toLowerCase())));
      const bHasInterest = b.tags.some((tag) => userInterests.some((interest) => tag.toLowerCase().includes(interest.toLowerCase())));
      return aHasInterest === bHasInterest ? 0 : aHasInterest ? -1 : 1;
    });
  }

  const [detailsAnchorEl, setDetailsAnchorEl] = useState(null);
  const detailsOpen = Boolean(detailsAnchorEl);

  const activeFilterText =
    activeFilter === 'All'
      ? 'All event types'
      : `${activeFilter} events`;

  const availabilityMeta = getAvailabilityMeta(openToTalk);
  const batteryLabel = battery?.label || socialBattery;

  const feedReasonParts = [];

  if (activeFilter !== 'All') {
    feedReasonParts.push();
  }

  if (socialBattery === 'low') {
    if (activeFilter === "Quiet") {
      feedReasonParts.push('that are less than 5 minutes away, because your social battery is low');
    } else {
      feedReasonParts.push('that are quiet and less than 5 minutes away, because your social battery is low');
    }
  } else if (socialBattery === 'medium') {
    feedReasonParts.push('that are less than 5 minutes away, because your social battery is medium');
  }

  if (openToTalk !== 'open_to_connect') {
    feedReasonParts.push('with mutuals going, because you are not fully open to connect');
  }

  const feedExplanation =
    feedReasonParts.length > 0
      ? `Showing ${activeFilterText.toLowerCase()} ${feedReasonParts.join(', ')}.`
      : 'Showing all nearby campus contexts based on your current vibe.';

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, mb: 2.5 }}>
        <PageHero
          universityName={universityName}
          contextCount={contextFeed.length}
        />
      </Box>

      <Grid container spacing={3} sx={{ mb: 5 }}>
        <Grid item sx={{ width: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 1.5,
              mb: 2,
              width: '100%'
            }}
          >
            <Stack direction="row" spacing={1} sx={{ overflowX: 'auto', pb: 0.5, width: '100%', '&::-webkit-scrollbar': { display: 'none' } }}>
              {vibeFilters.map((f) => (
                <Chip
                  key={f}
                  label={f}
                  clickable
                  onClick={() => setActiveFilter(f)}
                  color={activeFilter === f ? 'primary' : 'default'}
                  variant={activeFilter === f ? 'filled' : 'outlined'}
                  sx={{
                    fontWeight: 700,
                    bgcolor: activeFilter === f ? undefined : subtleSurface,
                    borderColor: 'divider',
                    flexShrink: 0,
                  }}
                />
              ))}
            </Stack>

            <Box
              sx={{
                minWidth: 'fit-content',
                display: 'flex',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <TuneIcon sx={{ fontSize: 24, color: 'primary.main' }} />

                <Typography variant="body2" sx={{ fontWeight: 800, whiteSpace: 'nowrap', fontSize: '16px' }}>
                  {filtered.length} shown
                </Typography>
              </Box>

              <Button
                size="small"
                variant="outlined"
                endIcon={<KeyboardArrowDownIcon />}
                onClick={(e) => setDetailsAnchorEl(e.currentTarget)}
                sx={{
                  minWidth: 0,
                  fontWeight: 800,
                  textTransform: 'none',
                  whiteSpace: 'nowrap',
                  px: 2,
                  py: 1
                }}
              >
                Feed details
              </Button>

              <Popover
                open={detailsOpen}
                anchorEl={detailsAnchorEl}
                onClose={() => setDetailsAnchorEl(null)}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                slotProps={{
                  paper: {
                    sx: {
                      mt: 0.3,
                      width: '450px',
                      maxWidth: '30vw',
                      border: "2px solid",
                      borderColor: "primary.main",
                      borderRadius: 2
                    }
                  }
                }}
              >
                <Stack spacing={2} sx={{ py: 2, px: 3 }}>
                  <Stack spacing={0.3}>
                    <Typography variant="body1" sx={{ fontWeight: 800 }}>
                      Why these events?
                    </Typography>

                    <Typography
                      variant="body1"
                      sx={{
                        color: "text.secondary",
                        whiteSpace: 'normal',
                        wordBreak: 'break-word',
                      }}
                    >
                      {feedExplanation}
                    </Typography>
                  </Stack>

                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => {
                      setTab(3);
                      setTimeout(() => {
                        document.getElementById('settings-section')?.scrollIntoView({
                          behavior: 'smooth',
                        });
                      }, 100);
                    }}
                    sx={{
                      alignSelf: 'flex-end',
                      textTransform: 'none',
                      fontSize: '0.75rem',
                      px: 1.2,
                      py: 0.4,
                    }}
                  >
                    More details
                  </Button>
                </Stack>
              </Popover>
            </Box>
            
          </Box>

          {filtered.length === 0 ? (
            <Box
              sx={{
                textAlign: 'center',
                py: 8,
                px: 3,
                bgcolor: 'background.paper',
                borderRadius: 5,
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <SearchOffIcon sx={{ fontSize: 56, color: 'text.secondary', opacity: 0.5, mb: 2 }} />
              <Typography variant="h6" fontWeight={800} sx={{ mb: 1 }}>
                No events match your filter
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 400, mx: 'auto', mb: 2.5 }}>
                Try a different filter, or reset to "All" to see everything nearby.
              </Typography>
              <Button variant="outlined" onClick={() => setActiveFilter('All')}>
                Show all events
              </Button>
            </Box>
          ) : (
            <Grid container spacing={2} sx={{ alignItems: 'center', justifyContent: 'center' }}>
              {filtered.map((event) => (
                <Grid key={event.id} item xs={12} sm={6} md={4}>
                  <ContextCard event={event} onSelect={onSelectEvent} />
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
      </Grid>

      <QuickStats contextFeed={contextFeed} />
    </Box>
  );
}
