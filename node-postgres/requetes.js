const { Pool, pool } = require("./pool.js");

function getCommuneByCoord(lon,lat) {
    return new Promise(function(resolve, reject) {
        console.log('select ST_AsGeoJSON(ST_Transform(geom_commune,4326)) as geom, * from maps.communes where ST_WITHIN(st_SetSRID(ST_POINT('+lon+', '+lat+'),4326), geom_commune)')
        pool.query('select ST_AsGeoJSON(ST_Transform(geom_commune,4326)) as geom, * from maps.communes where ST_WITHIN(st_SetSRID(ST_POINT('+lon+', '+lat+'),4326), geom_commune)',
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
      pool.query('SELECT ST_AsGeoJSON(ST_Transform(geom_commune,4326)) as geom, * FROM maps.communes where codinsee=\''+codinsee+'\'', (error, results) => {
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