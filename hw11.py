# 1. sum of subset
n = 5
s = [1,4,5,6,8]
W = 10
include = n*["false"]
total = 0
cnt = 0

for k in s:
    total += k

def promising(i, weight, total):
    return i + 1 < n and (weight + total >= W or weight + s[i+1] <= W)

def sum_of_subsets(i, weight, total, include):
    global cnt
    if promising(i, weight, total):
        if weight == W:
            print("sol: ",include)
        else:
            include[i+1] = "true"
            sum_of_subsets(i+1, weight + s[i+1], total - s[i+1], include)
            
            include[i+1] = "false"
            sum_of_subsets(i+1, weight, total, include)
    cnt +=1

print("1.sum of subset")
print("items = ", s, "W = ", W)
sum_of_subsets(-1,0,total, include)
print("총 노드 수 : {}\n".format(cnt))




# 2. m-coloring
def color(i,vcolor):
    global n, colors, cnt
    if promising(i, vcolor):
        if i + 1 == n:
            print("sol: ",vcolor)
        else:
            for c in range(colors):
                vcolor[i+1] = c
                color(i+1, vcolor)
        
    cnt += 1

def promising(i,vcolor):
    global n
    for j in range(n):
        if W[i][j] and vcolor[i] == vcolor[j]:
            return False
    return True

n=7
cnt = 0
colors=3
W=[[0,1,1,0,0,0,1],[1,0,1,1,0,0,0],[1,1,0,1,1,1,1],
   [0,1,1,0,1,0,0],[0,0,1,1,0,1,0],[0,0,1,0,1,0,1],
    [1,0,1,0,0,1,0]]

print("2.m-coloring")
for i in range(colors):
    vcolor=n*[-1]
    vcolor[0] = i
    color(0,vcolor)
    
print("총 노드 수 : {}\n".format(cnt))
