import { createClient } from '@supabase/supabase-js';

const SB_URL = 'https://lrgeyudqmvvomgpvkzkf.supabase.co';
const SB_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MTc1NjY0NywiZXhwIjoxOTU3MzMyNjQ3fQ.6VFuEY6Wmqpx6IfdYM-80p_Ui5gcnSdVa4SRot3Lm7Q';

export const supabaseClient = SB_URL ? createClient(SB_URL, SB_ANON_KEY) : undefined;
