import { useEffect, useState } from 'react';
import { CONTACT_INFO_DEFAULT } from '../constants';
import { getSiteSettings } from '../services/strapi';
import { ContactInfo } from '../types';

let cachedContactInfo: ContactInfo | null = null;
let fetchPromise: Promise<ContactInfo> | null = null;

async function requestContactInfo(): Promise<ContactInfo> {
  if (cachedContactInfo) {
    return cachedContactInfo;
  }

  if (!fetchPromise) {
    fetchPromise = (async () => {
      const siteSettings = await getSiteSettings();
      const attributes = siteSettings?.attributes || siteSettings || {};

      const normalized: ContactInfo = {
        phone: attributes.phone?.trim() || CONTACT_INFO_DEFAULT.phone,
        email: attributes.email?.trim() || CONTACT_INFO_DEFAULT.email,
        address: attributes.address?.trim() || CONTACT_INFO_DEFAULT.address,
      };

      cachedContactInfo = normalized;
      return normalized;
    })()
      .finally(() => {
        fetchPromise = null;
      });
  }

  return fetchPromise;
}

export function useContactInfo() {
  const [contactInfo, setContactInfo] = useState<ContactInfo>(cachedContactInfo ?? CONTACT_INFO_DEFAULT);
  const [loading, setLoading] = useState<boolean>(!cachedContactInfo);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    if (cachedContactInfo) {
      setLoading(false);
      return () => {
        isMounted = false;
      };
    }

    requestContactInfo()
      .then((info) => {
        if (!isMounted) return;
        setContactInfo(info);
        setError(null);
      })
      .catch((err) => {
        console.error('Error fetching contact info:', err);
        if (!isMounted) return;
        setError('No se pudo cargar la información de contacto.');
        setContactInfo(CONTACT_INFO_DEFAULT);
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { contactInfo, loading, error };
}
