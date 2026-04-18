import { useState } from 'react';
import {
  Box, Typography, Card, CardContent, Avatar, Chip,
  Badge, Divider, TextField, IconButton, Dialog,
  DialogTitle, DialogContent, Stack, Button,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import { messages } from '../data/mockData';

const avatarColors = {
  R: '#2D6A4F',
  S: '#B45309',
  J: '#1D4ED8',
};

const mockConversation = [
  { from: 'other', text: 'Hey! Are you heading to the study session later?', time: '14:30' },
  { from: 'me', text: 'Yeah I was thinking about it! When are you going?', time: '14:31' },
  { from: 'other', text: 'Probably around 3pm — good table near the window 😊', time: '14:32' },
];

function ChatDialog({ msg, open, onClose }) {
  const [text, setText] = useState('');
  const [chat, setChat] = useState(mockConversation);

  const send = () => {
    if (!text.trim()) return;
    setChat(prev => [...prev, { from: 'me', text: text.trim(), time: 'Now' }]);
    setText('');
  };

  if (!msg) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      PaperProps={{ sx: { borderRadius: 4, m: 1, maxHeight: '85vh' } }}
    >
      <DialogTitle sx={{ pb: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Avatar
            sx={{ bgcolor: avatarColors[msg.avatar] || 'primary.main', width: 36, height: 36, fontWeight: 700 }}
          >
            {msg.avatar}
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1" fontWeight={700} sx={{ lineHeight: 1.2 }}>
              {msg.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">via {msg.context}</Typography>
          </Box>
          <IconButton size="small" onClick={onClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ display: 'flex', flexDirection: 'column', p: 0 }}>
        {/* Context banner */}
        <Box sx={{ px: 2, py: 1, bgcolor: '#F8F5F0', borderBottom: '1px solid', borderColor: 'divider' }}>
          <Typography variant="caption" color="text.secondary">
            💡 You connected through <strong>{msg.context}</strong>
          </Typography>
        </Box>

        {/* Messages */}
        <Box sx={{ flex: 1, overflowY: 'auto', px: 2, py: 2 }}>
          {chat.map((c, i) => (
            <Box
              key={i}
              sx={{
                display: 'flex',
                justifyContent: c.from === 'me' ? 'flex-end' : 'flex-start',
                mb: 1.5,
              }}
            >
              <Box
                sx={{
                  maxWidth: '75%',
                  bgcolor: c.from === 'me' ? 'primary.main' : 'white',
                  color: c.from === 'me' ? 'white' : 'text.primary',
                  border: c.from === 'other' ? '1px solid' : 'none',
                  borderColor: 'divider',
                  borderRadius: c.from === 'me' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  px: 2,
                  py: 1.2,
                }}
              >
                <Typography variant="body2">{c.text}</Typography>
                <Typography
                  variant="caption"
                  sx={{
                    display: 'block',
                    mt: 0.3,
                    textAlign: 'right',
                    opacity: 0.7,
                    fontSize: '0.65rem',
                  }}
                >
                  {c.time}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>

        {/* Input */}
        <Box
          sx={{
            px: 2,
            py: 1.5,
            borderTop: '1px solid',
            borderColor: 'divider',
            display: 'flex',
            gap: 1,
            alignItems: 'center',
          }}
        >
          <TextField
            fullWidth
            size="small"
            placeholder="Type a message..."
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
            sx={{
              '& .MuiOutlinedInput-root': { borderRadius: 50, bgcolor: '#F8F5F0' },
              '& fieldset': { borderColor: '#E8E4DE' },
            }}
          />
          <IconButton
            color="primary"
            onClick={send}
            disabled={!text.trim()}
            sx={{ bgcolor: 'primary.main', color: 'white', '&:hover': { bgcolor: 'primary.dark' }, '&.Mui-disabled': { bgcolor: '#E8E4DE' } }}
          >
            <SendIcon fontSize="small" />
          </IconButton>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default function MessagesPage() {
  const [selected, setSelected] = useState(null);

  const selectedMsg = messages.find(m => m.id === selected);

  return (
    <Box sx={{ px: 2.5, pt: 4, pb: 2 }}>
      <Typography variant="h4" sx={{ fontSize: '1.5rem', fontWeight: 700, mb: 0.5 }}>
        Messages
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Every chat started from a real shared moment
      </Typography>

      {messages.map((msg, i) => (
        <Card
          key={msg.id}
          onClick={() => setSelected(msg.id)}
          sx={{
            mb: 1.5,
            cursor: 'pointer',
            border: msg.unread ? '1.5px solid' : '1px solid',
            borderColor: msg.unread ? 'primary.light' : 'divider',
            bgcolor: msg.unread ? '#F8FFF9' : 'white',
            '&:hover': { boxShadow: 3 },
          }}
        >
          <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Badge
                overlap="circular"
                badgeContent={msg.unread ? ' ' : 0}
                sx={{
                  '& .MuiBadge-badge': {
                    bgcolor: '#52B788',
                    width: 10,
                    height: 10,
                    minWidth: 10,
                    borderRadius: '50%',
                  },
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: avatarColors[msg.avatar] || 'primary.main',
                    width: 46,
                    height: 46,
                    fontWeight: 700,
                  }}
                >
                  {msg.avatar}
                </Avatar>
              </Badge>

              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="subtitle2" fontWeight={msg.unread ? 700 : 600}>
                    {msg.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">{msg.time}</Typography>
                </Box>
                <Typography
                  variant="body2"
                  color={msg.unread ? 'text.primary' : 'text.secondary'}
                  fontWeight={msg.unread ? 500 : 400}
                  noWrap
                >
                  {msg.preview}
                </Typography>
                <Chip
                  label={`📍 ${msg.context}`}
                  size="small"
                  sx={{
                    mt: 0.8,
                    height: 18,
                    fontSize: '0.65rem',
                    bgcolor: '#F3F4F6',
                    color: 'text.secondary',
                  }}
                />
              </Box>
            </Box>
          </CardContent>
        </Card>
      ))}

      <Box
        sx={{
          mt: 3,
          p: 2.5,
          bgcolor: 'white',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 3,
          textAlign: 'center',
        }}
      >
        <Typography variant="body2" color="text.secondary">
          🌱 New chats start from shared moments on campus, not cold messages.
        </Typography>
      </Box>

      <ChatDialog
        msg={selectedMsg}
        open={!!selected}
        onClose={() => setSelected(null)}
      />
    </Box>
  );
}
