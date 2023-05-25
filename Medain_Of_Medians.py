def MedianOfMedians(arr):
    if len(arr) <= 5:
        return findMedian(arr)
    
    medians=[]
    for i in range(0, len(arr)//5):
        group = arr[i*5 : min((i+1)*5, len(arr))] # ~5 or ~ arr
        median = findMedian(group)
        medians.append(median)
        
    approximate_median = MedianOfMedians(medians)
    return approximate_median

def findMedian(arr):
    arr.sort()
    return arr[len(arr)//2]
