import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hmjznbumvqsioshnzpug.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhtanpuYnVtdnFzaW9zaG56cHVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc3NTQ1ODUsImV4cCI6MjA2MzMzMDU4NX0.YwLeokfFiJi4f5t3CyqwsgmlqXOpAr6YYcBC_gUKR6I'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)