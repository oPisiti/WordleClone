# WordleClone
A nice clone to wordle or term.ooo

![Screenshot 2023-03-13 233909](https://user-images.githubusercontent.com/78967454/224878701-b22a257e-536e-4404-ae07-cf52180f77c7.png)

## Usage:
  - As this fetches files from other directories, it requires a web server. The easiest way to start one is with, in the repo's directory:
  ```python
  python3 -m http.server
  ```
  - In a browser, go to http://localhost:8000/

## Getting list of possible words
This repo includes a python script to filter a file for words with 5 letters and that are not names.

In this repo, "Database/Words.txt" contains the entirety of the portuguese dictionary.

To create a new text filtered list, run:
```python
python3 FilterList.py <raw-list>"
```

For the game to use this new filtered file, its name must be put in line 24 of main.js, at:
  - secretWordList = readTextFile("./Database/<filtered-list-file>");

# P5js library

This project uses the p5js library.

Thank you to all the contributors.

For the latest release, go to https://p5js.org/download/