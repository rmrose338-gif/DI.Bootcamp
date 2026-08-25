


class GameOfLife:
    NEIGHBOR_OFFSETS = (
        (-1, -1), (-1, 0), (-1, 1),
        (0, -1),           (0, 1),
        (1, -1),  (1, 0),  (1, 1),
    )

    def __init__(self, width, height, live_cells=None):
        if width <= 0 or height <= 0:
            raise ValueError('The grid dimensions must be positive.')

        self.width = width
        self.height = height
        self.grid = [
            [False for _ in range(width)]
            for _ in range(height)
        ]

        for row, column in live_cells or []:
            self._validate_position(row, column)
            self.grid[row][column] = True

    def _validate_position(self, row, column):
        if not (0 <= row < self.height and 0 <= column < self.width):
            raise ValueError('A live cell must be inside the grid.')

    def live_neighbor_count(self, row, column):
        count = 0
        for row_offset, column_offset in self.NEIGHBOR_OFFSETS:
            neighbor_row = row + row_offset
            neighbor_column = column + column_offset
            if (
                0 <= neighbor_row < self.height
                and 0 <= neighbor_column < self.width
                and self.grid[neighbor_row][neighbor_column]
            ):
                count += 1
        return count

    def next_generation(self):
        next_grid = [
            [False for _ in range(self.width)]
            for _ in range(self.height)
        ]

        for row in range(self.height):
            for column in range(self.width):
                neighbors = self.live_neighbor_count(row, column)
                cell_is_alive = self.grid[row][column]
                next_grid[row][column] = (
                    neighbors in (2, 3) if cell_is_alive else neighbors == 3
                )

        self.grid = next_grid

    def display(self, generation):
        print(f'Generation {generation}')
        print('\n'.join(
            ''.join('##' if cell else '..' for cell in row)
            for row in self.grid
        ))
        print()

    def run(self, generations):
        self.display(0)
        for generation in range(1, generations + 1):
            self.next_generation()
            self.display(generation)


def run_example(name, width, height, live_cells, generations):
    print(f'=== {name} ===')
    game = GameOfLife(width, height, live_cells)
    game.run(generations)


if __name__ == '__main__':
    run_example(
        'Blinker: oscillates',
        10,
        7,
        [(3, 4), (3, 5), (3, 6)],
        4,
    )
    run_example(
        'Block: remains fixed',
        8,
        6,
        [(2, 3), (2, 4), (3, 3), (3, 4)],
        2,
    )
    run_example(
        'Glider: moves until it reaches a border',
        12,
        10,
        [(1, 2), (2, 3), (3, 1), (3, 2), (3, 3)],
        8,
    )


class Pagination:
    def __init__(self, items=None, page_size=10):
        if page_size <= 0:
            raise ValueError('page_size must be greater than zero.')

        self.items = [] if items is None else items
        self.page_size = page_size
        self.current_idx = 0
        self.total_pages = 'math'.ceil(len(self.items) / self.page_size)

    def get_visible_items(self):
        start = self.current_idx * self.page_size
        end = start + self.page_size
        return self.items[start:end]

    def go_to_page(self, page_num):
        if page_num < 1 or page_num > self.total_pages:
            raise ValueError('Page number is out of range.')
        self.current_idx = page_num - 1
        return self

    def first_page(self):
        self.current_idx = 0
        return self

    def last_page(self):
        if self.total_pages:
            self.current_idx = self.total_pages - 1
        return self

    def next_page(self):
        if self.current_idx < self.total_pages - 1:
            self.current_idx += 1
        return self

    def previous_page(self):
        if self.current_idx > 0:
            self.current_idx -= 1
        return self

    def __str__(self):
        return '\n'.join(str(item) for item in self.get_visible_items())

    def nextPage(self):
        return self.next_page()

    def getVisibleItems(self):
        return self.get_visible_items()


if __name__ == '__main__':
    alphabet_list = list('abcdefghijklmnopqrstuvwxyz')
    pagination = Pagination(alphabet_list, 4)

    print(pagination.get_visible_items())
    pagination.next_page()
    print(pagination.get_visible_items())
    pagination.last_page()
    print(pagination.get_visible_items())

    for invalid_page in (10, 0):
        try:
            pagination.go_to_page(invalid_page)
        except ValueError as error:
            print(f'ValueError: {error}')

    print(Pagination(alphabet_list, 4).nextPage().nextPage().nextPage().getVisibleItems())
