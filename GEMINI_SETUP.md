# Configuración de Google Gemini para Generación de Artículos

## 🚀 Setup Rápido

### 1. Instalar Dependencias
```bash
npm install
```

### 2. Configurar la API Key de Gemini

Obtén tu API key en: https://aistudio.google.com/app/apikey

**Opción A: Variable de Entorno (.env.local)**
```env
GOOGLE_API_KEY=your-gemini-api-key-here
```

**Opción B: Variable de Entorno del Sistema**
```bash
# En Windows PowerShell
$env:GOOGLE_API_KEY="your-gemini-api-key-here"

# En Linux/Mac
export GOOGLE_API_KEY="your-gemini-api-key-here"
```

### 3. Probar Generación de Artículos

```bash
GOOGLE_API_KEY=your-gemini-api-key-here node scripts/examples/generate-with-gemini.js
```

## ✅ Ventajas de Gemini

| Característica | Gemini | Claude |
|---|---|---|
| **Costo** | ✅ Más barato (70% menos) | Más caro |
| **Velocidad** | ✅ Rápido (flash model) | Más lento |
| **Calidad** | Muy buena | Excelente |
| **Límite Gratis** | 15k req/día | Muy limitado |

### Modelos Disponibles
- **gemini-1.5-flash**: Rápido y económico ✅ (RECOMENDADO)
- **gemini-1.5-pro**: Más potente, pero más caro
- **gemini-2.0-flash**: Beta, muy rápido

## 📋 Configuración en Sistema de Automatización

El sistema ya está configurado para usar Gemini:

```typescript
// lib/ai-automation-config.ts
gemini: {
  enabled: true,           // ✅ Activado
  apiKey: process.env.GOOGLE_API_KEY,
  model: 'gemini-1.5-flash'
}
```

## 🔄 Generación Automática Diaria

### Opción 1: GitHub Actions (Recomendado)

Crear `.github/workflows/publish-daily.yml`:

```yaml
name: Publish Daily Article

on:
  schedule:
    - cron: '0 9 * * *'  # 9 AM UTC todos los días

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: GOOGLE_API_KEY=${{ secrets.GOOGLE_API_KEY }} node scripts/examples/generate-with-gemini.js
      - run: node scripts/ai-automation-worker.js
      - uses: stefanzweifel/git-auto-commit-action@v4
        with:
          commit_message: 'chore: auto-publish AI article'
```

### Opción 2: Cron Local (Windows Task Scheduler)

```powershell
# Crear tarea programada
$trigger = New-ScheduledTaskTrigger -Daily -At 9:00AM
$action = New-ScheduledTaskAction -Execute "PowerShell.exe" -Argument "-Command `"cd C:\Users\jaume\Documents\RedditAuth3; npm run generate:gemini`""
Register-ScheduledTask -TaskName "DailyArticleGeneration" -Trigger $trigger -Action $action -Force
```

Agregar script en `package.json`:
```json
"scripts": {
  "generate:gemini": "GOOGLE_API_KEY=$GOOGLE_API_KEY node scripts/examples/generate-with-gemini.js",
  "process:queue": "node scripts/ai-automation-worker.js"
}
```

## 📊 Monitoreo

El sistema registra todo en `logs/ai-automation.log`:

```bash
# Ver últimas publicaciones
tail -f logs/ai-automation.log

# Contar artículos generados hoy
grep "Publishing post" logs/ai-automation.log | wc -l
```

## ⚙️ Personalización

### Cambiar Modelo de Gemini

En `lib/ai-automation-config.ts`:
```typescript
gemini: {
  model: 'gemini-2.0-flash'  // Cambiar aquí
}
```

### Ajustar Prompts de Generación

En `scripts/examples/generate-with-gemini.js`, modifica la variable `prompt` para cambiar:
- Tema del contenido
- Longitud de artículos
- Estilo de escritura
- Tags automáticos

## 🔒 Seguridad

⚠️ **NO compartir la API key públicamente**

- ✅ Usar `.env.local` (ya en `.gitignore`)
- ✅ En GitHub: agregar secret `GOOGLE_API_KEY`
- ✅ Cambiar la key si se expone

## 📞 Soporte

- [Documentación Oficial de Gemini API](https://ai.google.dev/tutorials/get_started_with_generative_ai)
- [Límites y Cuotas](https://ai.google.dev/pricing)
- [Ejemplos de Código](https://github.com/google-gemini/generative-ai-js)
