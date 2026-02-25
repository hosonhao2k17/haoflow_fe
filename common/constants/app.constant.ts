

export enum SortOrder {
    ASC = 'asc',
    DESC = 'desc'
}

export enum Gender {
    MALE = 'male',
    FEMALE = 'female'
}

export enum UserStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive'
}

export enum Action {
    CREATE = 'create',
    READ = 'read',
    UPDATE = 'update',
    DELETE = 'delete'
}

export enum RoleName {
    ADMIN = 'admin',
    USER = 'user'
}

export const DEFAULT_SORT_BY = 'createdAt'
export const DEFAULT_SORT_ORDER = SortOrder.DESC

export enum TaskStatus {
    TODO = "todo",
    DONE = "done",
    SKIPPED = "skipped"
}

export enum TaskPriority {
    OPTIONAL = 'optional',
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high',
    CRITICAL = 'critical'
}

export enum CruMode {
    CREATE = 'create',
    READ = 'read',
    UPDATE = 'update'
}