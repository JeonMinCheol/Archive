import random
from Medain_Of_Medians import *

arr = [random.randrange(1,200) for _ in range(9)]

def quickSort(arr,low,high):
    if low < high:
        pivotIndex = partition(arr,low,high)
        quickSort(arr, low,pivotIndex-1)
        quickSort(arr, pivotIndex+1, high)
        
def partition(arr,low,high):
    pivot = MedianOfMedians(arr[low:high+1])
    pivotIndex = -1
    i = low - 1
    
    for j in range(low, high+1):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    
        if(arr[i] == pivot): # 꼭 구해야한다.
            pivotIndex = i
        
    arr[i], arr[pivotIndex] = arr[pivotIndex], arr[i]
    return i

quickSort(arr,0,len(arr)-1)
print(arr)