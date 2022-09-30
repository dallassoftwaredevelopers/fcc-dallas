import React from 'react';
import { hydrate } from 'react-dom';
import { RemixBrowser } from 'remix';

import { supabaseClient as supabase } from '~/db/supabase-client';

const EntryClient = () => {
  React.useEffect(() => {
    if (!supabase) {
      console.warn('supabase not found!');
      return;
    }
    supabase.auth.onAuthStateChange(async (event) => {
      if (event === 'PASSWORD_RECOVERY') {
        const newPassword = prompt('What would you like your new password to be?');
        if (!supabase || !newPassword) return;
        const { data, error } = await supabase.auth.update({
          password: newPassword,
        });

        if (data) alert('Password updated successfully!');
        if (error) alert('There was an error updating your password.');
      }
    });
  }, [supabase]);
  return <RemixBrowser />;
};

hydrate(<EntryClient />, document);
