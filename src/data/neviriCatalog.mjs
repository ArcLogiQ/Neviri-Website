// ─────────────────────────────────────────────────────────────────────────────
// Neviri pricing catalog — single source of truth for the Bill Analyzer.
//
// Every rate here mirrors what the marketing site already publishes:
//   • VM flavors        → components/pricing/PricingPage.jsx (Compute tab)
//   • Block storage     → $0.08/GB/mo (Storage & Security tab)
//   • Bandwidth         → 100 GB free outbound / VM, then $0.05/GB
//   • Reserved IP       → $3.02/mo idle, free while assigned
//   • Backups           → $0.03/GB daily, $0.04/GB weekly
//   • Load balancer/SSL → included free
//   • Managed databases → app/database/mysql/page.js plans
//
// Rates marked `estimated: true` are NOT yet published on the site — they are
// placeholders the team must confirm before relying on them in sales calls.
// ─────────────────────────────────────────────────────────────────────────────

export const HOURS_PER_MONTH = 730;

export const VM_FLAVORS = [
  { flavor: "gen2.nano",    vcpu: 1,  ram: 1,  priceMo: 6.0,    priceHr: 0.008 },
  { flavor: "gen2.micro",   vcpu: 2,  ram: 2,  priceMo: 9.03,   priceHr: 0.013 },
  { flavor: "gen2.small",   vcpu: 2,  ram: 4,  priceMo: 12.02,  priceHr: 0.017 },
  { flavor: "gen2.medium",  vcpu: 4,  ram: 4,  priceMo: 17.23,  priceHr: 0.024 },
  { flavor: "gen2.medium2", vcpu: 4,  ram: 6,  priceMo: 21.01,  priceHr: 0.029 },
  { flavor: "gen2.large",   vcpu: 4,  ram: 8,  priceMo: 26.12,  priceHr: 0.036 },
  { flavor: "gen2.huge",    vcpu: 8,  ram: 16, priceMo: 41.02,  priceHr: 0.057 },
  { flavor: "gen2.giant",   vcpu: 16, ram: 32, priceMo: 86.66,  priceHr: 0.12 },
  { flavor: "gen32.giant",  vcpu: 32, ram: 64, priceMo: 170.0,  priceHr: 0.236 },
];

export const DB_PLANS = [
  { plan: "Starter Database",      vcpu: 1, ram: 1, storageGb: 25,  priceMo: 15 },
  { plan: "Standard Database",     vcpu: 2, ram: 4, storageGb: 80,  priceMo: 60 },
  { plan: "Professional Database", vcpu: 4, ram: 8, storageGb: 160, priceMo: 120 },
];

export const RATES = {
  blockStoragePerGbMo: 0.08,
  // Object storage pricing is not published on the site yet — confirm before
  // quoting. $0.02/GB/mo is the working assumption used for comparisons.
  objectStoragePerGbMo: 0.02,
  objectStorageEstimated: true,
  bandwidthFreeGbPerVm: 100,
  bandwidthPerGb: 0.05,
  reservedIpIdlePerMo: 3.02,
  reservedIpInUsePerMo: 0,
  backupDailyPerGb: 0.03,
  backupWeeklyPerGb: 0.04,
  loadBalancerPerMo: 0,
  sslCertificatePerMo: 0,
};

// Neviri service keys the comparison engine buckets into. `supported: false`
// entries exist only so the UI can render a friendly label for the gap report.
export const NEVIRI_SERVICES = {
  vm:              { label: "Virtual Machines",   supported: true },
  blockStorage:    { label: "Block Storage",      supported: true },
  objectStorage:   { label: "Object Storage",     supported: true },
  managedDatabase: { label: "Managed Databases",  supported: true },
  loadBalancer:    { label: "Load Balancers",     supported: true },
  reservedIp:      { label: "Reserved IPs",       supported: true },
  bandwidth:       { label: "Bandwidth",          supported: true },
  backup:          { label: "Backups & Snapshots",supported: true },
  ssl:             { label: "SSL Certificates",   supported: true },
  networking:      { label: "Networking (VPC, routers, firewalls)", supported: true },
};

// When a bill only exposes service-level totals (Cost Explorer exports, PDF
// invoices) we cannot rebuild the exact resource mix. These ratios express
// "typical Neviri cost as a fraction of the provider's cost" and every row
// derived from them is flagged `estimated` in the report.
export const SERVICE_LEVEL_ESTIMATE_RATIOS = {
  vm: 0.45,             // gen2 flavors vs AWS/Azure on-demand general purpose
  blockStorage: 0.85,   // $0.08/GB vs gp3/managed-disk + IOPS add-ons
  objectStorage: 0.8,   // assumed $0.02/GB vs S3/Blob standard + request fees
  managedDatabase: 0.7, // DB plans vs RDS / Azure Database list price
  loadBalancer: 0,      // included free on Neviri
  reservedIp: 0.15,     // free while assigned; only idle IPs bill
  bandwidth: 0.6,       // $0.05/GB vs ~$0.09 egress, before free 100 GB/VM
  backup: 0.8,          // $0.03–0.04/GB vs snapshot storage rates
  ssl: 0,               // included free on Neviri
  networking: 0,        // networks, routers, security groups are free
};

// ── AWS product code → Neviri bucket ─────────────────────────────────────────
// EC2 is intentionally absent: its line items split by usage type (compute
// hours vs EBS vs data transfer vs IPs vs NAT) in the parser.
export const AWS_SERVICE_MAP = {
  AmazonS3:                   { service: "objectStorage" },
  AmazonRDS:                  { service: "managedDatabase" },
  AmazonElasticLoadBalancing: { service: "loadBalancer" },
  AWSELB:                     { service: "loadBalancer" },
  AmazonVPC:                  { service: "networking" },
  AWSDataTransfer:            { service: "bandwidth" },
  AWSBackup:                  { service: "backup" },
  AWSCertificateManager:      { service: "ssl" },
  AmazonCertificateManager:   { service: "ssl" },
};

// AWS services Neviri has no equivalent for. Display names are what users see
// in the "Not available on Neviri" section.
export const AWS_UNSUPPORTED = {
  AWSLambda:            "AWS Lambda (serverless functions)",
  AmazonDynamoDB:       "Amazon DynamoDB",
  AmazonCloudFront:     "Amazon CloudFront (CDN)",
  AmazonRoute53:        "Amazon Route 53 (DNS)",
  AmazonSQS:            "Amazon SQS (queues)",
  AmazonSNS:            "Amazon SNS (notifications)",
  AmazonSES:            "Amazon SES (email)",
  AmazonEKS:            "Amazon EKS (managed Kubernetes)",
  AmazonECS:            "Amazon ECS / Fargate",
  AmazonECR:            "Amazon ECR (container registry)",
  AmazonElastiCache:    "Amazon ElastiCache (Redis/Memcached)",
  AmazonCloudWatch:     "Amazon CloudWatch (monitoring)",
  AWSCloudTrail:        "AWS CloudTrail",
  AmazonRedshift:       "Amazon Redshift (data warehouse)",
  AmazonKinesis:        "Amazon Kinesis (streaming)",
  AmazonAthena:         "Amazon Athena",
  AWSGlue:              "AWS Glue",
  AmazonSageMaker:      "Amazon SageMaker (ML)",
  AmazonWorkSpaces:     "Amazon WorkSpaces",
  AmazonRegistrar:      "Amazon Registrar (domains)",
  AWSSecretsManager:    "AWS Secrets Manager",
  AWSKMS:               "AWS KMS (key management)",
  awskms:               "AWS KMS (key management)",
  AmazonEFS:            "Amazon EFS (shared file storage)",
  AmazonFSx:            "Amazon FSx",
  AmazonMQ:             "Amazon MQ",
  AmazonOpenSearchService: "Amazon OpenSearch",
  AmazonES:             "Amazon OpenSearch / Elasticsearch",
  AWSStepFunctions:     "AWS Step Functions",
  AmazonApiGateway:     "Amazon API Gateway",
  AWSAmplify:           "AWS Amplify",
  AWSSupportBusiness:   "AWS Support (Business)",
  AWSSupportDeveloper:  "AWS Support (Developer)",
  AWSSupportEnterprise: "AWS Support (Enterprise)",
};

// Friendly display names for AWS product codes we DO map.
export const AWS_DISPLAY_NAMES = {
  AmazonEC2: "Amazon EC2",
  AmazonS3: "Amazon S3",
  AmazonRDS: "Amazon RDS",
  AmazonElasticLoadBalancing: "Elastic Load Balancing",
  AWSELB: "Elastic Load Balancing",
  AmazonVPC: "Amazon VPC",
  AWSDataTransfer: "AWS Data Transfer",
  AWSBackup: "AWS Backup",
  AWSCertificateManager: "AWS Certificate Manager",
  AmazonCertificateManager: "AWS Certificate Manager",
};

// AWS invoice PDFs print marketing names, not product codes.
export const AWS_INVOICE_NAME_MAP = {
  "elastic compute cloud": "AmazonEC2",
  "simple storage service": "AmazonS3",
  "relational database service": "AmazonRDS",
  "elastic load balancing": "AmazonElasticLoadBalancing",
  "virtual private cloud": "AmazonVPC",
  "data transfer": "AWSDataTransfer",
  "cloudfront": "AmazonCloudFront",
  "lambda": "AWSLambda",
  "dynamodb": "AmazonDynamoDB",
  "route 53": "AmazonRoute53",
  "simple queue service": "AmazonSQS",
  "simple notification service": "AmazonSNS",
  "simple email service": "AmazonSES",
  "elastic kubernetes service": "AmazonEKS",
  "elastic container service": "AmazonECS",
  "elastic container registry": "AmazonECR",
  "elasticache": "AmazonElastiCache",
  "cloudwatch": "AmazonCloudWatch",
  "cloudtrail": "AWSCloudTrail",
  "redshift": "AmazonRedshift",
  "kinesis": "AmazonKinesis",
  "athena": "AmazonAthena",
  "sagemaker": "AmazonSageMaker",
  "secrets manager": "AWSSecretsManager",
  "key management service": "AWSKMS",
  "elastic file system": "AmazonEFS",
  "api gateway": "AmazonApiGateway",
  "certificate manager": "AWSCertificateManager",
  "backup": "AWSBackup",
  "registrar": "AmazonRegistrar",
  "opensearch": "AmazonOpenSearchService",
  // Short aliases (Cost Explorer uses e.g. "EC2 - Other"). Kept last so the
  // full marketing names above win when both would match.
  "ec2": "AmazonEC2",
  "s3": "AmazonS3",
  "rds": "AmazonRDS",
};

// ── Azure MeterCategory → Neviri bucket ──────────────────────────────────────
// "Storage" splits by MeterSubCategory in the parser (disks vs blob vs files).
export const AZURE_CATEGORY_MAP = {
  "virtual machines":                { service: "vm" },
  "bandwidth":                       { service: "bandwidth" },
  "load balancer":                   { service: "loadBalancer" },
  "application gateway":             { service: "loadBalancer" },
  "ip addresses":                    { service: "reservedIp" },
  "virtual network":                 { service: "networking" },
  "vpn gateway":                     { service: "networking" },
  "azure database for mysql":        { service: "managedDatabase" },
  "azure database for postgresql":   { service: "managedDatabase" },
  "azure database for mariadb":      { service: "managedDatabase" },
  "azure cosmos db for mongodb":     { service: "managedDatabase" },
  "backup":                          { service: "backup" },
};

export const AZURE_UNSUPPORTED = {
  "azure app service":         "Azure App Service",
  "app service":               "Azure App Service",
  "functions":                 "Azure Functions (serverless)",
  "azure cosmos db":           "Azure Cosmos DB",
  "sql database":              "Azure SQL Database (Microsoft SQL)",
  "sql managed instance":      "Azure SQL Managed Instance",
  "azure kubernetes service":  "Azure Kubernetes Service",
  "container instances":       "Azure Container Instances",
  "container registry":        "Azure Container Registry",
  "azure dns":                 "Azure DNS",
  "cdn":                       "Azure CDN",
  "content delivery network":  "Azure CDN",
  "service bus":               "Azure Service Bus",
  "event hubs":                "Azure Event Hubs",
  "event grid":                "Azure Event Grid",
  "key vault":                 "Azure Key Vault",
  "azure monitor":             "Azure Monitor",
  "log analytics":             "Azure Log Analytics",
  "application insights":      "Azure Application Insights",
  "azure cache for redis":     "Azure Cache for Redis",
  "redis cache":               "Azure Cache for Redis",
  "cognitive services":        "Azure Cognitive Services (AI)",
  "azure openai":              "Azure OpenAI",
  "machine learning":          "Azure Machine Learning",
  "synapse":                   "Azure Synapse Analytics",
  "data factory":              "Azure Data Factory",
  "logic apps":                "Azure Logic Apps",
  "notification hubs":         "Azure Notification Hubs",
  "azure front door":          "Azure Front Door",
  "support":                   "Azure Support Plan",
};

// Azure managed-disk tier → provisioned GB. Both Premium (P) and Standard SSD
// (E) tiers share sizes; Standard HDD (S) too. Used to convert "1 disk-month"
// quantities into GB for the block-storage comparison.
export const AZURE_DISK_TIER_GB = {
  1: 4, 2: 8, 3: 16, 4: 32, 6: 64, 10: 128, 15: 256,
  20: 512, 30: 1024, 40: 2048, 50: 4096, 60: 8192, 70: 16384, 80: 32768,
};
