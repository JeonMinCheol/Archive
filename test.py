#### 아래 변수에다가, string의 형태로 파일 이름을 적어주세요.
filename = "테스트2.txt"
##### 해당 부분은 파일을 열어 데이터가 읽어와지는 부분입니다. 건드리지 말아주세요.
kt_file = open(filename, 'r',encoding='utf8')
kt_file_content= kt_file.readlines()
kt_file.close()
##### 아래에 코드를 작성해주시면 됩니다. 카카오톡 대화 파일의 내용은 kt_file_content 변수에 저장되어 있습니다
del kt_file_content[0:4]
kt_file_content=[element for element in kt_file_content if '초대하였습니다' not in element]
kt_file_content=[element for element in kt_file_content if '---------------' not in element]
채팅=[]
for k in range(len(kt_file_content)):
    if kt_file_content[k].startswith('['):
        채팅.append(kt_file_content[k])
    else:
        채팅[-1]+=kt_file_content[k]
kt_file_content=채팅
while True:
 a=input("입력하세요: ")
 counts = {}
 for i in range(len(kt_file_content)):
    first_name = kt_file_content[i].split(" ")[0]
    counts[first_name] = 0
 if a==r"\laugh":
  laugh_words=["ㅋㅋ","ㅎㅎ"]
  for laugh in range(len(kt_file_content)):
   use_name=kt_file_content[laugh].split(" ")[0]
   laugh_count=sum([kt_file_content[laugh].count(word) for word in laugh_words])
   counts[use_name]+=laugh_count
 elif a=="\cry":
  cry_words=["ㅠ","ㅜ"]
  for cry in range(len(kt_file_content)):
   use_name=kt_file_content[cry].split(" ")[0]
   cry_count=sum([kt_file_content[cry].count(word) for word in cry_words])
   counts[use_name]+=cry_count
 elif a==r"\swear":
  swear_words=["ㅅㅂ","시발","ㅂㅅ","ㅄ","병신","ㅈㄹ"]
  for swear in range(len(kt_file_content)):
   use_name=kt_file_content[swear].split(" ")[0]
   swear_count=sum([kt_file_content[swear].count(word) for word in swear_words])
   counts[use_name]+=swear_count
 elif a==r"\talk":
  for tell in range(len(kt_file_content)):
   use_name=kt_file_content[tell].split(" ")[0]
   counts[use_name]+=kt_file_content[tell].count("[")-1
 elif a=="\stop":
    print("종료합니다")
    break
 else:
    for talk in range(len(kt_file_content)):
     use_name=kt_file_content[talk].split(" ")[0]
     kt_file_content[talk].replace('\n', ' ')
     counts[use_name]+=kt_file_content[talk].count(a)
     if use_name.count(a)>=1:
        counts[use_name]-=1
     
      
 
 
 counts = {key: value for key, value in counts.items() if key.startswith('[') and value != 0}

 for key, value in counts.items():
    print(key, ':', value)