#* Perform a prediction with a get request
#* @get /getprediction 
function(bins) {
    library(dplyr)
    df <- jsonlite::fromJSON(bins)
    saveRDS(df,'C://travail//projet//Data_dvf//8_Model//Output//test')
    nullToNA <- function(x) {
      x[sapply(x, is.null)] <- NA
      return(x)
    }
    df <- nullToNA(df)
    df <- as.data.frame(df) %>% rename(Date_1919 = date_1919, 
                                       Date_1945 = date_1945,
                                       Date_1970 = date_1970,
                                       Date_1990 = date_1990,
                                       Date_2005 = date_2005,
                                       Date_2015 = date_2015,
                                       Menages_10plus = menages_10plus,
                                       Pop_14 = pop_14, 
                                       Pop_29 = pop_29,
                                       Pop_44 = pop_44,
                                       Pop_59 = pop_59,
                                       Pop_74 = pop_74,
                                       Pop_89 = pop_89,
                                       Pop_100 = pop_100,
                                       Inondations.et.ou.Coulées.de.Boue = inondations.et.ou.coulées.de.boue, 
                                       Mouvement.de.Terrain = mouvement.de.terrain,
                                       Sécheresse = sécheresse, 
                                       Grêle = grêle, 
                                       Tempête = tempête, 
                                       Inondations.Remontée.Nappe = inondations.remontée.nappe, 
                                       Glissement.de.Terrain = glissement.de.terrain,
                                       Eboulement.et.ou.Chute.de.Blocs = eboulement.et.ou.chute.de.blocs, 
                                       Secousse.Sismique = secousse.sismique,
                                       Effondrement.et.ou.Affaisement = effondrement.et.ou.affaisement,
                                       Lave.Torrentielle = lave.torrentielle, 
                                       Avalanche = avalanche,
                                       Chocs.Mécaniques.liés.à.l.action.des.Vagues = chocs.mécaniques.liés.à.l.action.des.vagues, 
                                       Glissement.et.Effondrement.de.Terrain = glissement.et.effondrement.de.terrain,
                                       Poids.de.la.Neige = poids.de.la.neige,
                                       Raz.de.Marée = raz.de.marée,
                                       Glissement.et.Eboulement.Rocheux = glissement.et.eboulement.rocheux,
                                       Coulée.de.Boue = coulée.de.boue,
                                       Divers = divers, 
                                       Vents.Cycloniques = vents.cycloniques, 
                                       Eruption.Volcanique = eruption.volcanique,
                                       Services = services, 
                                       Commerces = commerces,
                                       Enseignement = enseignement, 
                                       Sante = sante, 
                                       Loisirs = loisirs, 
                                       Transports = transports, 
                                       Tourisme. = tourisme.)
    #as.data.frame(lapply(jsonlite::fromJSON(req$postBody), unlist))
    model <- readr::read_rds("C://travail//projet//Data_dvf//8_Model//Output//modele.rds")
    prediction <- predict(model, new_data = df)
    prediction
}

#* Get Histogram raw data
#* @get /hist-raw
function(bins) {
  x = faithful$waiting
  bins = as.numeric(bins)
  breaks = seq(min(x), max(x), length.out = bins + 1)
  hist_out = hist(x, breaks = breaks, main = "Raw Histogram")
  as.data.frame(hist_out[2:6])
}

#temporary testing purposes
#* @filter cors
cors = function(res) {
  res$setHeader("Access-Control-Allow-Origin", "http://localhost:3000")
  plumber::forward()
}


# function(req) {
#   print(req)

# }
