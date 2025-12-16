// Simple seed script for Strapi (uses global fetch available in Node 18+)
// Usage: set env var SEED_API_TOKEN and optionally STRAPI_URL
// Example:
//   $env:SEED_API_TOKEN="your_token"
//   node ./scripts/seed.js

const BASE = process.env.STRAPI_URL || 'http://localhost:1337';
const TOKEN = process.env.SEED_API_TOKEN;

if (!TOKEN) {
    console.error('Please set SEED_API_TOKEN environment variable (admin API token).');
    process.exit(1);
}

async function post(path, payload) {
    const url = `${BASE}${path}`;
    console.log(`POST ${url}`);
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify({ data: payload }),
    });

    const text = await res.text();
    console.log('Response status:', res.status);
    console.log('Response body:', text);

    if (!res.ok) {
        console.error('Error POST', path, res.status, text);
        throw new Error('Seed request failed');
    }

    try {
        return JSON.parse(text);
    } catch (e) {
        return { data: null };
    }
} async function seed() {
    try {
        console.log('Creating category: Mujer');
        const catMujer = await post('/api/categories', { name: 'Mujer' });
        const catMujerId = catMujer.data.id;

        console.log('Creating category: Hombre');
        const catHombre = await post('/api/categories', { name: 'Hombre' });
        const catHombreId = catHombre.data.id;

        console.log('Creating sample products...');
        const p1 = await post('/api/products', {
            name: 'Havaianas Slim',
            description: 'El clásico Havaianas Slim, cómodo y versátil.',
            price: '29.90',
            category: catMujerId
        });

        const p2 = await post('/api/products', {
            name: 'Havaianas Top',
            description: 'Havaianas Top con tiras anchas, ideal para hombre.',
            price: '34.90',
            category: catHombreId
        });

        console.log('Creating locations...');
        await post('/api/locations', {
            name: 'Outlet Sares - Cartagena',
            address: 'Centro Comercial e Industrial Ternera 1, Bodega 52, Outlet Sares',
            city: 'Cartagena',
            department: 'Bolívar',
            phone: '314 7260 433'
        });

        console.log('Creating representative sample...');
        await post('/api/representatives', {
            name: 'Juan Pérez',
            email: 'juan.p@sarescol.com',
            phone: '3001234567',
            city: 'Cartagena',
            department: 'Bolívar',
            whatsapp: '+573001234567',
            bio: 'Representante de la costa caribe.'
        });

        console.log('Creating banners...');
        await post('/api/banners', {
            title: 'Nueva Colección 2026',
            subtitle: 'Colores y estilos que enamoran',
            link: '/catalog',
            order: 1,
            active: true
        });

        console.log('Creating site settings (single type)...');
        // Note: single types accept POST to create the singleton entry
        await post('/api/site-settings', {
            siteName: 'Sares Colombia',
            email: 'administracion@sarescol.com',
            phone: '314 7260 433',
            address: 'Centro Comercial e Industrial Ternera 1, Bodega 52, Outlet Sares'
        });

        console.log('Seeding completed successfully.');
    } catch (err) {
        console.error('Seeding failed:', err);
    }
}

seed();
