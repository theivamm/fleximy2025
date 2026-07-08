-- Crear schema aislado para el dashboard de Vessel
-- Este schema es independiente del schema public
-- Solo comparte auth.users (global de Supabase Auth)

create schema if not exists vessel_dashboard;

-- Tabla de imágenes generadas con IA
create table vessel_dashboard.generated_images (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  prompt text not null,
  format text not null check (format in ('square','vertical','horizontal','story')),
  image_data text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Trigger para actualizar updated_at automáticamente
create or replace function vessel_dashboard.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger generated_images_updated_at
  before update on vessel_dashboard.generated_images
  for each row execute function vessel_dashboard.set_updated_at();

-- RLS: aislamiento total por usuario
alter table vessel_dashboard.generated_images enable row level security;

create policy "Users can view own images"
  on vessel_dashboard.generated_images for select
  using (auth.uid() = user_id);

create policy "Users can insert own images"
  on vessel_dashboard.generated_images for insert
  with check (auth.uid() = user_id);

create policy "Users can delete own images"
  on vessel_dashboard.generated_images for delete
  using (auth.uid() = user_id);
