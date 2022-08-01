from math import *
import re
import random
import string
import json
import threading


words = []

with open("./calculations/nsf2021.txt") as f:
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
            recursiveBuildWords(move, updatedNett, s + getLetterAtNetPos(move, updatedNett) + getLetterAtNetPos(move, updatedNett), getPossibleValidWords(s, ppwords))


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
    return nett[pos["y"]][pos["x"]]


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
        p += len(s)
    return p

def isAllLettersUsed(n, s):
    for l in n:
        if not isLetterInSolutions(l, s):
            return False
    return True
        

def isLetterInSolutions(l, solutions):
    for si in range(len(solutions)):
        if l in solutions[si]:
            return True
    return False

def worker(type):
    o=0
    for i in range(100):
        n = getRandomString()
        v = getValidWords(n)
        print(i)
        if not isAllLettersUsed(n, v):
            continue
        if len(v) > 49:
            continue
        if len(v) < 24:
            continue
        m = getMaxPoints(v)
        netts[f"{o}-{type}"] = {
            "wordnett": n,
            "solutions": v,
            "maxWords": len(v),
            "maxScore": getMaxPoints(v)
        }
        print(f"index:{o}, maxWords: {len(v)}, nett: {n}")
        o+=1

if __name__ == "__main__":
    with open("./calculations/my_generated_wordnetts.json", "w") as outfile:
        netts = {}
        t1 = threading.Thread( target=worker, args=("a") )
        t2 = threading.Thread( target=worker, args=("b") )
        t3 = threading.Thread( target=worker, args=("c") )

        t1.start()
        t2.start()
        t3.start()

        t1.join()
        t2.join()
        t3.join()

        json.dump(netts, outfile)

