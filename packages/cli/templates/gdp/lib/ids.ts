declare const brand: unique symbol;
type Brand<T, B extends string> = T & { readonly [brand]: B };

export type UserId = Brand<string, "UserId">;
export type SessionId = Brand<string, "SessionId">;
export type OrgId = Brand<string, "OrgId">;
export type ProjectId = Brand<string, "ProjectId">;

export const UserId = (id: string) => id as UserId;
export const SessionId = (id: string) => id as SessionId;
export const OrgId = (id: string) => id as OrgId;
export const ProjectId = (id: string) => id as ProjectId;
