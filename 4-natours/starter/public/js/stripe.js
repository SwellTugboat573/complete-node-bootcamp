// const axios = require('axios');
// const axios = require('axios');
import axios from 'axios';
// const axios = new URL(axios, import.meta.url);

// const stripe = stripe(
//   'pk_test_51QbHtyIYailFodhPiPUKtc7IXKFBx98IB7tFJKEicYhZ20XKYImVY4qbK3EKvz8LOpN7a4WobKhBhZL6h0a7qQCH00kkj1kORH',
// );

export const bookTour = async (tourId) => {
  // 1) get checkout session
  const session = await axios.get(
    `http://localhost:3000/api/v1/bookings/checkout-sessions/${tourId}`,
  );
  console.log(session);
  // 2) Creat checkiout Form + Charge credit card
};
