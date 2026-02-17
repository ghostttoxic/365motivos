-- Rode este comando no SQL Editor do seu painel Supabase

create table user_progress (
  id text primary key, -- Será a "senha do casal"
  opened_cards jsonb default '[]'::jsonb,
  golden_revealed jsonb default '[]'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Habilitar RLS (Row Level Security) para segurança (opcional neste caso simples, mas recomendado)
alter table user_progress enable row level security;

-- Criar política de acesso total (leitura/escrita) para qualquer um que tenha a chave ANON e saiba o ID (senha)
create policy "Acesso público via ID"
on user_progress
for all
using (true)
with check (true);
