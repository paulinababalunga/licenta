create view vw_cautare as 
select 'parc' as tip, id, nume,descriere,cuvinte_cheie, st_x(geom) x, st_y(geom) y from informatii_publice.parc p
union
select 'muzeu' as tip, id, nume,descriere,cuvinte_cheie, st_x(geom) x, st_y(geom) y from informatii_publice.muzeu m
union
select 'hotel' as tip, id, nume,descriere,cuvinte_cheie, st_x(geom) x, st_y(geom) y from  informatii_publice.hotel h
union
select 'restaurant' as tip, id, nume,descriere,cuvinte_cheie, st_x(geom) x, st_y(geom) y from  informatii_publice.restaurant r
union
select 'pensiune' as tip, id, nume,descriere, cuvinte_cheie,st_x(geom) x , st_y(geom) y from  informatii_publice.pensiune ps
union
select 'spital' as tip, id, nume,descriere,cuvinte_cheie, st_x(geom) x, st_y(geom)  y from informatii_publice.spital s
union
select 'teatru' as tip, id, nume,descriere,cuvinte_cheie, st_x(geom) x, st_y(geom) y from informatii_publice.teatru t;