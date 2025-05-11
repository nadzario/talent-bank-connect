
// Main API export file that consolidates all the services
import { eventService } from './eventService';
import { userService } from './userService';
import { studentService } from './studentService';
import { notificationService } from './notificationService';
import { municipalityService } from './municipalityService';
import { schoolService } from './schoolService';
import { classService } from './classService';
import { studentsService } from './students.service';

export const api = {
  // Events
  getEvents: eventService.getEvents,
  createEvent: eventService.createEvent,
  updateEvent: eventService.updateEvent,
  deleteEvent: eventService.deleteEvent,
  
  // Users
  getUsers: userService.getUsers,
  
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
};
