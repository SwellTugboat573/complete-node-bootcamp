import axios from 'axios';
import { showAlert } from './alert';
// const axios = new URL(axios, import.meta.url);

const stripe = Stripe(
  'pk_test_51QbHtyIYailFodhPiPUKtc7IXKFBx98IB7tFJKEicYhZ20XKYImVY4qbK3EKvz8LOpN7a4WobKhBhZL6h0a7qQCH00kkj1kORH',
);

export const bookTour = async (tourId) => {
  try {
    // 1) get checkout session
    const session = await axios.get(
      `/api/v1/bookings/checkout-sessions/${tourId}`,
    );
    window.location.assign(session.data.session.url);
    // 2) Creat checkiout Form + Charge credit card
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
// export const bookTour = async (tourId) => {
//   try {
//     const session = await axios(
//       `http://{url}/api/v1/bookings/checkout-sesssion/${tourId}`,
//     );
//     window.location.assign(session.data.session.url);
//   } catch (err) {
//     showAlert('error', err);
//   }
// };
