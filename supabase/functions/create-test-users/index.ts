
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

    // Create a user for each role
    for (const role of roles) {
      try {
        const email = `${role.toLowerCase().replace(/_/g, ".")}@example.com`;
        const name = role.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        
        console.log(`Creating user: ${email} with role: ${role}`);
        
        // Check if user exists in auth.users directly
        const { data: authUsers, error: authUsersError } = await supabase.auth.admin.listUsers();
        
        if (authUsersError) {
          console.error(`Error checking if user exists: ${authUsersError.message}`);
          errors.push({ role, error: authUsersError.message });
          continue;
        }
        
        // Check if the email already exists in the list of users
        const userExists = authUsers && authUsers.users && 
                          authUsers.users.some(user => user.email === email);
        
        if (userExists) {
          console.log(`User ${email} already exists in auth.users, skipping...`);
          results.push({ role, email, success: true, message: "User already exists" });
          continue;
        }
        
        // Create the user with the admin API - removing the role from metadata to avoid type issues
        const { data: userData, error: userError } = await supabase.auth.admin.createUser({
          email: email,
          password: password,
          email_confirm: true, // Auto-confirm email
          user_metadata: {
            name: name,
            role_name: role, // Use a string property instead of trying to use the enum directly
            access_level: role === 'administrator' ? 'admin' : (role === 'coach' || role === 'advisor' ? 'edit' : 'read_only')
          }
        });

        if (userError) {
          console.error(`Error creating user ${email}:`, userError.message);
          errors.push({ role, error: userError.message });
        } else {
          console.log(`Successfully created user: ${email}`);
          results.push({ role, email, success: true });
        }
      } catch (error) {
        console.error(`Exception creating user with role ${role}:`, error.message);
        errors.push({ role, error: error.message });
      }
    }

    console.log(`Created ${results.length} users with ${errors.length} errors`);

    return new Response(
      JSON.stringify({
        success: errors.length === 0,
        message: "Test users creation completed",
        results,
        errors,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Unexpected error in create-test-users function:", error.message);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
