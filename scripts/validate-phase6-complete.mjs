import { execSync, spawn } from 'child_process';
import http from 'http';

function waitForServer(url, timeout = 30000) {
    return new Promise((resolve, reject) => {
        const start = Date.now();
        const interval = setInterval(() => {
            if (Date.now() - start > timeout) {
                clearInterval(interval);
                reject(new Error('Server did not start in time'));
            }
            http.get(url, (res) => {
                if (res.statusCode === 200 || res.statusCode === 404 || res.statusCode === 301 || res.statusCode === 308) {
                    clearInterval(interval);
                    resolve();
                }
            }).on('error', () => {});
        }, 1000);
    });
}

async function validatePhase6Complete() {
    console.log("Validating Phase 6 Completion...");

    // Install playwright browsers
    console.log("Installing Playwright browsers...");
    execSync('npx playwright install chromium', { stdio: 'inherit' });

    console.log("Starting preview server for validation...");
    const serverProcess = spawn('npm', ['run', 'preview'], { stdio: 'ignore', shell: true });

    try {
        await waitForServer('http://localhost:4321');
        console.log("Server is ready.");
    } catch (err) {
        console.error("Failed to start preview server.");
        if (serverProcess.pid) {
            try {
                if (process.platform === 'win32') {
                    execSync(`taskkill /pid ${serverProcess.pid} /T /F`, { stdio: 'ignore' });
                } else {
                    process.kill(-serverProcess.pid);
                }
            } catch (e) {}
        }
        process.exit(1);
    }

    const validatorsToRun = [
        "validate:robots",
        "validate:canonicals",
        "validate:http",
        "validate:crawl",
        "validate:sitemap",
        "validate:internal-links",
        "validate:indexnow",
        "validate:webmaster-platforms",
        "validate:entities",
        "validate:answer-readiness",
        "validate:ai-crawlers",
        "validate:monitoring",
        "validate:analytics-governance",
        "validate:referrals"
    ];

    let hasErrors = false;

    for (const validator of validatorsToRun) {
        console.log(`\n--- Running ${validator} ---`);
        try {
            execSync(`npm run ${validator}`, { stdio: 'inherit' });
        } catch (error) {
            console.error(`❌ Validation failed for ${validator}`);
            hasErrors = true;
            break;
        }
    }

    if (serverProcess.pid) {
        try {
            if (process.platform === 'win32') {
                execSync(`taskkill /pid ${serverProcess.pid} /T /F`, { stdio: 'ignore' });
            } else {
                process.kill(-serverProcess.pid);
            }
        } catch (e) {}
    }

    if (hasErrors) {
        console.error("\n❌ Phase 6 Completion Validation Failed.");
        process.exit(1);
    } else {
        console.log("\n✅ Phase 6 Completion Validation Passed Successfully.");
    }
}

validatePhase6Complete().catch(err => {
    console.error(err);
    process.exit(1);
});
