# WordleClone
A nice clone to wordle or term.ooo

![Screenshot 2023-03-13 233909](https://user-images.githubusercontent.com/78967454/224878701-b22a257e-536e-4404-ae07-cf52180f77c7.png)

## Usage:
  - As this fetches files from other directories, it requires a web server. The easiest way to start one is with python: "python -m http.server" in the repo's directory.
  - In a browser, go to http://127.0.0.1:8000/

## Getting list of possible words
This repo includes a python script to filter a file for words with 5 letters and that are not names.
In this repo, "Database/Words.txt" contains the entirety of the portuguese dictionary.
Running "python FilterList.py <file name>" creates "Filtered<file name>".
For the game to use this new filtered file, its name must be put in line 24 of main.js, at:
  - secretWordList = readTextFile("./Database/FilteredWords.txt");
