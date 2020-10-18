module.exports = {
  getStagingBranchName: ({ nextVersion, releaseType }) => `v${nextVersion}`,
}