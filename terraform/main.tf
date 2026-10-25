# READ-ONLY FIRST: these data sources inspect existing AWS resources.
# They do NOT create, import, replace or delete your infrastructure.
# This is intentionally safer than declaring resources before inspecting
# the existing EC2, network, roles and ECR repositories.

data "aws_caller_identity" "current" {}
data "aws_vpc" "existing" {
  id = var.vpc_id
}

data "aws_subnet" "existing" {
  id = var.subnet_id
}

data "aws_instance" "existing" {
  instance_id = var.instance_id
}

data "aws_ecr_repository" "frontend" {
  name = "static-job-frontend"
}

data "aws_ecr_repository" "api" {
  name = "static-job-api"
}

data "aws_iam_role" "ec2" {
  name = "DevOpsPortfolio-EC2-Role"
}

data "aws_iam_role" "github_actions" {
  name = "GitHubActions-ECR-Role"
}
