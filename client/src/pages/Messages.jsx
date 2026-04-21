import { useMemo, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Chip,
  Badge,
  TextField,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  List,
  ListItemButton,
  Stack,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import { messages } from '../data/mockData';
import { alpha, useTheme } from '@mui/material/styles';

const avatarColors = {
  R: '#2D6A4F',
  S: '#B45309',
  J: '#1D4ED8',
};

const mockConversation = [
  { from: 'other', text: 'Hey! Are you heading to the study session later?', time: '14:30' },
  { from: 'me', text: 'Yeah I was thinking about it! When are you going?', time: '14:31' },
  { from: 'other', text: 'Probably around 3pm - good table near the window', time: '14:32' },
];

function ChatDialog({ msg, open, onClose }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const subtleSurface = alpha(theme.palette.primary.main, isDark ? 0.14 : 0.07);
  const [text, setText] = useState('');
  const [chat, setChat] = useState(mockConversation);

  const send = () => {
    if (!text.trim()) return;
    setChat((prev) => [...prev, { from: 'me', text: text.trim(), time: 'Now' }]);
    setText('');
  };

  if (!msg) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md" PaperProps={{ sx: { borderRadius: 5, minHeight: { md: 620 } } }}>
      <DialogTitle sx={{ pb: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Avatar sx={{ bgcolor: avatarColors[msg.avatar] || 'primary.main', width: 42, height: 42, fontWeight: 800 }}>
            {msg.avatar}
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1" fontWeight={800}>{msg.name}</Typography>
            <Typography variant="caption" color="text.secondary">via {msg.context}</Typography>
          </Box>
          <IconButton size="small" onClick={onClose}><CloseIcon fontSize="small" /></IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ display: 'flex', flexDirection: 'column', p: 0 }}>
        <Box sx={{ px: 2.5, py: 1.25, bgcolor: 'action.hover', borderBottom: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center', gap: 1 }}>
          <LightbulbIcon sx={{ fontSize: 18, color: 'primary.main' }} />
          <Typography variant="caption" color="text.secondary">You connected through <strong>{msg.context}</strong></Typography>
        </Box>

        <Box sx={{ flex: 1, overflowY: 'auto', px: { xs: 2, md: 3 }, py: 2.5 }}>
          {chat.map((c, i) => (
            <Box key={i} sx={{ display: 'flex', justifyContent: c.from === 'me' ? 'flex-end' : 'flex-start', mb: 1.6 }}>
              <Box
                sx={{
                  maxWidth: { xs: '84%', md: '68%' },
                  bgcolor: c.from === 'me' ? 'primary.main' : 'background.paper',
                  color: c.from === 'me' ? 'primary.contrastText' : 'text.primary',
                  border: c.from === 'other' ? '1px solid' : 'none',
                  borderColor: 'divider',
                  borderRadius: c.from === 'me' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  px: 2,
                  py: 1.2,
                }}
              >
                <Typography variant="body2">{c.text}</Typography>
                <Typography variant="caption" sx={{ display: 'block', mt: 0.3, textAlign: 'right', opacity: 0.75, fontSize: '0.68rem' }}>
                  {c.time}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>

        <Box sx={{ px: { xs: 2, md: 3 }, py: 1.8, borderTop: '1px solid', borderColor: 'divider', display: 'flex', gap: 1, alignItems: 'center' }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send()}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 999, bgcolor: subtleSurface } }}
          />
          <IconButton color="primary" onClick={send} disabled={!text.trim()} sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', '&:hover': { bgcolor: 'primary.dark' }, '&.Mui-disabled': { bgcolor: 'action.disabledBackground', color: 'action.disabled' } }}>
            <SendIcon fontSize="small" />
          </IconButton>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

function MessageCard({ msg, onOpen }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const unreadSurface = alpha(theme.palette.success.main, isDark ? 0.16 : 0.08);
  const subtleSurface = alpha(theme.palette.primary.main, isDark ? 0.14 : 0.07);

  return (
    <Card
      onClick={() => onOpen(msg.id)}
      sx={{
        cursor: 'pointer',
        border: msg.unread ? '1.5px solid' : '1px solid',
        borderColor: msg.unread ? 'primary.light' : 'divider',
        bgcolor: msg.unread ? unreadSurface : 'background.paper',
        '&:hover': { boxShadow: 4, transform: 'translateY(-2px)' },
        transition: 'all 0.15s ease',
      }}
    >
      <CardContent sx={{ p: 2.1, '&:last-child': { pb: 2.1 } }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Badge
            overlap="circular"
            variant={msg.unread ? 'dot' : 'standard'}
            sx={{ '& .MuiBadge-badge': { bgcolor: 'success.main' } }}
          >
            <Avatar sx={{ bgcolor: avatarColors[msg.avatar] || 'primary.main', width: 48, height: 48, fontWeight: 800 }}>{msg.avatar}</Avatar>
          </Badge>

          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1, alignItems: 'center', mb: 0.2 }}>
              <Typography variant="subtitle2" fontWeight={msg.unread ? 800 : 700} noWrap>{msg.name}</Typography>
              <Typography variant="caption" color="text.secondary" sx={{ flexShrink: 0 }}>{msg.time}</Typography>
            </Box>
            <Typography variant="body2" color={msg.unread ? 'text.primary' : 'text.secondary'} fontWeight={msg.unread ? 500 : 400} noWrap>
              {msg.preview}
            </Typography>
            <Chip label={`📍 ${msg.context}`} size="small" sx={{ mt: 0.9, bgcolor: subtleSurface, color: 'text.secondary' }} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default function MessagesPage() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const subtleSurface = alpha(theme.palette.primary.main, isDark ? 0.14 : 0.07);
  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState('');

  const filteredMessages = useMemo(
    () => messages.filter((m) => [m.name, m.preview, m.context].join(' ').toLowerCase().includes(query.toLowerCase())),
    [query],
  );

  const selectedMsg = messages.find((m) => m.id === selected);

  return (
    <Box>
      <Box sx={{ mb: 3.2 }}>
        <Typography variant="h3" sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, mb: 0.8 }}>Messages</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 720 }}>
          Every conversation here started from a real shared moment — a study session, a café, or an event you both attended.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} xl={4.2}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 2.5 }}>
              <Typography variant="subtitle1" fontWeight={800} sx={{ mb: 1.6 }}>Inbox</Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="Search by name, place, or context"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                InputProps={{ startAdornment: <SearchRoundedIcon fontSize="small" style={{ marginRight: 8, opacity: 0.65 }} /> }}
                sx={{ mb: 2 }}
              />
              <List sx={{ p: 0, display: 'grid', gap: 1.2 }}>
                {filteredMessages.length === 0 ? (
                  <Box sx={{ textAlign: 'center', py: 5 }}>
                    <ForumOutlinedIcon sx={{ fontSize: 48, color: 'text.secondary', opacity: 0.4, mb: 1.5 }} />
                    <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 0.5 }}>
                      {query ? 'No messages found' : 'No messages yet'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 260, mx: 'auto' }}>
                      {query
                        ? 'Try a different search term.'
                        : 'Start a conversation by saying hi to someone at a nearby event.'}
                    </Typography>
                  </Box>
                ) : (
                  filteredMessages.map((msg) => (
                    <ListItemButton
                      key={msg.id}
                      onClick={() => setSelected(msg.id)}
                      sx={{ p: 0, borderRadius: 3, display: 'block' }}
                    >
                      <MessageCard msg={msg} onOpen={setSelected} />
                    </ListItemButton>
                  ))
                )}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} xl={7.8}>
          <Card sx={{ minHeight: 620, height: '100%' }}>
            <CardContent sx={{ p: { xs: 2.5, md: 3.5 }, height: '100%' }}>
              {selectedMsg ? (
                <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
                    <Avatar sx={{ bgcolor: avatarColors[selectedMsg.avatar] || 'primary.main', width: 52, height: 52, fontWeight: 800 }}>
                      {selectedMsg.avatar}
                    </Avatar>
                    <Box>
                      <Typography variant="h6" fontWeight={800}>{selectedMsg.name}</Typography>
                      <Typography variant="body2" color="text.secondary">Connected through {selectedMsg.context}</Typography>
                    </Box>
                  </Box>

                  <Stack spacing={1.5} sx={{ flex: 1 }}>
                    {mockConversation.map((c, i) => (
                      <Box key={i} sx={{ display: 'flex', justifyContent: c.from === 'me' ? 'flex-end' : 'flex-start' }}>
                        <Box
                          sx={{
                            maxWidth: '75%',
                            bgcolor: c.from === 'me' ? 'primary.main' : 'action.hover',
                            color: c.from === 'me' ? 'primary.contrastText' : 'text.primary',
                            borderRadius: c.from === 'me' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                            px: 2,
                            py: 1.35,
                          }}
                        >
                          <Typography variant="body2">{c.text}</Typography>
                        </Box>
                      </Box>
                    ))}
                  </Stack>

                  <Box sx={{ mt: 2.5, display: 'flex', gap: 1 }}>
                    <TextField fullWidth size="small" placeholder="Type a message..." sx={{ '& .MuiOutlinedInput-root': { borderRadius: 999, bgcolor: subtleSurface } }} />
                    <IconButton sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', '&:hover': { bgcolor: 'primary.dark' } }}>
                      <SendIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              ) : (
                <Box sx={{ height: '100%', display: 'grid', placeItems: 'center', textAlign: 'center' }}>
                  <Box>
                    <Typography variant="h5" fontWeight={800} sx={{ mb: 1 }}>Select a conversation</Typography>
                    <Typography variant="body2" color="text.secondary">
                      The chat preview panel is now desktop-friendly. Click a message to open a wider conversation view.
                    </Typography>
                  </Box>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <ChatDialog msg={selectedMsg} open={Boolean(selectedMsg)} onClose={() => setSelected(null)} />
    </Box>
  );
}
