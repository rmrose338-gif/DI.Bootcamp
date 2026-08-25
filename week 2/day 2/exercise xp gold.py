class BankAccount:
    def __init__(self, balance, username, password):
        self.balance = balance
        self.username = username
        self.password = password
        self.authenticated = False

    def authenticate(self, username, password):
        if username == self.username and password == self.password:
            self.authenticated = True
        return self.authenticated

    def _validate_amount(self, amount):
        if not isinstance(amount, int) or isinstance(amount, bool) or amount <= 0:
            raise Exception('Amount must be a positive integer.')
        if not self.authenticated:
            raise Exception('You must authenticate before using your account.')

    def deposit(self, amount):
        self._validate_amount(amount)
        self.balance += amount

    def withdraw(self, amount):
        self._validate_amount(amount)
        if amount > self.balance:
            raise Exception('Insufficient funds.')
        self.balance -= amount


class MinimumBalanceAccount(BankAccount):
    def __init__(self, balance, username, password, minimum_balance=0):
        super().__init__(balance, username, password)
        self.minimum_balance = minimum_balance

    def withdraw(self, amount):
        self._validate_amount(amount)
        if self.balance - amount <= self.minimum_balance:
            raise Exception('The minimum balance would not be maintained.')
        self.balance -= amount


class ATM:
    def __init__(self, account_list, try_limit):
        if not isinstance(account_list, list) or not all(
            isinstance(account, (BankAccount, MinimumBalanceAccount))
            for account in account_list
        ):
            raise Exception('account_list must contain bank account instances.')

        try:
            if not isinstance(try_limit, (int, float)) or isinstance(try_limit, bool) or try_limit <= 0:
                raise Exception('try_limit must be a positive number.')
        except Exception as error:
            print(error)
            try_limit = 2

        self.account_list = account_list
        self.try_limit = try_limit
        self.current_tries = 0
        self.show_main_menu()

    def show_main_menu(self):
        while self.current_tries < self.try_limit:
            print('\nATM Main Menu')
            print('1. Log in')
            print('2. Exit')
            choice = input('Choose an option: ')

            if choice == '1':
                username = input('Username: ')
                password = input('Password: ')
                if self.log_in(username, password):
                    continue
            elif choice == '2':
                print('Goodbye.')
                return
            else:
                print('Invalid option.')

        if self.current_tries >= self.try_limit:
            print('You reached the maximum number of tries. The ATM is shutting down.')

    def log_in(self, username, password):
        for account in self.account_list:
            if account.authenticate(username, password):
                self.show_account_menu(account)
                return True

        self.current_tries += 1
        print('Invalid username or password.')
        return False

    def show_account_menu(self, account):
        while True:
            print('\nAccount Menu')
            print('1. Deposit')
            print('2. Withdraw')
            print('3. Exit')
            choice = input('Choose an option: ')

            if choice == '1':
                amount = int(input('Amount to deposit: '))
                account.deposit(amount)
                print(f'New balance: {account.balance}')
            elif choice == '2':
                amount = int(input('Amount to withdraw: '))
                account.withdraw(amount)
                print(f'New balance: {account.balance}')
            elif choice == '3':
                return
            else:
                print('Invalid option.')
