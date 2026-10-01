// Pull global client initialize framework from window bindings
const { createClient } = window.supabase;

const supabaseUrl = "https://oqwvzopylckwwktbnzwi.supabase.co"; 
const supabaseAnonKey = "sb_publishable_M98XZyB7svx6Le4IyZ629Q_KDQuAAAr"; 

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
