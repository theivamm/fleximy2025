-- Tabla de plantillas de diseño
create table vessel_dashboard.templates (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  preview_url text,
  created_at timestamptz not null default now()
);

-- Tabla de diseños creados por usuarios
create table vessel_dashboard.designs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  template_id uuid references vessel_dashboard.templates(id),
  title text not null,
  subtitle text,
  background_url text,
  gradient_opacity numeric default 0.6,
  font_color text default '#ffffff',
  format text default 'square' check (format in ('square','vertical','horizontal','story')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Insertar plantilla inicial
insert into vessel_dashboard.templates (name, description) values
  ('Simple', 'Logo VESSEL arriba izquierda, título grande, subtítulo, fondo con imagen y degradado negro');

-- RLS para designs
alter table vessel_dashboard.designs enable row level security;

create policy "Users can view own designs"
  on vessel_dashboard.designs for select
  using (auth.uid() = user_id);

create policy "Users can insert own designs"
  on vessel_dashboard.designs for insert
  with check (auth.uid() = user_id);

create policy "Users can update own designs"
  on vessel_dashboard.designs for update
  using (auth.uid() = user_id);

create policy "Users can delete own designs"
  on vessel_dashboard.designs for delete
  using (auth.uid() = user_id);

-- RLS para templates (todos pueden leer)
alter table vessel_dashboard.templates enable row level security;

create policy "Anyone can view templates"
  on vessel_dashboard.templates for select
  using (true);
