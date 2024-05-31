# Handling errors in python
data = [4, 6, 20 , "Abhishek"]

try:
    for each_data in data:
        print("Data is : ", each_data/2)
except:
    print("Please enter a valid number")