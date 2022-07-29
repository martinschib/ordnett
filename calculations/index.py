from math import *
import re
import random
import string
import json


##! This is a testing file, and dose not contain the current rules of the game.


words = []
with open("./calculations/validSolutions.txt") as f:
    data = f.read().split("\n")
    for word in data:
        words.append(word)
    
# returns a list of all possible valid words with that startingpoint
def getPossibleValidWords(s, words):
    return list(filter(lambda v: re.match(f'{s}*', v), words))

# function to calculate number valid words
def getValidWords(s):
    validWords = []
    originalWordNett = createWordNett(s)

    filterdValidWords = list(filter(lambda v: re.match(f'[{s}]+$', v), words))
    
    def recursiveBuildWords(pos, nett, s, pwords):
        ppwords = pwords.copy()
        # ? The bug might be fixed?? I think so a least. Needs more testing
        # There might be a bug here somwhere,  and we are possible getting more words than 
        if len(ppwords) == 0 or s[-1] == "*":
            return

        if len(s) >= 4:
            possibleWords = getPossibleValidWords(s, ppwords)
            if s in possibleWords and s not in validWords: 
                validWords.append(s)

        updatedNett = nett.copy()
        l = list(updatedNett[pos["y"]])
        l[pos["x"]] = "*"
        updatedNett[pos["y"]] = "".join(l)
        validMoves = getValidLettersPos(pos, updatedNett)

        for move in validMoves:
            recursiveBuildWords(move, updatedNett, s + getLetterAtNetPos(move, updatedNett), getPossibleValidWords(s, ppwords))

    # recursivly build words from every starting position
    for y in range(3):
        for x in range(3):
            startPos = {"x": x, "y": y}
            recursiveBuildWords(startPos, originalWordNett, getLetterAtNetPos(startPos, originalWordNett), filterdValidWords)

    return validWords


# returns a wordnet for a valid string of len x^2
def createWordNett(s):
    side = sqrt(len(s))
    if not side.is_integer():
        return []

    wordNett = []
    for y in range(int(side)):
        wordNett.append(s[y*3:y*3+3])

    return wordNett

def getLettersInPath(startPos, endPos, nett):
    xDiff = endPos["x"] - startPos["x"] 
    yDiff = endPos["y"] - startPos["y"]
    if abs(xDiff) == 1:
        return []
    if abs(yDiff) == 1:
        return []

    return [nett[startPos["y"]+ int(yDiff/2)][startPos["x"]+int(xDiff/2)]]

# pos is a tupe (x, y) of where you are in the net
def getValidLettersPos(pos, nett):
    side = 3

    validLettersPos = []

    for y in range(side):
        for x in range(side):
            if pos["x"] == x and pos["y"] == y:
                continue
                
            lettersCrossed = getLettersInPath(pos, {"x": x, "y": y}, nett)
            
            if len(lettersCrossed) != 1 and nett[y][x] != "*":
                validLettersPos.append({"x": x, "y": y})
            elif len(lettersCrossed) == 1 and "*" in lettersCrossed:
                validLettersPos.append({"x": x, "y": y})
            

    return validLettersPos

def getLetterAtNetPos(pos, nett):
    return  nett[pos["y"]][pos["x"]]




# Get the list of all the possible words you can create


#print(getValidWords("plstøajky"))


#print(getValidLettersPos({"x": 0, "y": 0}, createWordNett("ølskpajke")))

#print(int(0/2))

# "kjøleskap"
# "ølskpajke"


#print(len(['øksl', 'øksla', 'øksle', 'øksa', 'løkka', 'løkke', 'løpsk', 'løpske', 'løpa', 'løpe', 'lask', 'laske', 'lase', 'laps', 'laks', 'lakk', 'lakke', 'lakkes', 'lake', 'lakes', 'leks', 'leksa', 'lekk', 'lekka', 'lepj', 'lepja', 'leas', 'leka', 'sløke', 'sløa', 'sløka', 'slak', 'slakk', 'slakke', 'slake', 'slep', 'slepa', 'spøk', 'spøke', 'spak', 'spake', 'spek', 'spekk', 'spekka', 'sale', 'sakk', 'sakke', 'sake', 'skal', 'skalk', 'skalke', 'skalp', 'skap', 'skape', 'skje', 'skjel', 'skjea', 'køla', 'køle', 'kløs', 'kløp', 'klas', 'klask', 'klaske', 'klase', 'klaps', 'klapse', 'klak', 'klake', 'klakes', 'kjøl', 'kjøle', 'kjøp', 'kjøpa', 'kjøpe', 'kjøa', 'kjas', 'kjase', 'kjaks', 'kjakse', 'kjake', 'kepaløk', 'pølsa', 'pløs', 'pløsa', 'plask', 'plaske', 'plakk', 'pale', 'pales', 'pakk', 'pakke', 'pakkes', 'pels', 'pelsa', 'pela', 'peka', 'alke', 'ales', 'aske', 'apes', 'aksl', 'aksle', 'akse', 'aksel', 'akke', 'akkes', 'akes', 'jask', 'jaske', 'japs', 'jakke', 'kalk', 'kalke', 'kalkes', 'kase', 'kaps', 'kapsl', 'kapsle', 'kapsel', 'kjel', 'kjekl', 'kjekla', 'kjeks', 'kjeksa', 'kjea', 'elsk', 'elska', 'epla']))


# print(max(['pløs', 'pløsa', 'pløy', 'pløya', 'plask', 'plakk', 'pølsa', 'pakk', 'løpsk', 'løpa', 'løkka', 'løyp', 'løypa', 'løya', 'laps', 'lask', 'laks', 'lakk', 'lykka', 'sløka', 'sløa', 'sløy', 'sløya', 'slak', 'slakk', 'slya', 'skøy', 'skøya', 'skya', 'søpl', 'søpla', 'søla', 'sølja', 'søka', 'søkk', 'søkka', 'søyla', 'søya', 'sakk', 'skap', 'skal', 'skalp', 'skalk', 'kløp', 'kløs', 'klaps', 'klas', 'klask', 'klak', 'køla', 'køya', 'kjøp', 'kjøpa', 'kjøl', 'kjøa', 'kjas', 'kjaks', 'øskja', 'øksl', 'øksla', 'øksa', 'asyl', 'aksl', 'jøya', 'jask', 'kalk']))


def getRandomString():
    data = string.ascii_lowercase + "æøå"

    s= ""
    while len(s)<9:
        n = random.choice(data)
        if n not in s:
            data.replace(n, "")
            s +=n
    return s

def getMaxPoints(l):
    p = 0
    for s in l:
        if len(s) == 4:
            p+=6
            continue
        elif len(s) == 5:
            p+=7
            continue
        elif len(s) == 6:
            p+=10
            continue
        elif len(s) == 7:
            p+=15
            continue
        elif len(s) == 8:
            p+=22
            continue
        elif len(s) == 9:
            p+=30
            continue
    return p

if __name__ == "__main__":
    with open("wordnett.json", "w") as outfile:
        o= 0
        netts = {}
        for i in range(1000):
            n = getRandomString()
            v = getValidWords(n)
            if len(v) > 49:
                continue
            if len(v) < 24:
                continue
            m = getMaxPoints(v)
            netts[f"{o}"] = {
                "wordnett": n,
                "solutions": v,
                "maxWords": len(v),
                "maxScore": getMaxPoints(v)
            }
            o+=1

        json.dump(netts, outfile)

