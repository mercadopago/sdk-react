/* eslint-disable @typescript-eslint/no-explicit-any */
export function deepCopy<T>(value: T): T {
  if (typeof value !== 'object' || value === null) {
    return value;
  }
  if (Array.isArray(value)) {
    return deepArray(value);
  }
  return deepObject(value);
}

function deepObject<T extends object>(source: T) {
  const result = {} as T;
  Object.keys(source).forEach((key) => {
    const value = source[key as keyof T];
    result[key as keyof T] = deepCopy(value);
  }, {});
  return result as T;
}

function deepArray<T extends any[]>(collection: T): any {
  return collection.map((value) => {
    return deepCopy(value);
  });
}
