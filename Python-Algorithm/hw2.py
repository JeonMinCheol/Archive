# 문제 1번
# 실습동영상 [shana]pfe5 15-19쪽 [실습프로그램] Floyd 알고리즘을 다음의 그래프에 대해 python으로 완성하라. 
# 최단경로 v3->v1를 출력하라.

INF = 987654321 
g = [ # 그래프를 인접 행렬로 생성
    [],
    [0, 0,1,2,1,5],
    [0, 9,0,3,INF,INF],
    [0, INF,INF,0,4,INF],
    [0, INF,INF,2,0,3],
    [0, 3,INF,INF,INF,0]
]

P = [[0 for _ in range(len(g))] for _ in range(len(g))] # 경로 체크에 사용

def allShortestPath(g,n): # 최단 거리 탐색을 위한 플로이드 알고리즘
    for k in range(1,n):
        for i in range(1,n):       
            for j in range(1, n):
                if(g[i][j] > g[i][k] + g[k][j]):
                    g[i][j] = g[i][k] + g[k][j]
                    P[i][j] = k

def Path(start, end): # start에서 end로 가는 최단 경로에 위치한 노드들을 출력한다.
    if P[start][end] != 0:
        Path(start, P[start][end])
        print(" -> V", P[start][end], end = "")
        Path(P[start][end], end)
        

allShortestPath(g,len(g))

# V3 -> V1 간의 최단 경로 출력
print("V 3", end = "")
Path(3,1)
print(" -> V 1")


# 문제 2번
# 실습동영상 pfe5 27쪽 [실습프로그램] 연쇄행렬 최소 곱셈 알고리즘 프로그램을
# python으로 완성하라. order(1,5)를 출력하라.

d = [4,4,3,5,3,2] # 각 행렬의 크기를 담는 배열
n = len(d)-1

m = [[INF for j in range(1,n+2)] for i in range(1,n+2)] # 행렬 곱셈의 값을 담는 배열
p = [[0 for j in range(1,n+2)] for i in range(1,n+2)] # 최적의 순서를 체크하기 위한 배열

for i in range(1, n+1):
    m[i][i] = 0

def minmult(i,j): # 연쇄 행렬 곱셈의 최소 곱셈 횟수를 구하는 함수
    for diagonal in range(1, n+1):
        for i in range(1, n - diagonal + 1):
            j = i + diagonal
            for k in range(i, j):
                newValue = m[i][k] + m[k+1][j] + d[i-1] * d[k] * d[j]
                if m[i][j] > newValue:
                    m[i][j] = newValue
                    p[i][j] = k            

def order(i,j): # i번째 행렬과 j번째 행렬을 곱했을 때 진행 순서를 나타내는 함수
    if i == j:
        print("A", i,end=" ")
    else:
        k = p[i][j]
        print("(",end="")
        order(i,k)
        order(k+1,j)
        print(")",end="")
        
        
minmult(1,5) # 1번째 행렬과 5번째 행렬의 연쇄 행렬 곱셈을 시행
order(1,5) # 결과 출력
        
