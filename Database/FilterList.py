import sys

def filter_list(source_list_name: str) -> None:
    print(f"Filtering file {source_list_name}")

    nLetters = 5
    source_list = open(source_list_name, encoding="utf-8")

    # Filters out words which letter count differs from nLetters
    output_list = [word for word in source_list if len(word) == (nLetters+1)]

    # Filters out names
    output_list = [word for word in output_list if not word[0].isupper()]

    print(f"There are {len(output_list)} words with {nLetters} letters\n")

    output_file_name = "Filtered" + source_list_name
    with open(output_file_name, "w", encoding="utf-8") as txt_file:
        for line in output_list:
            txt_file.write("".join(line)) 

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("At least one file name must be provided")
    else:
        for i in range(1, len(sys.argv)):
            filter_list(sys.argv[i])