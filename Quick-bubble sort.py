import time
import random
n = [5000,10000,15000,20000,30000,40000, 80000]
def bubble_sort(data):
    n = len(data)
    for i in range(n):
        for j in range(1,n-i):
            if data[j-1] > data[j]:
                data[j-1], data[j] = data[j], data[j-1]
    return data


def quickSort(data, start, end):
    # 기저 사례
    if start >= end:
        return ;
    
    pivot = start
    left = start + 1
    right = end
    
    while left <= right:
        while left <= end and data[left] <= data[pivot] :
            left += 1
        while start < right and data[pivot] <= data[right]:
            right -= 1
        
        if left < right:
            tmp = data[left]
            data[left] = data[right]
            data[right] = tmp
        elif left > right:
            tmp = data[right]
            data[right] = data[pivot]
            data[pivot] = tmp
    
    quickSort(data,start, right - 1)
    quickSort(data,right + 1, end)
    
#퀵 정렬
print("퀵 정렬 시간 측정")
for num in n:
    data = []
    for _ in range(num):
        data.append(random.randrange(1,1000))
    print("n = %d 일때 걸린 시간" %num, end = " ")
    start = time.time()
    quickSort(data,0, num-1)
    end = time.time()
    print(end - start)

# 버블 정렬
print("버블 정렬 시간 측정")
for num in n:
    if num == 80000:
        break
    data = []
    for _ in range(num):
        data.append(random.randrange(1,1000))
    print("n = %d 일때 걸린 시간" %num, end = " ")
    start = time.time()
    bubble_sort(data)
    end = time.time()
    print(end - start)
  