const organizationStr = localStorage.getItem("organization");

export const organizationId: number | null = organizationStr
  ? JSON.parse(organizationStr).id
  : null;