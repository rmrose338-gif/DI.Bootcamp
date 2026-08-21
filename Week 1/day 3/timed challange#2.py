# Challenge 2
x = int(input("Enter the number"))

divisor_sum = 0

for  divisor in range (1 ,x):
    if x % divisor == 0 :
        divisor_sum += divisor
        
        print(x > 0 and divisor_sum == x)