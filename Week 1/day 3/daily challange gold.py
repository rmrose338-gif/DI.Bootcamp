# challenge
def caesar_cipher(message, shift):
    result = ""

    for character in message:
        if character.isalpha():
            start = ord("A") if character.isupper() else ord("a")
            new_character = chr((ord(character) - start + shift) % 26 + start)
            result += new_character
        else:
            result += character

    return result


choice = input("Do you want to encrypt or decrypt? ").lower()
message = input("Enter your message: ")
shift = int(input("Enter the shift: "))

if choice == "encrypt":
    print(caesar_cipher(message, shift))
elif choice == "decrypt":
    print(caesar_cipher(message, -shift))
else:
    print("Invalid choice.")