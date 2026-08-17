// NOTE: NEXT_PUBLIC_* is inlined at BUILD time, not read at runtime — it must be
// present during `next build`, not just in the deployment env. The fallback (the
// production API host) keeps the site working if the build env is missing, so a
// missing var degrades to prod instead of `undefined/api/...` (which 404s).
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://sng-central-api.neviri.com";

// const API_BASE_URL = "https://console.neviri.com";
// const API_BASE_URL = "https://stagingapi.neviri.com";
//const API_BASE_URL = "http://localhost:8090";
const AUTH_BASE_URL =
  process.env.NEXT_PUBLIC_AUTH_URL || API_BASE_URL;

// App (dashboard) base URL the marketing site links to for Login / Sign-up.
// Env-driven so staging/local don't bounce users to production. Falls back to
// the production app URL when NEXT_PUBLIC_APP_URL is unset.
const APP_BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://sng-central.neviri.com";
export const APP_LOGIN_URL = `${APP_BASE_URL}/login`;
export const APP_SIGNUP_URL = `${APP_BASE_URL}/signup`;

// Neviri AI dashboard (opened in a new tab from the /ai marketing page).
// Falls back to the production AI app URL when NEXT_PUBLIC_AI_APP_URL is unset.
export const AI_APP_URL =
  process.env.NEXT_PUBLIC_AI_APP_URL || "https://ai.neviri.com";

export const API_ENDPOINTS = {
  // User ApiNEXT_PUBLIC_API_BASE_URL
  REGISTER: `${AUTH_BASE_URL}/api/v1/user/register`,
  LOGIN: `${AUTH_BASE_URL}/api/v1/user/login`,
  LOGOUT: `${AUTH_BASE_URL}/api/v1/user/logout`,
  FORGOT_PASSWORD: `${AUTH_BASE_URL}/api/v1/user/forgot-password`,
  RESET_PASSWORD: `${AUTH_BASE_URL}/api/v1/user/reset-password`,
  VERIFY_EMAIL: `${AUTH_BASE_URL}/api/v1/user/verify-email`,

  // mongodb Database Api
  CREATE_DATABASE: `${API_BASE_URL}/api/v1/database/create-deployment`,
  CREATE_MONGODB_USER: `${API_BASE_URL}/api/v1/database/create-mongodb-user`,
  GET_DATABASES: `${API_BASE_URL}/api/v1/database/all-databases`,
  DELETE_DATABASE: `${API_BASE_URL}/api/v1/database/delete-database`,
  GET_DATABASE_STATUS: `${API_BASE_URL}/api/v1/database/status`,
  SCALE_DATABASE: `${API_BASE_URL}/api/v1/database/scale-database`,
  // mysql Database Api
  CREATE_MYSQL_DATABASE: `${API_BASE_URL}/api/v1/mysql/create-mysql`,
  GET_MYSQL_DATABASES: `${API_BASE_URL}/api/v1/mysql/all-mysql`,
  DELETE_MYSQL_DATABASE: `${API_BASE_URL}/api/v1/mysql/delete-mysql`,
  GET_MYSQL_DATABASE_STATUS: `${API_BASE_URL}/api/v1/mysql/status-mysql`,
  GET_MYSQL_FLAVORS: `${API_BASE_URL}/api/v1/mysql/flavors`,
  SCALE_MYSQL_DATABASE: `${API_BASE_URL}/api/v1/mysql/scale-mysql`,
  // postgres Database Api
  CREATE_POSTGRES_DATABASE: `${API_BASE_URL}/api/v1/postgres/create-postgres`,
  GET_POSTGRES_DATABASES: `${API_BASE_URL}/api/v1/postgres/all-postgres`,
  DELETE_POSTGRES_DATABASE: `${API_BASE_URL}/api/v1/postgres/delete-postgres`,
  GET_POSTGRES_DATABASE_STATUS: `${API_BASE_URL}/api/v1/postgres/status-postgres`,
  GET_POSTGRES_FLAVORS: `${API_BASE_URL}/api/v1/postgres/flavors`,
  SCALE_POSTGRES_DATABASE: `${API_BASE_URL}/api/v1/postgres/scale-postgres`,
  // Resoures usages
  GET_DATABASE_USAGE: (clusterName) =>
    `${API_BASE_URL}/api/v1/database/usage/${clusterName}`,
  GET_DATABASE_IOPS: (clusterName) =>
    `${API_BASE_URL}/api/v1/database/iops/${clusterName}`,
  GET_DATABASE_USAGE_REPORT: (clusterName, start, end) => {
    let url = `${API_BASE_URL}/api/v1/database/usage-report?clusterName=${clusterName}`;
    if (start) url += `&start=${encodeURIComponent(start)}`;
    if (end) url += `&end=${encodeURIComponent(end)}`;
    return url;
  },

  // Payment API
  SUMMARY: `${API_BASE_URL}/api/v1/payment/summary`,
  MONTHLY_SUMMARY: (month, cluster) => {
    const params = new URLSearchParams();
    if (month) params.append("month", month);
    if (cluster) params.append("cluster", cluster);
    const qs = params.toString();
    return `${API_BASE_URL}/api/v1/payment/monthly-summary${qs ? `?${qs}` : ""
      }`;
  },
  HISTORY: `${API_BASE_URL}/api/v1/payment/history`,
  RECEIPT: (id) => `${API_BASE_URL}/api/v1/payment/receipt/${id}`,
  INVOICE: (id) => `${API_BASE_URL}/api/v1/payment/invoice/${id}`,
  CLUSTER_PAID_TOTAL: (clusterName) =>
    `${API_BASE_URL}/api/v1/payment/cluster-paid-total/${clusterName}`,

  // Razorpay API
  RAZORPAY_CREATE_ORDER: `${API_BASE_URL}/api/v1/payment/razorpay/create-order`,
  RAZORPAY_CREATE_BULK_ORDER: `${API_BASE_URL}/api/v1/payment/razorpay/create-bulk-order`,
  RAZORPAY_VERIFY_PAYMENT: `${API_BASE_URL}/api/v1/payment/razorpay/verify-payment`,

  // Credits API (read-only for users)
  CREDITS_STATUS: `${API_BASE_URL}/api/v1/credits/status`,
  CREDITS_TRANSACTIONS: (limit = 20, offset = 0) =>
    `${API_BASE_URL}/api/v1/credits/transactions?limit=${limit}&offset=${offset}`,
  MONTHLY_INVOICE: (month) => {
    const params = new URLSearchParams();
    if (month) params.append("month", month);
    const qs = params.toString();
    return `${API_BASE_URL}/api/v1/payment/monthly-invoice${qs ? `?${qs}` : ""}`;
  },

  // Payment Method API
  SETUP_CUSTOMER: `${API_BASE_URL}/api/v1/payment-method/setup-customer`,
  CREATE_SETUP_INTENT: `${API_BASE_URL}/api/v1/payment-method/create-setup-intent`,
  SAVE_PAYMENT_METHOD: `${API_BASE_URL}/api/v1/payment-method/save-payment-method`,
  GET_PAYMENT_METHOD_STATUS: `${API_BASE_URL}/api/v1/payment-method/payment-method-status`,
  UPDATE_PAYMENT_METHOD: `${API_BASE_URL}/api/v1/payment-method/update-payment-method`,
  REMOVE_PAYMENT_METHOD: `${API_BASE_URL}/api/v1/payment-method/remove-payment-method`,
};

// Unified Backup API endpoints - handles both MongoDB and MySQL
export const BACKUP_ENDPOINTS = {
  CREATE: `${API_BASE_URL}/api/v1/backup/create`,
  LIST: `${API_BASE_URL}/api/v1/backup/list`,
  DETAILS: (id) => `${API_BASE_URL}/api/v1/backup/details/${id}`,
  DOWNLOAD: (id) => `${API_BASE_URL}/api/v1/backup/download/${id}`,
  PREVIEW: (id) => `${API_BASE_URL}/api/v1/backup/preview/${id}`,
  BROWSE: (id, collection, page, limit, search) => {
    let url = `${API_BASE_URL}/api/v1/backup/browse/${id}`;
    const params = new URLSearchParams();
    if (collection) params.append("collection", collection);
    if (page) params.append("page", page);
    if (limit) params.append("limit", limit);
    if (search) params.append("search", search);
    if (params.toString()) url += `?${params.toString()}`;
    return url;
  },
  DOWNLOAD_DATA: (id, collection, format) => {
    let url = `${API_BASE_URL}/api/v1/backup/download-data/${id}`;
    const params = new URLSearchParams();
    if (collection) params.append("collection", collection);
    if (format) params.append("format", format);
    if (params.toString()) url += `?${params.toString()}`;
    return url;
  },
  DELETE: (id) => `${API_BASE_URL}/api/v1/backup/delete/${id}`,
  AUTOMATIC_SCHEDULE: `${API_BASE_URL}/api/v1/backup/automatic/schedule`,
  AUTOMATIC_UNSCHEDULE: `${API_BASE_URL}/api/v1/backup/automatic/unschedule`,
  AUTOMATIC_LIST: `${API_BASE_URL}/api/v1/backup/automatic/list`,
  AUTOMATIC_COST: `${API_BASE_URL}/api/v1/backup/automatic/cost`,
};

// MySQL Backup API endpoints (for backward compatibility)
export const MYSQL_BACKUP_ENDPOINTS = {
  CREATE: `${API_BASE_URL}/api/v1/mysql-backup/create`,
  LIST: `${API_BASE_URL}/api/v1/mysql-backup/list`,
  DETAILS: (id) => `${API_BASE_URL}/api/v1/mysql-backup/details/${id}`,
  DOWNLOAD: (id) => `${API_BASE_URL}/api/v1/mysql-backup/download/${id}`,
  PREVIEW: (id) => `${API_BASE_URL}/api/v1/mysql-backup/preview/${id}`,
  BROWSE: (id, database, page, limit, search) => {
    let url = `${API_BASE_URL}/api/v1/mysql-backup/browse/${id}`;
    const params = new URLSearchParams();
    if (database) params.append("database", database);
    if (page) params.append("page", page);
    if (limit) params.append("limit", limit);
    if (search) params.append("search", search);
    if (params.toString()) url += `?${params.toString()}`;
    return url;
  },
  DOWNLOAD_DATA: (id, database, format) => {
    let url = `${API_BASE_URL}/api/v1/mysql-backup/download-data/${id}`;
    const params = new URLSearchParams();
    if (database) params.append("database", database);
    if (format) params.append("format", format);
    if (params.toString()) url += `?${params.toString()}`;
    return url;
  },
  DELETE: (id) => `${API_BASE_URL}/api/v1/mysql-backup/delete/${id}`,
  AUTOMATIC_SCHEDULE: `${API_BASE_URL}/api/v1/mysql-backup/automatic/schedule`,
  AUTOMATIC_UNSCHEDULE: `${API_BASE_URL}/api/v1/mysql-backup/automatic/unschedule`,
  AUTOMATIC_LIST: `${API_BASE_URL}/api/v1/mysql-backup/automatic/list`,
};

// PostgreSQL Backup API endpoints
export const POSTGRES_BACKUP_ENDPOINTS = {
  CREATE: `${API_BASE_URL}/api/v1/postgres-backup/create`,
  LIST: `${API_BASE_URL}/api/v1/postgres-backup/list`,
  DETAILS: (id) => `${API_BASE_URL}/api/v1/postgres-backup/details/${id}`,
  DOWNLOAD: (id) => `${API_BASE_URL}/api/v1/postgres-backup/download/${id}`,
  DELETE: (id) => `${API_BASE_URL}/api/v1/postgres-backup/delete/${id}`,
  AUTOMATIC_SCHEDULE: `${API_BASE_URL}/api/v1/postgres-backup/automatic/schedule`,
  AUTOMATIC_UNSCHEDULE: `${API_BASE_URL}/api/v1/postgres-backup/automatic/unschedule`,
  AUTOMATIC_LIST: `${API_BASE_URL}/api/v1/postgres-backup/automatic/list`,
};

// Restore API endpoints
export const RESTORE_ENDPOINTS = {
  INITIATE: `${API_BASE_URL}/api/v1/restore/initiate`,
  STATUS: (backupId) => `${API_BASE_URL}/api/v1/restore/status/${backupId}`,
  HISTORY: `${API_BASE_URL}/api/v1/restore/history`,
  CANCEL: (backupId) => `${API_BASE_URL}/api/v1/restore/cancel/${backupId}`,
};

// Admin login endpoints
export const ADMIN_ENDPOINTS = {
  LOGIN: `${AUTH_BASE_URL}/api/v1/admin/login`,
  USERS: `${AUTH_BASE_URL}/api/v1/admin/users`,
};

//  blogs endpoints
// export const BLOGS_ENDPOINTS = {
//   CREATE_BLOG: `${API_BASE_URL}/api/v1/blog/create`,
//   GET_BLOGS: `${API_BASE_URL}/api/v1/blogs/all`,
// }

export const blogsAPI = {
  create: async (blogData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/blog/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blogData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to create blog");
      }

      return result;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  },

  // Get all blogs
  getAll: async (params = {}) => {
    try {
      const queryParams = new URLSearchParams(params).toString();
      const response = await fetch(
        `${API_BASE_URL}/api/v1/blog/all?${queryParams}`
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch blogs");
      }

      return result;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  },
  getPublic: async (params = {}) => {
    try {
      const queryParams = new URLSearchParams(params).toString();
      const response = await fetch(
        `${API_BASE_URL}/api/v1/blog/public?${queryParams}`,
        { cache: "no-store" }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch public blogs");
      }

      return result;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  },

  // Get blog by slug
  getBySlug: async (slug) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/blog/slug/${slug}`, {
        cache: "no-store",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch blog");
      }

      return result;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  },

  addInteraction: async (blogId, interactionData) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/v1/blog/${blogId}/interaction`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(interactionData),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to add interaction");
      }

      return result;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  },

  update: async (id, blogData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/blogs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blogData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to update blog");
      }

      return result;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  },

  togglePublish: async (blogId, isPublished) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/v1/blog/${blogId}/publish`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isPublished }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to toggle publish status");
      }

      return result;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  },
  // Get blog by ID for editing
  getById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/blog/admin/${id}`);

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch blog");
      }

      return result;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  },
  update: async (id, blogData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/blog/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blogData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to update blog");
      }

      return result;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  },
};

export const uploadAPI = {
  uploadToAzure: async (file, opts = {}) => {
    try {
      const base64Image = await convertToBase64(file);
      const response = await fetch(
        `${API_BASE_URL}/api/v1/image/upload-azure`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            image: base64Image,
            sasUrl: opts.sasUrl,
            filename: opts.filename,
          }),
        }
      );

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed to upload");
      }
      return result.data.url;
    } catch (error) {
      console.error("Upload API Error:", error);
      throw error;
    }
  },
};

// Helper function
const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export const BLOGS_ENDPOINTS = {
  GET_BLOGS: `${API_BASE_URL}/api/v1/blog/all`,
  GET_BLOG_BY_ID: (id) => `${API_BASE_URL}/api/v1/blog/${id}`,
  DELETE_BLOG: (id) => `${API_BASE_URL}/api/v1/blog/${id}`,
};

export const EMAIL_ENDPOINT = {
  SEND_EMAIL: `${API_BASE_URL}/api/v1/support/send-email`,
};

// ========================================
// VIRTUAL MACHINES API (OpenStack Compute)
// ========================================

export const COMPUTE_ENDPOINTS = {
  SERVERS: `${API_BASE_URL}/api/v1/compute/servers`,
  SERVER: (id) => `${API_BASE_URL}/api/v1/compute/servers/${id}`,
  SERVER_ACTION: (id) => `${API_BASE_URL}/api/v1/compute/servers/${id}/action`,
  SERVER_RESIZE: (id) => `${API_BASE_URL}/api/v1/compute/servers/${id}/resize`,
  SERVER_RESIZE_CONFIRM: (id) =>
    `${API_BASE_URL}/api/v1/compute/servers/${id}/resize/confirm`,
  SERVER_RESIZE_REVERT: (id) =>
    `${API_BASE_URL}/api/v1/compute/servers/${id}/resize/revert`,
  SERVER_RESIZE_AND_CONFIRM: (id) =>
    `${API_BASE_URL}/api/v1/compute/servers/${id}/resize-and-confirm`,
  SERVER_CONSOLE: (id) =>
    `${API_BASE_URL}/api/v1/compute/servers/${id}/console`,
  SERVER_CONSOLE_OUTPUT: (id) =>
    `${API_BASE_URL}/api/v1/compute/servers/${id}/console-output`,
  SERVER_INTERFACES: (id) =>
    `${API_BASE_URL}/api/v1/compute/servers/${id}/interfaces`,
  SERVER_INTERFACE: (id, portId) =>
    `${API_BASE_URL}/api/v1/compute/servers/${id}/interfaces/${portId}`,
  FLAVORS: `${API_BASE_URL}/api/v1/compute/flavors`,
  IMAGES: `${API_BASE_URL}/api/v1/compute/images`,
  NETWORKS: `${API_BASE_URL}/api/v1/network/networks`,
  KEYPAIRS: `${API_BASE_URL}/api/v1/compute/keypairs`,
  KEYPAIR: (name) => `${API_BASE_URL}/api/v1/compute/keypairs/${encodeURIComponent(name)}`,
  // VM (instance) snapshots. Backend treats these as Glance images
  // with image_type=snapshot. The create endpoint hangs off the
  // source server; list/get/delete hang off the snapshots collection
  // (a snapshot's lifecycle is independent of its source VM — it
  // survives the source VM's deletion).
  SERVER_SNAPSHOTS: (serverId) =>
    `${API_BASE_URL}/api/v1/compute/servers/${serverId}/snapshots`,
  VM_SNAPSHOTS: `${API_BASE_URL}/api/v1/compute/vm-snapshots`,
  VM_SNAPSHOT: (id) =>
    `${API_BASE_URL}/api/v1/compute/vm-snapshots/${id}`,
};

export const BLOCK_STORAGE_ENDPOINTS = {
  VOLUMES: `${API_BASE_URL}/api/v1/block-storage/volumes`,
  VOLUME: (id) => `${API_BASE_URL}/api/v1/block-storage/volumes/${id}`,
  VOLUME_ATTACH: (id) => `${API_BASE_URL}/api/v1/block-storage/volumes/${id}/attach`,
  VOLUME_DETACH: (id) => `${API_BASE_URL}/api/v1/block-storage/volumes/${id}/detach`,
  VOLUME_EXTEND: (id) => `${API_BASE_URL}/api/v1/block-storage/volumes/${id}/extend`,
  VOLUME_TYPES: `${API_BASE_URL}/api/v1/block-storage/volume-types`,
  SNAPSHOTS: `${API_BASE_URL}/api/v1/block-storage/snapshots`,
  SNAPSHOT: (id) => `${API_BASE_URL}/api/v1/block-storage/snapshots/${id}`,
  BACKUPS: `${API_BASE_URL}/api/v1/block-storage/backups`,
  BACKUP: (id) => `${API_BASE_URL}/api/v1/block-storage/backups/${id}`,
  SERVER_USAGE: (id) => `${API_BASE_URL}/api/v1/compute/servers/${id}/usage`,
};

export const FLOATING_IP_ENDPOINTS = {
  FLOATING_IPS: `${API_BASE_URL}/api/v1/network/floating-ips`,
  FLOATING_IP: (id) => `${API_BASE_URL}/api/v1/network/floating-ips/${id}`,
  ASSOCIATE: (id) => `${API_BASE_URL}/api/v1/network/floating-ips/${id}/associate`,
  DISASSOCIATE: (id) => `${API_BASE_URL}/api/v1/network/floating-ips/${id}/disassociate`,
};

// Swift-backed object storage — containers (buckets) and objects.
// Object names can contain slashes (treated as "folders" by S3-style
// clients), so the OBJECT endpoint takes the name verbatim and the
// caller is responsible for any URL encoding it needs. The path
// converter on the backend (`{object_name:path}`) accepts slashes.
export const OBJECT_STORAGE_ENDPOINTS = {
  CONTAINERS: `${API_BASE_URL}/api/v1/object-storage/containers`,
  CONTAINER: (name) =>
    `${API_BASE_URL}/api/v1/object-storage/containers/${encodeURIComponent(name)}`,
  CONTAINER_ACCESS: (name) =>
    `${API_BASE_URL}/api/v1/object-storage/containers/${encodeURIComponent(name)}/access`,
  OBJECTS: (container) =>
    `${API_BASE_URL}/api/v1/object-storage/containers/${encodeURIComponent(container)}/objects`,
  OBJECT: (container, objectName) =>
    `${API_BASE_URL}/api/v1/object-storage/containers/${encodeURIComponent(container)}/objects/${objectName
      .split("/")
      .map(encodeURIComponent)
      .join("/")}`,
  // Swift-native "connection string" — endpoint + auth URL + the
  // calling user's app credential. Sensitive (returns the user's
  // own secret), only callable by an authenticated user, and the
  // backend gates on per-user provisioning mode.
  CONNECTION_INFO: `${API_BASE_URL}/api/v1/object-storage/connection-info`,
};

// Full Neutron-backed network management — networks, subnets, routers.
// Floating IPs already have their own endpoint constants above so we
// don't double up here.
export const NETWORK_ENDPOINTS = {
  NETWORKS: `${API_BASE_URL}/api/v1/network/networks`,
  NETWORK: (id) => `${API_BASE_URL}/api/v1/network/networks/${id}`,
  SUBNETS: `${API_BASE_URL}/api/v1/network/subnets`,
  SUBNET: (id) => `${API_BASE_URL}/api/v1/network/subnets/${id}`,
  ROUTERS: `${API_BASE_URL}/api/v1/network/routers`,
  ROUTER: (id) => `${API_BASE_URL}/api/v1/network/routers/${id}`,
  // Neutron uses two distinct PUT verbs for interface management
  // (``add-interface`` and ``remove-interface``) rather than a single
  // resource collection. The previous ``ROUTER_INTERFACES`` URL was
  // wrong end-to-end — kept here only for backwards-compat with any
  // older imports.
  ROUTER_INTERFACES: (id) =>
    `${API_BASE_URL}/api/v1/network/routers/${id}/interfaces`,
  ROUTER_ADD_INTERFACE: (id) =>
    `${API_BASE_URL}/api/v1/network/routers/${id}/add-interface`,
  ROUTER_REMOVE_INTERFACE: (id) =>
    `${API_BASE_URL}/api/v1/network/routers/${id}/remove-interface`,
};

// Octavia-backed load balancer management — LBs, listeners, pools,
// members, and health monitors. The "/load-balancers" URL prefix is
// hyphenated because that's how the backend router registers it
// (avoids OS-style "load_balancers" snake_case in the URL).
export const LOAD_BALANCER_ENDPOINTS = {
  LBS: `${API_BASE_URL}/api/v1/load-balancers`,
  LB: (id) => `${API_BASE_URL}/api/v1/load-balancers/${id}`,
  LISTENERS: (lbId) => `${API_BASE_URL}/api/v1/load-balancers/${lbId}/listeners`,
  LISTENER: (lbId, listenerId) =>
    `${API_BASE_URL}/api/v1/load-balancers/${lbId}/listeners/${listenerId}`,
  POOLS: (lbId) => `${API_BASE_URL}/api/v1/load-balancers/${lbId}/pools`,
  POOL: (lbId, poolId) =>
    `${API_BASE_URL}/api/v1/load-balancers/${lbId}/pools/${poolId}`,
  MEMBERS: (lbId, poolId) =>
    `${API_BASE_URL}/api/v1/load-balancers/${lbId}/pools/${poolId}/members`,
  MEMBER: (lbId, poolId, memberId) =>
    `${API_BASE_URL}/api/v1/load-balancers/${lbId}/pools/${poolId}/members/${memberId}`,
  HEALTH_MONITOR: (lbId, poolId) =>
    `${API_BASE_URL}/api/v1/load-balancers/${lbId}/pools/${poolId}/healthmonitor`,
  HEALTH_MONITOR_BY_ID: (lbId, poolId, hmId) =>
    `${API_BASE_URL}/api/v1/load-balancers/${lbId}/pools/${poolId}/healthmonitor/${hmId}`,
  FLOATING_IP: (lbId) => `${API_BASE_URL}/api/v1/load-balancers/${lbId}/floating-ip`,
};

// Workspace bootstrap — poll-friendly endpoints the dashboard gates
// child page rendering on. ``STATUS`` is a cheap DB lookup, ``BOOTSTRAP``
// fires the per-user OpenStack identity provisioning as a background
// task. See app/routers/workspace.py + workspace_status_service.py.
// NCM (Neviri Certificate Manager) — standalone cert resource that
// LB listeners pick from a dropdown. See /v1/certificates router on
// the backend for the canonical contract.
export const CERTIFICATE_ENDPOINTS = {
  LIST: `${API_BASE_URL}/api/v1/certificates`,
  GET: (id) => `${API_BASE_URL}/api/v1/certificates/${id}`,
  REQUEST: `${API_BASE_URL}/api/v1/certificates/request`,
  POLL_VALIDATION: (id) =>
    `${API_BASE_URL}/api/v1/certificates/${id}/poll-validation`,
  RENEW: (id) => `${API_BASE_URL}/api/v1/certificates/${id}/renew`,
  IMPORT: `${API_BASE_URL}/api/v1/certificates/import`,
  REPLACE: (id) => `${API_BASE_URL}/api/v1/certificates/${id}/replace`,
  REVOKE: (id) => `${API_BASE_URL}/api/v1/certificates/${id}/revoke`,
  DELETE: (id) => `${API_BASE_URL}/api/v1/certificates/${id}`,
};

export const WORKSPACE_ENDPOINTS = {
  STATUS: `${API_BASE_URL}/api/v1/workspace/status`,
  BOOTSTRAP: `${API_BASE_URL}/api/v1/workspace/bootstrap`,
};

// Security group endpoints — full CRUD plus rule management.
// VM attach/detach lives under COMPUTE because Nova owns the
// addSecurityGroup / removeSecurityGroup actions.
export const SECURITY_GROUP_ENDPOINTS = {
  LIST: `${API_BASE_URL}/api/v1/security-groups`,
  GET: (id) => `${API_BASE_URL}/api/v1/security-groups/${id}`,
  RULES: (id) => `${API_BASE_URL}/api/v1/security-groups/${id}/rules`,
  RULE: (sgId, ruleId) =>
    `${API_BASE_URL}/api/v1/security-groups/${sgId}/rules/${ruleId}`,
  SERVER_ATTACH: (serverId) =>
    `${API_BASE_URL}/api/v1/compute/servers/${serverId}/security-groups`,
  SERVER_DETACH: (serverId, sgName) =>
    `${API_BASE_URL}/api/v1/compute/servers/${serverId}/security-groups/${encodeURIComponent(
      sgName,
    )}`,
};

// Kept for backwards-compatibility with any older imports.
export const VM_ENDPOINTS = COMPUTE_ENDPOINTS;

// OpenStack server statuses → lowercase tokens used throughout the VM UI.
const STATUS_MAP = {
  ACTIVE: "running",
  BUILD: "creating",
  REBOOT: "running",
  HARD_REBOOT: "running",
  SHUTOFF: "stopped",
  PAUSED: "paused",
  SUSPENDED: "paused",
  RESCUE: "running",
  RESIZE: "creating",
  VERIFY_RESIZE: "creating",
  ERROR: "error",
  DELETED: "terminated",
  UNKNOWN: "stopped",
};

const normalizeStatus = (status) =>
  STATUS_MAP[String(status || "").toUpperCase()] || "stopped";

// RFC1918 private IPv4 ranges. Anything in these is by definition
// not internet-routable.
const _RFC1918_RANGES = [
  /^10\./,                         // 10.0.0.0/8
  /^172\.(1[6-9]|2[0-9]|3[01])\./, // 172.16.0.0/12
  /^192\.168\./,                   // 192.168.0.0/16
];
const _IPV4_LINK_LOCAL = /^169\.254\./;
const _IPV4_LOOPBACK = /^127\./;
const _IPV6_ULA = /^f[cd][0-9a-f]{2}:/i; // fc00::/7 — unique local
const _IPV6_LINK_LOCAL = /^fe80:/i;       // fe80::/10
const _IPV6_LOOPBACK = /^(::1|0+:0+:0+:0+:0+:0+:0+:0*1)$/i;

/**
 * True for any IPv4/IPv6 address that should be treated as private:
 * RFC1918, link-local, loopback, IPv6 ULAs, and IPv6 link-local. Every
 * other address (including provider-network fixed IPs that are
 * publicly routable, e.g. ``173.231.193.125``) returns false.
 *
 * Exported only so the unit tests can drive it directly.
 */
export const isPrivateIp = (ip) => {
  if (typeof ip !== "string" || !ip) return false;
  if (_IPV4_LINK_LOCAL.test(ip) || _IPV4_LOOPBACK.test(ip)) return true;
  if (_IPV6_LINK_LOCAL.test(ip) || _IPV6_LOOPBACK.test(ip)) return true;
  if (_IPV6_ULA.test(ip)) return true;
  return _RFC1918_RANGES.some((re) => re.test(ip));
};

// Network-name keywords that strongly suggest the operator's intent
// for an address. Whatever the cloud admin called the network
// usually beats inferring intent from the IP range alone — provider
// networks named ``public`` sometimes carry RFC1918 or link-local
// addresses due to weird autoconf setups, and tenant networks named
// ``private`` occasionally carry public-range IPs that aren't
// actually internet-routable from outside the tenant.
const _PUBLIC_NETWORK_HINTS = ["public", "external", "internet", "wan"];
const _PRIVATE_NETWORK_HINTS = [
  "private",
  "internal",
  "tenant",
  "selfservice",
  "lan",
  "intranet",
];

/**
 * Classify an address by its Neutron network name. Returns
 * ``"public"`` / ``"private"`` when a keyword matches, ``null``
 * otherwise (caller falls back to IP-range classification).
 */
function _classifyByNetworkName(networkName) {
  if (typeof networkName !== "string" || !networkName) return null;
  const n = networkName.toLowerCase();
  if (_PUBLIC_NETWORK_HINTS.some((h) => n.includes(h))) return "public";
  if (_PRIVATE_NETWORK_HINTS.some((h) => n.includes(h))) return "private";
  return null;
}

/**
 * Classify an OpenStack server's ``addresses`` payload into
 * ``{ publicIp, privateIp }``.
 *
 * Selection rules, in priority order — first match per slot wins:
 *
 *   1. **Floating IP** → always Public (Nova-tagged ``floating``).
 *
 *   2. **Network-name hint** — if the address is on a network whose
 *      name contains ``public`` / ``external`` / ``internet`` /
 *      ``wan``, it goes to Public regardless of the IP class.
 *      Mirror for ``private`` / ``internal`` / ``tenant`` keywords →
 *      Private slot.
 *
 *   3. **IP range** — RFC1918 / IPv6 ULA / link-local / loopback go
 *      to Private; everything else (including provider-network fixed
 *      IPs like ``173.231.193.125``) goes to Public.
 *
 * **Strict classification**: a VM with only an RFC1918 / link-local
 * address shows under Private and "Not assigned" under Public. We
 * used to "promote" the private IP into the Public slot when nothing
 * else was there, but that was misleading — a ``10.x.x.x`` displayed
 * as a Public IP told users the VM was internet-reachable when it
 * wasn't. Users prefer accurate labels over a never-empty Public
 * slot; allocate a floating IP if you want the VM addressable from
 * outside the tenant network.
 *
 * Exported so unit tests can drive it directly.
 */
export const extractAddresses = (addresses) => {
  if (!Array.isArray(addresses)) return { publicIp: null, privateIp: null };
  let publicIp = null;
  let privateIp = null;

  // Pass 1 — floating IPs are unambiguously public, take priority.
  for (const addr of addresses) {
    if (!addr?.ip_address) continue;
    if (addr.ip_type === "floating" && !publicIp) {
      publicIp = addr.ip_address;
    }
  }

  // Pass 2 — fixed IPs: network-name hint first, IP range as fallback.
  for (const addr of addresses) {
    if (!addr?.ip_address) continue;
    if (addr.ip_type === "floating") continue;

    const byName = _classifyByNetworkName(addr.network_name);
    if (byName === "public") {
      if (!publicIp) publicIp = addr.ip_address;
      continue;
    }
    if (byName === "private") {
      if (!privateIp) privateIp = addr.ip_address;
      continue;
    }

    // No naming hint — discriminate by IP range strictly.
    if (isPrivateIp(addr.ip_address)) {
      if (!privateIp) privateIp = addr.ip_address;
    } else {
      // Provider-network IP — publicly routable even though tagged
      // ``fixed``. Use it for the public slot if floating didn't win.
      if (!publicIp) publicIp = addr.ip_address;
    }
  }

  return { publicIp, privateIp };
};

const mapServerToVM = (server) => {
  if (!server) return server;
  const { publicIp, privateIp } = extractAddresses(server.addresses);
  return {
    id: server.id,
    name: server.name,
    vmName: server.name,
    status: normalizeStatus(server.status),
    rawStatus: server.status,
    instanceType: server.flavor_name || server.flavor_id || "",
    flavorId: server.flavor_id,
    osImage: server.image_id || "",
    imageId: server.image_id,
    // Backend resolves this from server.image / create-time metadata /
    // boot volume's volume_image_metadata. Frontend prefers this over
    // the listImages() lookup since the lookup misses images the
    // current user can't see (e.g. another project's image used at
    // create time but no longer in their image catalog).
    imageName: server.image_name || null,
    keyName: server.key_name,
    publicIp,
    privateIp,
    securityGroups: server.security_groups || [],
    metadata: server.metadata || {},
    createdAt: server.created_at,
    updatedAt: server.updated_at,
    availabilityZone: server.availability_zone,
    powerState: server.power_state,
    taskState: server.task_state,
    vmState: server.vm_state,
    // Populated when OpenStack moved the VM to ERROR.
    // Shape: { code, message, details, created }
    fault: server.fault || null,
    addresses: server.addresses || [],
    // Boot disk fields — VMs created via the decoupled-disk flow
    // carry these on the response. Both come from server metadata
    // server-side; the frontend uses bootVolumeId to display the
    // disk on the detail page and to drive the delete-VM warning.
    bootVolumeId: server.boot_volume_id || null,
    diskGb: server.disk_gb || null,
  };
};

const authHeaders = (token) => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
});

const handleJSON = async (response, errMessage) => {
  let result = null;
  try {
    result = await response.json();
  } catch {
    /* may be empty body */
  }
  if (!response.ok) {
    const detail = result?.detail || result?.message || errMessage;
    // Surface HTTP status + structured error_code so callers can
    // distinguish e.g. a 503 PROVISIONING_ERROR (backend still
    // bootstrapping the user's OpenStack identity — should retry
    // silently) from a hard failure that warrants a toast.
    const err = new Error(detail);
    err.status = response.status;
    err.errorCode = result?.error_code || null;
    throw err;
  }
  return result;
};

/**
 * Virtual Machine API client backed by OpenStack Compute (Nova).
 *
 * The OpenStack endpoints return list responses wrapped as
 *   {status: true, data: [...], message: "Success"}
 * and single-object responses unwrapped (bare dict). This client normalizes
 * everything to {status, data, message} so the existing VM UI keeps working.
 */
export const vmAPI = {
  create: async (vmData, token) => {
    try {
      // FOUR boot sources are supported — exactly one must be set
      // (backend enforces with a clean 422; we pre-check here so the
      // user sees an actionable toast instead of a round-trip error):
      //   1. ``image_id``                  — fresh OS image
      //   2. ``source_volume_id``          — boot from existing disk
      //   3. ``source_volume_snapshot_id`` — clone a disk snapshot
      //   4. ``source_vm_snapshot_id``     — restore from a VM snapshot
      //
      // CreateVMModal.jsx already builds the right field for the
      // picked source via its `bootSourceFields` block. This wrapper
      // just needs to forward whichever fields are present — DO NOT
      // re-validate to a 2-source subset (the old code did, which
      // was the user-reported "Pick a boot source" bug).
      const imageId = vmData.image_id || vmData.imageId || vmData.osImage;
      const sourceVolumeId =
        vmData.source_volume_id || vmData.sourceVolumeId;
      const sourceVolumeSnapshotId =
        vmData.source_volume_snapshot_id || vmData.sourceVolumeSnapshotId;
      const sourceVmSnapshotId =
        vmData.source_vm_snapshot_id || vmData.sourceVmSnapshotId;
      const diskSizeGb = vmData.disk_size_gb || vmData.diskSizeGb;

      const payload = {
        name: vmData.name || vmData.vmName,
        flavor_id: vmData.flavor_id || vmData.flavorId || vmData.instanceType,
        network_id: vmData.network_id || vmData.networkId,
      };

      // Always-required fields.
      if (!payload.name || !payload.flavor_id || !payload.network_id) {
        throw new Error(
          "Missing required field(s): name, flavor_id, network_id are all required."
        );
      }

      // Boot-source: exactly one of the four. Count how many are set.
      const sourcesPresent = [
        Boolean(imageId),
        Boolean(sourceVolumeId),
        Boolean(sourceVolumeSnapshotId),
        Boolean(sourceVmSnapshotId),
      ].filter(Boolean).length;
      if (sourcesPresent === 0) {
        throw new Error(
          "Pick a boot source — an OS image, an existing disk, a disk snapshot, or a VM snapshot.",
        );
      }
      if (sourcesPresent > 1) {
        throw new Error(
          "Pick only one boot source — an OS image, an existing disk, a disk snapshot, OR a VM snapshot.",
        );
      }

      // Forward whichever source was set. ``disk_size_gb`` is
      // honored on every path EXCEPT the existing-disk path (where
      // the volume's own size wins) — the backend ignores it
      // there, so we still forward it for symmetry if provided.
      if (imageId) payload.image_id = imageId;
      if (sourceVolumeId) payload.source_volume_id = sourceVolumeId;
      if (sourceVolumeSnapshotId)
        payload.source_volume_snapshot_id = sourceVolumeSnapshotId;
      if (sourceVmSnapshotId)
        payload.source_vm_snapshot_id = sourceVmSnapshotId;
      // Disk size applies to image / disk-snapshot / vm-snapshot
      // paths. The existing-disk path doesn't use it but forwarding
      // is harmless — backend ignores.
      if (diskSizeGb && !sourceVolumeId) payload.disk_size_gb = diskSizeGb;

      // Bulk-create knob. ``count: 1`` is identical to no-count
      // behaviour and keeps the singleton path — backend handles
      // the cap + name-collision pre-check.
      if (vmData.count && vmData.count > 0) {
        payload.count = vmData.count;
      }

      if (vmData.key_name || vmData.keyName) payload.key_name = vmData.key_name || vmData.keyName;
      if (vmData.security_groups) payload.security_groups = vmData.security_groups;
      if (vmData.availability_zone) payload.availability_zone = vmData.availability_zone;
      if (vmData.user_data) payload.user_data = vmData.user_data;
      if (vmData.metadata) payload.metadata = vmData.metadata;

      let response;
      try {
        response = await fetch(COMPUTE_ENDPOINTS.SERVERS, {
          method: "POST",
          headers: authHeaders(token),
          body: JSON.stringify(payload),
        });
      } catch (fetchErr) {
        // Browser-level failure: CORS rejection, server crashed mid-request,
        // network unreachable, etc. Re-throw with a more actionable hint.
        throw new Error(
          `Network error reaching ${COMPUTE_ENDPOINTS.SERVERS}. ` +
            `Check the backend terminal for tracebacks and DevTools → Network for the failed request. ` +
            `Original: ${fetchErr.message}`
        );
      }
      const result = await handleJSON(response, "Failed to create VM");
      // Backend returns ``ServerCreateResponse(vms=[...], count=N, vm=vms[0])``
      // for the new bulk path; the singleton path also wraps in the
      // same shape. Map each server in ``vms`` (so the bulk-create
      // case actually shows N VMs in the dashboard) AND keep ``vm``
      // as a back-compat alias of vms[0].
      //
      // Pre-fix bug: ``mapServerToVM(result)`` was called on the
      // wrapper itself — but the wrapper has no ``id``/``name``, so
      // every mapped field was ``undefined``. CreateVMModal then
      // saw ``result.data.vms`` as undefined and rendered just one
      // (broken) VM card. That's also the second half of the
      // bulk-create-only-shows-1-VM bug.
      const wrapper = result || {};
      const vmsRaw = Array.isArray(wrapper.vms) ? wrapper.vms : [];
      const vmsMapped = vmsRaw.map(mapServerToVM);
      const vmFallback = wrapper.vm
        ? mapServerToVM(wrapper.vm)
        : vmsMapped[0] || null;
      return {
        status: true,
        data: {
          vms: vmsMapped,
          vm: vmFallback,
          count: wrapper.count || vmsMapped.length || 1,
        },
        message: "Success",
      };
    } catch (error) {
      console.error("[VM API] Create error:", error);
      throw error;
    }
  },

  getAll: async (token) => {
    try {
      const response = await fetch(COMPUTE_ENDPOINTS.SERVERS, {
        method: "GET",
        headers: authHeaders(token),
      });
      const result = await handleJSON(response, "Failed to fetch VMs");
      const list = Array.isArray(result?.data) ? result.data : Array.isArray(result) ? result : [];
      return { status: true, data: list.map(mapServerToVM), message: "Success" };
    } catch (error) {
      console.error("[VM API] Get all error:", error);
      throw error;
    }
  },

  getById: async (id, token) => {
    try {
      const response = await fetch(COMPUTE_ENDPOINTS.SERVER(id), {
        method: "GET",
        headers: authHeaders(token),
      });
      const result = await handleJSON(response, "Failed to fetch VM");
      return { status: true, data: mapServerToVM(result), message: "Success" };
    } catch (error) {
      console.error("[VM API] Get by ID error:", error);
      throw error;
    }
  },

  serverAction: async (id, action, token, extra = {}) => {
    const response = await fetch(COMPUTE_ENDPOINTS.SERVER_ACTION(id), {
      method: "POST",
      headers: authHeaders(token),
      body: JSON.stringify({ action, ...extra }),
    });
    return handleJSON(response, `Failed to ${action} VM`);
  },

  start: async (id, token) => {
    try {
      const result = await vmAPI.serverAction(id, "start", token);
      return { status: true, data: result, message: result?.message || "Started" };
    } catch (error) {
      console.error("[VM API] Start error:", error);
      throw error;
    }
  },

  stop: async (id, token) => {
    try {
      const result = await vmAPI.serverAction(id, "stop", token);
      return { status: true, data: result, message: result?.message || "Stopped" };
    } catch (error) {
      console.error("[VM API] Stop error:", error);
      throw error;
    }
  },

  reboot: async (id, token, rebootType = "SOFT") => {
    try {
      const result = await vmAPI.serverAction(id, "reboot", token, {
        reboot_type: rebootType,
      });
      return { status: true, data: result, message: result?.message || "Rebooting" };
    } catch (error) {
      console.error("[VM API] Reboot error:", error);
      throw error;
    }
  },

  /**
   * Delete a VM.
   *
   * @param {string} id - VM id
   * @param {string} token - auth token
   * @param {object} [opts]
   * @param {boolean} [opts.deleteDisk=false] - When true, the boot
   *   volume is destroyed with the VM. Default false matches the
   *   long-standing "VM goes, disk stays" behaviour so users with the
   *   old habit aren't surprised.
   */
  delete: async (id, token, { deleteDisk = false } = {}) => {
    try {
      // Backend reads delete_disk as a query param on the DELETE
      // endpoint. Only append when true so the request stays minimal
      // for the common case.
      const url = deleteDisk
        ? `${COMPUTE_ENDPOINTS.SERVER(id)}?delete_disk=true`
        : COMPUTE_ENDPOINTS.SERVER(id);
      const response = await fetch(url, {
        method: "DELETE",
        headers: authHeaders(token),
      });
      const result = await handleJSON(response, "Failed to delete VM");
      return { status: true, data: result, message: result?.message || "Deleted" };
    } catch (error) {
      console.error("[VM API] Delete error:", error);
      throw error;
    }
  },

  getStatus: async (id, token) => {
    // OpenStack has no separate /status endpoint — server detail carries it.
    const result = await vmAPI.getById(id, token);
    return {
      status: true,
      data: {
        id: result.data?.id,
        name: result.data?.name,
        status: result.data?.status,
        publicIp: result.data?.publicIp,
      },
      message: "Success",
    };
  },

  resize: async (id, flavorId, token) => {
    try {
      const response = await fetch(COMPUTE_ENDPOINTS.SERVER_RESIZE(id), {
        method: "POST",
        headers: authHeaders(token),
        body: JSON.stringify({ flavor_id: flavorId }),
      });
      const result = await handleJSON(response, "Failed to resize VM");
      return { status: true, data: result, message: result?.message || "Resizing" };
    } catch (error) {
      console.error("[VM API] Resize error:", error);
      throw error;
    }
  },

  listFlavors: async (token) => {
    try {
      const response = await fetch(COMPUTE_ENDPOINTS.FLAVORS, {
        method: "GET",
        headers: authHeaders(token),
      });
      const result = await handleJSON(response, "Failed to fetch flavors");
      const list = Array.isArray(result?.data) ? result.data : Array.isArray(result) ? result : [];
      return { status: true, data: list, message: "Success" };
    } catch (error) {
      console.error("[VM API] List flavors error:", error);
      throw error;
    }
  },

  listImages: async (token) => {
    try {
      const response = await fetch(COMPUTE_ENDPOINTS.IMAGES, {
        method: "GET",
        headers: authHeaders(token),
      });
      const result = await handleJSON(response, "Failed to fetch images");
      const list = Array.isArray(result?.data) ? result.data : Array.isArray(result) ? result : [];
      return { status: true, data: list, message: "Success" };
    } catch (error) {
      console.error("[VM API] List images error:", error);
      throw error;
    }
  },

  listNetworks: async (token) => {
    try {
      const response = await fetch(COMPUTE_ENDPOINTS.NETWORKS, {
        method: "GET",
        headers: authHeaders(token),
      });
      const result = await handleJSON(response, "Failed to fetch networks");
      const list = Array.isArray(result?.data) ? result.data : Array.isArray(result) ? result : [];
      return { status: true, data: list, message: "Success" };
    } catch (error) {
      console.error("[VM API] List networks error:", error);
      throw error;
    }
  },

  // --- Keypairs ---
  listKeypairs: async (token) => {
    try {
      const response = await fetch(COMPUTE_ENDPOINTS.KEYPAIRS, {
        method: "GET",
        headers: authHeaders(token),
      });
      const result = await handleJSON(response, "Failed to fetch keypairs");
      const list = Array.isArray(result?.data) ? result.data : Array.isArray(result) ? result : [];
      return { status: true, data: list, message: "Success" };
    } catch (error) {
      console.error("[VM API] List keypairs error:", error);
      throw error;
    }
  },

  /**
   * Create or import a keypair.
   * - If `public_key` is supplied, OpenStack imports it (no private key returned).
   * - If `public_key` is omitted, OpenStack generates a fresh keypair and the
   *   private_key is returned ONCE in the response — caller MUST save it.
   */
  createKeypair: async ({ name, public_key, key_type = "ssh" }, token) => {
    try {
      const body = { name, key_type };
      if (public_key) body.public_key = public_key;
      const response = await fetch(COMPUTE_ENDPOINTS.KEYPAIRS, {
        method: "POST",
        headers: authHeaders(token),
        body: JSON.stringify(body),
      });
      const result = await handleJSON(response, "Failed to create keypair");
      return { status: true, data: result, message: "Created" };
    } catch (error) {
      console.error("[VM API] Create keypair error:", error);
      throw error;
    }
  },

  deleteKeypair: async (name, token) => {
    try {
      const response = await fetch(COMPUTE_ENDPOINTS.KEYPAIR(name), {
        method: "DELETE",
        headers: authHeaders(token),
      });
      const result = await handleJSON(response, "Failed to delete keypair");
      return { status: true, data: result, message: result?.message || "Deleted" };
    } catch (error) {
      console.error("[VM API] Delete keypair error:", error);
      throw error;
    }
  },

  // --- Usage / pricing ---
  getUsage: async (id, token) => {
    const response = await fetch(
      BLOCK_STORAGE_ENDPOINTS.SERVER_USAGE(id),
      { method: "GET", headers: authHeaders(token) }
    );
    const result = await handleJSON(response, "Failed to fetch VM usage");
    return { status: true, data: result };
  },

  // --- Console URL (VNC / SPICE) ---
  getConsole: async (id, token, consoleType = "novnc") => {
    const url = `${COMPUTE_ENDPOINTS.SERVER_CONSOLE(id)}?console_type=${encodeURIComponent(consoleType)}`;
    const response = await fetch(url, { method: "GET", headers: authHeaders(token) });
    const result = await handleJSON(response, "Failed to fetch console URL");
    return { status: true, data: result, message: "Success" };
  },

  // --- Console serial output (boot logs) ---
  getConsoleOutput: async (id, token, length = 50) => {
    const url = `${COMPUTE_ENDPOINTS.SERVER_CONSOLE_OUTPUT(id)}?length=${length}`;
    const response = await fetch(url, { method: "GET", headers: authHeaders(token) });
    const result = await handleJSON(response, "Failed to fetch console output");
    return { status: true, data: result, message: "Success" };
  },

  // --- Resize ---
  resizeConfirm: async (id, token) => {
    const response = await fetch(COMPUTE_ENDPOINTS.SERVER_RESIZE_CONFIRM(id), {
      method: "POST",
      headers: authHeaders(token),
    });
    return handleJSON(response, "Failed to confirm resize");
  },

  resizeRevert: async (id, token) => {
    const response = await fetch(COMPUTE_ENDPOINTS.SERVER_RESIZE_REVERT(id), {
      method: "POST",
      headers: authHeaders(token),
    });
    return handleJSON(response, "Failed to revert resize");
  },

  /**
   * One-shot resize + auto-confirm. Backend submits the resize, polls
   * until VERIFY_RESIZE, then confirms — single HTTP round trip from
   * the user's perspective. Default timeout 300s; bump for very large
   * disks. NOTE: AbortController not wired here on purpose — once Nova
   * starts the migration, cancelling client-side doesn't roll it back.
   */
  resizeAndConfirm: async (id, flavorId, token, timeoutS = 300) => {
    const url =
      `${COMPUTE_ENDPOINTS.SERVER_RESIZE_AND_CONFIRM(id)}` +
      `?timeout_s=${encodeURIComponent(timeoutS)}`;
    const response = await fetch(url, {
      method: "POST",
      headers: authHeaders(token),
      body: JSON.stringify({ flavor_id: flavorId }),
    });
    const result = await handleJSON(response, "Failed to resize VM");
    return { status: true, data: result };
  },

  // --- Server network interfaces (Nova os-interface) ---
  listInterfaces: async (id, token) => {
    const response = await fetch(COMPUTE_ENDPOINTS.SERVER_INTERFACES(id), {
      method: "GET",
      headers: authHeaders(token),
    });
    const result = await handleJSON(response, "Failed to fetch interfaces");
    const list = Array.isArray(result?.data) ? result.data : Array.isArray(result) ? result : [];
    return { status: true, data: list };
  },

  attachInterface: async (id, body, token) => {
    /* body: { network_id?, port_id?, fixed_ips? } */
    const response = await fetch(COMPUTE_ENDPOINTS.SERVER_INTERFACES(id), {
      method: "POST",
      headers: authHeaders(token),
      body: JSON.stringify(body),
    });
    const result = await handleJSON(response, "Failed to attach interface");
    return { status: true, data: result };
  },

  detachInterface: async (id, portId, token) => {
    const response = await fetch(COMPUTE_ENDPOINTS.SERVER_INTERFACE(id, portId), {
      method: "DELETE",
      headers: authHeaders(token),
    });
    const result = await handleJSON(response, "Failed to detach interface");
    return { status: true, data: result };
  },
};

/**
 * VM (instance) snapshots. Wraps the `/compute/vm-snapshots` +
 * `/compute/servers/{id}/snapshots` endpoints — under the hood these
 * are Glance images with `image_type=snapshot` produced by Nova's
 * `create_image` action. Lifecycle is independent of the source VM
 * (a snapshot survives its source VM's deletion).
 */
export const vmSnapshotAPI = {
  /**
   * Create a VM snapshot of a running/stopped VM.
   * @param {string} serverId - the source VM id
   * @param {{name: string, description?: string}} data
   * @param {string} token
   */
  create: async (serverId, data, token) => {
    try {
      const response = await fetch(
        COMPUTE_ENDPOINTS.SERVER_SNAPSHOTS(serverId),
        {
          method: "POST",
          headers: authHeaders(token),
          body: JSON.stringify(data),
        },
      );
      const result = await handleJSON(
        response, "Failed to create VM snapshot",
      );
      return { status: true, data: result };
    } catch (error) {
      console.error("[VM Snapshot API] Create error:", error);
      throw error;
    }
  },

  /**
   * List VM snapshots in the caller's project.
   * @param {string} token
   * @param {object} [filters]
   * @param {string} [filters.server_id] - filter to one source VM
   */
  list: async (token, { server_id } = {}) => {
    try {
      const url = server_id
        ? `${COMPUTE_ENDPOINTS.VM_SNAPSHOTS}?server_id=${encodeURIComponent(server_id)}`
        : COMPUTE_ENDPOINTS.VM_SNAPSHOTS;
      const response = await fetch(url, {
        method: "GET",
        headers: authHeaders(token),
      });
      const result = await handleJSON(
        response, "Failed to fetch VM snapshots",
      );
      const list = Array.isArray(result?.data)
        ? result.data
        : Array.isArray(result)
        ? result
        : [];
      return { status: true, data: list };
    } catch (error) {
      console.error("[VM Snapshot API] List error:", error);
      throw error;
    }
  },

  get: async (id, token) => {
    try {
      const response = await fetch(COMPUTE_ENDPOINTS.VM_SNAPSHOT(id), {
        method: "GET",
        headers: authHeaders(token),
      });
      const result = await handleJSON(
        response, "Failed to fetch VM snapshot",
      );
      return { status: true, data: result };
    } catch (error) {
      console.error("[VM Snapshot API] Get error:", error);
      throw error;
    }
  },

  delete: async (id, token) => {
    try {
      const response = await fetch(COMPUTE_ENDPOINTS.VM_SNAPSHOT(id), {
        method: "DELETE",
        headers: authHeaders(token),
      });
      const result = await handleJSON(
        response, "Failed to delete VM snapshot",
      );
      return { status: true, data: result, message: result?.message || "Deleted" };
    } catch (error) {
      console.error("[VM Snapshot API] Delete error:", error);
      throw error;
    }
  },
};

/**
 * Block Storage (Cinder) — volumes + snapshots + backups.
 */
export const volumeAPI = {
  list: async (token) => {
    const response = await fetch(BLOCK_STORAGE_ENDPOINTS.VOLUMES, {
      method: "GET",
      headers: authHeaders(token),
    });
    const result = await handleJSON(response, "Failed to fetch volumes");
    const list = Array.isArray(result?.data) ? result.data : Array.isArray(result) ? result : [];
    return { status: true, data: list };
  },

  get: async (id, token) => {
    const response = await fetch(BLOCK_STORAGE_ENDPOINTS.VOLUME(id), {
      method: "GET",
      headers: authHeaders(token),
    });
    return handleJSON(response, "Failed to fetch volume");
  },

  create: async (data, token) => {
    /* { name, size, description?, volume_type?, availability_zone?, snapshot_id?, metadata? } */
    const response = await fetch(BLOCK_STORAGE_ENDPOINTS.VOLUMES, {
      method: "POST",
      headers: authHeaders(token),
      body: JSON.stringify(data),
    });
    return handleJSON(response, "Failed to create volume");
  },

  delete: async (id, token) => {
    const response = await fetch(BLOCK_STORAGE_ENDPOINTS.VOLUME(id), {
      method: "DELETE",
      headers: authHeaders(token),
    });
    return handleJSON(response, "Failed to delete volume");
  },

  attach: async (volumeId, serverId, device, token) => {
    const response = await fetch(BLOCK_STORAGE_ENDPOINTS.VOLUME_ATTACH(volumeId), {
      method: "POST",
      headers: authHeaders(token),
      body: JSON.stringify({ server_id: serverId, ...(device ? { device } : {}) }),
    });
    return handleJSON(response, "Failed to attach volume");
  },

  detach: async (volumeId, serverId, token) => {
    const response = await fetch(BLOCK_STORAGE_ENDPOINTS.VOLUME_DETACH(volumeId), {
      method: "POST",
      headers: authHeaders(token),
      body: JSON.stringify({ server_id: serverId }),
    });
    return handleJSON(response, "Failed to detach volume");
  },

  extend: async (id, newSize, token) => {
    const response = await fetch(BLOCK_STORAGE_ENDPOINTS.VOLUME_EXTEND(id), {
      method: "POST",
      headers: authHeaders(token),
      body: JSON.stringify({ new_size: newSize }),
    });
    return handleJSON(response, "Failed to extend volume");
  },

  listVolumeTypes: async (token) => {
    const response = await fetch(BLOCK_STORAGE_ENDPOINTS.VOLUME_TYPES, {
      method: "GET",
      headers: authHeaders(token),
    });
    const result = await handleJSON(response, "Failed to fetch volume types");
    const list = Array.isArray(result?.data) ? result.data : Array.isArray(result) ? result : [];
    return { status: true, data: list };
  },

  // --- Snapshots ---
  listSnapshots: async (token, filters = {}) => {
    const url = filters.volume_id
      ? `${BLOCK_STORAGE_ENDPOINTS.SNAPSHOTS}?volume_id=${encodeURIComponent(filters.volume_id)}`
      : BLOCK_STORAGE_ENDPOINTS.SNAPSHOTS;
    const response = await fetch(url, { method: "GET", headers: authHeaders(token) });
    const result = await handleJSON(response, "Failed to fetch snapshots");
    const list = Array.isArray(result?.data) ? result.data : Array.isArray(result) ? result : [];
    return { status: true, data: list };
  },

  createSnapshot: async (data, token) => {
    /* { volume_id, name, description? } */
    const response = await fetch(BLOCK_STORAGE_ENDPOINTS.SNAPSHOTS, {
      method: "POST",
      headers: authHeaders(token),
      body: JSON.stringify(data),
    });
    return handleJSON(response, "Failed to create snapshot");
  },

  deleteSnapshot: async (id, token) => {
    const response = await fetch(BLOCK_STORAGE_ENDPOINTS.SNAPSHOT(id), {
      method: "DELETE",
      headers: authHeaders(token),
    });
    return handleJSON(response, "Failed to delete snapshot");
  },

  // --- Backups ---
  listBackups: async (token, filters = {}) => {
    const url = filters.volume_id
      ? `${BLOCK_STORAGE_ENDPOINTS.BACKUPS}?volume_id=${encodeURIComponent(filters.volume_id)}`
      : BLOCK_STORAGE_ENDPOINTS.BACKUPS;
    const response = await fetch(url, { method: "GET", headers: authHeaders(token) });
    const result = await handleJSON(response, "Failed to fetch backups");
    const list = Array.isArray(result?.data) ? result.data : Array.isArray(result) ? result : [];
    return { status: true, data: list };
  },

  createBackup: async (data, token) => {
    /* { volume_id, name, description?, incremental?, force? } */
    const response = await fetch(BLOCK_STORAGE_ENDPOINTS.BACKUPS, {
      method: "POST",
      headers: authHeaders(token),
      body: JSON.stringify(data),
    });
    return handleJSON(response, "Failed to create backup");
  },

  deleteBackup: async (id, token) => {
    const response = await fetch(BLOCK_STORAGE_ENDPOINTS.BACKUP(id), {
      method: "DELETE",
      headers: authHeaders(token),
    });
    return handleJSON(response, "Failed to delete backup");
  },

  restoreBackup: async (backupId, data, token) => {
    /* { name? } → restore into a NEW volume of that name.
       { volume_id } → restore into an EXISTING available volume. */
    const response = await fetch(
      `${BLOCK_STORAGE_ENDPOINTS.BACKUP(backupId)}/restore`,
      {
        method: "POST",
        headers: authHeaders(token),
        body: JSON.stringify(data || {}),
      },
    );
    return handleJSON(response, "Failed to restore backup");
  },
};

/**
 * Floating IPs — allocate, list, associate to a port, disassociate, release.
 */
export const floatingIpAPI = {
  list: async (token) => {
    const response = await fetch(FLOATING_IP_ENDPOINTS.FLOATING_IPS, {
      method: "GET",
      headers: authHeaders(token),
    });
    const result = await handleJSON(response, "Failed to fetch floating IPs");
    const list = Array.isArray(result?.data) ? result.data : Array.isArray(result) ? result : [];
    return { status: true, data: list };
  },

  allocate: async (floatingNetworkId, token, opts = {}) => {
    const response = await fetch(FLOATING_IP_ENDPOINTS.FLOATING_IPS, {
      method: "POST",
      headers: authHeaders(token),
      body: JSON.stringify({
        floating_network_id: floatingNetworkId,
        ...(opts.description ? { description: opts.description } : {}),
        ...(opts.subnet_id ? { subnet_id: opts.subnet_id } : {}),
      }),
    });
    return handleJSON(response, "Failed to allocate floating IP");
  },

  release: async (id, token) => {
    const response = await fetch(FLOATING_IP_ENDPOINTS.FLOATING_IP(id), {
      method: "DELETE",
      headers: authHeaders(token),
    });
    return handleJSON(response, "Failed to release floating IP");
  },

  associate: async (id, portId, token) => {
    const response = await fetch(FLOATING_IP_ENDPOINTS.ASSOCIATE(id), {
      method: "PUT",
      headers: authHeaders(token),
      body: JSON.stringify({ port_id: portId }),
    });
    return handleJSON(response, "Failed to associate floating IP");
  },

  disassociate: async (id, token) => {
    const response = await fetch(FLOATING_IP_ENDPOINTS.DISASSOCIATE(id), {
      method: "PUT",
      headers: authHeaders(token),
    });
    return handleJSON(response, "Failed to disassociate floating IP");
  },
};

export const APP_DEPLOY_ENDPOINTS = {
  // Apps
  APPS: `${API_BASE_URL}/api/v1/apps`,
  APP: (appId) => `${API_BASE_URL}/api/v1/apps/${appId}`,
  UPLOAD_ZIP: (appId) => `${API_BASE_URL}/api/v1/apps/${appId}/upload`,
  // Direct-to-blob upload — backend hands the browser a presigned
  // PUT URL so we bypass the FastAPI body-size limit. Browser then
  // notifies the backend via UPLOAD_COMPLETE.
  UPLOAD_URL: (appId) => `${API_BASE_URL}/api/v1/apps/${appId}/upload-url`,
  UPLOAD_COMPLETE: (appId) =>
    `${API_BASE_URL}/api/v1/apps/${appId}/upload-complete`,
  LIST_ENV: (appId) => `${API_BASE_URL}/api/v1/apps/${appId}/env`,
  ADD_ENV: (appId) => `${API_BASE_URL}/api/v1/apps/${appId}/env`,
  UPDATE_ENV: (appId, key) =>
    `${API_BASE_URL}/api/v1/apps/${appId}/env/${encodeURIComponent(key)}`,
  BULK_ENV: (appId) => `${API_BASE_URL}/api/v1/apps/${appId}/env/bulk`,
  DELETE_ENV: (appId, envId) =>
    `${API_BASE_URL}/api/v1/apps/${appId}/env/${envId}`,
  LIST_APP_DEPLOYMENTS: (appId) =>
    `${API_BASE_URL}/api/v1/apps/${appId}/deployments`,
  DELETE_APP: (appId) => `${API_BASE_URL}/api/v1/apps/${appId}`,
  // Runtime config (port / replicas / cpu / mem / probe)
  RUNTIME: (appId) => `${API_BASE_URL}/api/v1/apps/${appId}/runtime`,
  // Custom domains
  DOMAINS: (appId) => `${API_BASE_URL}/api/v1/apps/${appId}/domains`,
  DOMAIN_VERIFY: (appId, domainId) =>
    `${API_BASE_URL}/api/v1/apps/${appId}/domains/${domainId}/verify`,
  DOMAIN: (appId, domainId) =>
    `${API_BASE_URL}/api/v1/apps/${appId}/domains/${domainId}`,
  // Releases / rollback
  RELEASES: (appId) => `${API_BASE_URL}/api/v1/apps/${appId}/releases`,
  ROLLBACK: (appId, releaseId) =>
    `${API_BASE_URL}/api/v1/apps/${appId}/releases/${releaseId}/rollback`,
  // Resume / wizard draft
  DRAFT: (appId) => `${API_BASE_URL}/api/v1/apps/${appId}/draft`,


  // Deployments
  DEPLOYMENT_STATUS: (deploymentId) =>
    `${API_BASE_URL}/api/v1/deployments/${deploymentId}`,
  DEPLOYMENT_MANIFESTS: (deploymentId) =>
    `${API_BASE_URL}/api/v1/deployments/${deploymentId}/manifests`,
  TRIGGER_BUILD: (deploymentId) =>
    `${API_BASE_URL}/api/v1/deployments/${deploymentId}/build`,
  TRIGGER_DEPLOY: (deploymentId) =>
    `${API_BASE_URL}/api/v1/deployments/${deploymentId}/deploy`,
  TRIGGER_SERVICE: (deploymentId) =>
    `${API_BASE_URL}/api/v1/deployments/${deploymentId}/service`,
  TRIGGER_INGRESS: (deploymentId) =>
    `${API_BASE_URL}/api/v1/deployments/${deploymentId}/ingress`,
};

// ---------------------------------------------------------------------------
// GitHub integration API
//
// Mirrors the backend's ``app/routers/github.py``. The feature-flag
// endpoint is the only one the wizard hits unconditionally — every
// other route here is gated behind ``GET /github/feature-flag``
// returning ``{ enabled: true }``. When the flag is off, the wizard
// hides the "Connect GitHub" source option entirely and these URLs
// are never built.
// ---------------------------------------------------------------------------
export const GITHUB_ENDPOINTS = {
  FEATURE_FLAG: `${API_BASE_URL}/api/v1/github/feature-flag`,
  INSTALLATIONS: `${API_BASE_URL}/api/v1/github/installations`,
  INSTALLATION_REPOS: (installationInternalId) =>
    `${API_BASE_URL}/api/v1/github/installations/${installationInternalId}/repos`,
  INSTALLATION_BRANCHES: (installationInternalId, repoFullName) =>
    `${API_BASE_URL}/api/v1/github/installations/${installationInternalId}/branches?repo_full_name=${encodeURIComponent(repoFullName)}`,
  CONNECT_APP: (appId) =>
    `${API_BASE_URL}/api/v1/github/apps/${appId}/connect`,
  DISCONNECT_APP: (appId) =>
    `${API_BASE_URL}/api/v1/github/apps/${appId}/connect`,
  APP_CONNECTION: (appId) =>
    `${API_BASE_URL}/api/v1/github/apps/${appId}/connection`,
  DEPLOY_FROM_HEAD: (appId) =>
    `${API_BASE_URL}/api/v1/github/apps/${appId}/deploy-from-head`,
};


// ---------------------------------------------------------------------------
// Security Group API client
//
// Project-scoped — every call is implicitly the calling user's, via
// the per-user application credential the backend authenticates with.
// ---------------------------------------------------------------------------

export const securityGroupAPI = {
  list: async (token) => {
    const response = await fetch(SECURITY_GROUP_ENDPOINTS.LIST, {
      method: "GET",
      headers: authHeaders(token),
    });
    const result = await handleJSON(response, "Failed to fetch security groups");
    const list = Array.isArray(result) ? result : result?.data || [];
    return { status: true, data: list, message: "Success" };
  },

  get: async (id, token) => {
    const response = await fetch(SECURITY_GROUP_ENDPOINTS.GET(id), {
      method: "GET",
      headers: authHeaders(token),
    });
    const result = await handleJSON(response, "Failed to fetch security group");
    return { status: true, data: result, message: "Success" };
  },

  create: async ({ name, description = "" }, token) => {
    const response = await fetch(SECURITY_GROUP_ENDPOINTS.LIST, {
      method: "POST",
      headers: authHeaders(token),
      body: JSON.stringify({ name, description }),
    });
    const result = await handleJSON(response, "Failed to create security group");
    return { status: true, data: result, message: "Created" };
  },

  update: async (id, { name, description }, token) => {
    const payload = {};
    if (name !== undefined) payload.name = name;
    if (description !== undefined) payload.description = description;
    const response = await fetch(SECURITY_GROUP_ENDPOINTS.GET(id), {
      method: "PATCH",
      headers: authHeaders(token),
      body: JSON.stringify(payload),
    });
    const result = await handleJSON(response, "Failed to update security group");
    return { status: true, data: result, message: "Updated" };
  },

  delete: async (id, token) => {
    const response = await fetch(SECURITY_GROUP_ENDPOINTS.GET(id), {
      method: "DELETE",
      headers: authHeaders(token),
    });
    if (!response.ok) {
      // 204 No Content path is fine; non-OK has a JSON body we should surface.
      await handleJSON(response, "Failed to delete security group");
    }
    return { status: true, data: null, message: "Deleted" };
  },

  // ----- Rules -----

  createRule: async (sgId, rule, token) => {
    const response = await fetch(SECURITY_GROUP_ENDPOINTS.RULES(sgId), {
      method: "POST",
      headers: authHeaders(token),
      body: JSON.stringify(rule),
    });
    const result = await handleJSON(response, "Failed to create rule");
    return { status: true, data: result, message: "Created" };
  },

  deleteRule: async (sgId, ruleId, token) => {
    const response = await fetch(
      SECURITY_GROUP_ENDPOINTS.RULE(sgId, ruleId),
      { method: "DELETE", headers: authHeaders(token) },
    );
    if (!response.ok) {
      await handleJSON(response, "Failed to delete rule");
    }
    return { status: true, data: null, message: "Deleted" };
  },
};


// VM attach/detach helpers — extend the existing vmAPI surface in
// place, so existing imports (e.g. CreateVMModal.jsx) still work.
vmAPI.attachSecurityGroup = async (serverId, sgName, token) => {
  const response = await fetch(
    SECURITY_GROUP_ENDPOINTS.SERVER_ATTACH(serverId),
    {
      method: "POST",
      headers: authHeaders(token),
      body: JSON.stringify({ name: sgName }),
    },
  );
  if (!response.ok) {
    await handleJSON(response, "Failed to attach security group");
  }
  return { status: true, data: null, message: "Attached" };
};

vmAPI.detachSecurityGroup = async (serverId, sgName, token) => {
  const response = await fetch(
    SECURITY_GROUP_ENDPOINTS.SERVER_DETACH(serverId, sgName),
    { method: "DELETE", headers: authHeaders(token) },
  );
  if (!response.ok) {
    await handleJSON(response, "Failed to detach security group");
  }
  return { status: true, data: null, message: "Detached" };
};


// ---------------------------------------------------------------------------
// Network management — Neutron CRUD for networks, subnets, routers, FIPs.
// Project-scoped via the per-user app credential; same identity story
// as security groups.
// ---------------------------------------------------------------------------

const _unwrap = (result) =>
  Array.isArray(result) ? result : result?.data || [];

export const networkAPI = {
  // ----- Networks -----
  listNetworks: async (token) => {
    const response = await fetch(NETWORK_ENDPOINTS.NETWORKS, {
      method: "GET",
      headers: authHeaders(token),
    });
    const result = await handleJSON(response, "Failed to list networks");
    return { status: true, data: _unwrap(result), message: "Success" };
  },

  getNetwork: async (id, token) => {
    const response = await fetch(NETWORK_ENDPOINTS.NETWORK(id), {
      method: "GET",
      headers: authHeaders(token),
    });
    const result = await handleJSON(response, "Failed to fetch network");
    return { status: true, data: result, message: "Success" };
  },

  createNetwork: async (data, token) => {
    const response = await fetch(NETWORK_ENDPOINTS.NETWORKS, {
      method: "POST",
      headers: authHeaders(token),
      body: JSON.stringify(data),
    });
    const result = await handleJSON(response, "Failed to create network");
    return { status: true, data: result, message: "Created" };
  },

  updateNetwork: async (id, data, token) => {
    const response = await fetch(NETWORK_ENDPOINTS.NETWORK(id), {
      method: "PUT",
      headers: authHeaders(token),
      body: JSON.stringify(data),
    });
    const result = await handleJSON(response, "Failed to update network");
    return { status: true, data: result, message: "Updated" };
  },

  deleteNetwork: async (id, token) => {
    const response = await fetch(NETWORK_ENDPOINTS.NETWORK(id), {
      method: "DELETE",
      headers: authHeaders(token),
    });
    const result = await handleJSON(response, "Failed to delete network");
    return { status: true, data: result, message: "Deleted" };
  },

  // ----- Subnets -----
  listSubnets: async (token, networkId = null) => {
    const url = networkId
      ? `${NETWORK_ENDPOINTS.SUBNETS}?network_id=${encodeURIComponent(networkId)}`
      : NETWORK_ENDPOINTS.SUBNETS;
    const response = await fetch(url, {
      method: "GET",
      headers: authHeaders(token),
    });
    const result = await handleJSON(response, "Failed to list subnets");
    return { status: true, data: _unwrap(result), message: "Success" };
  },

  createSubnet: async (data, token) => {
    const response = await fetch(NETWORK_ENDPOINTS.SUBNETS, {
      method: "POST",
      headers: authHeaders(token),
      body: JSON.stringify(data),
    });
    const result = await handleJSON(response, "Failed to create subnet");
    return { status: true, data: result, message: "Created" };
  },

  deleteSubnet: async (id, token) => {
    const response = await fetch(NETWORK_ENDPOINTS.SUBNET(id), {
      method: "DELETE",
      headers: authHeaders(token),
    });
    const result = await handleJSON(response, "Failed to delete subnet");
    return { status: true, data: result, message: "Deleted" };
  },

  // ----- Routers -----
  listRouters: async (token) => {
    const response = await fetch(NETWORK_ENDPOINTS.ROUTERS, {
      method: "GET",
      headers: authHeaders(token),
    });
    const result = await handleJSON(response, "Failed to list routers");
    return { status: true, data: _unwrap(result), message: "Success" };
  },

  createRouter: async (data, token) => {
    const response = await fetch(NETWORK_ENDPOINTS.ROUTERS, {
      method: "POST",
      headers: authHeaders(token),
      body: JSON.stringify(data),
    });
    const result = await handleJSON(response, "Failed to create router");
    return { status: true, data: result, message: "Created" };
  },

  deleteRouter: async (id, token) => {
    const response = await fetch(NETWORK_ENDPOINTS.ROUTER(id), {
      method: "DELETE",
      headers: authHeaders(token),
    });
    const result = await handleJSON(response, "Failed to delete router");
    return { status: true, data: result, message: "Deleted" };
  },

  // ----- Router interfaces -----
  // Each call attaches / detaches one subnet to a router. The backend
  // uses ``PUT`` for both (Neutron convention), not POST/DELETE.
  // The ``listRouterInterfaces`` call gives the live attached set
  // (port-backed, not "every subnet in the project") so the detail
  // UI can render an accurate Detach list.
  listRouterInterfaces: async (routerId, token) => {
    const response = await fetch(NETWORK_ENDPOINTS.ROUTER_INTERFACES(routerId), {
      method: "GET",
      headers: authHeaders(token),
    });
    const result = await handleJSON(response, "Failed to list router interfaces");
    const list = Array.isArray(result?.data)
      ? result.data
      : Array.isArray(result)
        ? result
        : [];
    return { status: true, data: list };
  },

  addRouterInterface: async (routerId, subnetId, token) => {
    const response = await fetch(
      NETWORK_ENDPOINTS.ROUTER_ADD_INTERFACE(routerId),
      {
        method: "PUT",
        headers: authHeaders(token),
        body: JSON.stringify({ subnet_id: subnetId }),
      },
    );
    const result = await handleJSON(response, "Failed to add router interface");
    return { status: true, data: result, message: "Attached" };
  },

  removeRouterInterface: async (routerId, subnetId, token) => {
    const response = await fetch(
      NETWORK_ENDPOINTS.ROUTER_REMOVE_INTERFACE(routerId),
      {
        method: "PUT",
        headers: authHeaders(token),
        body: JSON.stringify({ subnet_id: subnetId }),
      },
    );
    const result = await handleJSON(
      response,
      "Failed to remove router interface",
    );
    return { status: true, data: result, message: "Detached" };
  },

  // ----- Floating IPs -----
  listFloatingIps: async (token) => {
    const response = await fetch(FLOATING_IP_ENDPOINTS.FLOATING_IPS, {
      method: "GET",
      headers: authHeaders(token),
    });
    const result = await handleJSON(response, "Failed to list floating IPs");
    return { status: true, data: _unwrap(result), message: "Success" };
  },

  createFloatingIp: async (data, token) => {
    const response = await fetch(FLOATING_IP_ENDPOINTS.FLOATING_IPS, {
      method: "POST",
      headers: authHeaders(token),
      body: JSON.stringify(data),
    });
    const result = await handleJSON(response, "Failed to allocate floating IP");
    return { status: true, data: result, message: "Allocated" };
  },

  deleteFloatingIp: async (id, token) => {
    const response = await fetch(FLOATING_IP_ENDPOINTS.FLOATING_IP(id), {
      method: "DELETE",
      headers: authHeaders(token),
    });
    const result = await handleJSON(response, "Failed to release floating IP");
    return { status: true, data: result, message: "Released" };
  },
};

/**
 * Object storage (Swift) — containers + objects.
 *
 * Naming note: backend models call them "containers" but the UI shows
 * them as "buckets" (S3 vocabulary the user expects). The client
 * method names follow the backend so the wire-level mental model
 * stays clean — UI components do the labelling.
 *
 * The shape returned mirrors the other resource APIs: every method
 * resolves to `{ status, data, message? }` so callers don't need
 * special-casing.
 */
export const objectStorageAPI = {
  // ---- Containers ----
  listContainers: async (token) => {
    const response = await fetch(OBJECT_STORAGE_ENDPOINTS.CONTAINERS, {
      method: "GET",
      headers: authHeaders(token),
    });
    const result = await handleJSON(response, "Failed to fetch containers");
    const list = Array.isArray(result?.data)
      ? result.data
      : Array.isArray(result)
        ? result
        : [];
    return { status: true, data: list };
  },

  getContainer: async (name, token) => {
    const response = await fetch(OBJECT_STORAGE_ENDPOINTS.CONTAINER(name), {
      method: "GET",
      headers: authHeaders(token),
    });
    const result = await handleJSON(response, "Failed to fetch container");
    return { status: true, data: result };
  },

  createContainer: async (data, token) => {
    /* { name, metadata?, is_public? } */
    const response = await fetch(OBJECT_STORAGE_ENDPOINTS.CONTAINERS, {
      method: "POST",
      headers: authHeaders(token),
      body: JSON.stringify(data),
    });
    const result = await handleJSON(response, "Failed to create container");
    return { status: true, data: result, message: "Created" };
  },

  // Flip an existing bucket between public-read and private. Backend
  // mirrors the toggle in CreateBucketModal — the PATCH returns the
  // refreshed container with the new is_public flag so the caller can
  // update the badge without a second round trip.
  setContainerAccess: async (name, isPublic, token) => {
    const response = await fetch(
      OBJECT_STORAGE_ENDPOINTS.CONTAINER_ACCESS(name),
      {
        method: "PATCH",
        headers: authHeaders(token),
        body: JSON.stringify({ is_public: !!isPublic }),
      },
    );
    const result = await handleJSON(
      response,
      "Failed to update bucket access",
    );
    return { status: true, data: result, message: "Access updated" };
  },

  deleteContainer: async (name, token) => {
    const response = await fetch(OBJECT_STORAGE_ENDPOINTS.CONTAINER(name), {
      method: "DELETE",
      headers: authHeaders(token),
    });
    const result = await handleJSON(response, "Failed to delete container");
    return { status: true, data: result, message: "Deleted" };
  },

  // ---- Objects ----
  listObjects: async (containerName, token, { prefix } = {}) => {
    const url = prefix
      ? `${OBJECT_STORAGE_ENDPOINTS.OBJECTS(containerName)}?prefix=${encodeURIComponent(prefix)}`
      : OBJECT_STORAGE_ENDPOINTS.OBJECTS(containerName);
    const response = await fetch(url, {
      method: "GET",
      headers: authHeaders(token),
    });
    const result = await handleJSON(response, "Failed to list objects");
    const list = Array.isArray(result?.data)
      ? result.data
      : Array.isArray(result)
        ? result
        : [];
    return { status: true, data: list };
  },

  // Upload uses multipart/form-data — the backend reads `file` from the
  // form. We deliberately do NOT set Content-Type ourselves; the
  // browser populates it (with the correct multipart boundary) when
  // the body is a FormData instance. Setting it manually would break
  // the boundary param.
  uploadObject: async (containerName, objectName, file, token) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch(
      OBJECT_STORAGE_ENDPOINTS.OBJECT(containerName, objectName),
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      },
    );
    const result = await handleJSON(response, "Failed to upload object");
    return { status: true, data: result, message: "Uploaded" };
  },

  // Download returns a Blob — UI is responsible for triggering the
  // save (e.g. anchor with a created object-URL). We don't try to
  // peek at the headers here because that locks us into a particular
  // fetch implementation; the caller can read `blob.type` for the
  // content type if it cares.
  downloadObject: async (containerName, objectName, token) => {
    const response = await fetch(
      OBJECT_STORAGE_ENDPOINTS.OBJECT(containerName, objectName),
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    if (!response.ok) {
      // Reuse handleJSON for error parsing — it throws on !ok.
      await handleJSON(response, "Failed to download object");
    }
    const blob = await response.blob();
    return { status: true, data: blob };
  },

  deleteObject: async (containerName, objectName, token) => {
    const response = await fetch(
      OBJECT_STORAGE_ENDPOINTS.OBJECT(containerName, objectName),
      {
        method: "DELETE",
        headers: authHeaders(token),
      },
    );
    const result = await handleJSON(response, "Failed to delete object");
    return { status: true, data: result, message: "Deleted" };
  },

  // ---- Connection info ----
  // Returns the Swift endpoint + the user's app credential so they
  // can push/pull data from outside the dashboard (CLI / SDK / curl).
  // The backend may 403 if per-user provisioning mode isn't enabled
  // — surface the error message to the caller in that case.
  getConnectionInfo: async (token) => {
    const response = await fetch(OBJECT_STORAGE_ENDPOINTS.CONNECTION_INFO, {
      method: "GET",
      headers: authHeaders(token),
    });
    const result = await handleJSON(response, "Failed to fetch connection info");
    return { status: true, data: result };
  },
};

/**
 * Octavia load balancer client.
 *
 * Covers the full surface of ``app/routers/load_balancers.py``:
 *   - Load balancers (5 endpoints)
 *   - Listeners (5)
 *   - Pools (5)
 *   - Members (5)
 *   - Health monitors (4)
 *
 * Every method resolves to ``{status, data, message?}`` so callers
 * don't need special-casing across success / failure flows.
 */
/**
 * OpenStack billing & pricing API.
 *
 * Backed by ``app/routers/openstack_billing.py``. The frontend Billing
 * page reads ``/pricing`` (rates) + ``/vms`` / ``/volumes`` /
 * ``/snapshots`` / ``/backups`` / ``/floating-ips`` (per-resource
 * history with running cost) to render the Compute & Storage
 * section.
 */
const OPENSTACK_BILLING_BASE = `${API_BASE_URL}/api/v1/openstack-billing`;

export const openstackBillingAPI = {
  pricing: async (token) => {
    const response = await fetch(`${OPENSTACK_BILLING_BASE}/pricing`, {
      method: "GET",
      headers: authHeaders(token),
    });
    const result = await handleJSON(response, "Failed to fetch pricing");
    return { status: true, data: result };
  },

  vms: async (token) => {
    const response = await fetch(`${OPENSTACK_BILLING_BASE}/vms`, {
      method: "GET",
      headers: authHeaders(token),
    });
    const result = await handleJSON(response, "Failed to fetch VM billing");
    return { status: true, data: result?.rows || [], count: result?.count || 0 };
  },

  volumes: async (token) => {
    const response = await fetch(`${OPENSTACK_BILLING_BASE}/volumes`, {
      method: "GET",
      headers: authHeaders(token),
    });
    const result = await handleJSON(response, "Failed to fetch volume billing");
    return { status: true, data: result?.rows || [], count: result?.count || 0 };
  },

  snapshots: async (token) => {
    const response = await fetch(`${OPENSTACK_BILLING_BASE}/snapshots`, {
      method: "GET",
      headers: authHeaders(token),
    });
    const result = await handleJSON(
      response,
      "Failed to fetch snapshot billing",
    );
    return { status: true, data: result?.rows || [], count: result?.count || 0 };
  },

  backups: async (token) => {
    const response = await fetch(`${OPENSTACK_BILLING_BASE}/backups`, {
      method: "GET",
      headers: authHeaders(token),
    });
    const result = await handleJSON(
      response,
      "Failed to fetch backup billing",
    );
    return { status: true, data: result?.rows || [], count: result?.count || 0 };
  },

  floatingIps: async (token) => {
    const response = await fetch(
      `${OPENSTACK_BILLING_BASE}/floating-ips`,
      { method: "GET", headers: authHeaders(token) },
    );
    const result = await handleJSON(
      response,
      "Failed to fetch floating-IP billing",
    );
    return { status: true, data: result?.rows || [], count: result?.count || 0 };
  },

  // App deployment — tiered billing. First replica + base CPU/RAM +
  // default subdomain are free; extras (more replicas, more CPU/RAM
  // than base, custom domains) accrue hourly charges. Backend
  // returns one row per app with the over-free-tier extras called
  // out so the UI can label each item Free / Charged.
  apps: async (token) => {
    const response = await fetch(`${OPENSTACK_BILLING_BASE}/apps`, {
      method: "GET",
      headers: authHeaders(token),
    });
    const result = await handleJSON(
      response, "Failed to fetch app-deploy billing",
    );
    return { status: true, data: result?.rows || [], count: result?.count || 0 };
  },
};

export const loadBalancerAPI = {
  // ----- Load balancers -----
  list: async (token) => {
    const response = await fetch(LOAD_BALANCER_ENDPOINTS.LBS, {
      method: "GET",
      headers: authHeaders(token),
    });
    const result = await handleJSON(response, "Failed to fetch load balancers");
    const list = Array.isArray(result?.data)
      ? result.data
      : Array.isArray(result)
        ? result
        : [];
    return { status: true, data: list };
  },

  get: async (id, token) => {
    const response = await fetch(LOAD_BALANCER_ENDPOINTS.LB(id), {
      method: "GET",
      headers: authHeaders(token),
    });
    const result = await handleJSON(response, "Failed to fetch load balancer");
    return { status: true, data: result };
  },

  create: async (data, token) => {
    /* { name, vip_subnet_id, vip_address?, description?, admin_state_up? } */
    const response = await fetch(LOAD_BALANCER_ENDPOINTS.LBS, {
      method: "POST",
      headers: authHeaders(token),
      body: JSON.stringify(data),
    });
    const result = await handleJSON(response, "Failed to create load balancer");
    return { status: true, data: result, message: "Created" };
  },

  update: async (id, data, token) => {
    const response = await fetch(LOAD_BALANCER_ENDPOINTS.LB(id), {
      method: "PUT",
      headers: authHeaders(token),
      body: JSON.stringify(data),
    });
    const result = await handleJSON(response, "Failed to update load balancer");
    return { status: true, data: result, message: "Updated" };
  },

  delete: async (id, token, { cascade = true } = {}) => {
    // Default cascade=true — Octavia refuses to delete an LB with
    // attached listeners/pools/members, and the UI's "Delete" button
    // implies "everything under this LB goes". If a caller wants the
    // strict no-cascade behaviour they can pass {cascade: false}.
    const url = `${LOAD_BALANCER_ENDPOINTS.LB(id)}?cascade=${cascade ? "true" : "false"}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: authHeaders(token),
    });
    const result = await handleJSON(response, "Failed to delete load balancer");
    return { status: true, data: result, message: "Deleted" };
  },

  // ----- Listeners -----
  listListeners: async (lbId, token) => {
    const response = await fetch(LOAD_BALANCER_ENDPOINTS.LISTENERS(lbId), {
      method: "GET",
      headers: authHeaders(token),
    });
    const result = await handleJSON(response, "Failed to fetch listeners");
    const list = Array.isArray(result?.data)
      ? result.data
      : Array.isArray(result)
        ? result
        : [];
    return { status: true, data: list };
  },

  createListener: async (lbId, data, token) => {
    /* { name, protocol, protocol_port, default_pool_id?, description?, ... } */
    const response = await fetch(LOAD_BALANCER_ENDPOINTS.LISTENERS(lbId), {
      method: "POST",
      headers: authHeaders(token),
      body: JSON.stringify(data),
    });
    const result = await handleJSON(response, "Failed to create listener");
    return { status: true, data: result, message: "Created" };
  },

  deleteListener: async (lbId, listenerId, token) => {
    const response = await fetch(
      LOAD_BALANCER_ENDPOINTS.LISTENER(lbId, listenerId),
      {
        method: "DELETE",
        headers: authHeaders(token),
      },
    );
    const result = await handleJSON(response, "Failed to delete listener");
    return { status: true, data: result, message: "Deleted" };
  },

  // ----- Pools -----
  listPools: async (lbId, token) => {
    const response = await fetch(LOAD_BALANCER_ENDPOINTS.POOLS(lbId), {
      method: "GET",
      headers: authHeaders(token),
    });
    const result = await handleJSON(response, "Failed to fetch pools");
    const list = Array.isArray(result?.data)
      ? result.data
      : Array.isArray(result)
        ? result
        : [];
    return { status: true, data: list };
  },

  createPool: async (lbId, data, token) => {
    /* { name, protocol, lb_algorithm, listener_id?, description? } */
    const response = await fetch(LOAD_BALANCER_ENDPOINTS.POOLS(lbId), {
      method: "POST",
      headers: authHeaders(token),
      body: JSON.stringify(data),
    });
    const result = await handleJSON(response, "Failed to create pool");
    return { status: true, data: result, message: "Created" };
  },

  deletePool: async (lbId, poolId, token) => {
    const response = await fetch(LOAD_BALANCER_ENDPOINTS.POOL(lbId, poolId), {
      method: "DELETE",
      headers: authHeaders(token),
    });
    const result = await handleJSON(response, "Failed to delete pool");
    return { status: true, data: result, message: "Deleted" };
  },

  // ----- Members -----
  listMembers: async (lbId, poolId, token) => {
    const response = await fetch(
      LOAD_BALANCER_ENDPOINTS.MEMBERS(lbId, poolId),
      {
        method: "GET",
        headers: authHeaders(token),
      },
    );
    const result = await handleJSON(response, "Failed to fetch members");
    const list = Array.isArray(result?.data)
      ? result.data
      : Array.isArray(result)
        ? result
        : [];
    return { status: true, data: list };
  },

  createMember: async (lbId, poolId, data, token) => {
    /* { name?, address, protocol_port, weight?, subnet_id? } */
    const response = await fetch(
      LOAD_BALANCER_ENDPOINTS.MEMBERS(lbId, poolId),
      {
        method: "POST",
        headers: authHeaders(token),
        body: JSON.stringify(data),
      },
    );
    const result = await handleJSON(response, "Failed to add member");
    return { status: true, data: result, message: "Added" };
  },

  deleteMember: async (lbId, poolId, memberId, token) => {
    const response = await fetch(
      LOAD_BALANCER_ENDPOINTS.MEMBER(lbId, poolId, memberId),
      {
        method: "DELETE",
        headers: authHeaders(token),
      },
    );
    const result = await handleJSON(response, "Failed to remove member");
    return { status: true, data: result, message: "Removed" };
  },

  // ----- Health monitors -----
  // One HM per pool — backend treats this as a POST under the pool.
  // Get/update/delete take the HM id; the URL still requires lb_id +
  // pool_id for routing consistency even though Octavia could find
  // the HM from id alone.
  createHealthMonitor: async (lbId, poolId, data, token) => {
    const response = await fetch(
      LOAD_BALANCER_ENDPOINTS.HEALTH_MONITOR(lbId, poolId),
      {
        method: "POST",
        headers: authHeaders(token),
        body: JSON.stringify(data),
      },
    );
    const result = await handleJSON(response, "Failed to create health monitor");
    return { status: true, data: result, message: "Created" };
  },

  // Update a listener — most commonly used to set/clear its
  // ``default_pool_id`` so traffic from that listener actually
  // reaches a backend pool. Without this, a freshly-created
  // listener is a "listening but going nowhere" endpoint.
  updateListener: async (lbId, listenerId, data, token) => {
    const response = await fetch(
      LOAD_BALANCER_ENDPOINTS.LISTENER(lbId, listenerId),
      {
        method: "PUT",
        headers: authHeaders(token),
        body: JSON.stringify(data),
      },
    );
    const result = await handleJSON(response, "Failed to update listener");
    return { status: true, data: result, message: "Updated" };
  },

  // Fetch a single health monitor's full config — needed to show
  // the user what the monitor is actually checking (URL path,
  // expected codes, retry policy) instead of just an opaque ID.
  getHealthMonitor: async (lbId, poolId, hmId, token) => {
    const response = await fetch(
      LOAD_BALANCER_ENDPOINTS.HEALTH_MONITOR_BY_ID(lbId, poolId, hmId),
      {
        method: "GET",
        headers: authHeaders(token),
      },
    );
    const result = await handleJSON(response, "Failed to fetch health monitor");
    return { status: true, data: result };
  },

  // Find the health monitor attached to a pool (returns null if none).
  // Uses Octavia's list-with-filter endpoint under the hood — more
  // reliable than reading the pool's ``health_monitor_id`` field,
  // which various openstacksdk versions populate inconsistently.
  // This is what the Health Monitor tab calls on mount/refresh.
  findPoolHealthMonitor: async (lbId, poolId, token) => {
    const response = await fetch(
      LOAD_BALANCER_ENDPOINTS.HEALTH_MONITOR(lbId, poolId),
      {
        method: "GET",
        headers: authHeaders(token),
      },
    );
    const result = await handleJSON(response, "Failed to fetch pool's health monitor");
    return { status: true, data: result };
  },

  deleteHealthMonitor: async (lbId, poolId, hmId, token) => {
    const response = await fetch(
      LOAD_BALANCER_ENDPOINTS.HEALTH_MONITOR_BY_ID(lbId, poolId, hmId),
      {
        method: "DELETE",
        headers: authHeaders(token),
      },
    );
    const result = await handleJSON(response, "Failed to delete health monitor");
    return { status: true, data: result, message: "Deleted" };
  },

  // ----- Floating IP association -----
  // Mirrors Horizon's "Associate Floating IP Address" flow. The
  // backend response is always shaped `{associated, ...fip fields}`
  // so callers can just check `data.associated` to know whether the
  // LB is publicly reachable.
  getFloatingIP: async (lbId, token) => {
    const response = await fetch(LOAD_BALANCER_ENDPOINTS.FLOATING_IP(lbId), {
      method: "GET",
      headers: authHeaders(token),
    });
    const result = await handleJSON(response, "Failed to fetch floating IP");
    return { status: true, data: result };
  },

  // Body must contain EXACTLY ONE of:
  //   { floating_ip_id }                            (reuse an existing FIP)
  //   { floating_network_id, description? }         (allocate a fresh one)
  associateFloatingIP: async (lbId, data, token) => {
    const response = await fetch(LOAD_BALANCER_ENDPOINTS.FLOATING_IP(lbId), {
      method: "POST",
      headers: authHeaders(token),
      body: JSON.stringify(data),
    });
    const result = await handleJSON(response, "Failed to associate floating IP");
    return { status: true, data: result, message: "Associated" };
  },

  // Detaches the FIP from the LB's VIP port without releasing it —
  // the FIP stays in the user's project for future use.
  disassociateFloatingIP: async (lbId, token) => {
    const response = await fetch(LOAD_BALANCER_ENDPOINTS.FLOATING_IP(lbId), {
      method: "DELETE",
      headers: authHeaders(token),
    });
    const result = await handleJSON(response, "Failed to disassociate floating IP");
    return { status: true, data: result, message: "Disassociated" };
  },

  // ===== SSL / HTTPS =====
};


// Workspace bootstrap API — see WORKSPACE_ENDPOINTS for context. The
// dashboard layout calls ``status`` on mount + every 1.5 s thereafter
// until ``ready`` (or ``failed``), and calls ``bootstrap`` when the
// status is ``not_started`` or ``failed`` (so the user can retry).
export const workspaceAPI = {
  status: async (token) => {
    const res = await fetch(WORKSPACE_ENDPOINTS.STATUS, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      // Don't throw — the caller polls and we want a usable shape
      // even on transient failure. The frontend treats a missing
      // status as "still bootstrapping".
      return {
        status: false,
        data: {
          ready: false,
          state: "failed",
          message: "Couldn't reach the platform. Retrying…",
        },
      };
    }
    const result = await res.json();
    // Backend's ResponseWrapperMiddleware wraps successful payloads
    // in ``{ status, data, message }``; raw payloads are also seen
    // during dev. Accept both.
    const payload = result?.data ?? result;
    return { status: true, data: payload };
  },

  bootstrap: async (token) => {
    const res = await fetch(WORKSPACE_ENDPOINTS.BOOTSTRAP, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    const result = await handleJSON(res, "Failed to start workspace setup");
    return { status: true, data: result };
  },
};


// NCM certificate API. The certificates page + LB listener form both
// drive these endpoints. Returns ``{ status, data, message? }`` to
// match the rest of the codebase's conventions.
export const certificateAPI = {
  list: async (token, { status, type, domain } = {}) => {
    const params = new URLSearchParams();
    if (status) params.append("status", status);
    if (type) params.append("type", type);
    if (domain) params.append("domain", domain);
    const qs = params.toString();
    const url = `${CERTIFICATE_ENDPOINTS.LIST}${qs ? `?${qs}` : ""}`;
    const res = await fetch(url, {
      method: "GET", headers: authHeaders(token),
    });
    const result = await handleJSON(res, "Failed to fetch certificates");
    const data = Array.isArray(result) ? result : (result?.data || []);
    return { status: true, data };
  },

  get: async (id, token) => {
    const res = await fetch(CERTIFICATE_ENDPOINTS.GET(id), {
      method: "GET", headers: authHeaders(token),
    });
    const result = await handleJSON(res, "Failed to fetch certificate");
    return { status: true, data: result };
  },

  requestNcm: async (domain, token) => {
    const res = await fetch(CERTIFICATE_ENDPOINTS.REQUEST, {
      method: "POST", headers: authHeaders(token),
      body: JSON.stringify({ domain }),
    });
    const result = await handleJSON(res, "Failed to request certificate");
    return { status: true, data: result };
  },

  pollValidation: async (id, token) => {
    const res = await fetch(CERTIFICATE_ENDPOINTS.POLL_VALIDATION(id), {
      method: "POST", headers: authHeaders(token),
    });
    const result = await handleJSON(res, "Failed to poll validation");
    return { status: true, data: result };
  },

  renew: async (id, token) => {
    const res = await fetch(CERTIFICATE_ENDPOINTS.RENEW(id), {
      method: "POST", headers: authHeaders(token),
    });
    const result = await handleJSON(res, "Failed to renew certificate");
    return { status: true, data: result };
  },

  import: async (data, token) => {
    // data: { cert_pem, key_pem, intermediate_pem?, domain? }
    const res = await fetch(CERTIFICATE_ENDPOINTS.IMPORT, {
      method: "POST", headers: authHeaders(token),
      body: JSON.stringify(data),
    });
    const result = await handleJSON(res, "Failed to import certificate");
    return { status: true, data: result };
  },

  replace: async (id, data, token) => {
    const res = await fetch(CERTIFICATE_ENDPOINTS.REPLACE(id), {
      method: "POST", headers: authHeaders(token),
      body: JSON.stringify(data),
    });
    const result = await handleJSON(res, "Failed to replace certificate");
    return { status: true, data: result };
  },

  revoke: async (id, token) => {
    const res = await fetch(CERTIFICATE_ENDPOINTS.REVOKE(id), {
      method: "POST", headers: authHeaders(token),
    });
    const result = await handleJSON(res, "Failed to revoke certificate");
    return { status: true, data: result };
  },

  delete: async (id, token) => {
    const res = await fetch(CERTIFICATE_ENDPOINTS.DELETE(id), {
      method: "DELETE", headers: authHeaders(token),
    });
    await handleJSON(res, "Failed to delete certificate");
    return { status: true, message: "Deleted" };
  },
};
