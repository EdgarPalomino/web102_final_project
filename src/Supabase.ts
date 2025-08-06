import { createClient } from "@supabase/supabase-js";

const client = createClient("https://bcgurnlshcugxwryhhty.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJjZ3VybmxzaGN1Z3h3cnloaHR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0NDYxMzgsImV4cCI6MjA3MDAyMjEzOH0.skyyrn9lh7TZvzzP1TdQ9jMuSJtEUp_RKxGScce-4I8");

export default client;
