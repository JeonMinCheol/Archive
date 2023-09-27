# Example input
val = [60,100,120] # 아이템의 가치
weight = [10,20,30] # 아이템의 무게
W = 50 # 무게 제한
n = len(val) # 아이템의 갯수
memo = [[0] * (W+1) for _ in range(n)] # memo[n][w] = n까지 사용 가능하고 가방의 무게가 W일 때 가치를 저장 

# 분할할 수 없는 경우
def KnapSack(W,weight,val,n,memo): # n은 크기, 인덱스 아님!!!
    if n == 0 or W == 0:
        return 0, []
    if memo[n-1][W] != 0: # 계산된 경우
        return memo[n-1][W], []
    if weight[n-1] > W: # 현재 아이템을 담지 못하는 경우
        memo[n-1][W], items = KnapSack(W,weight,val,n-1,memo) # 다음 아이템을 계산
        return memo[n-1][W], items
    else: 
        #현재 항목이 포함된 경우 값 및 항목 목록을 계산
        # 현재 항목이 포함되어 있으므로 무게 제한에서 항목의 무게만큼 빼주고 다음 항목으로 넘어감
        value1, items1 = KnapSack(W - weight[n-1],weight,val, n-1, memo) 
        # 현재 항목의 가치를 더해줌
        value1 = value1 + val[n-1]
        
        # 현재 항목이 포함되지 않은 경우 값 및 항목 목록을 계산
        value2,items2 = KnapSack(W,weight,val,n-1,memo)
        
        if value1 > value2: # 현재 항목을 포함시키는 것이 더 가치가 높은 경우
            memo[n-1][W] = value1
            items1+=[n-1]
            
            return value1, items1 # 현재 항목을 포함시켜서 리턴한다.
        else:
            memo[n-1][W] = value2
            return value2, items2 # 현재 항목은 포함시키지 않는다.
    
# 물건을 분할 할 수 있는 경우        
def Fractional_KnapSack(capacity, weights, values):
    #각 항목의 가중치 대비 가치 비율을 계산하고 튜플(value(가중치 대비 value 비율), weight, index)로 저장
    items = [(values[i]/weights[i],weights[i], i) for i in range(len(values))]
    
    #비율에 따라 내림차순으로 item을 정렬
    items.sort(reverse = True)
    total_value = 0
    knapsack_items = [] # index, 아이템이 포함된 비율
    for item in items:
        value_ratio, weight, index = item
        #전체 아이템을 배낭에 추가할 수 있는 경우 해당 아이템을 추가하고 업데이트
        if capacity >= weight: # 배당에 수용 무게가 현재 무게 이상이어야 한다.
            total_value += (weight*value_ratio) # value_ratio는 value를 weight로 나눈 값이므로 weight를 곱한다.
            capacity -= weight # 무게를 포함시켰으므로 빼준다.
            knapsack_items.append([index,100]) # 추가 시켰으면 인덱스를 추가
        else: #항목의 일부만 추가할 수 있는 경우 가능한 최대 비율을 추가하고 총 값을 업데이트
            fraction = capacity / weight # 일부만 추가해야 하므로 부분을 계산
            total_value += fraction * weight * value_ratio
            knapsack_items.append([index, fraction * 100]) # 사용한 물건의 인덱스와 사용 비율을 표시
            break
    
    return total_value, knapsack_items
    
    
# 1번 문제
result, item = KnapSack(W,weight,val,n,memo)
print(result, item)

# 2번 문제
result, item = Fractional_KnapSack(W,weight,val)
print(result, item)