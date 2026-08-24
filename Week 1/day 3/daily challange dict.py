# Challenge 1: Letter Index Dictionary

word = input("Enter a word: ")
letter_indices = {}

for index, letter in enumerate(word):
    if letter in letter_indices:
        letter_indices[letter].append(index)
    else:
        letter_indices[letter] = [index]

print(letter_indices)


# Challenge 2: Affordable Items

items_purchase = {
    "Water": "$1",
    "Bread": "$3",
    "TV": "$1,000",
    "Fertilizer": "$20"
}

wallet = "$300"
wallet_amount = int(wallet.replace("$", "").replace(",", ""))

basket = []

for item, price in items_purchase.items():
    item_price = int(price.replace("$", "").replace(",", ""))

    if item_price <= wallet_amount:
        basket.append(item)
        wallet_amount -= item_price

if basket:
    print(sorted(basket))
else:
    print("Nothing")

