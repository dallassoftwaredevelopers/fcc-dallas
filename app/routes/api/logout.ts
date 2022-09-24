import { ActionFunction } from 'remix';
import { supabase } from '~/db/supabase.server';

export const action: ActionFunction = async () => {
  const { error } = await supabase.auth.signOut();
  console.log('logging out...');
  // if error, log and move on to get rid of token
  if (error) {
    console.error(`Logout Exception: ${error.status} ${error.message}`);
  }
};
