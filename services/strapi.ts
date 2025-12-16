// Strapi API client service
const stripTrailingSlash = (url: string) => url.replace(/\/+$/, '');
const getBrowserOrigin = () => (typeof window !== 'undefined' ? window.location.origin : 'https://sarescol.com');

export const SITE_URL = stripTrailingSlash(import.meta.env.VITE_SITE_URL || getBrowserOrigin());
const STRAPI_URL = stripTrailingSlash(import.meta.env.VITE_STRAPI_URL || SITE_URL);
const STRAPI_TOKEN = import.meta.env.VITE_STRAPI_READ_TOKEN;
const API_BASE = `${STRAPI_URL}/api`;

interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

interface StrapiEntity<T> {
  id: number;
  attributes: T;
}

// Normalize Strapi v5 responses to always expose an attributes object
function normalizeStrapiEntity(entity: any) {
  if (!entity) return entity;
  if (entity.attributes) {
    return entity;
  }

  const { id, ...rest } = entity;
  return { id, attributes: rest };
}

function normalizeStrapiData(data: any) {
  if (Array.isArray(data)) {
    return data.map(normalizeStrapiEntity);
  }
  return normalizeStrapiEntity(data);
}

// Generic GET request with populate support
async function get<T>(endpoint: string, params?: Record<string, string>): Promise<StrapiResponse<T>> {
  const queryParams = new URLSearchParams(params);
  const url = `${API_BASE}${endpoint}?${queryParams}`;
  
  const headers: Record<string, string> = {};
  if (STRAPI_TOKEN) {
    headers['Authorization'] = `Bearer ${STRAPI_TOKEN}`;
  }

  const response = await fetch(url, { headers });
  if (!response.ok) {
    throw new Error(`Strapi API error: ${response.status} ${response.statusText}`);
  }
  
  const json = await response.json();
  return {
    ...json,
    data: normalizeStrapiData(json.data),
  };
}

async function post(endpoint: string, body: Record<string, unknown>) {
  const url = `${API_BASE}${endpoint}`;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (STRAPI_TOKEN) {
    headers['Authorization'] = `Bearer ${STRAPI_TOKEN}`;
  }

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    let message = `Strapi API error: ${response.status} ${response.statusText}`;
    try {
      const errorData = await response.json();
      message = errorData?.error?.message || errorData?.message || message;
    } catch (error) {
      // ignore JSON parse errors
    }
    throw new Error(message);
  }

  const data = await response.json().catch(() => ({}));
  return data;
}

// Products
export async function getProducts(categorySlug?: string) {
  const params: Record<string, string> = { 'populate': '*' };
  if (categorySlug) {
    params['filters[category][slug][$eq]'] = categorySlug;
  }
  const response = await get<StrapiEntity<any>[]>('/products', params);
  return response.data;
}

export async function getFeaturedProducts(limit = 4) {
  const params: Record<string, string> = {
    populate: '*',
    'filters[featured][$eq]': 'true',
    'sort': 'featuredOrder:asc,updatedAt:desc',
    'pagination[pageSize]': String(limit),
  };
  const response = await get<StrapiEntity<any>[]>('/products', params);
  return response.data;
}

export async function getProduct(slug: string) {
  const params = { 'populate': '*', 'filters[slug][$eq]': slug };
  const response = await get<StrapiEntity<any>[]>('/products', params);
  return response.data[0] || null;
}

// Categories
export async function getCategories() {
  const response = await get<StrapiEntity<any>[]>('/categories', { 'populate': '*' });
  return response.data;
}

// Locations
export async function getLocations() {
  const params = {
    'populate': '*',
    'filters[active][$eq]': 'true',
    'sort': 'order:asc,name:asc',
  };
  const response = await get<StrapiEntity<any>[]>('/locations', params);
  return response.data;
}

// Representatives
export async function getRepresentatives() {
  const params = {
    'populate': '*',
    'filters[active][$eq]': 'true',
    'sort': 'order:asc,name:asc',
  };
  const response = await get<StrapiEntity<any>[]>('/representatives', params);
  return response.data;
}

// Allies / Partners
export async function getAllies() {
  const params = {
    'populate': '*',
    'filters[active][$eq]': 'true',
    'sort': 'order:asc,name:asc',
  };
  const response = await get<StrapiEntity<any>[]>('/allies', params);
  return response.data;
}

// Banners
export async function getBanners() {
  const params = { 'populate': '*', 'filters[active][$eq]': 'true', 'sort': 'order:asc' };
  const response = await get<StrapiEntity<any>[]>('/banners', params);
  return response.data;
}

// Site Settings (single type)
export async function getSiteSettings() {
  const response = await get<any>('/site-setting', { 'populate': '*' });
  return response.data;
}

// Helper to get image URL from Strapi media
export function getStrapiImageUrl(imageData: any): string | null {
  if (!imageData) return null;

  // Handle both single image and array responses
  const image = Array.isArray(imageData) ? imageData[0] : imageData;
  const imageAttributes = image?.attributes || image;

  if (!imageAttributes?.url) return null;

  const url = imageAttributes.url;
  // If URL is relative, prepend Strapi URL
  return url.startsWith('http') ? url : `${STRAPI_URL}${url}`;
}

export type FormType = 'contact' | 'wholesale' | 'suggestion';

export async function submitForm(formType: FormType, payload: Record<string, unknown>) {
  return post(`/forms/${formType}`, payload);
}
