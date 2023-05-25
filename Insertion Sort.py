import random
data = [5,4,3,2,1]
data2 = [[0] * 5] * 5 
data3 = [[0] * 5] * 5

for i in range(5):
    for j in range(5):
        data2[i][j] = random.randrange(1,10)

for i in range(5):
    for j in range(5):
        data3[i][j] = random.randrange(1,10)


def insertion_sort(data):
    for j in range(1, len(data)):
        key = data[j]
        i = j-1
        
        while i >= 0 and data[i] > key:
            data[i+1] = data[i]
            i -= 1
        data[i+1] = key
    return data

print("#1 버블소트")
for i in data:
    print(i, end = " ")
    
        
print("\n버블소트 실행결과:")
        