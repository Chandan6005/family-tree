# Kin — Version 2

People are graph nodes and relationships are typed graph edges. Parent edges are directed `parent → child`. Partner edges are peer connections and never change a person's generation. Siblings are never a separate relation: adding one makes them another child of the selected person's recorded parents, preventing contradictory data.

This version uses `localStorage` behind the app state boundary. A person also owns optional `biography` and `image` values; uploaded images are a local data URL capped at 2 MB. The Supabase/PostgreSQL schema in `database/schema.sql` mirrors this model, so a later server-backed version can replace persistence without redesigning the user interface.

## Diagram rules

* Partner edges leave the right side of the left partner and enter the left side of the right partner. Partners are forced into the same generation row.
* For a child with two recorded parents, both bottom handles meet at a shared horizontal junction. One vertical segment then descends from the centre of that junction to the child’s top handle.
