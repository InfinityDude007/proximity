// LocalStorage utilities for persisting user preferences

const STORAGE_KEYS = {
  SOCIAL_BATTERY: 'proximity_social_battery',
  USER_INTERESTS: 'proximity_user_interests',
  OPEN_TO_TALK: 'proximity_open_to_talk',
  ONBOARDED: 'proximity_onboarded',
};

export const loadUserPreferences = () => {
  try {
    return {
      socialBattery: localStorage.getItem(STORAGE_KEYS.SOCIAL_BATTERY) || 'medium',
      userInterests: JSON.parse(localStorage.getItem(STORAGE_KEYS.USER_INTERESTS)) || [],
      openToTalk: localStorage.getItem(STORAGE_KEYS.OPEN_TO_TALK) === 'true',
      onboarded: localStorage.getItem(STORAGE_KEYS.ONBOARDED) === 'true',
    };
  } catch (error) {
    console.error('Error loading preferences:', error);
    return {
      socialBattery: 'medium',
      userInterests: [],
      openToTalk: true,
      onboarded: false,
    };
  }
};

export const saveSocialBattery = (value) => {
  localStorage.setItem(STORAGE_KEYS.SOCIAL_BATTERY, value);
};

export const saveUserInterests = (interests) => {
  localStorage.setItem(STORAGE_KEYS.USER_INTERESTS, JSON.stringify(interests));
};

export const saveOpenToTalk = (value) => {
  localStorage.setItem(STORAGE_KEYS.OPEN_TO_TALK, value.toString());
};

export const saveOnboarded = (value) => {
  localStorage.setItem(STORAGE_KEYS.ONBOARDED, value.toString());
};

export const clearAllPreferences = () => {
  Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key));
};
