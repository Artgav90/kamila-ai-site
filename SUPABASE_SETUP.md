# Supabase Setup For Topdance

## 1) Подготовить проект в Supabase
1. Открой `Project Settings -> API`.
2. Скопируй:
- `Project URL`
- `anon public key`

## 2) Создать таблицу для состояния приложения
Открой `SQL Editor` и выполни:

```sql
create table if not exists public.app_state (
  id text primary key,
  payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_app_state_updated_at on public.app_state;
create trigger trg_app_state_updated_at
before update on public.app_state
for each row execute function public.touch_updated_at();

alter table public.app_state enable row level security;

grant usage on schema public to anon, authenticated;
grant select, insert, update on public.app_state to anon, authenticated;

drop policy if exists "anon read app_state" on public.app_state;
drop policy if exists "anon insert app_state" on public.app_state;
drop policy if exists "anon update app_state" on public.app_state;

create policy "anon read app_state"
on public.app_state
for select
to anon
using (id = any (array[
  'students',
  'admin',
  'schedule',
  'crm_activities',
  'settings',
  'users',
  'student_checkins'
]));

create policy "anon insert app_state"
on public.app_state
for insert
to anon
with check (id = any (array[
  'students',
  'admin',
  'schedule',
  'crm_activities',
  'settings',
  'users',
  'student_checkins'
]));

create policy "anon update app_state"
on public.app_state
for update
to anon
using (id = any (array[
  'students',
  'admin',
  'schedule',
  'crm_activities',
  'settings',
  'users',
  'student_checkins'
]))
with check (id = any (array[
  'students',
  'admin',
  'schedule',
  'crm_activities',
  'settings',
  'users',
  'student_checkins'
]));

insert into public.app_state (id, payload) values
  ('students', '{}'::jsonb),
  ('admin', '{}'::jsonb),
  ('schedule', '{}'::jsonb),
  ('crm_activities', '[]'::jsonb),
  ('settings', '{}'::jsonb),
  ('users', '{"usersById":{}}'::jsonb),
  ('student_checkins', '{}'::jsonb)
on conflict (id) do nothing;
```

## 3) Локально подключить env
Создай `.env` в корне проекта:

```bash
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

## 4) Добавить env на Vercel
В Vercel Project Settings -> Environment Variables добавь:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

После добавления сделай redeploy.

## 5) Проверка
1. Открой приложение.
2. Выполни несколько действий:
- переключи язык RU/DE,
- в админке сделай check-in/добавь занятия,
- в CRM измени любой toggle в settings,
- в расписании забронируй/сними бронирование занятия.
3. В Supabase открой `Table Editor -> app_state`.
4. Должны обновляться отдельные строки:
- `id=students`
- `id=admin`
- `id=schedule`
- `id=crm_activities`
- `id=settings`
5. `id=student_checkins` остаётся только как legacy-совместимость (если были старые данные).

## 6) Отключить старое приложение от этого Supabase
1. Удали старые env с Supabase-ключами в старом приложении.
2. Сделай redeploy старого приложения.
3. В Supabase в `Authentication -> URL Configuration` убери старые домены.
4. При необходимости ротируй ключи в `Project Settings -> API` и обнови их только в Topdance.

## Важно по безопасности
Сейчас настроена модель без логина (роль `anon`) для фиксированного набора id в `app_state`.
Для production лучше перейти на авторизацию пользователей и более строгие RLS-политики.
