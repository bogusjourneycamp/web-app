with open("five-letter-words.txt" , "r") as f:
  for line in f.readlines():
    print("  \"" + line.strip() +"\",")
