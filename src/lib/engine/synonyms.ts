// Explicit Homeopathic Synonym & Deduplication Cluster Map
export interface SynonymCluster {
  clusterId: string;
  rubricPaths: string[];
}

export const MATERIAGRID_SYNONYM_CLUSTERS: SynonymCluster[] = [
  {
    clusterId: "fear_ghosts_imagination",
    rubricPaths: [
      "MIND - FEAR - ghosts, of",
      "MIND - FRIGHTENED - imagination, by",
      "MIND - DELUSION - phantoms, sees"
    ]
  },
  {
    clusterId: "business_absorbed",
    rubricPaths: [
      "MIND - BUSINESS - talks of",
      "MIND - ABSORBED - business, in",
      "MIND - AVARICE"
    ]
  },
  {
    clusterId: "throbbing_headache",
    rubricPaths: [
      "HEAD - PAIN - pulsating - sudden",
      "HEAD - PAIN - throbbing - heat, during",
      "HEAD - PAIN - bursting"
    ]
  }
];

/**
 * Evaluates an array of selected rubric paths and groups them by active cluster IDs.
 */
export function identifyDuplicateClusters(selectedPaths: string[]): Record<string, string[]> {
  const activeClusters: Record<string, string[]> = {};

  selectedPaths.forEach(path => {
    const matchedCluster = MATERIAGRID_SYNONYM_CLUSTERS.find(cluster => 
      cluster.rubricPaths.includes(path)
    );
    
    if (matchedCluster) {
      if (!activeClusters[matchedCluster.clusterId]) {
        activeClusters[matchedCluster.clusterId] = [];
      }
      activeClusters[matchedCluster.clusterId].push(path);
    }
  });

  return activeClusters;
}
