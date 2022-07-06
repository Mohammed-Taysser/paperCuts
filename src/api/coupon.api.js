import axios from 'axios';

function getAllCoupons() {
  return axios.get(`/coupon`);
}

function getCouponByLabel(label) {
  return axios.get(`/coupon/view/${label}`);
}

export { getAllCoupons, getCouponByLabel };
