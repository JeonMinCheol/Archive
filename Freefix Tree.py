class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end_of_word = False

class Trie:
    def __init__(self):
        self.root = TrieNode()
    
    def insert(self,word):
        node = self.root
        for i in range(len(word)):
            if word[i] not in node.children:
                node.children[word[i]] = TrieNode()
            node = node.children[word[i]]
        node.is_end_of_word = True
        
    def search(self,word):
        node = self.root
        for i in range(len(word)):
            if word[i] not in node.children:
                return False
            node = node.children[word[i]]
        return node.is_end_of_word

    def delete(self,word):
        nodes_to_del = [] # 삭제할 노드 기록
        node = self.root
        for i in range(len(word)):
            if word[i] not in node.children:
                return False # 문자열이 트라이에 없음
            nodes_to_del.append((node,word[i]))
            node = node.children[word[i]]
        if not node.is_end_of_word:
            return False # 문자열이 트라이에 없음
        node.is_end_of_word = False
        
        for parent, char in reversed(nodes_to_del): # 역순으로 삭제
            if node.is_end_of_word or len(node.children) > 0:
                # 다른 자식이 있거나
                # 단어의 끝인 경우
                # 삭제 작업 정지
                break
            del parent.children[char]
            node = parent
        
        return True
            
            
T = Trie()
print("abcd를 추가합니다.")
T.insert("abcd")
print("abcd를 탐색합니다.")
print(T.search("abcd"))
print("a를 삭제합니다.")
print(T.delete("a"))
print("abcd를 삭제합니다.")
print(T.delete("abcd"))
print("abcd를 탐색합니다.")
print(T.search("abcd"))