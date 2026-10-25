# Static Job — Terraform (phase 1 : lecture seule)

Ce dossier **inspecte les ressources AWS déjà utilisées par Static Job** sans en créer ou en supprimer. Il est volontairement limité aux `data` sources Terraform afin de protéger ton déploiement opérationnel.

## Ressources inspectées

- EC2 : instance existante
- VPC et subnet existants
- ECR : `static-job-frontend` et `static-job-api`
- IAM : `DevOpsPortfolio-EC2-Role` et `GitHubActions-ECR-Role`

Le déploiement Docker reste géré par `.github/workflows/deploy.yml` via AWS Systems Manager.

## Utilisation sur Mac

1. Installer Terraform : `brew install terraform`.
2. Configurer les identifiants AWS CLI (avec accès de lecture aux ressources).
3. Dans le dossier `terraform/`, copier le modèle :

   ```bash
   cp terraform.tfvars.example terraform.tfvars
   ```

4. Modifier `terraform.tfvars` avec **tes vrais IDs** EC2, VPC et subnet, depuis AWS (ne jamais publier ce fichier).
5. Exécuter :

   ```bash
   terraform init
   terraform fmt -check
   terraform validate
   terraform plan
   ```

Le plan ne doit prévoir **aucune création, modification ou destruction** : aucun bloc `resource` n'est déclaré.

## Plus tard : véritable Infrastructure as Code

Pour que Terraform **gère** les ressources au lieu de seulement les lire, il faudra définir des blocs `resource`, importer les ressources existantes, comparer soigneusement le `terraform plan` et prévoir un stockage sécurisé du state. **Ne lance pas `terraform apply` ou `terraform destroy` sur ta production sans validation.**

Ne publie jamais `.tfstate`, `.tfvars`, clés AWS ou fichiers secrets. Le fichier `.terraform.lock.hcl`, généré par `terraform init`, peut être versionné.
