#mini project
def display_board(board):
    """Display the current game board."""
    print()
    for row in board:
        print(" | ".join(row))
        print("-" * 9)
    print()


def player_input(player, board):
    """Get and validate a player's move."""
    while True:
        move = input(
            f"Player {player}, enter row and column "
            f"(1-3, separated by a space): "
        )

        try:
            row, column = map(int, move.split())
            row -= 1
            column -= 1

            if not (0 <= row < 3 and 0 <= column < 3):
                print("Please enter numbers from 1 to 3.")
            elif board[row][column] != " ":
                print("That position is already taken.")
            else:
                return row, column

        except ValueError:
            print("Invalid input. Enter two numbers, such as: 1 2")


def check_win(board, player):
    """Return True if the player has three symbols in a row."""
    winning_combinations = [
        # Rows
        [(0, 0), (0, 1), (0, 2)],
        [(1, 0), (1, 1), (1, 2)],
        [(2, 0), (2, 1), (2, 2)],

        # Columns
        [(0, 0), (1, 0), (2, 0)],
        [(0, 1), (1, 1), (2, 1)],
        [(0, 2), (1, 2), (2, 2)],

        # Diagonals
        [(0, 0), (1, 1), (2, 2)],
        [(0, 2), (1, 1), (2, 0)]
    ]

    return any(
        all(board[row][column] == player for row, column in combination)
        for combination in winning_combinations
    )


def check_tie(board):
    """Return True if all board positions are filled."""
    return all(cell != " " for row in board for cell in row)


def play():
    """Run the Tic Tac Toe game."""
    board = [[" " for _ in range(3)] for _ in range(3)]
    current_player = "X"

    while True:
        display_board(board)

        row, column = player_input(current_player, board)
        board[row][column] = current_player

        if check_win(board, current_player):
            display_board(board)
            print(f"Player {current_player} wins!")
            break

        if check_tie(board):
            display_board(board)
            print("It's a tie!")
            break

        current_player = "O" if current_player == "X" else "X"


play()
