import heapq
testcase = int(input())
testCount = 1

def solve(board, n):
    pq = []
    path = [[-1,0], [0,-1], [0,1], [1,0]]
    endPoint = n-1
    visited = [[False for _ in range(n)] for _ in range(n)]
    visited[0][0] = True
    pq.append([board[0][0], 0, 0]) # value, row, col 
    
    while(len(pq) != 0):
        val, posR, posC = heapq.heappop(pq)
        if posR == endPoint and posC == endPoint:
            return val
        
        for p in path:
            newR = posR + p[0]
            newC = posC + p[1]
            if newR < 0 or n-1 < newR or newC < 0 or n-1 < newC:
                continue
            if visited[newR][newC]:
                continue
            
            newV = val + board[newR][newC]
            heapq.heappush(pq, [newV, newR, newC])
            visited[newR][newC] = True

while(testCount <= testcase):
    n = int(input())
    board = []
    for _ in range(n):
        board.append(list(map(int, input()))) # 문자열이 구분되어 있지 않다면 list로 묶으면 하나씩 분리된다.
       
    result = solve(board, n)
    print("#{} {}".format(testCount, result))
    testCount += 1
        
      
    
