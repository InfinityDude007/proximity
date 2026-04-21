import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import BoltIcon from '@mui/icons-material/Bolt';
import PeopleIcon from '@mui/icons-material/People';
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
import BrushIcon from '@mui/icons-material/Brush';
import PsychologyIcon from '@mui/icons-material/Psychology';
import ScienceIcon from '@mui/icons-material/Science';
import PublicIcon from '@mui/icons-material/Public';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import CodeIcon from '@mui/icons-material/Code';
import SchoolIcon from '@mui/icons-material/School';
import CampaignIcon from '@mui/icons-material/Campaign';
import CelebrationIcon from '@mui/icons-material/Celebration';
import TheatersIcon from '@mui/icons-material/Theaters';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import ParkIcon from '@mui/icons-material/Park';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import HikingIcon from '@mui/icons-material/Hiking';
import PetsIcon from '@mui/icons-material/Pets';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import SpaIcon from '@mui/icons-material/Spa';
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';
import RamenDiningIcon from '@mui/icons-material/RamenDining';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import PoolIcon from '@mui/icons-material/Pool';
import MusicVideoIcon from '@mui/icons-material/MusicVideo';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import PianoIcon from '@mui/icons-material/Piano';
import MicIcon from '@mui/icons-material/Mic';
import VideocamIcon from '@mui/icons-material/Videocam';
import ComputerIcon from '@mui/icons-material/Computer';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import LanguageIcon from '@mui/icons-material/Language';
import TranslateIcon from '@mui/icons-material/Translate';
import Groups2Icon from '@mui/icons-material/Groups2';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

const baseInterestOptions = [
    { label: 'Coffee', icon: <LocalCafeIcon fontSize="small" /> },
    { label: 'Tea', icon: <EmojiFoodBeverageIcon fontSize="small" /> },
    { label: 'Food', icon: <RamenDiningIcon fontSize="small" /> },
    { label: 'Study Groups', icon: <MenuBookIcon fontSize="small" /> },
    { label: 'Studying', icon: <SchoolIcon fontSize="small" /> },
    { label: 'Reading', icon: <AutoStoriesIcon fontSize="small" /> },
    { label: 'Music', icon: <MusicNoteIcon fontSize="small" /> },
    { label: 'Live Music', icon: <MicIcon fontSize="small" /> },
    { label: 'Concerts', icon: <MusicVideoIcon fontSize="small" /> },
    { label: 'Podcasts', icon: <GraphicEqIcon fontSize="small" /> },
    { label: 'Instruments', icon: <PianoIcon fontSize="small" /> },
    { label: 'Gaming', icon: <SportsEsportsIcon fontSize="small" /> },
    { label: 'Tech', icon: <ComputerIcon fontSize="small" /> },
    { label: 'Coding', icon: <CodeIcon fontSize="small" /> },
    { label: 'AI', icon: <SmartToyIcon fontSize="small" /> },
    { label: 'Fitness', icon: <FitnessCenterIcon fontSize="small" /> },
    { label: 'Running', icon: <DirectionsRunIcon fontSize="small" /> },
    { label: 'Yoga', icon: <SelfImprovementIcon fontSize="small" /> },
    { label: 'Outdoors', icon: <NaturePeopleIcon fontSize="small" /> },
    { label: 'Hiking', icon: <HikingIcon fontSize="small" /> },
    { label: 'Nature', icon: <ParkIcon fontSize="small" /> },
    { label: 'Socials', icon: <PeopleIcon fontSize="small" /> },
    { label: 'Networking', icon: <Groups2Icon fontSize="small" /> },
    { label: 'Volunteering', icon: <VolunteerActivismIcon fontSize="small" /> },
    { label: 'Community', icon: <FavoriteIcon fontSize="small" /> },
    { label: 'Startups', icon: <BoltIcon fontSize="small" /> },
    { label: 'Entrepreneurship', icon: <LightbulbIcon fontSize="small" /> },
    { label: 'Marketing', icon: <CampaignIcon fontSize="small" /> },
    { label: 'Art', icon: <PaletteIcon fontSize="small" /> },
    { label: 'Design', icon: <BrushIcon fontSize="small" /> },
    { label: 'Photography', icon: <CameraAltIcon fontSize="small" /> },
    { label: 'Videography', icon: <VideocamIcon fontSize="small" /> },
    { label: 'Cooking', icon: <RestaurantIcon fontSize="small" /> },
    { label: 'Travel', icon: <FlightIcon fontSize="small" /> },
    { label: 'Languages', icon: <TranslateIcon fontSize="small" /> },
    { label: 'Culture', icon: <PublicIcon fontSize="small" /> },
    { label: 'Books', icon: <LibraryBooksIcon fontSize="small" /> },
    { label: 'Movies', icon: <MovieIcon fontSize="small" /> },
    { label: 'Theatre', icon: <TheatersIcon fontSize="small" /> },
    { label: 'Comedy', icon: <TheaterComedyIcon fontSize="small" /> },
    { label: 'Sports', icon: <SportsSoccerIcon fontSize="small" /> },
    { label: 'Basketball', icon: <SportsBasketballIcon fontSize="small" /> },
    { label: 'Tennis', icon: <SportsTennisIcon fontSize="small" /> },
    { label: 'Swimming', icon: <PoolIcon fontSize="small" /> },
    { label: 'Wellbeing', icon: <SpaIcon fontSize="small" /> },
    { label: 'Psychology', icon: <PsychologyIcon fontSize="small" /> },
    { label: 'Science', icon: <ScienceIcon fontSize="small" /> },
    { label: 'Current Affairs', icon: <NewspaperIcon fontSize="small" /> },
    { label: 'Debate', icon: <CampaignIcon fontSize="small" /> },
    { label: 'Animals', icon: <PetsIcon fontSize="small" /> },
    { label: 'Fashion', icon: <CheckroomIcon fontSize="small" /> },
    { label: 'Shopping', icon: <ShoppingBagIcon fontSize="small" /> },
    { label: 'Events', icon: <CelebrationIcon fontSize="small" /> },
    { label: 'Languages Exchange', icon: <LanguageIcon fontSize="small" /> },
];

export const interestOptions = [...baseInterestOptions].sort((a, b) => a.label.localeCompare(b.label));
