const { pool } = require("./pool.js");

function getCommuneByCoord(lon,lat) {
    return new Promise(function(resolve, reject) {
        console.log('select ST_AsGeoJSON(ST_Transform(geom_commune,4326)) as geom, * from carte.territoire where ST_WITHIN(st_SetSRID(ST_POINT('+lon+', '+lat+'),4326), geom_commune)');
        pool.query('select ST_AsGeoJSON(ST_Transform(geom_commune,4326)) as geom, * from carte.territoire where ST_WITHIN(st_SetSRID(ST_POINT('+lon+', '+lat+'),4326), geom_commune)',
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
      pool.query('SELECT ST_AsGeoJSON(ST_Transform(geom_commune,4326)) as geom, * FROM carte.territoire where codinsee=\''+codinsee+'\'', (error, results) => {
      if (error) {
          reject(error)
    }
    resolve(results.rows);
  })
}) 
}

function getPrixByCodinsee(codinsee) {
  return new Promise(function(resolve, reject) {
      console.log('select annee_mutation, round(avg(prix_brut/NULLIF(taille_bati,0)),2) from carte.dvf where codinsee =\''+codinsee+'\' group by annee_mutation');
      pool.query('select annee_mutation, round(avg(prix_brut/NULLIF(taille_bati,0)),2) ' + 
      'from carte.dvf where codinsee =\''+codinsee+'\' group by annee_mutation', (error, results) => {
      if (error) {
          reject(error)
    }
    resolve(results.rows);
  })
}) 
}

function getCloseTransaction(lon, lat) {
  return new Promise(function(resolve, reject) {
    console.log('select annee_mutation, taille_bati, taille_terrain, prix_brut, ST_X(ST_GeometryN(geomloc,1)) as lon, ST_Y(ST_GeometryN(geomloc,1)) as lat, nb_pieces from carte.dvf where codinsee=(select codinsee from carte.geo where ST_WITHIN(st_SetSRID(ST_POINT('+lon+', '+lat+'),4326), geom)) and geomloc is not NULL ORDER BY geomloc <-> st_SetSRID(ST_POINT('+lon+', '+lat+'),4326) ASC LIMIT 10');
    pool.query('select annee_mutation, taille_bati, taille_terrain, prix_brut, ST_X(ST_GeometryN(geomloc,1)) as lon, ST_Y(ST_GeometryN(geomloc,1)) as lat, nb_pieces from carte.dvf where codinsee=(select codinsee from carte.geo where ST_WITHIN(st_SetSRID(ST_POINT('+lon+', '+lat+'),4326), geom)) and geomloc is not NULL ORDER BY geomloc <-> st_SetSRID(ST_POINT('+lon+', '+lat+'),4326) ASC LIMIT 10', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  })
}

function getWikiByCodinsee(codinsee) {
  return new Promise(function(resolve, reject) {
      //console.log('select ST_AsGeoJSON(ST_Transform(geom_commune,4326)) as geom, * from carte.territoire where ST_WITHIN(st_SetSRID(ST_POINT('+lon+', '+lat+'),4326), geom_commune)');
      pool.query('select annee, ' +
      'SUM(vues) as vues ' +
      ' from carte.wiki ' +
      'where code = \''+codinsee+'\' '+
      ' and annee != 2023 ' +
      'group by annee',
      (error, results) => {
      if (error) {
          reject(error)
    }
    resolve(results.rows);
  })
}) 
}

function getMeteoByCoord(lon,lat) {
  return new Promise(function(resolve, reject) {
      //console.log('select ST_AsGeoJSON(ST_Transform(geom_commune,4326)) as geom, * from carte.territoire where ST_WITHIN(st_SetSRID(ST_POINT('+lon+', '+lat+'),4326), geom_commune)');
      pool.query('select annee, temperature_max, temperature_mediane, temperature_min from carte.meteo as met ' +
      'inner join carte.station as stati on stati.id_station = met.id_station::integer ' +
      'where met.id_station::integer = (SELECT id_station ' +
      'from carte.station as stati ' +
      'ORDER BY stati.geom_station <-> st_SetSRID(ST_POINT('+lon+', '+lat+'),4326) LIMIT 1)',
      (error, results) => {
      if (error) {
          reject(error)
    }
    resolve(results.rows);
  })
}) 
}

function getSecuriteByCodinsee(codinsee) {
  return new Promise(function(resolve, reject) {
      pool.query('select annee, ' +
      'SUM(case when classe in (\'Coups et blessures volontaires\',\'Coups et blessures volontaires intrafamiliaux\', \'Destructions et dégradations volontaires\', \'Violences sexuelles\', \'Autres coups et blessures volontaires\') then faits else 0 end) as nb_violences, '+
      'SUM(case when classe in (\'Vols avec armes\',\'Vols de véhicules\', \'Vols dans les véhicules\', \'Vols sans violence contre des personnes\', \'Vols violents sans arme\') then faits else 0 end) as nb_vols, ' +
      'SUM(case when classe in (\'Cambriolages de logement\') then faits else 0 end) as nb_cambriolages ' +
      ' from carte.securite ' +
      'where codinsee = \''+codinsee+'\' '+
      'group by annee', (error, results) => {
      if (error) {
          reject(error)
    }
    resolve(results.rows);
  })
}) 
}

module.exports = {
    getCommuneByCoord,
    getMeteoByCoord,
    getWikiByCodinsee,
    getSecuriteByCodinsee,
    getCommuneByCodinsee,
    getCloseTransaction,
    getPrixByCodinsee,
  }