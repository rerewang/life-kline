import { useState, useCallback } from 'react';

export interface GeolocationResult {
  latitude: number;
  longitude: number;
  province?: string;
  city?: string;
  district?: string;
  address?: string;
}

export interface GeolocationError {
  code: number;
  message: string;
}

export function useGeolocation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<GeolocationError | null>(null);
  const [location, setLocation] = useState<GeolocationResult | null>(null);

  const getCurrentLocation = useCallback(async (): Promise<GeolocationResult | null> => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      const err: GeolocationError = {
        code: -1,
        message: '您的浏览器不支持地理位置功能',
      };
      setError(err);
      setLoading(false);
      return null;
    }

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        });
      });

      const { latitude, longitude } = position.coords;

      try {
        const geocodeResult = await reverseGeocode(latitude, longitude);
        const result: GeolocationResult = {
          latitude,
          longitude,
          ...geocodeResult,
        };
        setLocation(result);
        setLoading(false);
        return result;
      } catch (geocodeError) {
        const result: GeolocationResult = {
          latitude,
          longitude,
        };
        setLocation(result);
        setLoading(false);
        return result;
      }
    } catch (err: any) {
      const errorMap: Record<number, string> = {
        1: '您拒绝了位置权限请求',
        2: '无法获取位置信息',
        3: '获取位置超时，请重试',
      };

      const error: GeolocationError = {
        code: err.code || -1,
        message: errorMap[err.code] || '获取位置失败',
      };

      setError(error);
      setLoading(false);
      return null;
    }
  }, []);

  return {
    loading,
    error,
    location,
    getCurrentLocation,
  };
}

async function reverseGeocode(lat: number, lng: number) {
  const aMapKey = import.meta.env.VITE_AMAP_KEY || 'demo';
  
  if (aMapKey === 'demo') {
    return {
      province: '未配置地图API',
      city: '请添加高德地图Key',
      district: '',
      address: `经度${lng.toFixed(2)}° 纬度${lat.toFixed(2)}°`,
    };
  }

  const url = `https://restapi.amap.com/v3/geocode/regeo?key=${aMapKey}&location=${lng},${lat}&extensions=base`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === '1' && data.regeocode) {
      const { province, city, district } = data.regeocode.addressComponent;
      return {
        province: province || '',
        city: city || '',
        district: district || '',
        address: data.regeocode.formatted_address || '',
      };
    } else {
      throw new Error('逆地理编码失败');
    }
  } catch (error) {
    console.warn('逆地理编码失败，仅返回坐标', error);
    return {
      province: '',
      city: '',
      district: '',
      address: `${lng.toFixed(6)}, ${lat.toFixed(6)}`,
    };
  }
}
