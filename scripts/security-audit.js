// 🔒 AUDIT DE SÉCURITÉ COMPLET - KN Web Agency
// Usage: node scripts/security-audit.js

const fs = require("fs");
const path = require("path");

console.log("🔒 AUDIT DE SÉCURITÉ COMPLET");
console.log("==============================\n");

let securityScore = 0;
let totalChecks = 0;
const issues = [];

// 1. VÉRIFICATIONS DES FICHIERS SENSIBLES
console.log("📁 Vérification des fichiers sensibles...");
const sensitiveFiles = [
  ".env",
  ".env.local",
  ".env.production",
  "config/database.js",
  "config/secrets.js",
];

sensitiveFiles.forEach((file) => {
  totalChecks++;
  if (fs.existsSync(file)) {
    console.log(`  ❌ ${file} (fichier sensible trouvé)`);
    issues.push({
      type: "CRITIQUE",
      file: file,
      issue: "Fichier sensible présent dans le repository",
      fix: `Ajouter ${file} au .gitignore et supprimer du git`,
    });
  } else {
    console.log(`  ✅ ${file} (absent - bon)`);
    securityScore++;
  }
});

// 2. VÉRIFICATION DU .GITIGNORE
console.log("\n🚫 Vérification du .gitignore...");
totalChecks++;
if (fs.existsSync(".gitignore")) {
  const gitignore = fs.readFileSync(".gitignore", "utf8");
  const requiredEntries = [
    ".env",
    ".env.local",
    ".env.*.local",
    "node_modules",
    ".next",
    "dist",
  ];

  let gitignoreScore = 0;
  requiredEntries.forEach((entry) => {
    if (gitignore.includes(entry)) {
      gitignoreScore++;
    } else {
      issues.push({
        type: "IMPORTANT",
        file: ".gitignore",
        issue: `Entrée manquante: ${entry}`,
        fix: `Ajouter "${entry}" au .gitignore`,
      });
    }
  });

  if (gitignoreScore === requiredEntries.length) {
    console.log("  ✅ .gitignore correctement configuré");
    securityScore++;
  } else {
    console.log(
      `  ⚠️  .gitignore incomplet (${gitignoreScore}/${requiredEntries.length})`
    );
  }
} else {
  console.log("  ❌ .gitignore manquant");
  issues.push({
    type: "CRITIQUE",
    file: ".gitignore",
    issue: "Fichier .gitignore manquant",
    fix: "Créer un fichier .gitignore avec les entrées sensibles",
  });
}

// 3. VÉRIFICATION DES MOTS DE PASSE ET CLÉS EN DUR
console.log("\n🔑 Recherche de secrets en dur...");
const codeFiles = [
  "app/**/*.{ts,tsx,js,jsx}",
  "lib/**/*.{ts,tsx,js,jsx}",
  "components/**/*.{ts,tsx,js,jsx}",
];

const dangerousPatterns = [
  {
    pattern: /password\s*[:=]\s*["'][^"']+["']/gi,
    name: "Mot de passe en dur",
  },
  { pattern: /api[_-]?key\s*[:=]\s*["'][^"']+["']/gi, name: "Clé API en dur" },
  { pattern: /secret\s*[:=]\s*["'][^"']+["']/gi, name: "Secret en dur" },
  { pattern: /token\s*[:=]\s*["'][^"']+["']/gi, name: "Token en dur" },
  { pattern: /sk_live_[a-zA-Z0-9]+/g, name: "Clé Stripe live" },
  { pattern: /pk_live_[a-zA-Z0-9]+/g, name: "Clé Stripe publique live" },
];

function scanFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf8");
    dangerousPatterns.forEach(({ pattern, name }) => {
      const matches = content.match(pattern);
      if (matches) {
        issues.push({
          type: "CRITIQUE",
          file: filePath,
          issue: `${name} détecté: ${matches[0].substring(0, 30)}...`,
          fix: "Déplacer vers les variables d'environnement",
        });
      }
    });
  } catch (error) {
    // Ignorer les erreurs de lecture de fichier
  }
}

// Scanner les fichiers principaux
const dirsToScan = ["app", "lib", "components"];
dirsToScan.forEach((dir) => {
  if (fs.existsSync(dir)) {
    const scanDir = (dirPath) => {
      const files = fs.readdirSync(dirPath);
      files.forEach((file) => {
        const fullPath = path.join(dirPath, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
          scanDir(fullPath);
        } else if (/\.(ts|tsx|js|jsx)$/.test(file)) {
          scanFile(fullPath);
        }
      });
    };
    scanDir(dir);
  }
});

totalChecks++;
const hardcodedSecrets = issues.filter(
  (i) => i.type === "CRITIQUE" && i.issue.includes("détecté")
);
if (hardcodedSecrets.length === 0) {
  console.log("  ✅ Aucun secret en dur détecté");
  securityScore++;
} else {
  console.log(`  ❌ ${hardcodedSecrets.length} secret(s) en dur détecté(s)`);
}

// 4. VÉRIFICATION DES HEADERS DE SÉCURITÉ
console.log("\n🛡️  Vérification des headers de sécurité...");
const nextConfig = "next.config.mjs";
totalChecks++;

if (fs.existsSync(nextConfig)) {
  const config = fs.readFileSync(nextConfig, "utf8");
  const requiredHeaders = [
    "X-Frame-Options",
    "X-Content-Type-Options",
    "Referrer-Policy",
    "X-XSS-Protection",
    "Strict-Transport-Security",
    "Content-Security-Policy",
  ];

  let headerScore = 0;
  requiredHeaders.forEach((header) => {
    if (config.includes(header)) {
      headerScore++;
    }
  });

  if (headerScore === requiredHeaders.length) {
    console.log("  ✅ Headers de sécurité configurés");
    securityScore++;
  } else {
    console.log(
      `  ⚠️  Headers incomplets (${headerScore}/${requiredHeaders.length})`
    );
    issues.push({
      type: "IMPORTANT",
      file: nextConfig,
      issue: `Headers de sécurité manquants`,
      fix: "Configurer tous les headers de sécurité dans next.config.mjs",
    });
  }
} else {
  console.log("  ❌ next.config.mjs manquant");
}

// 5. VÉRIFICATION DES DÉPENDANCES VULNÉRABLES
console.log("\n📦 Vérification des dépendances...");
totalChecks++;

try {
  const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
  const dependencies = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
  };

  // Vérifications de dépendances potentiellement vulnérables
  const vulnerableDeps = [
    {
      name: "lodash",
      version: "<4.17.21",
      issue: "Versions anciennes vulnérables",
    },
    { name: "axios", version: "<0.21.2", issue: "SSRF vulnerability" },
    {
      name: "next",
      version: "<13.0.0",
      issue: "Versions anciennes avec vulnérabilités",
    },
  ];

  let depIssues = 0;
  Object.keys(dependencies).forEach((dep) => {
    const vulnDep = vulnerableDeps.find((v) => v.name === dep);
    if (vulnDep) {
      // Vérification simplifiée de version
      depIssues++;
      issues.push({
        type: "IMPORTANT",
        file: "package.json",
        issue: `Dépendance potentiellement vulnérable: ${dep}`,
        fix: `Mettre à jour ${dep} vers la dernière version sécurisée`,
      });
    }
  });

  if (depIssues === 0) {
    console.log("  ✅ Aucune dépendance vulnérable connue détectée");
    securityScore++;
  } else {
    console.log(
      `  ⚠️  ${depIssues} dépendance(s) potentiellement vulnérable(s)`
    );
  }
} catch (error) {
  console.log("  ❌ Impossible de lire package.json");
}

// 6. VÉRIFICATION DES PERMISSIONS DE FICHIERS (Windows adaptée)
console.log("\n🔐 Vérification des permissions...");
totalChecks++;

const sensitiveFilesToCheck = ["middleware.ts", "next.config.mjs"];

let permissionIssues = 0;
sensitiveFilesToCheck.forEach((file) => {
  if (fs.existsSync(file)) {
    try {
      const stats = fs.statSync(file);
      // Vérification basique pour Windows
      if (stats.mode & 0o002) {
        permissionIssues++;
        issues.push({
          type: "MINEUR",
          file: file,
          issue: "Fichier potentiellement accessible en écriture par tous",
          fix: "Vérifier les permissions du fichier",
        });
      }
    } catch (error) {
      // Ignorer les erreurs de permissions sur Windows
    }
  }
});

if (permissionIssues === 0) {
  console.log("  ✅ Permissions de fichiers correctes");
  securityScore++;
} else {
  console.log(`  ⚠️  ${permissionIssues} problème(s) de permissions`);
}

// 7. CALCUL DU SCORE FINAL
const finalScore = Math.round((securityScore / totalChecks) * 100);

console.log("\n📊 RÉSULTATS DE L'AUDIT:");
console.log("==========================");
console.log(
  `Score de sécurité: ${finalScore}% (${securityScore}/${totalChecks})`
);

if (finalScore >= 90) {
  console.log("🟢 EXCELLENT - Sécurité robuste");
} else if (finalScore >= 75) {
  console.log("🟡 BON - Quelques améliorations possibles");
} else if (finalScore >= 60) {
  console.log("🟠 MOYEN - Améliorations recommandées");
} else {
  console.log("🔴 FAIBLE - Action immédiate requise");
}

// 8. RAPPORT DES PROBLÈMES
if (issues.length > 0) {
  console.log("\n❌ PROBLÈMES DÉTECTÉS:");
  console.log("======================");

  const critical = issues.filter((i) => i.type === "CRITIQUE");
  const important = issues.filter((i) => i.type === "IMPORTANT");
  const minor = issues.filter((i) => i.type === "MINEUR");

  if (critical.length > 0) {
    console.log("\n🚨 CRITIQUES (à corriger immédiatement):");
    critical.forEach((issue, index) => {
      console.log(`${index + 1}. ${issue.file}`);
      console.log(`   Problème: ${issue.issue}`);
      console.log(`   Solution: ${issue.fix}\n`);
    });
  }

  if (important.length > 0) {
    console.log("\n⚠️  IMPORTANTS (recommandé):");
    important.forEach((issue, index) => {
      console.log(`${index + 1}. ${issue.file}`);
      console.log(`   Problème: ${issue.issue}`);
      console.log(`   Solution: ${issue.fix}\n`);
    });
  }

  if (minor.length > 0) {
    console.log("\n💡 MINEURS (optionnel):");
    minor.forEach((issue, index) => {
      console.log(`${index + 1}. ${issue.file}: ${issue.issue}`);
    });
  }
}

// 9. RECOMMANDATIONS GÉNÉRALES
console.log("\n💡 RECOMMANDATIONS GÉNÉRALES:");
console.log("=============================");
console.log("1. 🔄 Effectuer des audits de sécurité réguliers");
console.log("2. 📋 Maintenir les dépendances à jour (npm audit fix)");
console.log("3. 🔒 Utiliser HTTPS en production uniquement");
console.log("4. 📊 Monitorer les logs d'accès et d'erreurs");
console.log("5. 🛡️  Configurer un WAF (Web Application Firewall)");
console.log("6. 💾 Effectuer des sauvegardes régulières");
console.log("7. 🔐 Utiliser l'authentification à deux facteurs");
console.log("8. 📝 Documenter les procédures de sécurité");

console.log("\n✨ Audit de sécurité terminé !");
console.log(`📞 Support: contact@knweb.agency`);

// Retourner un code d'erreur si problèmes critiques
if (critical && critical.length > 0) {
  process.exit(1);
}
