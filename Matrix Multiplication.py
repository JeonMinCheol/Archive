def matrix_multiplication(data1, data2):
    n = len(data1)
    C = [[0] * n] * n
    
    for i in range(n):
        for j in range(n):
            for k in range(n):
                C[i][j] += data1[i][k] * data2[k][j]
    return C