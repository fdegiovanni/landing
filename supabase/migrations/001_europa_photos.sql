create table if not exists europa_photos (
  id              uuid default gen_random_uuid() primary key,
  city_slug       text not null,
  taken_date      date not null,
  google_photo_id text not null unique,
  storage_path    text not null,
  public_url      text not null,
  width           integer,
  height          integer,
  score           integer,
  display_order   integer,
  synced_at       timestamptz default now()
);

create index if not exists europa_photos_city_date
  on europa_photos (city_slug, taken_date);
