# gcd(a,b) = gcd(b,r)
# r = a%b
# r == 0 인 경우 종료

def Euclidean_Algorithm(a,b):
    if(b == 0): 
        return a
    return Euclidean_Algorithm(b, a%b)

a = int(input())
b = int(input())
print(Euclidean_Algorithm(a,b))