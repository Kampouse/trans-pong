import csv  #import csv module to work with csv
import time
with open('scrape.csv', 'a', newline='') as file: #opening the file in write mode
    
    writer = csv.writer(file, delimiter=' ',)
    writer.writerow(["hello",time.asctime() , 1])

