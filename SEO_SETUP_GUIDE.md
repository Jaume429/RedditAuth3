# SEO Verification & Google Search Console Setup

## 🚀 Quick Setup Guide

### 1. Google Site Verification

En `app/layout.tsx`, reemplaza el código de verificación:

```tsx
verification: {
  google: 'YOUR_GOOGLE_VERIFICATION_CODE',  // Reemplaza esto
  yandex: 'YOUR_YANDEX_VERIFICATION_CODE'    // Opcional
}
```

Para obtener tu código:
1. Ve a https://search.google.com/search-console
2. Click "Add property"
3. Ingresa tu URL (https://tu-dominio.com)
4. Click "HTML tag" method
5. Copia el content de meta tag (ej: `a1b2c3d4e5f6g7h8i9j0k1`)

### 2. Crear Imágenes Requeridas

Necesitas crear dos archivos en `public/`:

**public/og-image.jpg** (1200x630px)
- Social media share image
- Debe contener branding y texto principal
- Formato: JPG optimizado

**public/logo.png** (200x200px mínimo)
- Logo para Organization Schema
- Fondo transparente recomendado
- Formato: PNG

### 3. Enviar Sitemap

1. En Google Search Console → Settings
2. Sitemap URL: `https://tu-dominio.com/sitemap.xml`
3. Click Submit

### 4. Actualizar Social Media Links

En `lib/site.ts`, actualiza los valores:

```typescript
export const siteConfig = {
  // ... existing config
  // Estos están en OrganizationJsonLd:
  sameAs: [
    'https://twitter.com/BuildWithClaude',  // Actualiza
    'https://www.linkedin.com/company/...'  // Actualiza
  ]
};
```

## ✅ Testing Checklist

### Validar Schema.json
```bash
# Option 1: En browser
curl http://tu-dominio.com/blog/ejemplo-post

# Option 2: Google Schema Validator
# https://validator.schema.org/
# Pega el HTML y busca:
# ✅ @type: NewsArticle
# ✅ breadcrumbList
# ✅ image con width/height
```

### Validar Open Graph
```bash
# Usa Facebook Debugger
https://www.facebook.com/sharing/debugger/?u=https://tu-dominio.com

# Debe mostrar:
# ✅ Título correcto
# ✅ Descripción
# ✅ Imagen (1200x630px)
```

### Validar Twitter Cards
```bash
# Usa Twitter Card Validator
https://cards-dev.twitter.com/validator

# Ingresa URL y debe mostrar:
# ✅ Card type: summary_large_image
# ✅ Imagen visible
# ✅ Título y descripción
```

### Validar Robots & Sitemap
```bash
# Robots.txt
curl https://tu-dominio.com/robots.txt

# Debe contener:
# User-agent: *
# Allow: /
# Sitemap: https://tu-dominio.com/sitemap.xml

# Sitemap.xml
curl https://tu-dominio.com/sitemap.xml

# Debe listar todas las URLs con:
# ✅ <loc>
# ✅ <lastModified>
# ✅ <changeFrequency>
# ✅ <priority>
```

## 📊 Monitoreo Continuo

### Google Search Console
1. Dashboard: https://search.google.com/search-console
2. Revisa cada semana:
   - Coverage: ¿todas tus URLs están indexadas?
   - Performance: ¿cuáles son tus top queries?
   - Errors: ¿hay errores de crawl?

### Core Web Vitals
```bash
# En Chrome DevTools
1. F12 → Lighthouse
2. Run audit
3. Check:
   - LCP (Largest Contentful Paint): < 2.5s
   - FID (First Input Delay): < 100ms
   - CLS (Cumulative Layout Shift): < 0.1
```

### PageSpeed Insights
https://pagespeed.web.dev/

Ingresa tu URL y optimiza según recomendaciones.

## 🎯 Keywords Strategy

Para cada post de blog, incluye:
1. Primary keyword: 1-2 en título, descripción
2. Long-tail keywords: 2-3 en tags, contenido
3. Related keywords: en headings H2/H3

Ejemplo:
- Post: "A Claude Code Prompting Workflow That Non-Developers Can Reuse"
- Tags: ["Prompts", "Workflow", "Claude Code", "AI Prompting"]
- H2s: "Effective Prompt Structure", "Testing Your Workflow"

## 🚨 Common SEO Mistakes (Evita)

❌ No actualizar `lastModified` en sitemap
❌ Usar alt="image" - sé descriptivo
❌ Olvidar canonical URLs
❌ Meta descriptions > 160 caracteres o < 50
❌ Missing Open Graph images
❌ No validar Schema.json

## 📚 Recursos

- [Next.js SEO Guide](https://nextjs.org/learn/seo/introduction-to-seo)
- [Google Search Central](https://developers.google.com/search)
- [Schema.org](https://schema.org/)
- [Open Graph Spec](https://ogp.me/)
- [Twitter Cards Docs](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)

---

**Próximo paso:** Crear og-image.jpg y logo.png, luego submit a Google Search Console
