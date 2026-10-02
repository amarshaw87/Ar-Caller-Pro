import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://oqwvzopylckwwktbnzwi.supabase.co";
const supabaseAnonKey = "sb_publishable_M98XZyB7svx6Le4IyZ629Q_KDQuAAAr";

// Directly initialize and export the client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
