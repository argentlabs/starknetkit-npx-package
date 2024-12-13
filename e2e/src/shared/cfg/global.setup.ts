import { downloadGitHubRelease, unzip } from "../../argent-x/utils"

export default async function downloadArgentXBuild() {
    console.log("Downloading ArgentX build")
    const version = await downloadGitHubRelease()
    const currentVersionDir = await unzip(version)
    process.env.ARGENTX_DIST_DIR = currentVersionDir
    console.log("ArgentX build downloaded:", version)
}