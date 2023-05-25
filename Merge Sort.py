import random
lis = [random.randrange(1,100) for _ in range(20)]

def Merge(left, right):
    result = []
    left_index = 0
    right_index = 0
    
    while left_index < len(left) and right_index < len(right):
        if left[left_index] <= right[right_index]:
            result.append(left[left_index])
            left_index+=1
        else:
            result.append(right[right_index])
            right_index+=1
            
    while left_index < len(left):
        result.append(left[left_index])
        left_index+=1
    while right_index < len(left):
        result.append(right[right_index])
        right_index+=1
        
    return result
    

def MergeSort(lis):
    if len(lis) <= 1:
        return lis
    
    mid = len(lis)//2
    left = MergeSort(lis[0:mid])
    right = MergeSort(lis[mid:len(lis)])
    
    return Merge(left,right)

print("정렬 전 리스트 : {}".format(lis))
print("정렬 후 리스트 : {}".format(MergeSort(lis)))