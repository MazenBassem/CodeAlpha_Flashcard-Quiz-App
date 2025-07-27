import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL  = "https://ximbfsxilivmtnzhjlsh.supabase.co"
const SUPABASE_KEY  = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhpbWJmc3hpbGl2bXRuemhqbHNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMzNzQ3MzEsImV4cCI6MjA2ODk1MDczMX0.mdrNUGvpnw1d280-aHAtZ_DIMWsacwB45bkjDKEqz6c"

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
