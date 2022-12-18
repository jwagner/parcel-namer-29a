const { Namer } = require('@parcel/plugin');
const path = require('path');

module.exports = new Namer({
  name({ bundle, bundleGraph }) {
    const bundleGroup = bundleGraph.getBundleGroupsContainingBundle(bundle)[0];
    if (!bundle.needsStableName) {
      const entry =
        bundle
          .getEntryAssets()
          .find((a) => a.id === bundleGroup.entryAssetId) ||
        bundle.getEntryAssets()[0];
      const base = entry ? basenameWithoutExtension(entry.filePath) : 'shared';
      return `static/${base}.cache-${bundle.hashReference}.${bundle.type}`;
    } 
    // Allow the next namer to handle this bundle.
    return null;
  },
});

function basenameWithoutExtension(filePath) {
  return path.basename(filePath, path.extname(filePath));
}
