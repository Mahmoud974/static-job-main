variable "aws_region" {
  description = "AWS region used by Static Job"
  type        = string
  default     = "eu-west-3"
}

variable "project_name" {
  description = "Project prefix for resource names and tags"
  type        = string
  default     = "static-job"
}

variable "instance_id" {
  description = "Existing EC2 instance ID (i-...) used for read-only inspection"
  type        = string
}

variable "vpc_id" {
  description = "Existing VPC ID"
  type        = string
}

variable "subnet_id" {
  description = "Existing subnet ID"
  type        = string
}
