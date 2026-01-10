export interface CityCoordinates {
  latitude: number;
  longitude: number;
  timezone: string;
}

export const CHINA_CITIES: Record<string, Record<string, CityCoordinates>> = {
  '直辖市': {
    '北京市': { latitude: 39.9042, longitude: 116.4074, timezone: 'Asia/Shanghai' },
    '上海市': { latitude: 31.2304, longitude: 121.4737, timezone: 'Asia/Shanghai' },
    '天津市': { latitude: 39.3434, longitude: 117.3616, timezone: 'Asia/Shanghai' },
    '重庆市': { latitude: 29.4316, longitude: 106.9123, timezone: 'Asia/Shanghai' },
  },
  '广东省': {
    '广州市': { latitude: 23.1291, longitude: 113.2644, timezone: 'Asia/Shanghai' },
    '深圳市': { latitude: 22.5431, longitude: 114.0579, timezone: 'Asia/Shanghai' },
    '东莞市': { latitude: 23.0209, longitude: 113.7518, timezone: 'Asia/Shanghai' },
    '佛山市': { latitude: 23.0218, longitude: 113.1219, timezone: 'Asia/Shanghai' },
  },
  '浙江省': {
    '杭州市': { latitude: 30.2741, longitude: 120.1551, timezone: 'Asia/Shanghai' },
    '宁波市': { latitude: 29.8683, longitude: 121.5440, timezone: 'Asia/Shanghai' },
    '温州市': { latitude: 28.0004, longitude: 120.6700, timezone: 'Asia/Shanghai' },
  },
  '江苏省': {
    '南京市': { latitude: 32.0603, longitude: 118.7969, timezone: 'Asia/Shanghai' },
    '苏州市': { latitude: 31.2989, longitude: 120.5853, timezone: 'Asia/Shanghai' },
    '无锡市': { latitude: 31.4912, longitude: 120.3118, timezone: 'Asia/Shanghai' },
  },
  '四川省': {
    '成都市': { latitude: 30.5728, longitude: 104.0668, timezone: 'Asia/Shanghai' },
  },
};

export function getCityCoordinates(province: string, city: string): CityCoordinates | null {
  const provinceData = CHINA_CITIES[province];
  if (!provinceData) return null;
  return provinceData[city] || null;
}
