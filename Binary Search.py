target = int(input())
data = [i for i in range(1,25, 2)]

def b_search(left, right, list):
    if left > right:
        return -1
    
    mid = (left + right) // 2
    mid_value = list[mid]
    
    if mid_value == target:
        return mid
    elif mid_value < target:
        return b_search(mid+1, right, list)
    else:
        return b_search(left,mid-1, list)
print("data 출력 결과 : ", data)
print("{0}의 인덱스는 {1}입니다.".format(target, b_search(0,len(data)-1, data)))