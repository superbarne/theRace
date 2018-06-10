image:
  registry: docker.io
  repository: bitnami/redis
  tag: 4.0.9
cluster:
  enabled: false
  slaveCount: 1
metrics:
  enabled: false
networkPolicy:
  enabled: false
usePassword: false
master:
  service:
    ##  Redis Master Service type
    type: ClusterIP
  persistence:
    enabled: false
slave:
  service:
    type: ClusterIP