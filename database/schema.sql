-- Version 2: directed parent edges and peer partner edges.
create table trees (id uuid primary key default gen_random_uuid(), name text not null, created_at timestamptz not null default now());
create table people (id uuid primary key default gen_random_uuid(), tree_id uuid not null references trees(id) on delete cascade, full_name text not null, birth_date date, death_date date, biography text, image_url text, created_at timestamptz not null default now());
create type relationship_kind as enum ('biological_parent', 'adoptive_parent', 'partner');
create table relationships (id uuid primary key default gen_random_uuid(), tree_id uuid not null references trees(id) on delete cascade, from_person_id uuid not null references people(id) on delete cascade, to_person_id uuid not null references people(id) on delete cascade, kind relationship_kind not null, check (from_person_id <> to_person_id));
create index relationships_to_person_idx on relationships(to_person_id);
create index relationships_from_person_idx on relationships(from_person_id);
