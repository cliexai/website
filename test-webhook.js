import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zfusxsegebjsdycevnnd.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || ''; // Set env var
const supabase = createClient(supabaseUrl, supabaseKey);

async function testWebhook() {
  console.log('Inserting test lead to trigger webhook...');
  const { data, error } = await supabase.from('leads').insert([
    {
      full_name: 'AI Test Agent',
      business: 'ClieX Diagnostics',
      email: 'cliexai@gmail.com',
      whatsapp: '+15550000000',
      plan: 'Growth'
    }
  ]);

  if (error) {
    console.error('Error inserting lead:', error);
  } else {
    console.log('Successfully inserted lead! The webhook should fire now.');
  }
}

testWebhook();
