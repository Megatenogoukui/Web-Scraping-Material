import pandas as pd


# Exporting without using any library in python
#Opening a file name example.txt , first parameter reresents the file name and the second parameter represents the operation 
with open("example.txt" , "w") as file:
    file.write("Heyy this is my first day creating my Empire")


# Exporting data using Panda library


# Initialising a Data
states = ["Maharashtra" , "Karnataka" , "Goa"]
population = ["1290000" , "334000" , "94000"]

# Creating a dictionary for storing daata
dict_state_population = {"State" : states , "Population" : population}

#Creating a data frame using panda
states_pop_dataframe = pd.DataFrame(dict_state_population)

#Exporting it to csv
states_pop_dataframe.to_csv("states_population.csv" , index=False)  #Index = False means that there wont be any serial numbers

