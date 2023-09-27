import heapq
W = 16 # 무게 제한
data = [[], [40,2,20], [30,5,6],[50,10,5],[10,5,2]] # [가치, 무게, 가치 / 무게]
maxProfit = 0
node = 0
arr = []

# 분기한정 가지치기 깊이우선검색방법으로 0-1 배낭 문제 해결하는 알고리즘

def bound(level, w, p): # 유망성을 계산하는 함수
    current_w = w
    current_p = p
    
    if level < len(data):
        for i in range(level, len(data)):
            profit = data[i][0]
            weight = data[i][1]
            div = data[i][2]
            
            if current_w + weight <= W:
                current_w += weight
                current_p += profit
            else:
                current_p += (W - current_w) * div
                current_w = W
                break
    return current_p

def promising(level, w, p):
    global maxProfit    
    if w > W or bound(level, w, p) < maxProfit:
        return False
        
    return True;
    
def DFS(level, w, p, lis): # 깊이 우선 검색 코드 
    global node
    global maxProfit
    global arr
    node += 1
    if level == len(data):
        if(p == maxProfit and w <= W): 
            arr = lis
        return 
        
        
    if promising(level,w,p):
        if(w + data[level][1] <= W and maxProfit < p + data[level][0]):
            maxProfit = p + data[level][0]
        
        l = lis[:]
        l[level] = True
        DFS(level+1, w + data[level][1], p + data[level][0], l)
        l[level] = False
        DFS(level+1, w, p, l)

DFS(1, 0,0,[0] * len(data))
print("깊이 우선 검색 답 : {}\n경로 : {}\n생성된 노드의 개수 : {}".format( maxProfit, arr[1:], node))


# 분기한정 가지치기 최고우선검색 방법으로 0-1 배낭문제를 해결하는 알고리즘
maxProfit = 0
node = 1
arr = []
def BFS(): #최고 우선 검색 코드
    global arr
    global maxProfit
    global node
    pq = []
    heapq.heapify(pq)
    
    pq.append((0, 0, [0] * len(data), 1))
        
    while len(pq):
        profit, weight, lis, level = heapq.heappop(pq)
        profit *= -1
        if(profit > maxProfit):
            maxProfit = profit
        
        if(level == len(data) and profit == maxProfit):
            arr = lis[:]
        
        if(level < len(data) and promising(level, weight, profit)):
            a = lis[:]
            if(weight + data[level][1] <= W):
                a[level] = True
                heapq.heappush(pq,((-1 * (profit + data[level][0]), weight + data[level][1], a, level + 1)))   
                node += 1
                
            b = lis[:]                
            b[level] = False
            heapq.heappush(pq,((-profit, weight, b, level + 1)))
            node+=1
            
BFS()
print("\n최고 우선 검색 답 : {}\n경로 : {}\n생성된 노드의 개수 : {}".format( maxProfit, arr[1:], node))
            
            
            
        
    
