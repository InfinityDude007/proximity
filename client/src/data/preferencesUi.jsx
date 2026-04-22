import Battery1BarIcon from '@mui/icons-material/Battery1Bar';
import Battery4BarIcon from '@mui/icons-material/Battery4Bar';
import BatteryFullIcon from '@mui/icons-material/BatteryFull';
import WavingHandRoundedIcon from '@mui/icons-material/WavingHandRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import DoNotDisturbOnRoundedIcon from '@mui/icons-material/DoNotDisturbOnRounded';
import { alpha } from '@mui/material/styles';

export const SOCIAL_BATTERY_ORDER = ['high', 'medium', 'low'];
export const AVAILABILITY_ORDER = ['open_to_connect', 'connections_only', 'not_available'];

export const SOCIAL_BATTERY_META = {
  low: {
    label: 'Low battery',
    description: 'Show quieter spaces and easier one-on-one moments.',
    color: '#E76F51',
  },
  medium: {
    label: 'Moderate energy',
    description: 'Mix in a balanced blend of social and quiet options.',
    color: '#F4A261',
  },
  high: {
    label: 'Fully charged',
    description: 'Show everything, including group plans and social spaces.',
    color: '#52B788',
  },
};

export const AVAILABILITY_META = {
  open_to_connect: {
    label: 'Open to connect',
    description: 'Anyone nearby in a shared space can send you a soft invite.',
    color: '#52B788',
  },
  connections_only: {
    label: 'Connections only',
    description: 'Only people you already know can reach out when you are nearby.',
    color: '#3B82F6',
  },
  not_available: {
    label: 'Not available',
    description: 'No one can reach out right now, but you can still browse.',
    color: '#8E8AA6',
  },
};

export const getSocialBatteryMeta = (value) => SOCIAL_BATTERY_META[value] || SOCIAL_BATTERY_META.medium;

export const normalizeAvailabilityStatus = (value) => {
  if (value === true || value === 'true') return 'open_to_connect';
  if (value === false || value === 'false') return 'not_available';
  return AVAILABILITY_META[value] ? value : 'open_to_connect';
};

export const getAvailabilityMeta = (value) => AVAILABILITY_META[normalizeAvailabilityStatus(value)] || AVAILABILITY_META.open_to_connect;

export const getNextAvailabilityStatus = (value) => {
  const current = normalizeAvailabilityStatus(value);
  const currentIndex = AVAILABILITY_ORDER.indexOf(current);
  const nextIndex = (currentIndex + 1) % AVAILABILITY_ORDER.length;
  return AVAILABILITY_ORDER[nextIndex];
};

export const isReachableAvailability = (value) => normalizeAvailabilityStatus(value) !== 'not_available';

export const renderSocialBatteryIcon = (value, props = {}) => {
  const icons = {
    low: <Battery1BarIcon {...props} />,
    medium: <Battery4BarIcon {...props} />,
    high: <BatteryFullIcon {...props} />,
  };

  return icons[value] || icons.medium;
};

export const renderAvailabilityIcon = (value, props = {}) => {
  const icons = {
    open_to_connect: <WavingHandRoundedIcon {...props} />,
    connections_only: <GroupRoundedIcon {...props} />,
    not_available: <DoNotDisturbOnRoundedIcon {...props} />,
  };

  return icons[normalizeAvailabilityStatus(value)] || icons.open_to_connect;
};

export const getPreferenceChipSx = (meta, isDark, { interactive = false, fullWidth = false, compact = false } = {}) => ({
  width: fullWidth ? '100%' : 'fit-content',
  minWidth: compact ? '0' : '190px',
  justifyContent: 'center',
  alignItems: 'center',
  px: 1.5,
  py: 2.5,
  fontWeight: 800,
  cursor: interactive ? 'pointer' : 'default',
  borderRadius: compact ? 10 : 3,
  border: '1px solid',
  borderColor: alpha(meta.color, isDark ? 0.28 : 0.18),
  bgcolor: alpha(meta.color, isDark ? 0.14 : 0.08),
  color: 'text.primary',
  '& .MuiChip-label': {
    width: '100%',
    px: compact ? 0 : 0.5,
  },
  '& .MuiChip-icon': {
    color: meta.color,
    mr: compact ? 0 : 1,
    ml: compact ? 0 : 1,
  },
  '&:hover': interactive
    ? {
        bgcolor: alpha(meta.color, isDark ? 0.2 : 0.12),
      }
    : undefined,
});

export const SOCIAL_BATTERY_OPTIONS = SOCIAL_BATTERY_ORDER.map((value) => {
  const meta = getSocialBatteryMeta(value);

  return {
    value,
    ...meta,
  };
});

export const AVAILABILITY_OPTIONS = AVAILABILITY_ORDER.map((value) => {
  const meta = getAvailabilityMeta(value);

  return {
    value,
    ...meta,
  };
});
