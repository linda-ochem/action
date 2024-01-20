param location string = 'eastus'
param clusterName string = 'lindaCluster'
// param nodeCount int = 1

resource cluster 'Microsoft.ContainerService/managedClusters@2021-09-01' = {
  name: clusterName
  location: location
  properties: {
    kubernetesVersion: '1.25.6'
    agentPoolProfiles: [
      {
        name: 'agentpool'
        osDiskSizeGB: 30
        count: 1
        vmSize: 'Standard_DS2_v2'
        osType: 'Linux'
        mode: 'System'
      }
    ]
    dnsPrefix: uniqueString('aksdns', clusterName)
    enableRBAC: true
    networkProfile: {
      loadBalancerSku: 'Standard'
    }
    servicePrincipalProfile: {
      clientId: '215b7ce2-5263-4593-a622-da030405d151'
      secret: '1fc91a1f-88d1-439f-a31e-d0f14278b866'
    }
  }
}

output kubeconfig string = cluster.properties.kubeConfig


// param location string = 'eastus'
// param clusterName string = 'lindaCluster'

// resource cluster 'Microsoft.ContainerService/managedClusters@2021-09-01' = {
//   name: clusterName
//   location: location
//   properties: {
//     kubernetesVersion: '1.26'
//     agentPoolProfiles: [
//       {
//         name: 'agentpool'
//         osDiskSizeGB: 30
//         count: 1
//         vmSize: 'Standard_DS2_v2'
//         osType: 'Linux'
//         mode: 'System'
//       }
//     ]
//     dnsPrefix: uniqueString('aksdns', clusterName)
//     enableRBAC: true
//     networkProfile: {
//       loadBalancerSku: 'Standard'
//     }
//   }
// }

// output kubeconfig string = cluster.properties.kubeConfig
