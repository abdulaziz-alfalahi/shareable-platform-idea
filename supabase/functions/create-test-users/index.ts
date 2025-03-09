
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

    if (!supabaseUrl || !supabaseServiceKey) {
      return new Response(
        JSON.stringify({
          error: "Missing environment variables SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY",
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Create a Supabase client with the service role key
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Define user roles as plain strings
    const roles = [
      'school_student',
      'university_student',
      'parent',
      'internship_coordinator',
      'advisor',
      'coach',
      'recruiter',
      'training_center_rep',
      'assessment_center_rep',
      'command_control_agent',
      'administrator',
      'leadership',
      'jobseeker'
    ];

    const password = "Test1234!";
    const results = [];
    const errors = [];

    console.log("Starting to create test users...");

    // Get existing users first to check for duplicates
    const { data: existingUsers, error: getUsersError } = await supabase.auth.admin.listUsers();
    
    if (getUsersError) {
      console.error(`Error fetching users: ${getUsersError.message}`);
      return new Response(
        JSON.stringify({
          success: false,
          message: "Failed to retrieve existing users",
          error: getUsersError.message
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500,
        }
      );
    }

    // Create a map of existing emails for faster lookup
    const existingEmails = new Map();
    existingUsers?.users?.forEach(user => {
      if (user.email) {
        existingEmails.set(user.email.toLowerCase(), true);
      }
    });

    // Create a user for each role
    for (const role of roles) {
      try {
        const email = `${role.toLowerCase().replace(/_/g, ".")}@example.com`;
        const name = role.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        
        console.log(`Checking if user exists: ${email}`);
        
        // Check if email already exists in our map
        if (existingEmails.has(email.toLowerCase())) {
          console.log(`User ${email} already exists, skipping...`);
          results.push({ role, email, success: true, message: "User already exists" });
          continue;
        }
        
        console.log(`Creating user: ${email} with role: ${role}`);
        
        // IMPORTANT: We're completely bypassing any enum types by using string metadata only
        const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
          email: email,
          password: password,
          email_confirm: true,
          // Store everything as strings to avoid enum type issues
          user_metadata: {
            name: name,
            role: role,
            access_level: role === 'administrator' ? 'admin' : (role === 'coach' || role === 'advisor' ? 'edit' : 'read_only')
          }
        });

        if (createError) {
          console.error(`Failed to create user ${email}:`, createError);
          errors.push({ role, email, error: createError.message });
          continue;
        }
        
        console.log(`Successfully created user: ${email}`);
        results.push({ role, email, success: true });
      } catch (error) {
        console.error(`Unexpected error creating user with role ${role}:`, error);
        errors.push({ role, error: error.message || "Unknown error" });
      }
    }

    console.log(`Created ${results.filter(r => !r.message).length} users with ${errors.length} errors`);
    
    // Return detailed response
    return new Response(
      JSON.stringify({
        success: errors.length === 0 && results.length > 0,
        message: `Test users creation completed. Created ${results.filter(r => !r.message).length} new users, ${results.filter(r => r.message === "User already exists").length} already existed.`,
        results,
        errors,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Unexpected error in create-test-users function:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || "Unknown error",
        stack: error.stack
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
