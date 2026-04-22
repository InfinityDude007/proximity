import { supportedUniversities } from './mockData';

export const YEAR_OPTIONS = ['Foundation', '1st Year', '2nd Year', '3rd Year', '4th Year', 'Postgraduate', 'PhD'];

export const UAE_UNIVERSITY_OPTIONS = supportedUniversities;

export const defaultUserProfile = {
  id: 'u0',
  name: 'Alex',
  avatar: 'A',
  degree: 'Computer Science',
  year: '2nd Year',
  university: 'University of Birmingham Dubai',
};

export const emptyUserProfile = {
  id: 'u0',
  name: '',
  avatar: '?',
  degree: '',
  year: '',
  university: '',
};

export const getAvatarFromName = (name = '', fallbackAvatar = emptyUserProfile.avatar) => {
  const trimmedName = name.trim();
  return trimmedName ? trimmedName.charAt(0).toUpperCase() : fallbackAvatar;
};

export const buildUserProfile = (profile = {}, fallbackProfile = emptyUserProfile) => {
  const mergedProfile = {
    ...fallbackProfile,
    ...profile,
  };

  return {
    ...mergedProfile,
    avatar: getAvatarFromName(mergedProfile.name, mergedProfile.avatar),
  };
};
