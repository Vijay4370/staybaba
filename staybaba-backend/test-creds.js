require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE_NUMBER;

console.log('\n📋 Credential Check:');
console.log('─'.repeat(40));

// Check Account SID
if (accountSid) {
  console.log(`✅ Account SID: ${accountSid}`);
  if (accountSid.startsWith('AC') && accountSid.length === 34) {
    console.log('   Format: ✓ Valid');
  } else {
    console.log('   Format: ✗ Invalid (must start with AC and be 34 chars)');
  }
} else {
  console.log('❌ Account SID: Missing');
}

// Check Auth Token
if (authToken) {
  console.log(`✅ Auth Token: ${authToken.substring(0, 4)}...${authToken.substring(authToken.length - 4)}`);
  if (authToken.length === 32) {
    console.log('   Length: ✓ Valid (32 chars)');
  } else {
    console.log(`   Length: ✗ Invalid (${authToken.length} chars, should be 32)`);
  }
} else {
  console.log('❌ Auth Token: Missing');
}

// Check Phone
if (twilioPhone) {
  console.log(`✅ Phone: ${twilioPhone}`);
} else {
  console.log('❌ Phone: Missing');
}

console.log('─'.repeat(40));

// Test Twilio
if (accountSid && authToken && accountSid.startsWith('AC')) {
  console.log('\n🔄 Testing Twilio connection...');
  
  try {
    const twilio = require('twilio');
    const client = twilio(accountSid, authToken);
    
    console.log('✅ Twilio client created successfully');
    
    // List account info
    client.api.accounts(accountSid).fetch()
      .then(account => {
        console.log(`✅ Account Name: ${account.friendlyName}`);
        console.log(`✅ Account Status: ${account.status}`);
      })
      .catch(err => {
        console.log('❌ Account fetch error:', err.message);
      });
      
  } catch (error) {
    console.log('❌ Twilio error:', error.message);
  }
} else {
  console.log('\n⚠️ Cannot test - credentials incomplete');
}

console.log('\n');