const organizationStr = localStorage.getItem("organization");

export const organizationId: number  = organizationStr
  ? JSON.parse(organizationStr).id
  : null;