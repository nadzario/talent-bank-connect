
// Main API export file that consolidates all the services
import { eventService } from './eventService';
import { userService } from './userService';
import { studentService } from './studentService';
import { notificationService } from './notificationService';
import { municipalityService } from './municipalityService';
import { schoolService } from './schoolService';
import { classService } from './classService';
import { studentsService } from './students.service';
import { usersService } from './users.service';
import { mentorsService } from './mentorsService';
import { participationService } from './participationService';
import { directionsService } from './directionsService';
import { academicProfileService } from './academicProfileService';
import { projectsService } from './projectsService';
import { olympiadsService } from './olympiadsService';

export const api = {
  // Events
  getEvents: eventService.getEvents,
  createEvent: eventService.createEvent,
  updateEvent: eventService.updateEvent,
  deleteEvent: eventService.deleteEvent,
  
  // Users
  getUsers: userService.getUsers,
  
  // Extended Users API
  getUserProfiles: usersService.getUsers,
  getUserProfileById: usersService.getUserById,
  createUserProfile: usersService.createProfile,
  updateUserProfile: usersService.updateProfile,
  
  // Students
  getStudents: studentService.getStudents,
  createStudent: studentService.createStudent,
  updateStudent: studentService.updateStudent,
  deleteStudent: studentService.deleteStudent,
  
  // Extended Students API
  getStudentsExtended: studentsService.getStudents,
  getStudentById: studentsService.getStudentById,
  
  // Notifications
  getNotifications: notificationService.getNotifications,
  createNotification: notificationService.createNotification,
  markNotificationAsRead: notificationService.markNotificationAsRead,
  markAllNotificationsAsRead: notificationService.markAllNotificationsAsRead,
  
  // Municipalities
  getMunicipalities: municipalityService.getMunicipalities,
  createMunicipality: municipalityService.createMunicipality,
  
  // Schools
  getSchools: schoolService.getSchools,
  createSchool: schoolService.createSchool,
  
  // Classes
  getClasses: classService.getClasses,
  createClass: classService.createClass,

  // Mentors
  getMentors: mentorsService.getMentors,
  getMentorById: mentorsService.getMentorById,
  createMentor: mentorsService.createMentor,
  updateMentor: mentorsService.updateMentor,
  deleteMentor: mentorsService.deleteMentor,

  // Participation
  getParticipations: participationService.getParticipations,
  getParticipationById: participationService.getParticipationById,
  createParticipation: participationService.createParticipation,
  updateParticipation: participationService.updateParticipation,
  deleteParticipation: participationService.deleteParticipation,

  // Academic Directions
  getDirections: directionsService.getDirections,
  getDirectionById: directionsService.getDirectionById,
  createDirection: directionsService.createDirection,
  updateDirection: directionsService.updateDirection,
  deleteDirection: directionsService.deleteDirection,

  // Academic Profiles
  getAcademicProfiles: academicProfileService.getProfiles,
  getAcademicProfileById: academicProfileService.getProfileById,
  createAcademicProfile: academicProfileService.createProfile,
  updateAcademicProfile: academicProfileService.updateProfile,
  deleteAcademicProfile: academicProfileService.deleteProfile,

  // Projects
  getProjects: projectsService.getProjects,
  getProjectById: projectsService.getProjectById,
  createProject: projectsService.createProject,
  updateProject: projectsService.updateProject,
  deleteProject: projectsService.deleteProject,

  // Olympiads
  getOlympiads: olympiadsService.getOlympiads,
  getOlympiadById: olympiadsService.getOlympiadById,
  createOlympiad: olympiadsService.createOlympiad,
  updateOlympiad: olympiadsService.updateOlympiad,
  deleteOlympiad: olympiadsService.deleteOlympiad,
};
