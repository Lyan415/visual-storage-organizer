
-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create Projects Table
create table public.projects (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  owner_id uuid references auth.users not null
);

-- Create Items Table
create table public.items (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  image_url text,
  note text,
  parent_id uuid references public.items,
  project_id uuid references public.projects not null
);

-- Set up Row Level Security (RLS)
alter table public.projects enable row level security;
alter table public.items enable row level security;

-- Policies for Projects
create policy "Users can view their own projects"
  on public.projects for select
  using ( auth.uid() = owner_id );

create policy "Users can insert their own projects"
  on public.projects for insert
  with check ( auth.uid() = owner_id );

create policy "Users can update their own projects"
  on public.projects for update
  using ( auth.uid() = owner_id );

create policy "Users can delete their own projects"
  on public.projects for delete
  using ( auth.uid() = owner_id );

-- Policies for Items (based on project ownership)
-- Note: This requires a join to check project ownership, which can be complex in RLS.
-- A simpler approach for now is to trust the project_id check if we ensure UI consistently passes it,
-- creates a risk if someone guesses a project_id.
-- A better secure approach:
create policy "Users can view items in their projects"
  on public.items for select
  using (
    exists (
      select 1 from public.projects
      where projects.id = items.project_id
      and projects.owner_id = auth.uid()
    )
  );

create policy "Users can insert items in their projects"
  on public.items for insert
  with check (
    exists (
      select 1 from public.projects
      where projects.id = items.project_id
      and projects.owner_id = auth.uid()
    )
  );

create policy "Users can update items in their projects"
  on public.items for update
  using (
    exists (
      select 1 from public.projects
      where projects.id = items.project_id
      and projects.owner_id = auth.uid()
    )
  );

create policy "Users can delete items in their projects"
  on public.items for delete
  using (
    exists (
      select 1 from public.projects
      where projects.id = items.project_id
      and projects.owner_id = auth.uid()
    )
  );

-- Storage (Optional, if you want to use storage for images later)
-- insert into storage.buckets (id, name) values ('item-images', 'item-images');
-- create policy "Authenticated users can upload images" on storage.objects for insert with check ( bucket_id = 'item-images' and auth.role() = 'authenticated' );
-- create policy "Anyone can view images" on storage.objects for select using ( bucket_id = 'item-images' );
