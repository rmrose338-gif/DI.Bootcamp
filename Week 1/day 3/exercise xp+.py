student_grades = {
	"Alice": [88, 92, 100],
	"Bob": [75, 78, 80],
	"Charlie": [92, 90, 85],
	"Dana": [83, 88, 92],
	"Eli": [78, 80, 72]
}

student_averages = {}
student_letter_grades = {}

for student, grades in student_grades.items():
	average = sum(grades) / len(grades)
	student_averages[student] = average

	if average >= 90:
		letter_grade = "A"
	elif average >= 80:
		letter_grade = "B"
	elif average >= 70:
		letter_grade = "C"
	elif average >= 60:
		letter_grade = "D"
	else:
		letter_grade = "F"

	student_letter_grades[student] = letter_grade

class_average = sum(student_averages.values()) / len(student_averages)
print(f"Class average: {class_average:.2f}")

for student in student_grades:
	print(
		f"{student}: average = {student_averages[student]:.2f}, "
		f"grade = {student_letter_grades[student]}"
	)

#exercise2
sales_data = [
	{"customer_id": 1, "product": "Smartphone", "price": 600, "quantity": 1, "date": "2023-04-03"},
	{"customer_id": 2, "product": "Laptop", "price": 1200, "quantity": 1, "date": "2023-04-04"},
	{"customer_id": 1, "product": "Laptop", "price": 1000, "quantity": 1, "date": "2023-04-05"},
	{"customer_id": 2, "product": "Smartphone", "price": 500, "quantity": 2, "date": "2023-04-06"},
	{"customer_id": 3, "product": "Headphones", "price": 150, "quantity": 4, "date": "2023-04-07"},
	{"customer_id": 3, "product": "Smartphone", "price": 550, "quantity": 1, "date": "2023-04-08"},
	{"customer_id": 1, "product": "Headphones", "price": 100, "quantity": 2, "date": "2023-04-09"},
]

total_sales_by_product = {}
customer_spending = {}
purchase_counts = {}

for transaction in sales_data:
	transaction["total_price"] = transaction["price"] * transaction["quantity"]
	product = transaction["product"]
	customer_id = transaction["customer_id"]

	total_sales_by_product[product] = total_sales_by_product.get(product, 0) + transaction["total_price"]
	customer_spending[customer_id] = customer_spending.get(customer_id, 0) + transaction["total_price"]
	purchase_counts[customer_id] = purchase_counts.get(customer_id, 0) + 1

high_value_transactions = [
	transaction for transaction in sales_data if transaction["total_price"] > 500
]
high_value_transactions.sort(key=lambda transaction: transaction["total_price"], reverse=True)

loyal_customers = [
	customer_id for customer_id, count in purchase_counts.items() if count > 1
]

transaction_totals_by_product = {}
transaction_counts_by_product = {}
quantity_sold_by_product = {}

for transaction in sales_data:
	product = transaction["product"]
	transaction_totals_by_product[product] = (
		transaction_totals_by_product.get(product, 0) + transaction["total_price"]
	)
	transaction_counts_by_product[product] = transaction_counts_by_product.get(product, 0) + 1
	quantity_sold_by_product[product] = (
		quantity_sold_by_product.get(product, 0) + transaction["quantity"]
	)

average_transaction_value = {
	product: transaction_totals_by_product[product] / transaction_counts_by_product[product]
	for product in transaction_totals_by_product
}
most_popular_product = max(quantity_sold_by_product, key=quantity_sold_by_product.get)

print("Total sales by product:", total_sales_by_product)
print("Customer spending:", customer_spending)
print("High-value transactions:", high_value_transactions)
print("Loyal customers:", loyal_customers)
print("Average transaction value:", average_transaction_value)
print("Most popular product:", most_popular_product)
print(
	"Marketing insight: promote popular products, target loyal customers with rewards, "
	"and use high-value transactions for personalized offers."
)
