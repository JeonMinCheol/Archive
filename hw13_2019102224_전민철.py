# 방법 1, 2를 사용하여 makeHeap을 구현하고 힙정렬 알고리즘을 완성

import math
class Heap:
    n = 0 # 원소 개수
    h = 0 # 트리 높이

    # data 추가 시 인덱스 1부터 시작.
    def __init__(self,data):
        self.data = data
        self.n = len(self.data) - 1
        self.h = math.floor(math.log2(self.n))

    # 원소를 추가하는 메서드
    def addElem(self, elem):
        self.data.append(elem)
        self.n += 1 # 원소 개수 + 1
        self.h = math.floor(math.log2(self.n)) # 트리 높이 업데이트
        self.siftUp(self.data, self.n) # 새 원소를 추가했으니 재정렬

    # 마지막 원소를 부모 노드와 비교하면 sift-up
    def siftUp(self, data, i):
        while(i>=2): # i == 1인 경우 루트 노드이므로
            parent = int(i / 2)
            if data[parent] < data[i]: # 만약 자식 노드가 부모 노드보다 더 큰 경우 교환
                data[parent], data[i] = data[i], data[parent]
                i = parent
            else:
                break

    # 서브 트리의 자식들과 부모를 비교해서 sift-down
    def siftDown(self,i):
        largerChild = -1
        while(i <= self.n):
            if i * 2 + 1 <= self.n: # 자식이 두 명 존재
                if self.data[i * 2] > self.data[i*2 + 1]:  # 자식들중 값이 큰 자식을 선택
                    largerChild = i * 2 
                else:
                    largerChild = i * 2 + 1 
            elif i * 2 <= self.n: # 자식이 한 명 존재
                largerChild = i * 2
            else:
                break

            # 자식이 존재하는 경우
            # 만약 자식이 부모보다 더 크다면 교환
            if self.data[i] < self.data[largerChild]:
                self.data[largerChild], self.data[i] = self.data[i], self.data[largerChild]
                i = largerChild
            else:
                break
                
    def makeHeap1(self):
        s = [0, self.data[1]]

        # 원소를 한 개씩 추가하면서 정렬
        for index in range(2, self.n + 1):
            elem = self.data[index]
            s.append(elem) # 원소를 한 개 추가

            self.siftUp(s, index)
        
        self.data = s
            
    def makeHeap2(self):
        for i in range(self.h):
            for j in range(2**i, 2**(i+1)):
                if j <= self.n:
                    self.siftDown(j)

    # root를 반환하고 마지막 원소를 루트 자리로 옮긴 뒤 sift-down을 시행
    def root(self):
        if(self.n > 0):
            keyout = self.data[1]

            self.data[1] = self.data[self.n]
            self.data[self.n] = 0
            self.n -= 1
            if(self.n > 0):
                self.h = math.floor(math.log2(self.n))
            else:
                self.h = 0

            self.siftDown(1)
            return keyout
    
    def removeKeys(self):
        num = self.n
        s = [0] * (num + 1)
        for i in range(num, 0, -1):
            s[i] = self.root()
        
        return s
    


def heapSort1(a):
    h = Heap(a)
    h.makeHeap1()
    return h.removeKeys()[1:]
     
def heapSort2(a):
    h = Heap(a)
    h.makeHeap2()
    return h.removeKeys()[1:]
    


# 인덱스를 간단히 하기 위해 처음 엘리먼트로 0을 추가.
data = [0,11,14,2,7,6,3,9,5]
# 방법 1을 이용하여 heapSort 구현
print("방법 1을 이용한 구현")
a = Heap(data)
a.makeHeap1()
print(a.data)
a.addElem(50)
print(a.data)
s = heapSort1(a.data)
print(s)


# 방법 2를 이용하여 heapSort 구현
data = [0,11,14,2,7,6,3,9,5]
print("\n방법 2를 이용한 구현")
b = Heap(data)
b.makeHeap2()
print(b.data)
b.addElem(50)
print(b.data)
s = heapSort2(b.data)
print(s)