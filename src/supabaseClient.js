// Standalone web build module setup bypassing un-resolved network resource nodes
import { createClient } from 'https://unpkg.com/@supabase/supabase-js@2.45.4/dist/umd/supabase.js?module';

const supabaseUrl = "https://oqwvzopylckwwktbnzwi.supabase.co"; 
const supabaseAnonKey = "sb_publishable_M98XZyB7svx6Le4IyZ629Q_KDQuAAAr"; 

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
