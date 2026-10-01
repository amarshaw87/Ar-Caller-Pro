// Pull global client initialize framework from window bindings
import { createClient } from 'https://esm.sh/supabase/supabase-js@2';

const supabaseUrl = "https://oqwvzopylckwwktbnzwi.supabase.co"; 
const supabaseAnonKey = "sb_publishable_M98XZyB7svx6Le4IyZ629Q_KDQuAAAr"; 

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
