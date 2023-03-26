const { Pool, pool } = require("./pool.js");

function getCommuneByCoord(lon,lat) {
    return new Promise(function(resolve, reject) {
        console.log('select ST_AsGeoJSON(ST_Transform(geom_commune,4326)) as geom, nom_commune, codinsee, nb_apt, nb_log, revenu_median from acpr.communes where ST_WITHIN(st_SetSRID(ST_POINT('+lon+', '+lat+'),4326), geom_commune)')
        pool.query('select ST_AsGeoJSON(ST_Transform(geom_commune,4326)) as geom, nom_commune, codinsee, nb_apt, nb_log, revenu_median from acpr.communes where ST_WITHIN(st_SetSRID(ST_POINT('+lon+', '+lat+'),4326), geom_commune)',
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
      console.log('chauffe marcel ', codinsee);
      pool.query('SELECT ST_AsGeoJSON(ST_Transform(geom_commune,4326)) as geom, nom_commune, codinsee, nb_apt, nb_log, revenu_median FROM acpr.communes where codinsee=\''+codinsee+'\'', (error, results) => {
      if (error) {
          reject(error)
    }
    resolve(results.rows);
  })
}) 
}

module.exports = {
    getCommuneByCoord,
    getCommuneByCodinsee
  }