# Challenge
MATRIX_STR = '''
7ir
Tsi
h%x
i ?
sM# 
$a 
#t%'''

# Step 1: Convert the string into a 2D list
matrix = [list(row) for row in MATRIX_STR.strip().splitlines()]

# Step 2: Read the matrix column by column
decoded_message = ""
space_pending = False

for column in range(len(matrix[0])):
    for row in range(len(matrix)):
        character = matrix[row][column]

        if character.isalpha():
            if space_pending and decoded_message:
                decoded_message += " "

            decoded_message += character
            space_pending = False
        else:
            if decoded_message:
                space_pending = True

print(decoded_message)
