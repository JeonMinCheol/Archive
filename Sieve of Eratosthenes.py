# 에타토스테네스의 체 구현 파일
import math

def sieve_of_eratosthenes(n):
    primes = [True] * (n+1)
    primes[0] = False
    primes[1] = False
    
    for i in range(2,int(math.sqrt(n))):
        if primes[i]:
            for j in range(i*i, n+1, i):
                primes[j] = False
    
    return [i for i in range(2, n+1) if primes[i]]

        
n = int(input("수를 입력하세요"))

ret = sieve_of_eratosthenes(n)
print("소수", ret)
    