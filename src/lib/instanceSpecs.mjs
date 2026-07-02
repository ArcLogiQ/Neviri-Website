// Instance-type → { vcpu, ramGb } lookup for AWS and Azure. Exact tables for
// the common burstable families (their RAM doesn't follow the per-vCPU rule),
// then a generic family parser for everything else. Returns null when a type
// can't be resolved — callers fall back to a cost-ratio estimate.

const AWS_EXACT = {
  // t2 family
  "t2.nano":    { vcpu: 1, ramGb: 0.5 },
  "t2.micro":   { vcpu: 1, ramGb: 1 },
  "t2.small":   { vcpu: 1, ramGb: 2 },
  "t2.medium":  { vcpu: 2, ramGb: 4 },
  "t2.large":   { vcpu: 2, ramGb: 8 },
  "t2.xlarge":  { vcpu: 4, ramGb: 16 },
  "t2.2xlarge": { vcpu: 8, ramGb: 32 },
  // t3 / t3a / t4g share shapes
  "t3.nano":    { vcpu: 2, ramGb: 0.5 },
  "t3.micro":   { vcpu: 2, ramGb: 1 },
  "t3.small":   { vcpu: 2, ramGb: 2 },
  "t3.medium":  { vcpu: 2, ramGb: 4 },
  "t3.large":   { vcpu: 2, ramGb: 8 },
  "t3.xlarge":  { vcpu: 4, ramGb: 16 },
  "t3.2xlarge": { vcpu: 8, ramGb: 32 },
};

// RAM per vCPU for the standard AWS families.
const AWS_FAMILY_RAM_PER_VCPU = {
  m: 4,  // m5, m6i, m7g — general purpose
  c: 2,  // c5, c6i, c7g — compute optimized
  r: 8,  // r5, r6i — memory optimized
  x: 16, // x1, x2 — high memory
  z: 8,  // z1d
  i: 8,  // i3, i4i — storage optimized
  d: 8,  // d2, d3
  h: 8,  // h1
  g: 4,  // g4dn, g5 (GPU — CPU/RAM only, GPU not comparable)
  p: 8,  // p3, p4 (GPU)
};

const AWS_SIZE_VCPU = {
  medium: 1, large: 2, xlarge: 4, "2xlarge": 8, "3xlarge": 12, "4xlarge": 16,
  "6xlarge": 24, "8xlarge": 32, "9xlarge": 36, "10xlarge": 40, "12xlarge": 48,
  "16xlarge": 64, "18xlarge": 72, "24xlarge": 96, "32xlarge": 128,
  metal: 96,
};

export function awsInstanceSpecs(instanceType) {
  if (!instanceType) return null;
  // RDS classes look like db.t3.medium — same shapes as EC2.
  const type = String(instanceType).trim().toLowerCase().replace(/^db\./, "");
  if (AWS_EXACT[type]) return { ...AWS_EXACT[type] };
  // t3a/t4g mirror t3 shapes.
  const tAlias = type.replace(/^t3a\./, "t3.").replace(/^t4g\./, "t3.");
  if (AWS_EXACT[tAlias]) return { ...AWS_EXACT[tAlias] };

  const m = type.match(/^([a-z])[a-z0-9-]*\.([a-z0-9]+)$/);
  if (!m) return null;
  const [, familyLetter, size] = m;
  const vcpu = AWS_SIZE_VCPU[size];
  const ramPerVcpu = AWS_FAMILY_RAM_PER_VCPU[familyLetter];
  if (!vcpu || !ramPerVcpu) return null;
  return { vcpu, ramGb: vcpu * ramPerVcpu };
}

// Azure B-series is irregular; everything else follows RAM-per-vCPU rules.
const AZURE_B_SERIES = {
  b1ls: { vcpu: 1, ramGb: 0.5 },
  b1s:  { vcpu: 1, ramGb: 1 },
  b1ms: { vcpu: 1, ramGb: 2 },
  b2s:  { vcpu: 2, ramGb: 4 },
  b2ms: { vcpu: 2, ramGb: 8 },
  b4ms: { vcpu: 4, ramGb: 16 },
  b8ms: { vcpu: 8, ramGb: 32 },
  b12ms: { vcpu: 12, ramGb: 48 },
  b16ms: { vcpu: 16, ramGb: 64 },
  b20ms: { vcpu: 20, ramGb: 80 },
};

const AZURE_FAMILY_RAM_PER_VCPU = {
  a: 2,  // Av2 (approx)
  d: 4,  // Dv3/Dv4/Dv5, Dsv3...
  e: 8,  // Ev3/Ev4/Ev5 — memory optimized
  f: 2,  // Fsv2 — compute optimized
  l: 8,  // Lsv2 — storage optimized
  m: 28, // M-series — high memory (approx)
  n: 6,  // NC/ND/NV GPU (approx, CPU/RAM only)
};

export function azureInstanceSpecs(sizeName) {
  if (!sizeName) return null;
  // Accept "Standard_D2s_v3", "D2s v3", "D2s v3/D2 v3" (meter names pair
  // sizes with a slash — take the first), "B2ms".
  let s = String(sizeName).trim().toLowerCase();
  s = s.split("/")[0].trim();
  s = s.replace(/^standard[_ ]/, "").replace(/[_ ]v\d+$/, "").replace(/[_ ]/g, "");

  if (AZURE_B_SERIES[s]) return { ...AZURE_B_SERIES[s] };

  const m = s.match(/^([a-z])[a-z]*?(\d+)/);
  if (!m) return null;
  const [, familyLetter, digits] = m;
  const vcpu = parseInt(digits, 10);
  const ramPerVcpu = AZURE_FAMILY_RAM_PER_VCPU[familyLetter];
  if (!vcpu || !ramPerVcpu) return null;
  return { vcpu, ramGb: vcpu * ramPerVcpu };
}
