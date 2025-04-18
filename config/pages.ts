// config/pages.ts

import { RiScanLine, RiBardLine } from "@remixicon/react";

export const pageConfig = {
  "/dashboard": {
    title: "Dashboard",
    description: "Here's an overview of your dashboard. See your stats and manage content.",
    icon: RiScanLine,
  },
  "/dashboard/products": {
    title: "E-Books",
    description: "Manage your e-books. Add new ones or update existing content.",
    icon: RiBardLine,
  },
  "/dashboard/contacts": {
    title: "Contacts",
    description: "Here’s an overview of your contacts. Manage or create new ones with ease!",
    icon: RiScanLine,
  },
};