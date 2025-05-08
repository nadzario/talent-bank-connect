
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
  }
};
