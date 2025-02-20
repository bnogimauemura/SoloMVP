// src/supabaseClient.ts

import { createClient } from '@supabase/supabase-js'

// Define your Supabase URL and Anon Key
const SUPABASE_URL = 'https://jowzubyaqsjsvcksvioy.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impvd3p1YnlhcXNqc3Zja3N2aW95Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk4NTQ1MzcsImV4cCI6MjA1NTQzMDUzN30.IaCmY4JgCIRbZy-4JuRfRo_bbz3Z0UV8YZNMzYANVYk'

// Create the Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
