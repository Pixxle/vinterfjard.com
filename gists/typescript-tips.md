---
title: "TypeScript Tips for Better Code"
date: "2024-12-15"
tags: ["typescript", "javascript", "tips"]
---

# TypeScript Tips for Better Code

Here are some advanced TypeScript patterns that will make your code more robust and maintainable.

## Utility Types

TypeScript provides powerful utility types:

```typescript
// Pick specific properties
type UserPreview = Pick<User, 'id' | 'name' | 'email'>;

// Omit properties
type CreateUser = Omit<User, 'id' | 'createdAt'>;

// Make properties optional
type PartialUser = Partial<User>;
```

## Generic Constraints

```typescript
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}
```

This is a shorter gist to test the truncation feature!