from itertools import permutations 

value, compare =(input().split())
value = int(value)
compare=int(compare)

a = str(value)
b = str(compare)
a = ''.join(sorted(a))

if len(a)<len(b):
    print(-1)
else:    
    result = -1
    permList = permutations(a)
    for perm in list(permList):
        str1 = ''.join(perm)
        n = int(str1)
        if(n > compare):
            result = n
            break
    print(result)