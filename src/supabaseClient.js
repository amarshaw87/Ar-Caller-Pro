const { createClient } = window.supabase || {};

if (!createClient) {
  console.error("Failed to load Supabase CDN.");
}

const supabaseUrl = "https://oqwvzopylckwwktbnzwi.supabase.co";
const supabaseAnonKey = "sb_publishable_M98XZyB7svx6Le4IyZ629Q_KDQuAAAr";

// Safely initialize the client to prevent application crashes if the CDN fails to load
export const supabase = createClient ? createClient(supabaseUrl, supabaseAnonKey) : null;
