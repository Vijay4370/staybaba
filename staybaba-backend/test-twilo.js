require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE_NUMBER;

console.log('Account SID:', accountSid);
console.log('Auth Token:', authToken ? '✓ Present (' + authToken.length + ' chars)' : '✗ Missing');
console.log('Phone:', twilioPhone);

if (accountSid && authToken && accountSid.startsWith('AC')) {
  try {
    const twilio = require('twilio');
    const client = twilio(accountSid, authToken);
    
    console.log('\n✅ Credentials are valid!');
    
    // Test send SMS
    client.messages.create({
      body: 'Test SMS from StayBaba',
      from: twilioPhone,
      to: '+919999999999'  // Replace with your verified number
    }).then(message => {
      console.log('✅ SMS sent! SID:', message.sid);
    }).catch(err => {
      console.log('❌ SMS Error:', err.message);
    });
    
  } catch (error) {
    console.log('❌ Error:', error.message);
  }
} else {
  console.log('\n❌ Credentials not properly configured');
}