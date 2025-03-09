
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

    // Create a user for each role
    for (const role of roles) {
      try {
        const email = `${role.toLowerCase().replace(/_/g, ".")}@example.com`;
        
        // Create the user with the admin API
        const { data: userData, error: userError } = await supabase.auth.admin.createUser({
          email: email,
          password: password,
          email_confirm: true, // Auto-confirm email
          user_metadata: {
            name: role.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
            role: role,
            access_level: role === 'administrator' ? 'admin' : (role === 'coach' || role === 'advisor' ? 'edit' : 'read_only')
          }
        });

        if (userError) {
          errors.push({ role, error: userError.message });
        } else {
          results.push({ role, email, success: true });
        }
      } catch (error) {
        errors.push({ role, error: error.message });
      }
    }

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
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
