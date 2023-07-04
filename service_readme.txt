spec.selector: 어떠한 라벨을 가지는 포드에 접근할 수 있게 만들 것인지 지정
sepc.ports.port: 서비스의 ip에 접근할 때 사용할 포트를 설정, 쿠버 안에서만 사용가능한 고유 ip(cluster ip)
spec.ports.targetPort: selector에서 정의한 라벨에 의해 접근 대상이 된 포드들이 내부적으로 사용하고 있는 포트 = containerPort
spec.type: 어떤 서비스인지 설정 (ClusterIP, NodePort, LoadBalancer 중 택 1)