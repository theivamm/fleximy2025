-- Bucket para imágenes de fondo
-- Crear desde Supabase Dashboard > Storage:
-- Name: vessel-backgrounds
-- Public bucket: Sí
-- Allowed MIME types: image/png, image/jpeg, image/webp

-- Policies para vessel-backgrounds
create policy "Authenticated users can upload backgrounds"
  on storage.objects for insert
  with check (bucket_id = 'vessel-backgrounds' and auth.role() = 'authenticated');

create policy "Anyone can view backgrounds"
  on storage.objects for select
  using (bucket_id = 'vessel-backgrounds');
