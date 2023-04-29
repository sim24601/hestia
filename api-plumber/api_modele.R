library(plumber)
library(tidymodels)
library(logger)

pr <- plumb(".\\3_CODE_R\\Modelisation\\prediction.R") %>% 
  pr_set_debug(TRUE) %>%
  pr_run(port = 3002, quiet=TRUE)
