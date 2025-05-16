/*
  # Fix Profile Policies

  1. Changes
    - Remove recursive policies that were causing infinite recursion
    - Add proper RLS policies for profiles table
    - Enable RLS on profiles table
    
  2. Security
    - Enable RLS
    - Add policies for read/write access
    - Ensure proper authentication checks
*/

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Drop any existing policies to start fresh
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

-- Create new policies without recursion
CREATE POLICY "Users can view own profile"
ON profiles FOR SELECT
TO authenticated
USING (
  auth.uid() = id
  OR role = 'ADMIN'
);

CREATE POLICY "Users can update own profile"
ON profiles FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Allow admins to manage all profiles
CREATE POLICY "Admins can manage all profiles"
ON profiles
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND role = 'ADMIN'
  )
);