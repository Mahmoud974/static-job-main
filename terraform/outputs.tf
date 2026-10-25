output "region" {
  value = var.aws_region
}

output "ec2_instance_id" {
  value = data.aws_instance.existing.id
}

output "ec2_instance_type" {
  value = data.aws_instance.existing.instance_type
}

output "vpc_id" {
  value = data.aws_vpc.existing.id
}

output "subnet_id" {
  value = data.aws_subnet.existing.id
}

output "ecr_repository_names" {
  value = [data.aws_ecr_repository.frontend.name, data.aws_ecr_repository.api.name]
}

output "iam_role_names" {
  value = [data.aws_iam_role.ec2.name, data.aws_iam_role.github_actions.name]
}
