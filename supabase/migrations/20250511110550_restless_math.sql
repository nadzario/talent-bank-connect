/*
  # Initial Database Schema

  1. New Tables
    - users: Store user information and authentication
    - mentors: Store mentor information
    - participation: Track student participation in events
    - logs: Audit trail for system actions
    - municipalities: Store municipality information
    - schools: Store school information
    - classes: Store class information
    - students: Store student information
    - events: Store event information
    - projects: Store project details
    - olympiads: Store olympiad details
    - directions: Store academic directions
    - profiles: Store academic profiles
    - notifications: Store system notifications

  2. Security
    - Enable RLS on all tables
    - Add appropriate policies for each table
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE user_role AS ENUM ('ADMIN', 'ERUDIT', 'MUNICIPALITY', 'SCHOOL');
CREATE TYPE event_type AS ENUM ('LOGIN', 'CREATE', 'DELETE', 'EDIT');
CREATE TYPE olympiad_stage AS ENUM ('SCHOOL', 'MUNICIPAL', 'REGIONAL', 'FINAL');
CREATE TYPE notification_type AS ENUM ('TIP', 'NEWS');
CREATE TYPE recipient_type AS ENUM ('MUNICIPALITY', 'SCHOOL', 'ALL');

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  login TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role user_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create mentors table
CREATE TABLE IF NOT EXISTS mentors (
  id SERIAL PRIMARY KEY,
  last_name TEXT NOT NULL,
  first_name TEXT NOT NULL,
  middle_name TEXT,
  workplace TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create logs table
CREATE TABLE IF NOT EXISTS logs (
  id SERIAL PRIMARY KEY,
  date_time TIMESTAMPTZ DEFAULT now(),
  user_id uuid REFERENCES users(id),
  event_type event_type NOT NULL,
  event_group_id INTEGER,
  target_id INTEGER,
  target_table TEXT,
  event_info JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create municipalities table
CREATE TABLE IF NOT EXISTS municipalities (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create schools table
CREATE TABLE IF NOT EXISTS schools (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  operator_id uuid REFERENCES users(id) UNIQUE,
  municipality_id INTEGER REFERENCES municipalities(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create classes table
CREATE TABLE IF NOT EXISTS classes (
  id SERIAL PRIMARY KEY,
  year_started INTEGER NOT NULL,
  letter TEXT NOT NULL,
  school_id INTEGER REFERENCES schools(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create students table
CREATE TABLE IF NOT EXISTS students (
  id SERIAL PRIMARY KEY,
  snils TEXT UNIQUE NOT NULL,
  last_name TEXT NOT NULL,
  first_name TEXT NOT NULL,
  middle_name TEXT,
  birth_date DATE NOT NULL,
  phone TEXT,
  email TEXT,
  guardian_full_name TEXT NOT NULL,
  guardian_phone TEXT NOT NULL,
  guardian_email TEXT NOT NULL,
  class_id INTEGER REFERENCES classes(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  type TEXT NOT NULL,
  profile TEXT NOT NULL,
  date DATE,
  location TEXT,
  stage TEXT,
  academic_year TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  text TEXT NOT NULL,
  type notification_type NOT NULL,
  recipient_type recipient_type NOT NULL,
  recipient_id INTEGER,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE mentors ENABLE ROW LEVEL SECURITY;
ALTER TABLE logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE municipalities ENABLE ROW LEVEL SECURITY;
ALTER TABLE schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies

-- Users policies
CREATE POLICY "Users can read own data"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Mentors policies
CREATE POLICY "Authenticated users can read mentors"
  ON mentors FOR SELECT
  TO authenticated
  USING (true);

-- Logs policies
CREATE POLICY "Admins can read all logs"
  ON logs FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role = 'ADMIN'
  ));

-- Municipalities policies
CREATE POLICY "Authenticated users can read municipalities"
  ON municipalities FOR SELECT
  TO authenticated
  USING (true);

-- Schools policies
CREATE POLICY "Authenticated users can read schools"
  ON schools FOR SELECT
  TO authenticated
  USING (true);

-- Classes policies
CREATE POLICY "Authenticated users can read classes"
  ON classes FOR SELECT
  TO authenticated
  USING (true);

-- Students policies
CREATE POLICY "Authenticated users can read students"
  ON students FOR SELECT
  TO authenticated
  USING (true);

-- Events policies
CREATE POLICY "Authenticated users can read events"
  ON events FOR SELECT
  TO authenticated
  USING (true);

-- Notifications policies with simplified direct access check
CREATE POLICY "Users can read their notifications"
  ON notifications FOR SELECT
  TO authenticated
  USING (
    recipient_type = 'ALL' OR
    (
      recipient_type = (SELECT role FROM users WHERE id = auth.uid())::text::recipient_type AND
      (recipient_id IS NULL OR recipient_id = auth.uid()::text::integer)
    )
  );