import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xatbmavclgrzwrvtfyom.supabase.co';
const supabaseKey = 'sb_publishable_dtf1_ThykCnCmCfhxB0ShA_VGltY6f8'; // Cuidado: Em produção, usar .env

export const supabase = createClient(supabaseUrl, supabaseKey);
