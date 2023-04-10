const { Pool, pool } = require("./pool.js");

function getCommuneByCoord(lon,lat) {
    return new Promise(function(resolve, reject) {
        // console.log('('+lon+', '+lat+')')
        pool.query('select ST_AsGeoJSON(ST_Transform(geom_commune,4326)) as geom, * from maps.territoire where ST_WITHIN(st_SetSRID(ST_POINT('+lon+', '+lat+'),4326), geom_commune)',
        (error, results) => {
        if (error) {
            reject(error)
      }
      resolve(results.rows);
    })
  }) 
}

function getCommuneByCodinsee(codinsee) {
  return new Promise(function(resolve, reject) {
      pool.query('SELECT ST_AsGeoJSON(ST_Transform(geom_commune,4326)) as geom, * FROM maps.territoire where codinsee=\''+codinsee+'\'', (error, results) => {
      if (error) {
          reject(error)
    }
    resolve(results.rows);
  })
}) 
}

function getCloseTransaction(lon, lat) {
  return new Promise(function(resolve, reject) {
    console.log('select annee_mutation, taille_bati, taille_terrain, prix_brut, ST_X(ST_GeometryN(geomloc,1)) as lon, ST_Y(ST_GeometryN(geomloc,1)) as lat from acpr.dvf where codinsee=(select codinsee from acpr.communes where ST_WITHIN(st_SetSRID(ST_POINT('+lon+', '+lat+'),4326), geom_commune) and geomloc is not NULL ORDER BY geomloc <-> st_SetSRID(ST_POINT('+lon+', '+lat+'),4326) ASC LIMIT 10');
    pool.query('select annee_mutation, taille_bati, taille_terrain, prix_brut, ST_X(ST_GeometryN(geomloc,1)) as lon, ST_Y(ST_GeometryN(geomloc,1)) as lat from acpr.dvf where codinsee=(select codinsee from acpr.communes where ST_WITHIN(st_SetSRID(ST_POINT('+lon+', '+lat+'),4326), geom_commune)) and geomloc is not NULL ORDER BY geomloc <-> st_SetSRID(ST_POINT('+lon+', '+lat+'),4326) ASC LIMIT 10', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  })
}
module.exports = {
    getCommuneByCoord,
    getCommuneByCodinsee,
    getCloseTransaction,
  }