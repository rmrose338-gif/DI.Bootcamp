#exercise1
class Phone:
    def __init__(self, phone_number):
        self.phone_number = phone_number
        self.call_history = []
        self.messages = []

    def call(self, other_phone):
        call_record = f"{self.phone_number} called {other_phone.phone_number}"
        print(call_record)

        self.call_history.append(call_record)
        other_phone.call_history.append(call_record)

    def show_call_history(self):
        print(f"Call history for {self.phone_number}:")
        for call in self.call_history:
            print(call)

    def send_message(self, other_phone, content):
        message = {
            "to": other_phone.phone_number,
            "from": self.phone_number,
            "content": content,
        }

        self.messages.append(message)
        other_phone.messages.append(message)

    def show_outgoing_messages(self):
        print(f"Outgoing messages from {self.phone_number}:")
        for message in self.messages:
            if message["from"] == self.phone_number:
                print(message)

    def show_incoming_messages(self):
        print(f"Incoming messages for {self.phone_number}:")
        for message in self.messages:
            if message["to"] == self.phone_number:
                print(message)

    def show_messages_from(self, phone_number):
        print(f"Messages from {phone_number}:")
        for message in self.messages:
            if message["from"] == phone_number:
                print(message)


# Test
phone1 = Phone("111-111-1111")
phone2 = Phone("222-222-2222")

phone1.call(phone2)
phone1.send_message(phone2, "Hello!")
phone2.send_message(phone1, "Hi, how are you?")

phone1.show_call_history()
phone1.show_outgoing_messages()
phone1.show_incoming_messages()
phone1.show_messages_from(phone2.phone_number)