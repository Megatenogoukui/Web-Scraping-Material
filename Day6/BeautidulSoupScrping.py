from bs4 import BeautifulSoup
import requests
import lxml

request = requests.get("https://subslikescript.com/movie/Titanic-120338#google_vignette")


content =request.text

soup = BeautifulSoup(content , 'lxml')


# print(soup.prettify())

box = soup.find("article",class_= "main-article")

# print(box.prettify())

h1 = box.find("h1").get_text()



p = box.find("p").get_text()


script  = box.find("div",class_ = "full-script").get_text(strip=True ,separator=" ")

print("Tittle : ",h1)
print("Transcript : ",p)
print("Script : ",script)


with open(f'{h1}.txt' , "w") as file:
    file.write(script)


