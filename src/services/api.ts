
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const api = {
  // Users
  async getUsers() {
    try {
      return await prisma.user.findMany();
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },
  
  // Students
  async getStudents() {
    try {
      return await prisma.student.findMany({
        include: {
          class: true,
          participations: {
            include: {
              mentor: true,
              event: true
            }
          }
        }
      });
    } catch (error) {
      console.error('Error fetching students:', error);
      throw error;
    }
  },

  async createStudent(data) {
    try {
      return await prisma.student.create({
        data,
        include: {
          class: true,
          participations: true
        }
      });
    } catch (error) {
      console.error('Error creating student:', error);
      throw error;
    }
  },

  async updateStudent(id: number, data) {
    try {
      return await prisma.student.update({
        where: { id },
        data,
        include: {
          class: true,
          participations: true
        }
      });
    } catch (error) {
      console.error('Error updating student:', error);
      throw error;
    }
  },

  async deleteStudent(id: number) {
    try {
      return await prisma.student.delete({
        where: { id }
      });
    } catch (error) {
      console.error('Error deleting student:', error);
      throw error;
    }
  },
  
  // Events
  async getEvents() {
    try {
      const events = await prisma.event.findMany({
        include: {
          project: {
            include: {
              profile: true
            }
          },
          olympiad: {
            include: {
              profile: true
            }
          }
        }
      });
      return events.map(event => ({
        ...event,
        type: event.project ? 'project' : 'olympiad'
      }));
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  },

  async createEvent(data) {
    try {
      return await prisma.event.create({
        data,
        include: {
          project: true,
          olympiad: true
        }
      });
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  },

  async updateEvent(id: number, data) {
    try {
      return await prisma.event.update({
        where: { id },
        data,
        include: {
          project: true,
          olympiad: true
        }
      });
    } catch (error) {
      console.error('Error updating event:', error);
      throw error;
    }
  },

  async deleteEvent(id: number) {
    try {
      return await prisma.event.delete({
        where: { id }
      });
    } catch (error) {
      console.error('Error deleting event:', error);
      throw error;
    }
  },

  // Notifications
  async getNotifications(userRole?: string, userId?: number) {
    try {
      let whereClause = {};
      
      // Фильтрация по роли и ID пользователя
      if (userRole === 'MUNICIPALITY' && userId) {
        whereClause = {
          OR: [
            { recipientType: 'ALL' },
            { 
              recipientType: 'MUNICIPALITY',
              OR: [
                { recipientId: null },
                { recipientId: userId }
              ]
            }
          ]
        };
      } else if (userRole === 'SCHOOL' && userId) {
        whereClause = {
          OR: [
            { recipientType: 'ALL' },
            { 
              recipientType: 'SCHOOL',
              OR: [
                { recipientId: null },
                { recipientId: userId }
              ]
            }
          ]
        };
      }
      
      return await prisma.notification.findMany({
        where: whereClause,
        orderBy: { id: 'desc' }
      });
    } catch (error) {
      console.error('Error fetching notifications:', error);
      throw error;
    }
  },

  async createNotification(data) {
    try {
      return await prisma.notification.create({
        data
      });
    } catch (error) {
      console.error('Error creating notification:', error);
      throw error;
    }
  },

  async markNotificationAsRead(id: number) {
    try {
      // В реальном приложении вам нужно будет добавить поле read в модель Notification
      // Так как его нет в схеме, это просто заглушка
      console.log(`Marking notification ${id} as read`);
      return { id, success: true };
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw error;
    }
  },

  // Municipalities 
  async getMunicipalities() {
    try {
      return await prisma.municipality.findMany({
        include: {
          schools: true
        }
      });
    } catch (error) {
      console.error('Error fetching municipalities:', error);
      throw error;
    }
  },

  async createMunicipality(data) {
    try {
      return await prisma.municipality.create({
        data
      });
    } catch (error) {
      console.error('Error creating municipality:', error);
      throw error;
    }
  },

  // Schools
  async getSchools() {
    try {
      return await prisma.school.findMany({
        include: {
          municipality: true,
          classes: true,
          operator: true
        }
      });
    } catch (error) {
      console.error('Error fetching schools:', error);
      throw error;
    }
  },

  async createSchool(data) {
    try {
      return await prisma.school.create({
        data,
        include: {
          municipality: true,
          classes: true
        }
      });
    } catch (error) {
      console.error('Error creating school:', error);
      throw error;
    }
  },

  // Classes
  async getClasses() {
    try {
      return await prisma.class.findMany({
        include: {
          school: true,
          students: true
        }
      });
    } catch (error) {
      console.error('Error fetching classes:', error);
      throw error;
    }
  },

  async createClass(data) {
    try {
      return await prisma.class.create({
        data,
        include: {
          school: true
        }
      });
    } catch (error) {
      console.error('Error creating class:', error);
      throw error;
    }
  }
};
