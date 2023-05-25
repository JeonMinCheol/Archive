# 시간 복잡도 = 공간 복잡도 = O(n+k)
def getDigit(j,i):
    if len(str(j)) < i:
        return 0
    
    s = str(j)
    ret = s[len(str(j)) -i]
    return int(ret)
         

import random

def radixSort(arr):
    # 배열의 최대값을 구하여 정렬해야 하는 자릿수를 파악.
    maxVal = max(arr)
    
    #최하위 자릿수부터 시작하여 각 숫자 위치를 반복
    for i in range(1, len(str(maxVal)) + 1):
        #각 자릿수의 숫자를 저장할 버킷 10개를 생성한다.
        buckets =[ [] for _ in range(10) ]
        
        # 현재 숫자를 기준으로 각 숫자를 해당 버킷에 넣는다.
        for j in arr:
            digit = getDigit(j,i)
            buckets[digit].append(j)
            
        # 숫자를 버킷에 넣은 순서대로 배열에 다시 배치(정렬)
        arr = []
        for bucket in buckets:
            for num in bucket:
                arr.append(num)
                
                
    return arr
            
            
arr = [9,8,7,6,5,1234,3,2,15]
print(arr)
print(radixSort(arr))