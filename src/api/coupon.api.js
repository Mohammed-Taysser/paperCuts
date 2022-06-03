import { BASE_URL, token } from './';
import axios from 'axios';

const couponAPI = axios.create({
  baseURL: `${BASE_URL}/coupon`,
  headers: { authorization: token },
});

function getAllCoupons() {
  return couponAPI.get(`/`);
}

function getCouponByLabel(label) {
  return couponAPI.get(`view/${label}`);
}

export { getAllCoupons, getCouponByLabel };
