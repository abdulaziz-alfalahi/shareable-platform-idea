
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.23.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create a Supabase client with the Admin key
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    // Define personas with their corresponding email addresses
    const personaAccounts = [
      { role: "school_student", email: "school-student@emiratijourney.ae", name: "Ahmed School Student" },
      { role: "university_student", email: "university-student@emiratijourney.ae", name: "Fatima University Student" },
      { role: "parent", email: "parent@emiratijourney.ae", name: "Mohammed Parent" },
      { role: "career_advisor", email: "advisor@emiratijourney.ae", name: "Aisha Career Advisor" },
      { role: "private_sector_recruiter", email: "recruiter@emiratijourney.ae", name: "Omar Recruiter" },
      { role: "training_center", email: "training@emiratijourney.ae", name: "Maryam Training Center" },
      { role: "assessment_center", email: "assessment@emiratijourney.ae", name: "Khalid Assessment Center" },
      { role: "administrator", email: "admin@emiratijourney.ae", name: "Sara Administrator" },
      { role: "super_user", email: "super-user@emiratijourney.ae", name: "Zayed Super User" },
      { role: "mentor", email: "mentor@emiratijourney.ae", name: "Noura Mentor" },
      { role: "jobseeker", email: "jobseeker@emiratijourney.ae", name: "Hamad Jobseeker" },
      { role: "intern", email: "intern@emiratijourney.ae", name: "Layla Intern" },
      { role: "full_time_employee", email: "employee@emiratijourney.ae", name: "Rashid Employee" },
      { role: "retiree", email: "retiree@emiratijourney.ae", name: "Hessa Retiree" },
    ];

    // Standard password for all accounts
    const password = "journey123!";
    
    const results = [];
    
    // Create accounts for each persona
    for (const account of personaAccounts) {
      console.log(`Creating account for ${account.role}: ${account.email}`);
      
      // Check if user already exists
      const { data: existingUser } = await supabaseAdmin
        .from("profiles")
        .select("id")
        .eq("email", account.email)
        .maybeSingle();
        
      if (existingUser) {
        console.log(`User ${account.email} already exists, skipping`);
        results.push({ 
          role: account.role, 
          email: account.email, 
          status: "skipped", 
          message: "User already exists" 
        });
        continue;
      }
      
      // Create the user account
      const { data: userData, error: userError } = await supabaseAdmin.auth.admin.createUser({
        email: account.email,
        password: password,
        email_confirm: true,
        user_metadata: { full_name: account.name }
      });
      
      if (userError) {
        console.error(`Error creating user ${account.email}:`, userError);
        results.push({ 
          role: account.role, 
          email: account.email, 
          status: "error", 
          message: userError.message 
        });
        continue;
      }
      
      // Assign the role to the user
      const { error: roleError } = await supabaseAdmin
        .from("user_roles")
        .insert({
          user_id: userData.user.id,
          role: account.role,
        });
      
      if (roleError) {
        console.error(`Error assigning role ${account.role} to user ${account.email}:`, roleError);
        results.push({ 
          role: account.role, 
          email: account.email, 
          status: "error", 
          message: `User created but role assignment failed: ${roleError.message}` 
        });
        continue;
      }
      
      console.log(`Successfully created account for ${account.role}: ${account.email}`);
      results.push({ 
        role: account.role, 
        email: account.email, 
        status: "success", 
        message: "Account created successfully" 
      });
    }

    return new Response(
      JSON.stringify({ success: true, results }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200 
      }
    );
  } catch (error) {
    console.error("Server error:", error);
    
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500 
      }
    );
  }
});
