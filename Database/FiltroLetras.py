nLetras = 5

lista = open("PalavrasPT.txt", encoding="utf-8")
listaFiltrada = [pal for pal in lista if len(pal)==(nLetras+1)]


print(f"Total de palavras com {nLetras} letras: {len(listaFiltrada)}") 

with open("listaFiltrada.txt", "w") as txt_file:
    for line in listaFiltrada:
        txt_file.write("".join(line)) 