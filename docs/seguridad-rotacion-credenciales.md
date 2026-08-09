# Seguridad: rotación de credenciales

## Contexto

El repositorio `fleximy2025` fue observado como **público** y el archivo `.env` estuvo
versionado en `main`. Aunque el archivo fue retirado del seguimiento, **los secretos
permanecen en el historial de Git**.

## Requerido (bloqueante para producción)

- [ ] Rotar `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` en el panel de Supabase.
- [ ] Regenerar la clave anónima (anon key) y cualquier clave service_role expuesta.
- [ ] Actualizar las variables reales en Netlify (no en el repo).
- [ ] Confirmar que ningún valor real aparece en `.env.example` ni en el diff.
- [ ] Evaluar con un profesional de Git si se purga el historial (`git filter-repo`)
      antes de mantener el repo público con nueva vida.
- [ ] NO reescribir historial de forma automática sin aprobación del cliente.

## Política vigente

- `.env`, `.env.*` están en `.gitignore`; solo `.env.example` se versiona (sin valores).
- OpenCode no abre ni reproduce los valores del `.env`.
- Cualquier secret adicional del dashboard debe ir en variables de entorno de Netlify.
