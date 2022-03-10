nLetras = 5

lista = open("PalavrasPT.txt", encoding="utf-8")

# Filtro 5 letras
listaFiltrada = [pal for pal in lista if len(pal)==(nLetras+1)]

# Filtro sem nomes próprios
listaFiltrada = [pal for pal in listaFiltrada if not pal[0].isupper()]


print(f"Total de palavras com {nLetras} letras: {len(listaFiltrada)}") 

with open("listaFiltrada.txt", "w", encoding="utf-8") as txt_file:
    for line in listaFiltrada:
        txt_file.write("".join(line)) 